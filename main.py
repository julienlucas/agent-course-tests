import os
# import chromadb
from pydantic import BaseModel
from typing import List, Union
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException

from llama_index.core import (
    SimpleDirectoryReader,
    VectorStoreIndex,
    StorageContext,
    Document
)
from llama_index.core.node_parser import MarkdownElementNodeParser, SentenceSplitter, SemanticSplitterNodeParser
from llama_index.core.settings import Settings
from llama_index.core.ingestion import IngestionPipeline
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.embeddings.huggingface_api import HuggingFaceInferenceAPIEmbedding
from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI
from llama_index.vector_stores.pinecone import PineconeVectorStore

from pinecone import Pinecone, ServerlessSpec
from langfuse.decorators import observe

from llama_index.tools.clean_up_text import clean_up_text

from llama_index.readers.smart_pdf_loader import SmartPDFLoader

load_dotenv()
HUGGINGFACEHUB_API_TOKEN = os.getenv("HF_ACCESS_TOKEN")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Autoriser spécifiquement le frontend
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@observe()
async def process_documents(file_content):
    # Lecture des documents
    reader = SimpleDirectoryReader(input_dir="documents")
    documents = reader.load_data()

    print(documents)

    # with open("documents", "wb") as f:
    #     f.write(file_content)

    # LLMSHERPA_API_URL = "https://readers.llmsherpa.com/api/document/developer/parseDocument?renderFormat=all"
    # pdf_url = "https://arxiv.org/pdf/1910.13461.pdf"  # also allowed is a file path e.g. /home/downloads/xyz.pdf
    # reader = SmartPDFLoader(llmsherpa_api_url=LLMSHERPA_API_URL)
    # documents = reader.load_data(pdf_url)
    # print(pdf_url)
    # print(documents)

    # Base de données Pinecone (pour la production et le scalage)
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    index_name = "demo"
    existing_indexes = [i.get('name') for i in pc.list_indexes()]

    # Appel la fonction clean_up_text
    # cleaned_docs = []
    # for d in documents:
    #     cleaned_text = clean_up_text(d.text)
    #     # Créer un nouveau document avec le texte nettoyé
    #     new_doc = type(d)(text=cleaned_text)
    #     cleaned_docs.append(new_doc)

    # # Inspect output
    # cleaned_docs[0].get_content()

    # Créer un nouvel index sur Pinecone s'il n'existe pas
    if index_name not in existing_indexes:
      pc.create_index(
          name=index_name,
          dimension=1536,
          metric="cosine",
          spec=ServerlessSpec(
              cloud="aws",
              region="us-east-1"
          )
      )

    pinecone_index = pc.Index(index_name)
    vector_store = PineconeVectorStore(pinecone_index=pinecone_index)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)

    # Pipeline de chucking connecté à Pinecone
    embed_model = OpenAIEmbedding(api_key=OPENAI_API_KEY)
    # node_parser = MarkdownElementNodeParser(embed_model, num_workers=4)
    # nodes = node_parser.get_nodes_from_documents(documents=[documents[0]])
    # base_nodes, objects = node_parser.get_nodes_and_objects(nodes)

    # pipeline = IngestionPipeline(
    #     transformations=[
    #         MarkdownElementNodeParser(
    #             num_workers=4,
    #             embed_model=embed_model,
    #         ),
    #         embed_model,
    #     ],
    #     vector_store=vector_store
    # )

    pipeline = IngestionPipeline(
        transformations=[
            SemanticSplitterNodeParser(
                buffer_size=1,
                breakpoint_percentile_threshold=95,
                embed_model=embed_model,
            ),
            embed_model,
        ],
        vector_store=vector_store
    )

    await pipeline.arun(documents=documents)

    # Création de l'Index
    index = VectorStoreIndex.from_vector_store(vector_store=vector_store)
    retriever = VectorIndexRetriever(index=index, similarity_top_k=5)

    # Utilisation du retriever (retourne les 5 meilleurs résultats)
    query_engine = RetrieverQueryEngine(retriever=retriever)

    # Query de l'Index
    response = await query_engine.aquery(
      """
        Tu es un expert en analyse de documents. Je vais te passer un document, qui peut être plus ou moins de taille conséquente.
        J'aimerai que tu me fasses un résumé de ce document, en maximum 1000 mots.
        get_weather : Obtenir la météo actuelle pour un lieu donné

        La manière d'utiliser ces outils consiste à spécifier un objet JSON.

        UTILISE TOUJOURS le format suivant :

        Titre du document : ici indiques le titre du document

        Voici un exemple de réponse :
        Titre du document

        1 - Titre de la partie 1
        Les relations entre les entreprises et les clients
        - Bullets points de la partie 1

        2 - Le potentiel de la plateforme saas
        - Bullets points de la partie 2

        3 - L'idéal pour la plateforme saas
        - Bullets points de la partie 3

        4 - L'orientation de la plateforme saas
        - Bullets points de la partie 4

        5 - Chercher un moyen de mettre en avant la plateforme saas
        - Bullets points de la partie 5

        6 - Les clients de la plateforme saas
        - Bullets points de la partie 6

        7 - Conclusion et perspectives
        - Bullets points de la partie 7
        ...

        # Fin de l'exemple.

        Commence maintenant ! Rappel: attention à bien aller jusqu'au bout du document quand tu l'analyse et le résume.
        Prends bien ton temps.
      """
    )

    print(response)

    response_text = str(response)
    formatted_response = response_text.replace(".-", ".\n-")

    yield formatted_response.encode()

@app.post("/")
async def analyze_cv(file: UploadFile = File(...)):
    try:
        if not file.filename.endswith('.pdf'):
            raise HTTPException(
                status_code=400,
                detail="Le fichier doit être au format PDF"
            )

        # Lire le contenu du fichier
        content = file

        # Traiter le document
        return StreamingResponse(
            process_documents(content),
            media_type="text/plain"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)