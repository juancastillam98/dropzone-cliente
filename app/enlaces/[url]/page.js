import {clienteAxios} from "../../../config/axios";
import {Enlace} from "@/components/Enlace";

export default async function Enlaces({params})  {

    const {url} = params;
    //const urlEnlace =await getEnlaces(enlace);
     const archivo = await getEnlace(url);
    console.log("================================")
    console.log("desde enlace.page")
    console.log("================================")

    return (
        <Enlace archivo={archivo}/>
    )
}

export async function getEnlace(url){
    try {
        const response  = await clienteAxios.get(`/api/enlaces/${url}`);
        const archivo = response.data;
        return archivo;
    }catch (error) {
        console.error("ha habido un error")
        console.error(error)
    }

}