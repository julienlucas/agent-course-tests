import os
import chromadb
import asyncio
import shutil
from pydantic import BaseModel
from typing import List
from typing import Union
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from llama_index.core import (
    SimpleDirectoryReader,
    VectorStoreIndex,
    StorageContext,
)
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.settings import Settings
from llama_index.core.ingestion import IngestionPipeline
from llama_index.embeddings.huggingface_api import HuggingFaceInferenceAPIEmbedding
from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI
# from llama_index.vector_stores.pinecone import PineconeVectorStore

# from pinecone import Pinecone, ServerlessSpec
from langfuse.decorators import observe


load_dotenv()
HUGGINGFACEHUB_API_TOKEN = os.getenv("HF_ACCESS_TOKEN")

if not HUGGINGFACEHUB_API_TOKEN:
    raise ValueError("HF_ACCESS_TOKEN not found in environment variables")

app = FastAPI()

# Configurer CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Autoriser spécifiquement le frontend
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

class DocumentResponse(BaseModel):
    experiences: List[str]

@observe()
async def process_documents():
    # Read documents
    reader = SimpleDirectoryReader(input_dir="documents")
    documents = reader.load_data()

    ### Pinecone DB (for production & scaling)
    # pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    # index_name = "demo"

    # # Supprimer l'index existant s'il existe
    # if index_name in pc.list_indexes().names():
    #     pc.delete_index(index_name)

    # # Créer un nouvel index avec la bonne dimension
    # pc.create_index(
    #     name=index_name,
    #     dimension=384,  # Dimension pour BAAI/bge-small-en-v1.5
    #     metric="cosine",
    #     spec=ServerlessSpec(
    #         cloud="aws",
    #         region="us-east-1"
    #     )
    # )

    # pinecone_index = pc.Index(index_name)

    # vector_store = PineconeVectorStore(pinecone_index=pinecone_index)

    # ### Chroma DB (for small projects)
    # # Supprimer l'ancienne base de données Chroma si elle existe
    # if os.path.exists("./alfred_chroma_db"):
    #     shutil.rmtree("./alfred_chroma_db")

    # # Créer une nouvelle instance de Chroma avec la bonne dimension
    # db = chromadb.PersistentClient(path="./alfred_chroma_db")
    # chroma_collection = db.create_collection(
    #     name="alfred",
    #     metadata={"dimension": 384}
    # )

    # vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
    # vector_store = PineconeVectorStore(pinecone_index=pinecone_index)
    # storage_context = StorageContext.from_defaults(vector_store=vector_store)

    # # Chucking & storing
    # pipeline = IngestionPipeline(
    #   transformations=[
    #     SentenceSplitter(chunk_size=1024, chunk_overlap=0),
    #     HuggingFaceInferenceAPIEmbedding(
    #       model_name="BAAI/bge-small-en-v1.5",
    #       token=HUGGINGFACEHUB_API_TOKEN
    #     ),
    #     # TitleExtractor(),
    #     # SummaryExtractor(),
    #     # OpenAIEmbedding(),
    #   ]
    # )

    # # Create the index
    # nodes = await pipeline.arun(documents=documents)
    # index = VectorStoreIndex(nodes, storage_context=storage_context)
    index = VectorStoreIndex.from_documents(documents)

    # Configuration des modèles
    embed_model = HuggingFaceInferenceAPIEmbedding(
        model_name="BAAI/bge-small-en-v1.5",
        token=HUGGINGFACEHUB_API_TOKEN
    )

    llm = HuggingFaceInferenceAPI(
        model_name="Qwen/Qwen2.5-Coder-32B-Instruct",
        temperature=0.1,
        token=HUGGINGFACEHUB_API_TOKEN
    )

    # Configuration globale avec Settings
    Settings.llm = llm
    Settings.embed_model = embed_model
    Settings.chunk_size = 1024
    Settings.chunk_overlap = 0

    # Query the index
    query_engine = index.as_query_engine(
        response_mode="tree_summarize",
        similarity_top_k=3
    )

    # response = await query_engine.aquery(
    #     """
    #     Tu es un recruteur de profils tech. Je vais te passer un document, je voudrai que tu me fasses un résumé des expériences contenue pour chaque entreprise, avec un bullet points pour chaque entreprise, et une seule phrase qui décrit l'exéprience.

    #     Voici un exemple de réponse :
    #     -SNCF (2018-2021) - À travaillé comme développeur front-end React, pour le développement de la plateforme saas
    #     -Sewan (2021-2022) - À travaillé comme développeur front-end React, pour le développement de la plateforme saas

    #     Rappel: je veux les expériences par bullet points pour chaque entreprise (pas une liste de technos hasardeuses). Et vas bien jusqu'au bout du document avant de répondre, je ne veux pas d'ntreprises manquantes.
    #     Listes bien toutes les entreprises. Et pas juste quelqu'unes.
    #     Et une seule phrase pour chaque entreprise.
    #     """
    # )

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


@app.post("/", response_model=DocumentResponse)
async def analyze_cv(files: List[UploadFile] = File(...)):
    # # Parcourir tous les fichiers reçus
    # for file in files:
    #     print(f"Titre du fichier PDF reçu : {file.filename}")

    #     # Sauvegarder le fichier dans le dossier documents
    #     file_path = os.path.join("documents", file.filename)
    #     with open(file_path, "wb") as buffer:
    #         content = await file.read()
    #         buffer.write(content)

    return StreamingResponse(
        process_documents(),
        media_type="text/plain"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)