import os
import requests
from dotenv import load_dotenv

load_dotenv()

def speechify_wave(text: str) -> str:
    """
    Génère de l'audio à partir du texte en utilisant l'API Speechify.

    Args:
        text (str): Le texte à convertir en audio

    Returns:
        str: L'URL de l'audio généré
    """
    try:
        api_key = os.getenv("SPEECHIFY_API_KEY")
        if not api_key:
            raise ValueError("La clé API Speechify n'est pas définie dans les variables d'environnement")

        url = "https://api.speechify.com/v1/text-to-speech"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "text": text,
            "voice": "fr-FR-Standard-A",
            "audioFormat": "mp3"
        }

        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()

        return response.json().get("audioUrl", "")
    except Exception as e:
        print(f"Erreur lors de la génération de l'audio: {str(e)}")
        return ""