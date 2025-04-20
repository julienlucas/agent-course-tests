import aiohttp
import os
import asyncio

async def speechify_wave(content: str) -> str:
    """
    Génère un data audio wave avec l'API Speechify
    """
    try:
        SPEECHIFY_API_KEY = os.getenv("SPEECHIFY_API_KEY")
        AUTH_TOKEN_URL = "https://api.sws.speechify.com/v1/auth/token"
        SPEECH_GEN_URL = "https://api.sws.speechify.com/v1/audio/speech"

        cleaned_content = str(content).replace('<br/>', '\n').replace('<strong>', '').replace('</strong>', '')

        async with aiohttp.ClientSession() as session:
            # Authentification
            auth_headers = {
                "Authorization": f"Bearer {SPEECHIFY_API_KEY}",
                "Content-Type": "application/x-www-form-urlencoded"
            }
            auth_data = "grant_type=client_credentials&scope=audio:speech"

            async with session.post(AUTH_TOKEN_URL, headers=auth_headers, data=auth_data) as auth_response:
                auth_json = await auth_response.json()

                access_token = auth_json.get("access_token")
                print(access_token)

            # Génération de l'audio
            speech_headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            }
            payload = {
                "input": f"Cher compatriote, {cleaned_content} Vive la République et Vive la France.",
                "voice_id": "3448f188-b84b-4242-a905-d6e0a203b941", # Voice ID de la voix clonée
                "language": "fr-FR",
                "model": "simba-multilingual",
                "options": {
                    "text_normalization": True,
                    "loudness_normalization": False
                }
            }

            # Deuxième requête pour la génération audio
            async with session.post(SPEECH_GEN_URL, headers=speech_headers, json=payload) as speech_response:
                response_data = await speech_response.json()

                print(response_data)

                return response_data.get("audio_data")

    except Exception as e:
        print(str(e))
        return None

if __name__ == "__main__":
    asyncio.run(speechify_wave())
