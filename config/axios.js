import axios from "axios";
export const clienteAxios = axios.create({

    baseURL: process.env.NEXT_PUBLIC_backendURL,

})