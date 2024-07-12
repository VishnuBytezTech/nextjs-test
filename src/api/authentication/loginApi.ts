import axios from "axios";

const BaseApi: string = process.env.NEXT_PUBLIC_API_URL || '';

// Endpoint for Login
const apiUrl: string = `${BaseApi}authentication/login/`;
const refreshUrl: string = `${BaseApi}authentication/refresh/`;


export const loginApi = async (username: string, password: string) =>{
    console.log("login api is working")
    const response = await axios.post(apiUrl, {username, password})
    console.log("response stauts  >>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<< ::::", response.status)
    console.log("response data ::::", response.data)
    return response.data
}


export const updateToken = async (refreshToken: string) => {
    console.log("refresh token:::", refreshToken);
    const refresh = refreshToken
    try {
        const response = await axios.post(refreshUrl, { refresh }, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);
        return response.data; 
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }
};
