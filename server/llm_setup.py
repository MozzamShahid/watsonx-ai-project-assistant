from langchain.llms import HuggingFaceEndpoint
from langchain.chains import LLMChain
from config import Config
import requests

def get_llm():
    headers = {
        "Authorization": f"Bearer {Config.WATSONX_API_KEY}",
        "Content-Type": "application/json"
    }
    
    def _request_callback(request):
        request.headers.update(headers)
        return request

    return HuggingFaceEndpoint(
        endpoint_url=Config.WATSONX_URL,
        task="text-generation",
        max_new_tokens=Config.MAX_TOKENS,
        temperature=Config.TEMPERATURE,
        model_kwargs={
            "model_id": Config.MODEL_ID,
        },
        client=requests.Session(),
        request_callback=_request_callback,
    )

def create_chain(prompt):
    llm = get_llm()
    return LLMChain(llm=llm, prompt=prompt)