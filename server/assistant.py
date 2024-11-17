import json
from llm_setup import create_chain
from langchain.chains import LLMChain
import prompts
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class WatsonXAssistant:
    def __init__(self):
        self.query_chain = create_chain(prompts.query_template)
        self.document_chain = create_chain(prompts.document_template)
        self.impact_chain = create_chain(prompts.impact_template)
        self.wbs_chain = create_chain(prompts.wbs_template)
        self.meeting_chain = create_chain(prompts.meeting_template)
        self.scope_chain = create_chain(prompts.scope_template)

    def process_query(self, query):
        try:
            logger.info(f"Processing query: {query}")
            return self.query_chain.run(query=query)
        except Exception as e:
            logger.error(f"Error processing query: {str(e)}")
            raise

    def generate_document(self, doc_type, project_details):
        try:
            logger.info(f"Generating document: {doc_type}")
            return self.document_chain.run(doc_type=doc_type, project_details=json.dumps(project_details))
        except Exception as e:
            logger.error(f"Error generating document: {str(e)}")
            raise

    def analyze_impact(self, current_state, proposed_changes):
        try:
            logger.info("Analyzing impact")
            return self.impact_chain.run(current_state=json.dumps(current_state), proposed_changes=json.dumps(proposed_changes))
        except Exception as e:
            logger.error(f"Error analyzing impact: {str(e)}")
            raise

    def generate_wbs(self, project_details):
        try:
            logger.info("Generating WBS")
            return self.wbs_chain.run(project_details=json.dumps(project_details))
        except Exception as e:
            logger.error(f"Error generating WBS: {str(e)}")
            raise

    def simulate_meeting(self, stakeholders, project_goals):
        try:
            logger.info("Simulating stakeholder meeting")
            return self.meeting_chain.run(stakeholders=stakeholders, project_goals=project_goals)
        except Exception as e:
            logger.error(f"Error simulating meeting: {str(e)}")
            raise

    def validate_scope(self, project_scope):
        try:
            logger.info("Validating project scope")
            return self.scope_chain.run(project_scope=json.dumps(project_scope))
        except Exception as e:
            logger.error(f"Error validating scope: {str(e)}")
            raise