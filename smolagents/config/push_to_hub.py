import os
from dotenv import load_dotenv
from huggingface_hub import login

def push_to_hub(tool: str):
  load_dotenv(override=True)
  login(os.getenv("HF_TOKEN"))

  USERNAME = "julienlucas"
  HUGGINGFACEHUB_API_TOKEN = os.getenv("HF_ACCESS_TOKEN")
  tool.push_to_hub(f"{USERNAME}/party_theme_tool", token=HUGGINGFACEHUB_API_TOKEN)
