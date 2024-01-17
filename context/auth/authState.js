"use client"
import {useReducer} from "react";
import {useRouter} from "next/navigation";
import {AuthContext} from "./authContext";
import authReducer from "./authReducer";
import {clienteAxios} from "../../config/axios";
import {tokenAuth} from "../../config/tokenAuth";

import {USUARIO_AUTENTICADO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    INICIO_SESION_EXITOSO,
    INICIO_SESION_ERROR,
    CERRAR_SESION} from "../../types";


export default function AuthState({children}){

    const router = useRouter();
    //Definir el state inicial
    const initialState = {
        token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
        autenticado: false,//hasta que el user no rellene el usuario no cambiará a true,
        usuario: null,
        mensaje: null
    }
    //definir el reducer. Toma 2 params, 1 la función reducer, 2º el state a utilizar
    const [state, dispatch]=useReducer(authReducer, initialState)

    //Registrar usuario
    const registrarUsuario= async datos =>{
        try {
            const response = await clienteAxios.post("/api/usuarios", datos)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: response.data.msg
            })
        }catch (error){
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })

        }finally {
            //Limpiar alerta después de 3 s
            setTimeout(()=>{
                dispatch({
                    type: LIMPIAR_ALERTA,
                })
                router.push("/")
            },3000)
        }
    }

    //Autenticar usuarios (login)
    const iniciarSesion = async datos =>{
        try {
            const response = await clienteAxios.post("/api/auth", datos)
            dispatch({
                type: INICIO_SESION_EXITOSO,
                payload: response.data.token
            })}catch (error){
            dispatch({
                type: INICIO_SESION_ERROR,
                payload: error.response.data.msg
            })
        }finally {
            setTimeout(()=>{
                dispatch({
                    type: LIMPIAR_ALERTA,
                })
            },3000)
        }
    }

    //Obtener el usuario autenticado a partir del token
    const usuarioAutenticado= async() => {
        const token = localStorage.getItem("token");
        if (token) {
            tokenAuth(token)
        }
        try {
            const response = await clienteAxios.get("/api/auth");
            if (response.data.usuario){
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: response.data.usuario
                })
            }

        } catch (error) {
            dispatch({
                type: INICIO_SESION_ERROR,
                payload: error.response.data.msg
            })
        }finally {
            setTimeout(()=>{
                dispatch({
                    type: LIMPIAR_ALERTA,
                })
            },3000)
        }
    }

    //Cerrar la sesión.
    const cerrarSesion =()=> {
        dispatch({
            type: CERRAR_SESION
        })
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                usuarioAutenticado,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}