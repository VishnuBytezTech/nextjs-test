import axios, {AxiosResponse} from "axios";
import { apiBaseUrl } from "next-auth/client/_utils";

interface User{
    id: string;
    username: string;
    role: string;
    country: string;
    timezone: string;
}

interface UserListResponse{
    count: number;
    next: string | null;
    previous: string | null;
    results: User[]
}

const BaseApi: string = process.env.NEXT_PUBLIC_API_URL || '';

const ApiUrl: string = `${BaseApi}authentication/users/`;

export const fetchUserList = async (authToken: string, limit:number, offset:number): Promise<UserListResponse>=> {
    console.log("Access token frm fetchuser list api :::::", authToken)
    try{
        const response: AxiosResponse<UserListResponse> = await axios.get(ApiUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            params: {
                limit,
                offset
            }
        });
        console.log("return value :::::::", response)
        return response.data;
    } catch (error) {
        console.error('Error fetching user list:', error);
        throw new Error('Failed to fetch user list');
    }
}