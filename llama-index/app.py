import os
from dotenv import load_dotenv
from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI

import chromadb
from llama_index.core import VectorStoreIndex
from llama_index.core.tools import QueryEngineTool
from llama_index.embeddings.huggingface_api import HuggingFaceInferenceAPIEmbedding
from llama_index.vector_stores.chroma import ChromaVectorStore

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

import chromadb
import asyncio
from llama_index.core import download_loader, Document, SimpleDirectoryReader, ServiceContext
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.ingestion import IngestionPipeline
from llama_index.core.evaluation import FaithfulnessEvaluator
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.embeddings.huggingface_api import HuggingFaceInferenceAPIEmbedding
from llama_index.tools.google import GmailToolSpec

async def main():
  # Read documents
  reader = SimpleDirectoryReader(input_dir="llama-index/documents")
  documents = reader.load_data()

  # RAG - search on documents - Store in Chroma & indexing documents
  db = chromadb.PersistentClient(path="./alfred_chroma_db")
  chroma_collection = db.get_or_create_collection("alfred")
  vector_store = ChromaVectorStore(chroma_collection=chroma_collection)

  # pipeline = IngestionPipeline(
  #   transformations=[
  #     SentenceSplitter(chunk_size=25, chunk_overlap=0),
  #     HuggingFaceInferenceAPIEmbedding(model_name="BAAI/bge-small-en-v1.5"),
  #   ],
  #   vector_store=vector_store,
  # )
  # nodes = await pipeline.arun(documents=[documents])

  # # RAG - Search on the web
  # BeautifulSoupWebReader = download_loader("BeautifulSoupWebReader")
  # loader = BeautifulSoupWebReader()
  # URL = "https://fr.wikipedia.org/wiki/Napoléon_Ier"
  # documents = loader.load_data(urls=[URL])

  # Create index
  # model_name="BAAI/bge-small-en-v1.5"
  # service_context = ServiceContext.from_defaults(llm=model_name)
  # index = VectorStoreIndex.from_documents(documents)
  # query_engine = index.as_query_engine(service_context=service_context)
  embed_model = HuggingFaceInferenceAPIEmbedding(model_name="BAAI/bge-small-en-v1.5")
  index = VectorStoreIndex.from_vector_store(vector_store, embed_model=embed_model)

  # Query index
  llm = HuggingFaceInferenceAPI(model_name="Qwen/Qwen2.5-Coder-32B-Instruct")
  query_engine = index.as_query_engine(
      llm=llm,
      response_mode="tree_summarize",
  )

  result = await query_engine.aquery("What battles took place in Paris during Napoleon's reign?")

  # Not mandatory : evaluate also (done here with faithfulness, true or false)
  evaluator = FaithfulnessEvaluator(llm=llm)
  eval_result = await evaluator.aevaluate_response(response=result)

  print(result)
  # print(eval_result)

# Lancer main en asynchrone
if __name__ == "__main__":
    asyncio.run(main())