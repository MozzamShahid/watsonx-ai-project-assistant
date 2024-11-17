from langchain.prompts import PromptTemplate

query_template = PromptTemplate(
    input_variables=["query"],
    template="Given the project management query: '{query}', provide a detailed response with relevant information and insights."
)

document_template = PromptTemplate(
    input_variables=["doc_type", "project_details"],
    template="Generate a {doc_type} for the following project details: {project_details}"
)

impact_template = PromptTemplate(
    input_variables=["current_state", "proposed_changes"],
    template="""
    Analyze the impact of the following proposed changes to the current project state:
    Current State: {current_state}
    Proposed Changes: {proposed_changes}
    Provide a detailed impact analysis including cost, schedule, resource needs, and potential risks.
    """
)

wbs_template = PromptTemplate(
    input_variables=["project_details"],
    template="Generate a detailed Work Breakdown Structure (WBS) for the following project: {project_details}"
)

meeting_template = PromptTemplate(
    input_variables=["stakeholders", "project_goals"],
    template="""
    Simulate a stakeholder meeting with the following participants: {stakeholders}
    Project Goals: {project_goals}
    Provide a summary of the discussion, key points raised, and action items.
    """
)

scope_template = PromptTemplate(
    input_variables=["project_scope"],
    template="Validate the following project scope and identify potential risks or inconsistencies: {project_scope}"
)