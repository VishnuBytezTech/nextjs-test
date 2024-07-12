import axios, { AxiosResponse } from 'axios';

const BaseApi: string = process.env.NEXT_PUBLIC_API_URL || '';

interface Profile {
    id: string;
    username: string;
    role: string;
    email: string;
    country: string;
    timezone: string;
    bio: string;

}

// Endpoint for User
const userProfileUrl: string = `${BaseApi}authentication/login/`;


export const fetchUserProfileApi = async (authToken:string): Promise<Profile> =>{
    console.log("authtoken form accessToken :::", authToken)
    try{
        const response: AxiosResponse<Profile> = await axios.get(userProfileUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching User profile:', error);
        throw new Error('Failed to fetch UserProfile');
    }
}