import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE==="development"?"http://127.0.0.1:3000/api":"api",
    withCredentials:true,
})