"use client"
import {useContext, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {AuthContext} from "@/context/auth/authContext";
import {AppContext} from "@/context/app/appContext";

export const Header = () => {
    const router = useRouter();

    //Extraer el usuario autenticado del localStorage.
    const {usuarioAutenticado, usuario, cerrarSesion} = useContext(AuthContext);
    const {limpiarState}=useContext(AppContext)

    //Solo quiero comprobar 1 vez el usuario autenticado
    useEffect(()=>{
        usuarioAutenticado();
    }, [])

    const redireccionar = ()=>{
        router.push("/")
        limpiarState()
    }

    return (
        <header className={"py-8 flex flex-col md:flex-row items-center justify-between"}>


                <img
                    src={"/logo.svg"}
                    className={"w-64 mb-8 md:mb-0 cursor-pointer"} alt={"Logo node send"}
                    onClick={()=>redireccionar()}
                />


            <div className={"flex gap-3"}>
                {usuario ? (
                    <div className={"flex items-center gap-4"}>
                        <p>Hola {usuario.nombre}</p>
                        <button
                            type={"button"}
                            className={"bg-black px-5 py-3 rounded text-white font-bold uppercase"}
                            onClick={()=>cerrarSesion()}
                        >Cerrar Sesión</button>

                    </div>
                ): (
                    <>
                        <Link href={"/login"} aria-label="Go to login page">
                            <p className={"bg-red-500 px-5 py-3 rounded text-white font-bold uppercase"}>Iniciar sesión</p>
                        </Link>
                        <Link href={"/crearcuenta"} aria-label="Go to create a new account">
                            <p className={"bg-black px-5 py-3 rounded text-white font-bold uppercase"}>Crear Cuentta</p>
                        </Link>
                    </>
                )}


            </div>
        </header>
    )
}