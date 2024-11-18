import axios from 'axios';

interface ProjectDetails {
    stakeholders: string[];
    objectives: string[];
    // Add other relevant fields if needed
}

export const simulateMeeting = async (projectDetails: ProjectDetails) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/simulate-meeting", 
            projectDetails
        );

        if (response.status === 200) {
            return { 
                status: 200, 
                meetingSummary: response.data.meeting_summary 
            };
        } else {
            return { 
                status: 400, 
                message: "Error simulating meeting" 
            };
        }
    } catch (error) {
        console.error(error);
        return { 
            status: 500, 
            message: "Something went wrong while simulating meeting" 
        };
    }
};