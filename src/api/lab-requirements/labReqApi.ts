import axios, {AxiosResponse} from "axios";
import { error } from "console";

interface LabRequirement {
    id: string;
    name: string;
}

interface LabRequirementResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: LabRequirement[]
}
const BaseApi: string = process.env.NEXT_PUBLIC_API_URL || '';

const apiUrl: string = `${BaseApi}metacontent/lab-requirement/`;

export const fetchLabRequirements = async (authToken: string, limit: number, offset: number): Promise<LabRequirementResponse> =>{
    console.log("access token form fetch lab req api ::", authToken)
    try{
        const response: AxiosResponse<LabRequirementResponse> = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            params: {
                limit,
                offset
            }
        });
        return response.data
    } catch (error) {
        console.error('Error fetching lab requirements:', error);
        throw new Error('Failed to fetch lab requirements');
    }

}

export const createLabRequirementApi = async (accessToken: string, labRequirementData:LabRequirement): Promise<LabRequirement> =>{
    console.log("datas ::access", accessToken)
    console.log("datas ::data", labRequirementData)
    try{
        const response: AxiosResponse<LabRequirement> = await axios.post(apiUrl, labRequirementData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.status === 400) {
            throw new Error('Bad request');
        }
        return response.data;
    } catch (error) {
        console.error('Error creating lab requirement api file :::', error);
        throw new Error('Failed to create lab requirement');
    }
}