import axios from 'axios';

interface ImpactAnalysis {
    current_state: any; // Replace 'any' with specific interface if possible
    proposed_changes: any; // Replace 'any' with specific interface if possible
}

export const analyzeImpact = async (impactAnalysis: ImpactAnalysis) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/analyze-impact", 
            impactAnalysis
        );

        if (response.status === 200) {
            return { 
                status: 200, 
                analysis: response.data.analysis 
            };
        } else {
            return { 
                status: 400, 
                message: "Error analyzing impact" 
            };
        }
    } catch (error) {
        console.error(error);
        return { 
            status: 500, 
            message: "Something went wrong while analyzing impact" 
        };
    }
};