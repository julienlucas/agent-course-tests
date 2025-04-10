import os
# import chromadb
import re
import requests
import fitz # PyMuPDF
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException

from llama_index.core import (
    SimpleDirectoryReader,
    VectorStoreIndex,
    StorageContext,
    Document
)
from llama_index.core.node_parser import (
  MarkdownElementNodeParser,
  SentenceSplitter,
  SemanticSplitterNodeParser,
  TokenTextSplitter
)
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
async def process_documents(file_name: str, file_content: bytes):
    # Lecture des documents dans répertoire
    # reader = SimpleDirectoryReader(input_dir="documents")
    # documents = reader.load_data()

    # From URL
    # response = requests.get('https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt')
    # text = response.text
    # documents = [Document(text=text)]

    pdf = fitz.open(stream=file_content, filetype="pdf")

    all_text = ""
    for page in pdf:
        all_text += page.get_text()

    document = [Document(text=all_text)]

    # Base de données Pinecone (pour la production et le scalage)
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    index_name = file_name
    existing_indexes = [i.get('name') for i in pc.list_indexes()]

    # Appel la fonction clean_up_text (si nécessaire)
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
    # storage_context = StorageContext.from_defaults(vector_store=vector_store)

    # Pipeline de chucking connecté à Pinecone
    embed_model = OpenAIEmbedding(api_key=OPENAI_API_KEY)

    pipeline = IngestionPipeline(
        # transformations=[
        #     SemanticSplitterNodeParser(
        #         buffer_size=1,
        #         breakpoint_percentile_threshold=95,
        #         embed_model=embed_model,
        #     ),
        #     embed_model,
        # ],
        transformations=[
            MarkdownElementNodeParser(
                num_workers=4,
                embed_model=embed_model,
            ),
            embed_model,
        ],
        # transformations=[
        #   TokenTextSplitter(chunk_size=512, chunk_overlap=50),
        #   embed_model,
        # ],
        vector_store=vector_store
    )

    await pipeline.arun(documents=document)

    # Récupération du VectorStoreIndex
    index = VectorStoreIndex.from_vector_store(vector_store=vector_store)

    # Utilisation du retriever (retourne les 5 meilleurs résultats)
    retriever = VectorIndexRetriever(index=index, similarity_top_k=5)
    query_engine = RetrieverQueryEngine(retriever=retriever)

    # Query de l'Index
    response = await query_engine.aquery(
      """
        Tu es un expert en analyse de documents. Je vais te passer un document, ce document peut être plus ou moins de taille conséquente.
        J'aimerai que tu me résume ce document par chapitre. Chaque chapitre étant résumé en bullet points.
        Tu peux aller jusqu'à 2000 mots en tout. N'hésites pas à utiliser les 2000 mots.

        UTILISE TOUJOURS le format HTML suivant :

        <strong>Indiques le titre du document</strong>
        <br/><br/>
        <strong>1 - Titre de la partie 1</strong><br/>
        Les relations entre les entreprises et les clients<br/>
        - Bullet points de la partie 1<br/>
        - Bullet points de la partie 1<br/>
        - Bullet points de la partie 1<br/>
        <br/><strong>2 - Le potentiel de la plateforme saas</strong><br/>
        - Bullet points de la partie 2<br/>
        - Bullet points de la partie 2<br/>
        - Bullet points de la partie 2<br/>
        <br/><strong>3 - L'idéal pour la plateforme saas</strong><br/>
        - Bullet points de la partie 3<br/>
        - Bullet points de la partie 3<br/>
        - Bullet points de la partie 3<br/>
        <br/><strong>4 - L'orientation de la plateforme saas</strong><br/>
        - Bullet points de la partie 4<br/>
        - Bullet points de la partie 5<br/>
        - Bullet points de la partie 4<br/>
        <br/><strong>5 - Chercher un moyen de mettre en avant la plateforme saas</strong><br/>
        - Bullet points de la partie 5<br/>
        - Bullet points de la partie 5<br/>
        - Bullet points de la partie 5><br/>
        ...

        # Fin de l'exemple.


        Important: Avant chaque titre de chapitre, je veux que tu ajoutes ça "<br/><br/>" pour faire un saut de ligne en HTML.
        Important aussi: fais des saute de lignes entre les bullets points. Ajoutes ça "<br/>" avant chaque "-"

        Rappel: attention à bien aller jusqu'au bout du document quand tu l'analyse et le résume.
        Prends bien ton temps et traite bien CHAQUE chapitre du document.
      """
    )

    # response = await query_engine.aquery(
    #   """
    #     Tu es un expert en analyse de documents. Je vais te passer un document, qui peut être plus ou moins de taille conséquente.
    #     J'aimerai que tu me fasses un résumé de ce document, tu peux aller jusqu'à 2000 mots.

    #     Réponds toujours au format objet JSON.

    #     UTILISE TOUJOURS le format suivant :
    #     {
    #       "Indiques le titre du document": {
    #         "1 - Titre du chapitre 1": {
    #           "Titre du point 1": "Résumé",
        #       "Titre du point 2": "Résumé",
        #       "Titre du point 3": "Résumé",
        #       "Titre du point 4": "Résumé",
        #       "Titre du point 5": "Résumé",
        #     },
        #     "2 - Titre du chapitre 2": {
        #       "Titre du point 1": "Résumé",
        #       "Titre du point 2": "Résumé",
        #       "Titre du point 3": "Résumé",
        #       "Titre du point 4": "Résumé",
        #       "Titre du point 5": "Résumé",
        #     },
        #     "3 - Titre du chapitre 3": {
        #       "Titre du point 1": "Résumé",
        #       "Titre du point 2": "Résumé",
        #       "Titre du point 3": "Résumé",
        #       "Titre du point 4": "Résumé",
        #       "Titre du point 5": "Résumé",
        #     },
        #   }
        # }

    #     Voici un exemple de réponse :
    #     Indiques le titre du document

    #     1 - Titre de la partie 1
    #     Les relations entre les entreprises et les clients
    #     - Bullet points de la partie 1
    #     - Bullet points de la partie 1
    #     - Bullet points de la partie 1

    #     2 - Le potentiel de la plateforme saas
    #     - Bullet points de la partie 2
    #     - Bullet points de la partie 2
    #     - Bullet points de la partie 2

    #     3 - L'idéal pour la plateforme saas
    #     - Bullet points de la partie 3
    #     - Bullet points de la partie 3
    #     - Bullet points de la partie 3

    #     4 - L'orientation de la plateforme saas
    #     - Bullet points de la partie 4
    #     - Bullet points de la partie 5
    #     - Bullet points de la partie 4

    #     5 - Chercher un moyen de mettre en avant la plateforme saas
    #     - Bullet points de la partie 5
    #     - Bullet points de la partie 5
    #     - Bullet points de la partie 5
    #     ...

    #     # Fin de l'exemple.

    #     Commence maintenant ! Rappel: attention à bien aller jusqu'au bout du document quand tu l'analyse et le résume.
    #     Rappel: tu dois répondre uniquement au format objet JSON.
    #     Prends bien ton temps.
    #   """
    # )

    print(response)

    response_text = str(response)
    formatted_response = response_text.replace(".-", ".\n-")
    # formatted_response = response_text.replace(" -", "<br/><br/>")
    # formatted_response = formatted_response.replace(".-", "<br/><br/>")

    yield formatted_response.encode()

@app.post("/")
async def analyze_cv(file: UploadFile = File(...)):
    try:
        if not file.filename.endswith('.pdf'):
            raise HTTPException(
                status_code=400,
                detail="Le fichier doit être au format PDF"
            )

        file_content = await file.read()
        file_name = re.sub(r'[^A-Za-z0-9]+', '-', file.filename).lower()[:45]

        return StreamingResponse(
            process_documents(file_name, file_content),
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