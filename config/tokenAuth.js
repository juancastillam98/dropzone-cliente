import {clienteAxios} from "./axios";
export const tokenAuth = (token)=>{
    if (token){
        //hay que enviar el token a través del header
        clienteAxios.defaults.headers.common["Authorization"]=`Bearer ${token}`;
    }else {
        //si no le pasamos nada, nos aseguramos de que no lo tenga
        delete clienteAxios.defaults.headers.common["Authorization"]
    }
}