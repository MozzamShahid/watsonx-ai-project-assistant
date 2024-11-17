from config import Config
import requests

def test_connection():
    headers = {
        "Authorization": f"Bearer {Config.WATSONX_API_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "inputs": "Hello, how are you?",
        "parameters": {
            "max_new_tokens": 50,
            "temperature": 0.7
        }
    }
    
    response = requests.post(Config.WATSONX_URL, headers=headers, json=data)
    
    if response.status_code == 200:
        print("Connection successful!")
        print(response.json())
    else:
        print(f"Connection failed with status code: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    test_connection()