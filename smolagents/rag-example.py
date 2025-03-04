from smolagents import CodeAgent, HfApiModel, Tool
from config.tracing import setup_tracing

from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.retrievers import BM25Retriever

setup_tracing()

class SolutionRetrieverTool(Tool):
  name = "solution_retriever"
  description = "Utilises la recherche sémantique pour trouver des solutions sur le jeu vidéo baldur's Gate 3 sur jeuxvideo.com."
  inputs = {
    "query": {
      "type": "string",
      "description": "The query to perform. This should be a query related to Baldur's Gate 3.",
    }
  }
  output_type = "string"

  def __init__(self, docs, **kwargs):
    super().__init__(**kwargs)
    self.retriever = BM25Retriever.from_documents(
        docs, k=5  # Retrieve the top 5 documents
    )

  def forward(self, query: str) -> str:
    assert isinstance(query, str), "Your search query must be a string"

    docs = self.retriever.invoke(
      query,
    )
    return "\nRetrieved ideas:\n" + "".join(
      [
        f"\n\n===== Idea {str(i)} =====\n" + doc.page_content
        for i, doc in enumerate(docs)
      ]
    )

# Simulate a knowledge base about party planning
party_ideas = [
  {"text": "Une solution sur le site jeuxvideo.com sur le manuscrit du nécromancien dans Baldur's Gate 3", "source": "Party Ideas 1"},
]

source_docs = [
  Document(page_content=doc["text"], metadata={"source": doc["source"]})
  for doc in party_ideas
]

# Split the documents into smaller chunks for more efficient search
text_splitter = RecursiveCharacterTextSplitter(
  chunk_size=500,
  chunk_overlap=50,
  add_start_index=True,
  strip_whitespace=True,
  separators=["\n\n", "\n", ".", " ", ""],
)
docs_processed = text_splitter.split_documents(source_docs)

# Create the retriever tool
solution_retriever = SolutionRetrieverTool(docs_processed)

# Initialize the agent
agent = CodeAgent(tools=[solution_retriever], model=HfApiModel())

# Example usage
response = agent.run(
  "Quel est le meilleur moyen de résoudre le problème du manuscrit du nécromancien dans Baldur's Gate 3 ?"
)

print(response)