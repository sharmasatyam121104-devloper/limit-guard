import axios from 'axios'

const API_URL = import.meta.env.VITE_SERVER_URL;

const httpRequest = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export default httpRequest