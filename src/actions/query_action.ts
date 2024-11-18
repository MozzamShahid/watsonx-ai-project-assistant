import axios from 'axios';

export const getQuery = async(query: string) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/query", { query }
        );

        if (response.status === 200) {
            return { status: 200, data: response.data };
        } else {
            return { status: 400, message: "Error in getting query" };
        }
    } catch (error) {
        console.log(error);
        return { status: 500, message: "Something went wrong" };
    }
};