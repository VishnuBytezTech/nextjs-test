import axios, { AxiosResponse } from 'axios';

interface Commodity {
    id: string,
    name: string
}
interface CommodityResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Commodity[]
}

const BaseApi: string = process.env.NEXT_PUBLIC_API_URL || '';

const apiUrl: string = `${BaseApi}metacontent/commodity/`;


export const fetchCommodityList = async (accessToken: string, limit:number, offset:number): Promise<CommodityResponse> =>{
    try{
        const respose: AxiosResponse<CommodityResponse> = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                limit,
                offset
            }
        });
        console.log("commodity response from api :::", respose)
        return respose.data;
    } catch (error) {
        console.error('Error fetching Commodity api:', error);
        throw new Error('Failed to fetch Commodity list');
    }
}

export const createCommodityApi = async (accessToken: string, commodityData:Commodity): Promise<Commodity> =>{
    try{

        console.log("client data from client api :::", commodityData)
        console.log("accesstoken  from client api :::", accessToken)
        const response: AxiosResponse<Commodity> = await axios.post(apiUrl, commodityData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            }
        })
        if (response.status === 400) {
            throw new Error('Bad request at commodity api');
        }
        return response.data;
    } catch (error) {
        console.error('Error creating commodity api file :::', error);
        throw new Error('Failed to create commodity');
    }

}
