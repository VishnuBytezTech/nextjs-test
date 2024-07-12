import axios, {Axios, AxiosResponse} from 'axios';

interface PrepLabRequirement {
    id?: string;
    name: string;
}

interface PrepLabRequirementResponse {
    count:number;
    next:string | null;
    previous:string | null;
    results: PrepLabRequirement[]
}

const BaseApi: string = process.env.NEXT_PUBLIC_API_URL || '';

const apiUrl: string = `${BaseApi}metacontent/prep-lab-requirement/`;

export const fetchPrepLabReqApi = async (authToken: string, limit: number, offset: number): Promise<PrepLabRequirementResponse> => {
    console.log("access token form fetch clients api ::", authToken)
    try{
        const response: AxiosResponse<PrepLabRequirementResponse> = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            params: {
                limit,
                offset
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Prep lab requirements:', error);
        throw new Error('Failed to fetch prep lab requiements api ');
    }
}

// export const createPrepLabReqApi = async (accessToken: string, PrepLabreqData: PrepLabRequirement): Promis<PrepLabRequirement> =>{
//     try{

//         console.log("Pre lab data from Prep lab req api :::", PrepLabreqData)
//         console.log("accesstoken  from Prep lab req api :::", accessToken)    
//     }
//         const response: AxiosResponse<PrepLabRequirement> = await axios.post(apiUrl, PrepLabreqData, {
            
//         })
//     }
// }

export const createPrepLabReqApi = async (accessToken: string, PrepLabreqData: PrepLabRequirement): Promise<PrepLabRequirement> =>{
    try{
        console.log("Pre lab data from Prep lab req api :::", PrepLabreqData)
        console.log("accesstoken  from Prep lab req api :::", accessToken) 
        const response: AxiosResponse<PrepLabRequirement> = await axios.post(apiUrl, PrepLabreqData, {
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
        console.error('Error creating Prep lab create api file :::', error);
        throw new Error('Failed to create prep lab req');
    }
}