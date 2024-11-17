from ibm_watson_machine_learning import APIClient
from config import Config

wml_credentials = {
    "url": Config.WATSONX_URL,
    "apikey": Config.WATSONX_API_KEY
}

client = APIClient(wml_credentials)

def test_ibm_watson():
    model_id = "ibm/granite-13b-chat-v1"
    project_id = Config.WATSONX_PROJECT_ID
    space_id = None
    
    client.set.default_project(project_id)
    if space_id:
        client.set.default_space(space_id)

    model_parameters = {
        "decoding_method": "greedy",
        "max_new_tokens": 50,
        "min_new_tokens": 0,
        "stop_sequences": [],
        "repetition_penalty": 1
    }

    input_text = "Hello, how are you?"

    try:
        response = client.deployments.create_job(
            model_id=model_id,
            inputs=[input_text],
            parameters=model_parameters
        )
        print("Response:", response)
    except Exception as e:
        print("Error:", str(e))

if __name__ == "__main__":
    test_ibm_watson()