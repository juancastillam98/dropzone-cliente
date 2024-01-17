"use client"
import {useContext, useEffect} from "react";
import Link from "next/link";
import {AuthContext} from "../context/auth/authContext";
import {AppContext} from "@/context/app/appContext";
import {Dropzone} from "../components/Dropzone";
import {Alerta} from "@/components/Alerta";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
export default function Page() {
    //Extraer el usuario autenticado del localStorage.
    const {usuarioAutenticado} = useContext(AuthContext);
    const {mensaje_archivo, url}=useContext(AppContext)
    //Solo quiero comprobar 1 vez el usuario autenticado
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            usuarioAutenticado()
        }
    }, [])

    return (
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
            {url ?
                <>
                    <p className={"text-center text-2xl mt-10"}>
                        Tu Url es <span className={"font-bold text-blue-700 text-2xl break-words mt-2"}>{`${process.env.NEXT_PUBLIC_frontendURL}/enlaces/${url}`}</span>
                    </p>
                    <button
                        type={"submit"}
                        className={"bg-red-500 hover:bg-gray-900 hover:cursor-pointer w-full p-2 text-white font-bold uppercase mt-10"}
                        //esto del clipboar es para que al hacer click, se te copie todo lo que hay en writeText
                        onClick={()=>navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_frontendURL}/enlaces/${url}`)}
                    >
                        Copiar enlace
                    </button>
                </>

                :
                (
                    <>
                        {mensaje_archivo && <Alerta/>}
                        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                                <Dropzone/>
                            </div>
                            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                                <h2 className={"text-4xl font-sans font-bold text-gray-800 my-4"}>Compartir archivos de forma sencilla y privada</h2>
                                <p className={"text-lg leading-loose"}>
                                <span className={"text-red-500 font-bold"}>
                                    React NodeSend &nbsp;
                                </span>
                                    te permite compartir archivos con cifrado extremo a extremo
                                </p>
                                <Link href={"/crearcuenta"}><p className={"text-red-500 font-bold text-lg hover:text-red-700"}>Crea una cuenta para mayores beneficios</p></Link>
                            </div>
                        </div>
                    </>
                )}
        </div>
    )
}