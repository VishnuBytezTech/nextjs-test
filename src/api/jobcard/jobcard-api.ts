import axios, { AxiosResponse } from "axios";
import { access } from "fs";

interface Jobcard {
    client: string;
    description: string;
    commodity: string;
    job_type: string;
    clientRef: string;
    startDate: Date;
    endDate: Date;
    address: string;
    city: string;
    country: string;
  }
interface JobCardResponse {
    count:number;
    next: string | null;
    previous: string | null;
    results: Jobcard[]
}

interface JobCardDetails {
    id: string | null;
    internal_ref: string | null;
    description: string | null;
    job_card_status: string | null;
    commodity: {
        id: string | null;
        name: string | null;
    } | null;
    job_type: {
        id: string | null;
        name: string | null;
    } | null;
    client: {
        id: string | null;
        name: string | null;
        email: string | null;
        phone: number | null;
        country: {
            id: string | null;
            iso: string | null;
            name: string | null;
        } | null;
    } | null;
    client_ref: string | null;
    start_date: Date | null;
    end_date: Date | null;
    address: string | null;
    city: string | null;
    country: {
        id: string | null;
        iso: string | null;
        name: string | null;
    } | null;
    supervisor: string | null;
    prep_lab_user: string | null;
    lab_user: string | null;
    user_created: string | null;
    user_modified: string | null;
    prep_lab_requirements: [] | null;
    lab_requirements: [] | null;
    comments: [] | null;
}
const BaseApi: string = process.env.NEXT_PUBLIC_API_URL || '';


const apiUrl: string = `${BaseApi}jobcards/jobcard/`;

export const fetchJobCardDetailsApi = async (accessToken: string, jobId: string): Promise<JobCardDetails> => {
    console.log("jtoken from jobcard detail api  >>>>>>>>>::", accessToken)
    try {
        const response: AxiosResponse<JobCardDetails> = await axios.get(`${apiUrl}${jobId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log('Job card details fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching job card details:', error);
        throw new Error('Failed to fetch job card details');
    }
};



export const createJobcardApi = async (accessToken: string, newJobcard: Jobcard): Promise<Jobcard> => {
    console.log("jobcard data from create jobcard api ::::::::::", newJobcard)
    console.log("jobcard data from create jobcard api ::::::::::", newJobcard)
    console.log("jobcard data from create jobcard api ::::::::::", newJobcard)
    console.log("jobcard data from create jobcard api ::::::::::", newJobcard)
    console.log("jobcard data from create jobcard api ::::::::::", newJobcard)
    try {

        const response: AxiosResponse<Jobcard> = await axios.post(apiUrl, newJobcard, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("REsponse from backend :::::::::::::::::::::::::::::::::::")
        console.log("REsponse from backend :::::::::::::::::::::::::::::::::::")
        console.log("Response from backend ::::::::::::::::::::", response)
        console.log("REsponse from backend :::::::::::::::::::::::::::::::::::")
        console.log("REsponse from backend :::::::::::::::::::::::::::::::::::")
        return response.data;
    } catch (error) {
        console.error('Error creating jobcard:', error);
        throw new Error('Failed to create jobcard');
    }
};

export const fetchJobcardsApi = async (accessToken: string, limit:number, offset:number): Promise<JobCardResponse> => {
    try {
        const response: AxiosResponse<JobCardResponse> = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                limit,
                offset
            }
        });
        console.log('Jobcards fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching jobcards:', error);
        throw new Error('Failed to fetch jobcards');
    }
};



