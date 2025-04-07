import os
import chromadb
import asyncio
from dotenv import load_dotenv

from llama_index.core import download_loader, Document, SimpleDirectoryReader, ServiceContext, VectorStoreIndex, StorageContext
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.ingestion import IngestionPipeline
from llama_index.core.evaluation import FaithfulnessEvaluator
from llama_index.core.tools import QueryEngineTool
from llama_index.embeddings.huggingface_api import HuggingFaceInferenceAPIEmbedding
from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI
from llama_index.tools.google import GmailToolSpec
from llama_index.vector_stores.chroma import ChromaVectorStore

from llama_index.core import SimpleDirectoryReader

load_dotenv()
HUGGINGFACEHUB_API_TOKEN = os.getenv("HF_ACCESS_TOKEN")

# # Very basic example
# llm = HuggingFaceInferenceAPI(
#   model_name="Qwen/Qwen2.5-Coder-32B-Instruct",
#   temperature=0.7,
#   max_tokens=100,
#   token=HUGGINGFACEHUB_API_TOKEN
# )

# result = llm.complete("Hello, how are you?")

# print(result)

async def main():
  # Read documents
  reader = SimpleDirectoryReader(input_dir="llama_index/documents")
  documents = reader.load_data()

  # RAG - Search on the web
  # BeautifulSoupWebReader = download_loader("BeautifulSoupWebReader")
  # loader = BeautifulSoupWebReader()
  # URL = "https://fr.wikipedia.org/wiki/Napoléon_Ier"
  # documents = loader.load_data(urls=[URL])

  # Store in Chroma VectorIndex
  db = chromadb.PersistentClient(path="./alfred_chroma_db")
  chroma_collection = db.get_or_create_collection("alfred")
  vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
  storage_context = StorageContext.from_defaults(vector_store=vector_store)

  # Chucking & storing
  # pipeline = IngestionPipeline(
  #   transformations=[
  #     SentenceSplitter(chunk_size=30, chunk_overlap=0),
  #     HuggingFaceInferenceAPIEmbedding(model_name="BAAI/bge-small-en-v1.5"),
  #   ],
  #   vector_store=vector_store
  # )

  # Retriever
  # retriever = VectorIndexRetriever(
  #   index=index,
  #   similarity_top_k=5
  # )

  # Create index
  # nodes = await pipeline.arun(documents=SimpleDirectoryReader(input_dir="llama_index/documents").load_data())
  # index = VectorStoreIndex(nodes)
  index = VectorStoreIndex.from_documents(documents)
  # model_name="BAAI/bge-small-en-v1.5"
  # embed_model = HuggingFaceInferenceAPIEmbedding(model_name=model_name)
  # index = VectorStoreIndex.from_documents(
  #   documents, storage_context=storage_context, embed_model=embed_model
  # )
  # index = VectorStoreIndex.from_vector_store(
  #   vector_store,
  #   embed_model=embed_model,
  # )

  # Query index
  llm = HuggingFaceInferenceAPI(
    model_name="Qwen/Qwen2.5-Coder-32B-Instruct",
    temperature=0.1,
  )
  query_engine = index.as_query_engine(
    llm=llm,
    # retriever=retriever,
    response_mode="tree_summarize",
    similarity_top_k=3
  )

  result = await query_engine.aquery(
    "Tu es un recruteur expert. Je vais te passer un document, je voudrai que tu me fasse un résumé des exépériences contenu dans ce document, avec des bullets points. Vas bien jusqu'au bout du document avant de répondre."
  )

  # Not mandatory : evaluate also (done here with faithfulness, true or false)
  # evaluator = FaithfulnessEvaluator(llm=llm)
  # eval_result = await evaluator.aevaluate_response(response=result)

  print(result)
  # print(eval_result)

# Lancer main en asynchrone
if __name__ == "__main__":
    asyncio.run(main())