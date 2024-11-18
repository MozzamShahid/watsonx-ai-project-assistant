# Modularized WatsonX AI Project Assistant prototype

## Overview

These files form a modular and manageable structure for the WatsonX AI Project Assistant prototype. This structure separates concerns, making it easier to maintain and extend the application as needed.

## To run this prototype

1. **Install the required dependencies:**:

pip install --upgrade langchain
pip install langchain-community
pip install fastapi uvicorn python-dotenv langchain ibm-watson pydantic

2. **Set Up**:
Set up your `.streamlit/secrets.toml` file with your WatsonX credentials.

3. **Run the Server app**:
uvicorn api:app --reload

## This modular structure allows for easier testing, debugging, and extension of the prototype. Each component can be developed and modified independently, making it more suitable for a rapidly evolving prototype
