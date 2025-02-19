import axios from './axios'
import { AxiosError } from 'axios'

export const getLaunches = async () => {
    try {
        const response = await axios.get(`/launches`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Extract error details from AxiosError
            const errorMessage = error.response?.data?.message || 'An error occurred';
            const statusCode = error.response?.status || 500;
            console.error(`error with status ${statusCode}:`, errorMessage);
            throw new Error(`Error ${statusCode}: ${errorMessage}`);
        } else {
            // Handle any unknown errors
            throw new Error('Unknown error occurred');
        }
    }
};

export const getLaunchesDetails = async (id:string) => {
    try {
        const response = await axios.get(`/launches/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Extract error details from AxiosError
            const errorMessage = error.response?.data?.message || 'An error occurred';
            const statusCode = error.response?.status || 500;
            console.error(`error with status ${statusCode}:`, errorMessage);
            throw new Error(`Error ${statusCode}: ${errorMessage}`);
        } else {
            // Handle any unknown errors
            throw new Error('Unknown error occurred');
        }
    }
};

export const getRocketDetails = async (id:string) => {
    try {
        const response = await axios.get(`/rockets/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Extract error details from AxiosError
            const errorMessage = error.response?.data?.message || 'An error occurred';
            const statusCode = error.response?.status || 500;
            console.error(`error with status ${statusCode}:`, errorMessage);
            throw new Error(`Error ${statusCode}: ${errorMessage}`);
        } else {
            // Handle any unknown errors
            throw new Error('Unknown error occurred');
        }
    }
};