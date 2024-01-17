import {useContext, useState} from "react";
import {AppContext} from "@/context/app/appContext";
export const Formulario = () => {
    const [tienePassword, setTienePassword] =useState(false)
    const {agregarPassword, agregarDescargas} = useContext(AppContext)
    return (
        <div className={"w-full mt-20"}>
            <label className={"text-lg text-gray-800"}>Eliminar tras</label>
            <div>
                <select
                    defaultValue={"1"}
                    className={"appearance-none w-full mt-2 bg-white border-gray-400 py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"}
                    onChange={(e)=>agregarDescargas(parseInt(e.target.value))}
                >
                    <option value={""} >--Seleccione--</option>
                    <option value={"1"}>1 Descarga</option>
                    <option value={"5"}>5 Descargas</option>
                    <option value={"10"}>10 Descargas</option>
                    <option value={"20"}>20 Descargas</option>
                </select>
            </div>
            <div className={"mt-4"}>
                <div className={"flex gap-3 items-center justify-between"}>
                    <label className={"text-lg text-gray-800"}>Proteger con contraseña</label>
                    <input type={"checkbox"}
                           onChange={()=>setTienePassword(!tienePassword)}
                    />
                </div>
                {tienePassword ? (
                    <input
                        type={"password" }
                        className={"appearance-none w-full mt-2bg-white border boder-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"}
                        onChange={(e)=>agregarPassword(e.target.value)}
                        />
                ): null}

            </div>
        </div>
    )
}