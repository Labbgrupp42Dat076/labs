import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL as string;

const axiosInstance = axios.create({
    baseURL: apiUrl || 'http://localhost:8080',
    timeout: 10000, // Request timeout in milliseconds
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;