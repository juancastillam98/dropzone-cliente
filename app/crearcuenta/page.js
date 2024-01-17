"use client"
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/auth/authContext";
import {useRouter} from "next/navigation";
import { useFormik} from "formik";//formik es para gestionar el state sin tener que declaro.
import * as yup from 'yup';
import {Alerta} from "../../components/Alerta";
export default function CrearCuenta() {
    //Acceder al state
    const {mensaje, usuarioAutenticado, registrarUsuario}= useContext(AuthContext)

    //Formulario y validación con formik y yup
    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            password: '',
        },
        validationSchema: yup.object().shape({
            nombre: yup.string().required("El nombre es obligatorio"),
            email: yup.string()
                .email("El email no es válido")
                .required("El email es obligatorio"),
            password: yup.string()
                .required("El password es obligatorio")
                .min(6,"El password debe contener al menos 6 caracteres")
        }),
        onSubmit: values => {
           registrarUsuario(values);
        },
    });
    return (
        <div className={"md:w-4/5 xl:w-3/5 mx-auto mb-32"}>
            <h2 className={"text-4xl font-sans font-bold text-gray-800 my-4 text-center"}>Crear cuenta</h2>

            {mensaje && <Alerta/>}

            <div className={"flex justify-center mt-5"}>
                <div className={"w-full max-w-lg"}>
                    <form
                        className={"bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"}
                        onSubmit={formik.handleSubmit}
                    >
                        <div className={"mb-4"}>
                            <label className={"block text-black text-sm font-bold mb-2"}
                                   htmlFor={"nombre"}
                            >Nombre</label>
                            <input
                                type={"text"}
                                className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                id={"nombre"}
                                placeholder={"Nombre de usuario"}
                                value={formik.values.nombre}//Formik ya inclyue todos los onchange, onBlur,
                                onChange={formik.handleChange}//formik ya incorpora los useState
                                onBlur={formik.handleBlur}
                            />

                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className={"my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4"}>
                                    <p className={"font-bold"}>Error</p>
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ): null}

                        </div>
                        <div className={"mb-4"}>
                            <label className={"block text-black text-sm font-bold mb-2"}
                                   htmlFor={"email"}
                            >Email</label>
                            <input
                                type={"email"}
                                className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                id={"email"}
                                placeholder={"Email de usuario"}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            {formik.touched.email && formik.errors.email ? (
                                <div className={"my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4"}>
                                    <p className={"font-bold"}>Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ): null}

                        </div>
                        <div className={"mb-4"}>
                            <label className={"block text-black text-sm font-bold mb-2"}
                                   htmlFor={"password"}
                            >Password</label>
                            <input
                                type={"password"}
                                className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                id={"password"}
                                placeholder={"Una contraseña"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.password && formik.errors.password ? (
                            <div className={"my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4"}>
                                <p className={"font-bold"}>Error</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        ): null}
                        <input
                            type={"submit"}
                            className={"bg-red-500 hover:bg-gray-900 hover:cursor-pointer w-full p-2 text-white font-bold uppercase"}
                            value={"Crear Cuenta "}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
