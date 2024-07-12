import axios from "axios";


const BaseApi: string = process.env.NEXT_PUBLIC_API_URL || '';

const apiUrl: string = `${BaseApi}authentication/send-user-invitation/`;

export const sendUserInvitation = async (authToken: string, email: string, role:string ) =>{
    console.log("Authtoken :::::", authToken)
    console.log("email :::::::::", email)
    console.log("email role :::::::::", role)
    try{
        const response = await axios.post(apiUrl, {email, role}, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        return response

    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }

}
