import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    WATSONX_API_KEY = os.getenv('WATSONX_API_KEY')
    WATSONX_URL = os.getenv('WATSONX_URL')
    WATSONX_PROJECT_ID = os.getenv('WATSONX_PROJECT_ID')
    MODEL_ID = os.getenv('MODEL_ID', 'ibm/granite-13b-chat-v1')
    MAX_TOKENS = int(os.getenv('MAX_TOKENS', 1000))
    TEMPERATURE = float(os.getenv('TEMPERATURE', 0.7))