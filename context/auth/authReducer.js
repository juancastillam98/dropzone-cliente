//Este va a ser el fichero encargado de hacer las modficaciones
import {USUARIO_AUTENTICADO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    INICIO_SESION_EXITOSO,
    INICIO_SESION_ERROR,
    CERRAR_SESION} from "../../types";
export default (state, action)=>{//El action toma el el type y el payload (el dispatch)
    switch (action.type) {
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,//lo que le mandemos es lo que vamos a modificar (le pasamos payload: nombre)
                autenticado: true
            }
        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
        case INICIO_SESION_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case INICIO_SESION_EXITOSO:
            localStorage.setItem('token', action.payload)//lo que esté como payload, es lo que se subirá al token.
            return {
                ...state,
                token: action.payload,//ponemos el token en el state
                autenticado: true
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                usuario: null,
                token: null,
                autenticado: false
            }
        default:
            return state;
    }
}