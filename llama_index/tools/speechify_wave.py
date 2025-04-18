import aiohttp
import os

async def speechify_wave(content: str) -> str:
    """
    Generate an voice wave with Speechify with the text content
    """

    SPEECHIFY_API_KEY = os.getenv("SPEECHIFY_API_KEY")

    # Authentification
    url_auth = "https://api.sws.speechify.com/v1/auth/token"
    headers = {
        "Authorization": f"Bearer {SPEECHIFY_API_KEY}",
        "Content-Type": "application/x-www-form-urlencoded",
    }
    data = "grant_type=client_credentials&scope=audio:speech"

    async with aiohttp.ClientSession() as session:
        # Récupération du token
        async with session.post(url_auth, headers=headers, data=data) as response:
            response_json = await response.json()
            ACCESS_TOKEN = response_json.get("access_token")

        # Nettoyage du contenu
        response_text = str(content)
        cleaned_content = response_text.replace('<br/>', '\n').replace('<strong>', '').replace('</strong>', '')

        # Génération de l'audio
        url_stream = "https://api.sws.speechify.com/v1/audio/speech"
        headers2 = {
            "Authorization": f"Bearer {ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        payload = {
            "input": f"Cher compatriote, {cleaned_content} Vive la République et Vive la France.",
            "voice_id": "3448f188-b84b-4242-a905-d6e0a203b941",
            "language": "fr-FR",
            "model": "simba-multilingual",
            "options": {
                "text_normalization": True,
                "loudness_normalization": False
            },
        }

        async with session.post(url_stream, headers=headers2, json=payload) as response:
            response_json = await response.json()
            WAVE_DATA = response_json.get("audio_data")

    return WAVE_DATA