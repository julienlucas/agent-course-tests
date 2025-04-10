import os
# import chromadb
import requests
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


import fitz  # PyMuPDF
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
async def process_documents(content):
    # Lecture des documents dans répertoire
    # reader = SimpleDirectoryReader(input_dir="documents")
    # documents = reader.load_data()

    # From URL
    # response = requests.get('https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt')
    # text = response.text
    # documents = [Document(text=text)]

    pdf = fitz.open(stream=content, filetype="pdf")

    all_text = ""
    for page in pdf:
        all_text += page.get_text()

    document = [Document(text=all_text)]

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

        content = await file.read()

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



## LANGCHAIN NOT WORKING TEST
# import os
# # import chromadb
# from pydantic import BaseModel
# from typing import List, Union
# from dotenv import load_dotenv
# from fastapi import FastAPI, File, UploadFile, Form
# from fastapi.responses import StreamingResponse
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.exceptions import HTTPException

# from llama_index.core import (
#     SimpleDirectoryReader,
#     VectorStoreIndex,
#     StorageContext,
#     Document
# )
# from llama_index.core.node_parser import MarkdownElementNodeParser, SentenceSplitter, SemanticSplitterNodeParser
# from llama_index.core.settings import Settings
# from llama_index.core.ingestion import IngestionPipeline
# from llama_index.core.query_engine import RetrieverQueryEngine
# from llama_index.core.retrievers import VectorIndexRetriever
# from llama_index.embeddings.openai import OpenAIEmbedding
# from llama_index.embeddings.huggingface_api import HuggingFaceInferenceAPIEmbedding
# from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI
# from llama_index.vector_stores.pinecone import PineconeVectorStore

# # from langchain_pinecone import PineconeVectorStore
# # from langchain_openai import OpenAIEmbeddings
# # from langchain_pinecone import PineconeVectorStore
# # from langchain_openai import OpenAIEmbeddings
# # from langchain_community.document_loaders import TextLoader
# # from langchain_text_splitters import CharacterTextSplitter, RecursiveCharacterTextSplitter
# # from langchain_core.runnables import RunnableParallel, RunnablePassthrough
# # from langchain_community.document_loaders import PyPDFLoader
# # from langchain_openai import ChatOpenAI
# # from langchain.chains import RetrievalQA
# # from langchain_huggingface import HuggingFacePipeline, ChatHuggingFace, HuggingFaceEndpoint
# # from langchain.llms import HuggingFaceHub
# # from langchain.prompts import PromptTemplate

# from pinecone import Pinecone, ServerlessSpec
# from langfuse.decorators import observe

# from llama_index.tools.clean_up_text import clean_up_text

# load_dotenv()
# HUGGINGFACEHUB_API_TOKEN = os.getenv("HF_ACCESS_TOKEN")
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# LLAMA_CLOUD_API_KEY = os.getenv("LLAMA_CLOUD_API_KEY")
# app = FastAPI()

# # Configuration CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Autoriser spécifiquement le frontend
#     allow_credentials=True,
#     allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
#     allow_headers=["*"],
# )

# @observe()
# async def process_documents():
#     # Lecture des documents
#     reader = SimpleDirectoryReader(input_dir="documents")
#     documents = reader.load_data()

#     # loader = PyPDFLoader("./documents/THE_ULTIMATE_PLAYBOOK.pdf")
#     # document = loader.load()

#     # text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
#     # docs = text_splitter.split_documents(document)

#     # Base de données Pinecone (pour la production et le scalage)
#     pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
#     index_name = "demo"
#     existing_indexes = [i.get('name') for i in pc.list_indexes()]

#     # Appel la fonction clean_up_text
#     # cleaned_docs = []
#     # for d in documents:
#     #     cleaned_text = clean_up_text(d.text)
#     #     # Créer un nouveau document avec le texte nettoyé
#     #     new_doc = type(d)(text=cleaned_text)
#     #     cleaned_docs.append(new_doc)

#     # # Inspect output
#     # cleaned_docs[0].get_content()

#     # Créer un nouvel index sur Pinecone s'il n'existe pas
#     if index_name not in existing_indexes:
#       pc.create_index(
#           index_name,
#           dimension=1536,
#           metric="cosine",
#           spec=ServerlessSpec(
#               cloud="aws",
#               region="us-east-1"
#           )
#       )

#     pinecone_index = pc.Index(index_name)
#     vector_store = PineconeVectorStore(pinecone_index=pinecone_index)
#     storage_context = StorageContext.from_defaults(vector_store=vector_store)

#     # embeddings = OpenAIEmbeddings()

#     # vectorstore = PineconeVectorStore(index_name=index_name, embedding=embeddings, namespace="default")
#     # vectorstore_from_docs = PineconeVectorStore.from_documents(
#         # docs,
#         # index_name=index_name,
#         # embedding=embeddings,
#         # namespace="default"
#     # )

#     # vectorstore_from_docs.add_documents(docs, namespace="default")

#     # llm = HuggingFaceHub(
#     #     repo_id="declare-lab/flan-alpaca-large",
#     #     # repo_id="google/flan-t5-large",
#     #     model_kwargs={"temperature": 0.2, "max_length": 512},
#     #     huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
#     # )

#     # rqa_prompt_template = """Use the following pieces of context to answer the question at the end.
#     # Answer only from the context. If you do not know the answer, say you do not know.
#     # {context}
#     # Explain in detail.
#     # Question: {question}
#     # """
#     # RQA_PROMPT = PromptTemplate(
#     #     template=rqa_prompt_template, input_variables=["context", "question"]
#     # )

#     # qa = RetrievalQA.from_chain_type(
#     #     llm,
#     #     chain_type="stuff",
#     #     retriever=vectorstore.as_retriever(),
#     #     # chain_type_kwargs={"prompt": RQA_PROMPT},
#     #     # return_source_documents=True,
#     #     # verbose=False,
#     # )
#     # result = qa.invoke(query)

#     # print(result)

#     # llm = ChatOpenAI(
#     #     openai_api_key=OPENAI_API_KEY,
#     #     model_name='gpt-3.5-turbo',
#     #     temperature=0.85,
#     #     max_tokens=1000
#     # )

#     # llm = HuggingFaceHub(
#     #     # repo_id="declare-lab/flan-alpaca-large",
#     #     repo_id="google/pegasus-xsum",
#     #     task="summarization",
#     #     model_kwargs={"temperature": 0.2, "max_length": 512},
#     #     huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
#     # )

#     # qa = RetrievalQA.from_chain_type(
#     #     llm=llm,
#     #     chain_type="stuff",
#     #     retriever=vectorstore.as_retriever()
#     # )
#     # response = qa.invoke(query)


#     # Pipeline de chucking connecté à Pinecone
#     embed_model = OpenAIEmbedding(api_key=OPENAI_API_KEY)
#     # node_parser = MarkdownElementNodeParser(embed_model, num_workers=4)
#     # nodes = node_parser.get_nodes_from_documents(documents=[documents[0]])
#     # base_nodes, objects = node_parser.get_nodes_and_objects(nodes)

#     # pipeline = IngestionPipeline(
#     #     transformations=[
#     #         MarkdownElementNodeParser(
#     #             num_workers=4,
#     #             embed_model=embed_model,
#     #         ),
#     #         embed_model,
#     #     ],
#     #     vector_store=vector_store
#     # )

#     pipeline = IngestionPipeline(
#         transformations=[
#             SemanticSplitterNodeParser(
#                 buffer_size=1,
#                 breakpoint_percentile_threshold=95,
#                 embed_model=embed_model,
#             ),
#             embed_model,
#         ],
#         vector_store=vector_store
#     )

#     await pipeline.arun(documents=documents)

#     # Création de l'Index
#     index = VectorStoreIndex.from_vector_store(vector_store=vector_store)

#     # Utilisation du retriever (retourne les 5 meilleurs résultats de l'index)
#     retriever = VectorIndexRetriever(index=index, similarity_top_k=5)
#     query_engine = RetrieverQueryEngine(retriever=retriever)

#     # Query de l'Index
#     response = await query_engine.aquery(
#       """
#         Tu es un expert en analyse de documents. Je vais te passer un document, qui peut être plus ou moins de taille conséquente.
#         J'aimerai que tu me fasses un résumé de ce document, en maximum 1000 mots.
#         get_weather : Obtenir la météo actuelle pour un lieu donné

#         La manière d'utiliser ces outils consiste à spécifier un objet JSON.

#         UTILISE TOUJOURS le format suivant :

#         Titre du document : ici indiques le titre du document

#         Voici un exemple de réponse :
#         Titre du document

#         1 - Titre de la partie 1
#         Les relations entre les entreprises et les clients
#         - Bullets points de la partie 1

#         2 - Le potentiel de la plateforme saas
#         - Bullets points de la partie 2

#         3 - L'idéal pour la plateforme saas
#         - Bullets points de la partie 3

#         4 - L'orientation de la plateforme saas
#         - Bullets points de la partie 4

#         5 - Chercher un moyen de mettre en avant la plateforme saas
#         - Bullets points de la partie 5

#         6 - Les clients de la plateforme saas
#         - Bullets points de la partie 6

#         7 - Conclusion et perspectives
#         - Bullets points de la partie 7
#         ...

#         # Fin de l'exemple.

#         Commence maintenant ! Rappel: attention à bien aller jusqu'au bout du document quand tu l'analyse et le résume.
#         Prends bien ton temps.
#       """
#     )

#     # def format_api_response(api_response):
#     #   """Formate la réponse de l'API en texte lisible"""
#     #   query = api_response['query'].strip()
#     #   result = api_response['result'].strip()

#     #   formatted_text = f"Question :\n{query}\n\nRéponse :\n{result}"
#     #   return formatted_text

#     # print(format_api_response(response))

#     response_text = str(response)
#     formatted_response = response_text.replace(".-", ".\n-")

#     yield formatted_response.encode()

# @app.post("/")
# # async def analyze_cv(file: UploadFile = File(...)):
# async def analyze_cv():
#            return StreamingResponse(
#             process_documents(),
#             media_type="text/plain"
#         )
#     # try:
#     #     if not file.filename.endswith('.pdf'):
#     #         raise HTTPException(
#     #             status_code=400,
#     #             detail="Le fichier doit être au format PDF"
#     #         )

#     #     # Lire le contenu du fichier
#     #     content = file

#     #     # Traiter le document
#     #     return StreamingResponse(
#     #         process_documents(content),
#     #         media_type="text/plain"
#     #     )

#     # except Exception as e:
#     #     raise HTTPException(
#     #         status_code=500,
#     #         detail=str(e)
#     #     )

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)