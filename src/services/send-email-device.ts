import axios from 'axios';
import { getToken } from './auth';


const apiSet = axios.create({
    baseURL: process.env.REACT_APP_SET_BASE_URL
});

export const confirmDevice = async (id: any) => {
    try {
        return await apiSet.post('/confirmDevice', id)
            .then(({ data }) => {
                console.log(data)
            });
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) return null;
            throw Error(error.response.data.message);
        }
        throw Error(error.message);
    }
};