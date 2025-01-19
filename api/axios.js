import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Change this to your backend URL if needed
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // Optional, if your backend uses cookies/sessions
});

export default axiosInstance;
