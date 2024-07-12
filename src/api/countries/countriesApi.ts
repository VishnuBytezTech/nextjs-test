import axios, { AxiosResponse } from 'axios';

interface Country {

    id : string;
    iso : string;
    name: string;
}

interface CountryResponse {
    count:number;
    next:string | null;
    previous:string | null;
    results: Country[]
}

const BaseApi: string = process.env.NEXT_PUBLIC_API_URL || '';

const apiUrl: string = `${BaseApi}metacontent/country/`;

export const fetchCoutries = async (): Promise<CountryResponse> =>{
    try{
        const response: AxiosResponse<CountryResponse> = await axios.get(apiUrl);
        return response.data;

    } catch (error) {
        console.error('Error fetching on country api:', error);
        throw new Error('Failed to fetch clients');
    }
}
