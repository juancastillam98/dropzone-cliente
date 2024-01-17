import {useContext} from "react";
import {AuthContext} from "../context/auth/authContext";
import {AppContext} from "@/context/app/appContext";
export const Alerta = () => {
    const {mensaje}= useContext(AuthContext)
    const {mensaje_archivo}=useContext(AppContext)
    return (
        <div className={"bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto"}>
            {mensaje || mensaje_archivo}
        </div>
    )
}