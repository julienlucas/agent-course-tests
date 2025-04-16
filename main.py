import os
# import chromadb
import re
# import requests
import fitz
import pymupdf
from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, UploadFile
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

from llama_index.llms.mistralai import MistralAI
from llama_index.embeddings.mistralai import MistralAIEmbedding

from pinecone import Pinecone, ServerlessSpec
from langfuse.decorators import observe

from llama_index.tools.clean_up_text import clean_up_text

load_dotenv()
HUGGINGFACEHUB_API_TOKEN = os.getenv("HF_ACCESS_TOKEN")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MISTRALAI_API_KEY = os.getenv("MISTRALAI_API_KEY")

app = FastAPI()

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "https://agent-course-tests-front-2.onrender.com",  "https://agent-ia-alfred.julienlucas.com", "https://agent-course-tests-j4fw.vercel.app"],  # Autoriser le frontend en local
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@observe()
async def process_documents(file_name: str, file_content: bytes, user_prompt: str):
    # Lecture des documents dans répertoire
    # reader = SimpleDirectoryReader(input_dir="documents")
    # documents = reader.load_data()

    # From URL
    # response = requests.get('https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt')
    # text = response.text
    # documents = [Document(text=text)]

    pdf = pymupdf.open(stream=file_content, filetype="pdf")

    all_text = ""
    for page in pdf:
        all_text += page.get_text()

    document = [Document(text=all_text)]

    # Base de données Pinecone (pour la production et le scalage)
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    index_name = 'demo-agent-ia'
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
          dimension=1024, # Dimension pour LLM MistralAI (ChatGPT: 1536)
          metric="cosine",
          spec=ServerlessSpec(
              cloud="aws",
              region="us-east-1"
          )
      )

    pinecone_index = pc.Index(index_name)
    namespace = file_name
    vector_store = PineconeVectorStore(pinecone_index=pinecone_index, namespace=namespace)
    # storage_context = StorageContext.from_defaults(vector_store=vector_store)

    # Pipeline de chucking connecté à Pinecone
    embed_model = OpenAIEmbedding(api_key=OPENAI_API_KEY)

    embed_model = MistralAIEmbedding(model_name='mistral-embed', api_key=MISTRALAI_API_KEY)

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
    # index = VectorStoreIndex.from_vector_store(vector_store=vector_store)
    index = VectorStoreIndex.from_documents(documents=document)

    # Utilisation du retriever (retourne les 5 meilleurs résultats)
    retriever = VectorIndexRetriever(index=index, similarity_top_k=3)
    query_engine = RetrieverQueryEngine(retriever=retriever)

    # Query de l'Index
    response = await query_engine.aquery(
      f"""
        Tu es un expert en lecture et synthèse de documents professionnels. Tu vas recevoir un texte extrait d'un document PDF.
        Ce texte peut contenir plusieurs chapitres, sections ou parties, et potentiellement être dense ou long.

        Ta mission est de synthétiser ce document de manière claire, complète et structurée. Pour cela :

        1. Identifie les grandes parties ou chapitres du document (tu peux te baser sur les titres ou les changements de thématique).
        2. Pour chaque partie, rédige un résumé sous forme de bullet points.
        3. Utilise un langage clair, professionnel et accessible.
        4. Ne laisse \`aucune partie du document sans traitement\`.
        5. Utilise \`jusqu'à 2000 caractères MAXIMUM\` si nécessaire pour garantir la richesse du résumé..

        UTILISE TOUJOURS le format \`HTML\` suivant :

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

        (...)

        Règles supplémentaires :
        - Avant chaque titre de chapitre, ajoute un double saut de ligne `<br/><br/>`
        - Après chaque titre de chapitre, n'oublie pas le saut de ligne à la fin du titre `<br/>`
        - Avant chaque bullet point, commence par un seul saut de ligne `<br/>-`
        - Après chaque ligne où il y a un bullet point, n'oublie pas le saut de ligne à la fin `<br/>`
        - N'invente rien. Ne comble pas les vides avec des hypothèses.
        - Si le document est désorganisé ou sans structure, regroupe les idées par thème logique.
        - Traite bien le document EN ENTIER, CHAQUE PARTIE/CHAPITRE avant de répondre.
        - Pour ta réponse utilise 2000 caractères MAXIMUM

        Important AVANT DE RÉPONDRE si le texte N'EST PAS en français le texte de réponse EN FRANÇAIS (et en conservant la règle du format HTML et des sauts de ligne).
      """
    )

    print(response)

    try:
        if not response or not str(response).strip():
            raise ValueError("Le LLM n'a pas généré de réponse valide")

        response_text = str(response)
        formatted_response = response_text.replace(".-", ".\n-")
        yield formatted_response.encode()

    except Exception as e:
        print(f"Erreur lors du traitement: {str(e)}")
        error_message = f"Erreur lors du traitement du document: {str(e)}"
        yield error_message.encode()

@app.post("/")
async def analyze_cv(file: UploadFile = File(...), user_prompt: str = Form(...)):
    try:
        if not file.filename.endswith('.pdf'):
            raise HTTPException(
                status_code=400,
                detail="Le fichier doit être au format PDF"
            )

        file_content = await file.read()
        file_name = re.sub(r'[^A-Za-z0-9]+', '-', file.filename).lower()[:45]

        return StreamingResponse(
            process_documents(file_name, file_content, user_prompt),
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