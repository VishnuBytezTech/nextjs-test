// clientApi.ts

import { offset } from "@floating-ui/react";
import axios, { AxiosResponse } from "axios";

interface Client {
    id?:string
    name: string;
    email: string;
    phone: string;
    country: string;
    // country: {
    //     id: string;
    //     iso: string;
    //     name:string;
    // }
}
interface ClientResponse {
    count:number;
    next:string | null;
    previous:string | null;
    results: Client[]
}

const BaseApi: string = process.env.NEXT_PUBLIC_API_URL || '';

const apiUrl: string = `${BaseApi}clients/client/`;

export const fetchClients = async (authToken: string, limit:number, offset:number): Promise<ClientResponse> => {
    console.log("access token form fetch clients api ::", authToken)
    try {
        const response: AxiosResponse<ClientResponse> = await axios.get(apiUrl, {
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
        console.error('Error fetching clients:', error);
        throw new Error('Failed to fetch clients');
    }
};

export const createClientApi = async (accessToken: string, clientData: Client): Promise<Client> =>{
    try{
        console.log("client data from client api :::", clientData)
        console.log("accesstoken  from client api :::", accessToken)
        const response: AxiosResponse<Client> = await axios.post(apiUrl, clientData, {
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
        console.error('Error creating client api file :::', error);
        throw new Error('Failed to create client');
    }
}


