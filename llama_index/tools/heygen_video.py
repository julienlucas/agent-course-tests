import requests
import os

def heygen_video(content: str, title: str) -> str:
    """
    Generate an HeyGen lipsync video with the text content
    """

    HEYGEN_API_KEY = os.getenv("HEYGEN_API_KEY")
    TEMPLATE_ID = "40ffb0c7e3ba4c6e91e1a4794cad45c6"
    FOLDER_ID= "ebd4c8e7a4354c39a6fef3a584e9e66a"

    url = f"https://api.heygen.com/v2/template/{TEMPLATE_ID}/generate"

    response_text = str(content)
    cleaned_content = response_text.replace('<br/>', '\n').replace('<strong>', '').replace('</strong>', '')

    payload = {
        "caption": False,
        "title": title,
        "dimension": {
          "width": 1280,
          "height": 720
        },
        "include_gif": False,
        "enable_sharing": False,
        "folder_id": FOLDER_ID,
        "variables": {
          "text_content": {
            "name": "text_content",
            "type": "text",
            "properties": {
              "content": cleaned_content
            }
          },
          "avatar": {
            "name": "avatar",
            "type": "character",
            "properties": {
              "character_id": "649393cbdb2e4d1fab8c1c9bdc046ddb",
              "type": "talking_photo"
            }
          },
          "voice": {
            "name": "voice",
            "type": "voice",
            "properties": {
              "voice_id": "495ef4d771874ce9b5fe37fcb9dd73c2"
          }
        }
      }
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "x-api-key": HEYGEN_API_KEY
    }

    response = requests.post(url, json=payload, headers=headers)

    return response.text