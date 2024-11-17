from langchain import LLMChain
from langchain.llms import IBMWatsonX
from config import Config

def get_llm():
    return IBMWatsonX(
        model_id=Config.MODEL_ID,
        credentials={
            "apikey": Config.WATSONX_API_KEY,
            "url": Config.WATSONX_URL
        },
        project_id=Config.WATSONX_PROJECT_ID,
        max_tokens=Config.MAX_TOKENS,
        temperature=Config.TEMPERATURE
    )

def create_chain(prompt):
    llm = get_llm()
    return LLMChain(llm=llm, prompt=prompt)