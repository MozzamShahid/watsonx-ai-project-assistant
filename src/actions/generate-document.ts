import axios from 'axios';

interface ProjectDetails {
    // Define project details interface
    // Example fields:
    project_name: string;
    client_name: string;
    // Add other relevant fields
}

export const generateDocument = async (docType: string, projectDetails: ProjectDetails) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/generate-document/${docType}`, 
            projectDetails
        );

        if (response.status === 200) {
            return { 
                status: 200, 
                document: response.data.document 
            };
        } else {
            return { 
                status: 400, 
                message: "Error generating document" 
            };
        }
    } catch (error) {
        console.error(error);
        return { 
            status: 500, 
            message: "Something went wrong while generating document" 
        };
    }
};