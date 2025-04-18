import requests
import os
import time
# from speechify import Speechify

def speechify_wave(content: str) -> str:
    """
    Generate an voice wave with Speechify with the text content
    """
    SPEECHIFY_API_KEY = os.getenv("SPEECHIFY_API_KEY")

    url_auth = "https://api.sws.speechify.com/v1/auth/token"
    headers = {
        "Authorization": f"Bearer {SPEECHIFY_API_KEY}",
        "Content-Type": "application/x-www-form-urlencoded",
    }
    data = "grant_type=client_credentials&scope=audio:speech"

    response = requests.post(url_auth, headers=headers, data=data)
    response_json = response.json()
    ACCESS_TOKEN = response_json.get("access_token")

    time.sleep(2)

    response_text = str(content)
    cleaned_content = response_text.replace('<br/>', '\n').replace('<strong>', '').replace('</strong>', '')

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

    response_wave = requests.post(url_stream, headers=headers2, json=payload)
    response_json = response_wave.json()

    WAVE_DATA = response_json.get("audio_data")

    return WAVE_DATA

# import aiohttp
# import os
# from typing import Optional

# async def speechify_wave(content: str) -> Optional[str]:
#     """
#     Génère un fichier audio à partir du texte en utilisant l'API Speechify
#     """

#     try:
#         SPEECHIFY_API_KEY = os.getenv("SPEECHIFY_API_KEY")

#         async with aiohttp.ClientSession() as session:
#             # Authentification
#             auth_url = "https://api.sws.speechify.com/v1/auth/token"
#             auth_headers = {
#                 "Authorization": f"Bearer {SPEECHIFY_API_KEY}",
#                 "Content-Type": "application/x-www-form-urlencoded"
#             }
#             auth_data = "grant_type=client_credentials&scope=audio:speech"

#             async with session.post(auth_url, headers=auth_headers, data=auth_data) as auth_response:
#                 auth_data = await auth_response
#                 # access_token = auth_data.get("access_token")

#                 print(auth_data)
#                 # return access_token


#             # # Nettoyage du texte
#             # cleaned_content = content.replace('<br/>', '\n').replace('<strong>', '').replace('</strong>', '')

#             # # Génération de l'audio
#             # speech_url = "https://api.sws.speechify.com/v1/audio/speech"
#             # speech_headers = {
#             #     "Authorization": f"Bearer {access_token}",
#             #     "Content-Type": "application/json"
#             # }
#             # payload = {
#             #     "input": f"Cher compatriote, {cleaned_content} Vive la République et Vive la France.",
#             #     "voice_id": "3448f188-b84b-4242-a905-d6e0a203b941",
#             #     "language": "fr-FR",
#             #     "model": "simba-multilingual",
#             #     "options": {
#             #         "text_normalization": True,
#             #         "loudness_normalization": False
#             #     }
#             # }

#             # async with session.post(speech_url, headers=speech_headers, json=payload) as speech_response:
#             #     response_data = await speech_response.json()
#             #     return response_data.get("audio_data")

#     except Exception as e:
#         print(str(e))
#         return