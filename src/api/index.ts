import axios from "axios";

//@ts-ignore
const API_URL = import.meta.env.API_URL

export const instance = axios.create({
    baseURL: API_URL
})