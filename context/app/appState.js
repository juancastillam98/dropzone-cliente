"use client"
import {useReducer} from "react";
import appReducer from "./appReducer";
import {AppContext} from "./appContext";
import {
    SUBIR_ARCHIVO_EXITOSO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIENDO_ARCHIVO,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
} from "../../types";
import {clienteAxios} from "@/config/axios";


export default function AppProvider({children}){

    const initialState = {
        mensaje_archivo: "",
        nombre: "",
        nombre_original: "",
        cargando: false,
        descargas: 1,
        password: "",
        autor: null,
        url: ""
    }

    const [state, dispatch]=useReducer(appReducer, initialState)

    //muestra una alerta
    const mostrarAlerta = msg =>{
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        })
        setTimeout(()=>{
            dispatch({
                type: LIMPIAR_ALERTA,
            })
        })
    }

    //Subir archivos al servidor.
    const subirArchivo = async (formData, nombreOriginal) => {
        dispatch({
            type: SUBIENDO_ARCHIVO,
        })
        try {
            const response = await clienteAxios.post("/api/archivos", formData)
            dispatch({
                type: SUBIR_ARCHIVO_EXITOSO,
                payload: {
                    nombre: response.data.archivo,
                    nombre_original: nombreOriginal
                }
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    //Crear el enlace
    const crearEnlace = async ()=>{
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }
        try {
            const response = await clienteAxios.post("/api/enlaces", data)
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: response.data.msg
            })
        }catch (error){
            console.log(error)
        }
    }

    //Limiar el state
    const limpiarState = ()=>{
        dispatch({
            type:LIMPIAR_STATE
        })
    }

    const agregarPassword = password=>{
        dispatch({
            type:AGREGAR_PASSWORD,
            payload: password
        })
    }
    const agregarDescargas = descargas=>{
        dispatch({
            type:AGREGAR_DESCARGAS,
            payload: descargas
        })
    }


    return(

        <AppContext.Provider

            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                cargando: state.cargando,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas
            }}
        >
            {children}
        </AppContext.Provider>
    )
}