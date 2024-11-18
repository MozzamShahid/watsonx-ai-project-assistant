import axios from 'axios';

interface ProjectScope {
    // Define project scope interface
    project_name: string;
    project_objectives: string[];
    scope_description: string;
    // Add other relevant fields
}

export const validateScope = async (projectScope: ProjectScope) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/validate-scope", 
            projectScope
        );

        if (response.status === 200) {
            return { 
                status: 200, 
                validation: response.data.validation 
            };
        } else {
            return { 
                status: 400, 
                message: "Error validating project scope" 
            };
        }
    } catch (error) {
        console.error(error);
        return { 
            status: 500, 
            message: "Something went wrong while validating project scope" 
        };
    }
};