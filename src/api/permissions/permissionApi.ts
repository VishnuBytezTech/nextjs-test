import axios, { AxiosResponse } from "axios";

interface Permission {
    id: number;
    routeName: string;
    pageName: string;
    actions: string;
    status: boolean;
}

// API base URL
const BaseApi: string = process.env.NEXT_PUBLIC_API_URL || '';

// Endpoint for permissions
const apiUrl: string = `${BaseApi}/permissions/permissions`;


function handleError(error: any): never {
    console.error(error);
    throw new Error('An error occurred. Please check the logs for details.');
  }

// Function to fetch permissions
export const getPermissions = async (): Promise<Permission[]> => {
    try {
        const response: AxiosResponse<Permission[]> = await axios.get(apiUrl);
        console.log("response data ::>>>", response.data)
        return response.data;
    } catch (error) {
        // Improve error handling
        console.error('Error fetching permissions:', error);
        throw new Error('Failed to fetch permissions');
    }
};


export const addPermission = async (newPermission: Omit<Permission, 'id'>): Promise<Permission> => {
    try {
        const response: AxiosResponse<Permission> = await axios.post(apiUrl, newPermission);
        return response.data;
    } catch (error) {
        // Improve error handling
        console.error('Error adding permission:', error);
        throw new Error('Failed to add permission');
    }
};


export const getPermissionDetail = async (id: number): Promise<Permission> => {
    try {
      const response = await axios.get<Permission>(`${apiUrl}/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error getting permission detail:', error);
      throw new Error('Failed to fetch permission detail');
    }
  }


export const updatePermission = async (id: number, updatedPermission: Permission): Promise<Permission> => {
    try {
        const response: AxiosResponse<Permission> = await axios.put(`${apiUrl}/${id}/`, updatedPermission);
        return response.data;
    } catch (error) {
        console.error('Error updating permission:', error);
        throw new Error('Failed to update permission');
    }
};