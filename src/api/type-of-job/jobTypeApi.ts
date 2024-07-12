// clientApi.ts

import axios, { AxiosResponse } from "axios";

interface JobType {
    id: string;
    name: string;

}

interface JobTypeResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: JobType[]
}

const BaseApi: string = process.env.NEXT_PUBLIC_API_URL || '';

const apiUrl: string = `${BaseApi}metacontent/job-type/`;

export const fetchJobType = async (authToken: string, limit:number, offset:number): Promise<JobTypeResponse> => {
    try {
        const response: AxiosResponse<JobTypeResponse> = await axios.get(apiUrl, {
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
        console.error('Error fetching job types:', error);
        throw new Error('Failed to fetch jobtypes');
    }
};

export const createJobTypeApi = async (accessToken: string, jobTypeData: JobType): Promise<JobType> =>{
    try{
        console.log("jobtype data from jobtype api :::", jobTypeData)
        console.log("accesstoken  from jobtype api :::", accessToken)  
        
        const response: AxiosResponse<JobType> = await axios.post(apiUrl, jobTypeData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.status === 400) {
            throw new Error('Bad request');
        }else{
            return response.data;
        }
    } catch (error) {
        console.error('Error creating jobtype api file :::', error);
        throw new Error('Failed to create jobtype');
    }
}
