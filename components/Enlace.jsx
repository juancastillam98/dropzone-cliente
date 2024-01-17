"use client"
import {useState, useContext} from "react";
import {clienteAxios} from "@/config/axios";
import {AppContext} from "@/context/app/appContext";
import {Alerta} from "@/components/Alerta";
export const Enlace = ({archivo}) => {

    const [tienePassword, setTienePassword] =useState(archivo.password)
    const [password, setPassword] =useState("")
    const {mostrarAlerta, mensaje_archivo}=useContext(AppContext)

    const verficarPassword = async e => {
        e.preventDefault();
        const data = {
            password
        };
        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${archivo.enlace}`, data)
            setTienePassword(resultado.data.password)
        } catch (error) {
            mostrarAlerta(error.response.data.msg)
        }
    }

    return (
            <>
                {tienePassword ? (
                    <>
                        <p className={"text-center"}>Enlace protegido por contraseña</p>
                        {mensaje_archivo && <Alerta/>}
                        <div className={"w-full justify-center"}>
                            <div className={"w-full max-w-lg"}>
                                <form
                                    className={"bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"}
                                    onSubmit={e =>verficarPassword(e)}
                                >
                                    <div className={"mb-4"}>
                                        <label className={"block text-black text-sm font-bold mb-2"}
                                               htmlFor={"nombre"}
                                        >Contraseña</label>
                                        <input
                                            type={"text"}
                                            className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                            id={"nombre"}
                                            placeholder={"Contraseña"}
                                            value={password}
                                            onChange={e =>setPassword(e.target.value)}
                                        />
                                    </div>
                                    <input
                                        type={"submit"}
                                        className={"bg-red-500 hover:bg-gray-900 hover:cursor-pointer w-full p-2 text-white font-bold uppercase"}
                                        value={"Introduce la contraseña"}
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                ): (
                    <>
                        <h1 className={"text-4xl text-center text-gray-700"}>Descarga tu archivo</h1>
                        <div className={"flex items-center justify-center mt-10"}>
                            <a
                                href={`${process.env.NEXT_PUBLIC_backendURL}/api/archivos/${archivo.enlace}`}
                                className={"bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer cursor-pointer"}>
                                Aquí
                            </a>
                        </div>
                    </>
                )}
            </>

    )
}