import axios from 'axios';

interface ProjectDetails {
    // Define project details interface
    // Example fields:
    project_name: string;
    project_scope: string;
    // Add other relevant fields
}

export const generateWBS = async (projectDetails: ProjectDetails) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/generate-wbs", 
            projectDetails
        );

        if (response.status === 200) {
            return { 
                status: 200, 
                wbs: response.data.wbs 
            };
        } else {
            return { 
                status: 400, 
                message: "Error generating WBS" 
            };
        }
    } catch (error) {
        console.error(error);
        return { 
            status: 500, 
            message: "Something went wrong while generating WBS" 
        };
    }
};