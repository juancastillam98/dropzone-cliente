import {
    SUBIR_ARCHIVO_EXITOSO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    MOSTRAR_ALERTA, LIMPIAR_ALERTA,
    SUBIENDO_ARCHIVO,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD, AGREGAR_DESCARGAS
} from "../../types";

export default (state, action)=>{
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: ""
            }
        case SUBIR_ARCHIVO_EXITOSO:
            return {
                ...state,
                nombre: action.payload.nombre,//modifica el nombre y el nombre original
                nombre_original: action.payload.nombre_original,
                cargando: false
            }
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                mensaje_archivo: action.payload,
                cargando: false
            }
        case SUBIENDO_ARCHIVO:
            return {
                ...state,
                cargando: true
            }
        case CREAR_ENLACE_EXITO:
            return {
                ...state,
                url: action.payload
            }
        case AGREGAR_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case AGREGAR_DESCARGAS:
            return {
                ...state,
                descargas: action.payload
            }
        case LIMPIAR_STATE:
            return {
                ...state,
                mensaje_archivo: "",
                nombre: "",
                nombre_original: "",
                cargando: false,
                descargas: 1,
                password: "",
                autor: null,
                url: ""
            }
        default:
            return state;
    }
}