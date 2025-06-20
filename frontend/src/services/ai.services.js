import { axiosInstance } from "@/config/axios.instance"

export const aiService = async(prompt) => {
    try {
        const response = await axiosInstance.post('/ai/ai-call' , {
            prompt
        })
        console.log(response.data);
        return response.data.roadmap;
    } catch (error) {
        console.log('error in AI services');
    }
}