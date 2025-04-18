import os
import re
import pymupdf
import json
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
from llama_index.core.prompts import RichPromptTemplate
from llama_index.core.settings import Settings
from llama_index.core.ingestion import IngestionPipeline
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.embeddings.huggingface_api import HuggingFaceInferenceAPIEmbedding
from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI
from llama_index.vector_stores.pinecone import PineconeVectorStore
from llama_index.embeddings.mistralai import MistralAIEmbedding

from pinecone import Pinecone, ServerlessSpec
from langfuse.decorators import observe

from llama_index.tools.speechify_wave import speechify_wave

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

# @observe()
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
          dimension=1536, # Dimension pour LLM MistralAI (ChatGPT: 1536)
          metric="cosine",
          spec=ServerlessSpec(
              cloud="aws",
              region="us-east-1"
          )
      )

    pinecone_index = pc.Index(index_name)
    namespace = file_name

    # Initialisation de la Vector Database
    vector_store = PineconeVectorStore(pinecone_index=pinecone_index, namespace=namespace)

    # Pipeline de Chucking connecté à Pinecone
    embed_model = OpenAIEmbedding(api_key=OPENAI_API_KEY, temperature=0.7)
    # embed_model = MistralAIEmbedding(model_name='mistral-embed', temperature=0.7, api_key=MISTRALAI_API_KEY)

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
        # transformations=[
        #     MarkdownElementNodeParser(
        #         num_workers=4,
        #         embed_model=embed_model,
        #     ),
        #     embed_model,
        # ],
        # transformations=[
        #   TokenTextSplitter(chunk_size=512, chunk_overlap=50),
        #   embed_model,
        # ],
    )

    await pipeline.arun(documents=document)

    # Instanciation de l'Index de la Vector Database
    index = VectorStoreIndex.from_documents(documents=document)

    # Récupération (retournera les 3 meilleurs résultats - avec l'algo ANN)
    retriever = VectorIndexRetriever(index=index, similarity_top_k=3)
    query_engine = RetrieverQueryEngine(retriever=retriever)

    # Prompt template
    qa_prompt_tmpl_str = """\
      Context information is below.
      ---------------------
      {{ context_str }}
      ---------------------
      Given the context information and not prior knowledge, answer the query.
      Query: {{ query_str }}
      Answer: \
    """

    prompt_tmpl = RichPromptTemplate(qa_prompt_tmpl_str)

    system_prompt = """
      Tu es un expert en lecture et synthèse de documents professionnels. Tu vas recevoir un texte extrait d'un document PDF.
      Ce texte peut contenir plusieurs chapitres, sections ou parties, et potentiellement être dense ou long. Pour cela :

      1. Identifie les grandes parties ou chapitres du document (tu peux te baser sur les titres ou les changements de thématique).
      2. Pour chaque partie, rédige un **court résumé de 3 lignes maximum**, avec des phrases complètes.
      3. Et ajoutes pour chaque partie éventuellement quelque bullets points très court.
      4. Utilise un style **professionnel, clair et accessible**, sans jargon inutile.
      5. N'invente rien. Si une partie est floue, résume ce qui est dit sans extrapoler.
      6. Ta réponse complète ne doit pas dépasser 3000 caractères, sauf si vraiment nécessaire pour bien restituer toutes les sections.
      7. Si le document n'a pas de structure claire, regroupe les idées par thématiques logiques.
      8. Et va bien jusqu'au bout du document, traite TOUS LES CHAPITRES ET LES PARTIES.

      UTILISE TOUJOURS le format HTML suivant :

      <strong>Indiques le titre du document</strong><br/><br/>
      <br/><br/>
      <strong>1 - Titre de la première partie</strong><br/>
      Ligne 1 du résumé de la première partie<br/>
      Ligne 2 du résumé de la première partie<br/>
      Ligne 3 du résumé de la première partie<br/><br/>
      - Bullet point de la partie 1<br/>
      - Bullet point de la partie 1<br/>
      - Bullet point de la partie 1<br/><br/>

      <strong>2 - Titre de la deuxième partie</strong><br/>
      Ligne 1 du résumé de la deuxième partie<br/>
      Ligne 2 du résumé de la deuxième partie<br/>
      Ligne 3 du résumé de la deuxième partie<br/>
      - Bullet point de la partie 1<br/>
      - Bullet point de la partie 1<br/>
      - Bullet point de la partie 1<br/><br/>

      <strong>3 - Titre de la troisième partie</strong><br/>
      Ligne 1 du résumé de la troisième partie<br/>
      Ligne 2 du résumé de la troisième partie<br/>
      Ligne 3 du résumé de la troisième partie<br/>
      - Bullet point de la partie 1<br/>
      - Bullet point de la partie 1<br/>
      - Bullet point de la partie 1<br/><br/>
      (...)

      Règles supplémentaires :
      - N'invente rien. Ne comble pas les vides avec des hypothèses.
      - Si le document est désorganisé ou sans structure, regroupe les idées par thème logique.
      - N'oublie pas avant chaque titre de chapitre d'ajouter un double saut de ligne `<br/><br/>`
      - N'oublie pas après chaque titre de chapitre d'ajouter un saut de ligne `<br/>`
      - N'oublie pas chaque bullet point commence par `<br/>-` et se termine par `<br/>`

      IMPORTANT :
      - TA RÉPONSE DOIT ÊTRE ENTIÈREMENT EN FRANÇAIS, MÊME SI LE TEXTE ORIGINAL NE L'EST PAS.
      - Traduis tous les titres, contenus, et bullet points en français dans ta réponse finale.
      - Respecte toujours le format HTML précisé ci-dessous.
    """

    fmt_prompt = prompt_tmpl.format(
        context_str=system_prompt, query_str=user_prompt
    )

    # Query de l'Index
    response = await query_engine.aquery(fmt_prompt)

    print(response)

    wave_data = await speechify_wave(content)

    try:
        response_text = str(response)
        formatted_text_response = response_text.replace(".-", ".\n-")
        response_data = {
            "text": formatted_text_response,
            "wave": wave_data
        }
        yield json.dumps(response_data).encode()

    except Exception as e:
        error_message = str(e)
        yield error_message.encode()

@app.post("/")
async def analyze_cv(file: UploadFile = File(...), user_prompt: str = Form(...)):
    try:
        file_content = await file.read()
        file_name = re.sub(r'[^A-Za-z0-9]+', '-', file.filename).lower()[:45]

        return StreamingResponse(
            process_documents(file_name, file_content, user_prompt),
            media_type="application/json"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)