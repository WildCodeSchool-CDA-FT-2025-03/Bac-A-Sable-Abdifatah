import axios from "axios";

const client = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    // baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export { client };