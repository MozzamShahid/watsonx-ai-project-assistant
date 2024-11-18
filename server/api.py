from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from assistant import WatsonXAssistant
import logging

app = FastAPI()
assistant = WatsonXAssistant()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Query(BaseModel):
    query: str

class ProjectDetails(BaseModel):
    project_name: str
    objectives: list
    features: list
    requirements: list
    business_objectives: list
    stakeholders: list

class ImpactAnalysis(BaseModel):
    current_state: dict
    proposed_changes: dict

class ProjectScope(BaseModel):
    in_scope: list
    out_of_scope: list
    constraints: list

@app.post("/api/query")
async def process_query(query: Query):
    logger.info(f"Received query: {query.query}")
    try:
        response = assistant.process_query(query.query)
        logger.info(f"Generated response: {response}")
        return {"response": response}
    except Exception as e:
        logger.error(f"Error processing query: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/api/generate-document/{doc_type}")
async def generate_document(doc_type: str, project_details: ProjectDetails):
    try:
        document = assistant.generate_document(doc_type, project_details.dict())
        return {"document": document}
    except Exception as e:
        logger.error(f"Error generating document: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/analyze-impact")
async def analyze_impact(impact_analysis: ImpactAnalysis):
    try:
        analysis = assistant.analyze_impact(impact_analysis.current_state, impact_analysis.proposed_changes)
        return {"analysis": analysis}
    except Exception as e:
        logger.error(f"Error analyzing impact: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/generate-wbs")
async def generate_wbs(project_details: ProjectDetails):
    try:
        wbs = assistant.generate_wbs(project_details.dict())
        return {"wbs": wbs}
    except Exception as e:
        logger.error(f"Error generating WBS: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/simulate-meeting")
async def simulate_meeting(project_details: ProjectDetails):
    try:
        meeting_summary = assistant.simulate_meeting(project_details.stakeholders, project_details.objectives)
        return {"meeting_summary": meeting_summary}
    except Exception as e:
        logger.error(f"Error simulating meeting: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/validate-scope")
async def validate_scope(project_scope: ProjectScope):
    try:
        validation = assistant.validate_scope(project_scope.dict())
        return {"validation": validation}
    except Exception as e:
        logger.error(f"Error validating scope: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")