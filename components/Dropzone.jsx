"use client"
import { useCallback, useContext} from "react";
import {AppContext} from "../context/app/appContext";
import {useDropzone} from 'react-dropzone'
import {AuthContext} from "@/context/auth/authContext";
import {Formulario} from "./Formulario";
export const Dropzone = () => {

    const {mostrarAlerta, subirArchivo, cargando, crearEnlace}=useContext(AppContext)
    const {usuario, autenticado} = useContext(AuthContext)

    const onDropRejected = () => {
        mostrarAlerta("No se puedo subir, el límite máximo es de 1MB. Crea cuenta para más")
    }

    //este callback va a ser el encargado de gestionar todos los archivos que vayamos utilizando
    const onDropAccepted = useCallback(async (acceptedFiles) => {
        //Crear un form data
        const formData = new FormData();
        formData.append("archivo", acceptedFiles[0])//Solo subiremos 1 de prueba

        subirArchivo(formData, acceptedFiles[0].path)

    },[])

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxSize: 1058816})

    const archivos = acceptedFiles.map(file =>(
        <li
            className={"bg-white flex-1 p-3 mb-4 shadow-lg rounded"}
            key={file.lastModified}>
            <p className={"font-bold text-xl"}>{file.path}</p>
            <p className={"text-sm text-gray-500"}>{ ( (file.size / 1024) / 1024).toFixed(2)} MB</p>
        </li>
    ))


    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4 h-full">
            {/*getRootProps es una función que devuelve todas las propiedades necesarias para gestinar la funcionalidad. Estamos extrayendo esas propiedades*/}
            {acceptedFiles.length > 0 ? (
                <div className={"mt-10 w-full"}>
                    <h4 className={"text-2xl font-bold text-center mb-4"}>Archivos</h4>
                    <ul>
                        {archivos}
                    </ul>
                    {autenticado ? <Formulario/>: ""}
                    {cargando ? <p className={"my-10 text-center text-gray-600"}>Subiendo archivo</p> : (
                        <button
                            type={"button"}
                            className={"bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:blue-800"}
                            onClick={crearEnlace}
                        >
                            Crear enlace
                        </button>
                    )}

                </div>

            ): (
                <div {...getRootProps({className: "dropzone w-full py-32"})}>
                    <input className={"h-100"} {...getInputProps()}/>
                    {
                        isDragActive ? <p className={"text-2xl text-center text-gray-500"}>Suelta el archivo</p> :
                            <div className={"text-center"}>
                                <p className={"text-2xl text-center text-gray-600"}>
                                    Selecciona un archivo y arrástralo aquí.
                                    <button
                                        type={"button"}
                                        className={"bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:blue-800"}>
                                        Selecciona archivos para subir
                                    </button>
                                </p>
                            </div>
                    }
                </div>

            )}

        </div>
    )
}