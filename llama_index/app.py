import os
import chromadb
import asyncio
import shutil
from dotenv import load_dotenv

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
from llama_index.vector_stores.pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
from langfuse.decorators import observe

load_dotenv()
HUGGINGFACEHUB_API_TOKEN = os.getenv("HF_ACCESS_TOKEN")

if not HUGGINGFACEHUB_API_TOKEN:
    raise ValueError("HF_ACCESS_TOKEN not found in environment variables")

@observe()
async def process_documents():
    # Read documents
    reader = SimpleDirectoryReader(input_dir="llama_index/documents")
    documents = reader.load_data()

    ### Pinecone DB (for production & scaling)
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    index_name = "demo"

    # Supprimer l'index existant s'il existe
    if index_name in pc.list_indexes().names():
        pc.delete_index(index_name)

    # Créer un nouvel index avec la bonne dimension
    pc.create_index(
        name=index_name,
        dimension=384,  # Dimension pour BAAI/bge-small-en-v1.5
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )

    pinecone_index = pc.Index(index_name)

    vector_store = PineconeVectorStore(pinecone_index=pinecone_index)

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
    vector_store = PineconeVectorStore(pinecone_index=pinecone_index)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)

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

    result = await query_engine.aquery(
        """
        Tu es un recruteur de profils tech. Je vais te passer un document, je voudrai que tu me fasses un résumé des expériences contenue pour chaque entreprise, avec un bullet points pour chaque entreprise, et une seule phrase qui décrit l'exéprience.

        Voici un exemple de réponse :
        -SNCF (2018-2021) - À travaillé comme développeur front-end React, pour le développement de la plateforme saas
        -Sewan (2021-2022) - À travaillé comme développeur front-end React, pour le développement de la plateforme saas

        Rappel: je veux les expériences par bullet points pour chaque entreprise (pas une liste de technos hasardeuses). Et vas bien jusqu'au bout du document avant de répondre.
        Listes bien toutes les entreprises. Et pas juste quelqu'unes.
        Et une seule phrase pour chaque entreprise.
        """
    )

    return result

@observe()
async def main():
    try:
        result = await process_documents()
        print(result)
    except Exception as e:
        print(f"Une erreur s'est produite : {str(e)}")

if __name__ == "__main__":
    asyncio.run(main())