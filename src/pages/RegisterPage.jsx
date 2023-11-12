// Importamos useForm de react hook para la validación del form
import { useForm } from 'react-hook-form';

// Importo iconos que utilizare
import { SlUser, SlEnvolope, SlLock } from "react-icons/sl";

// Importo la imagen del usuario
import userImage from '../assets/user.png'

// Importo la función useAccess desde el contexto AccessContext
import { useAccess } from '../context/AccessContext';

// Importamos useEffect, libreria que nos permite definir cuándo un segmento de código se va a ejecutar
import { useEffect } from 'react';

// Importamos Navigate, que nos permite redireccionar la aplicación
import { useNavigate } from 'react-router-dom';

function RegisterPage(){
    const { register, handleSubmit, formState:{errors} } = useForm();
    const { signup, isAuthenticated, errors:registerErrors } = useAccess();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated)
            navigate('/pets')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async(values)=>{
        signup(values);
    })

    const toLink = (()=>{
        navigate('/login')
    })

    return(
        <div className='flex items-center justify-center h-screen '>
            <div className='bg-sky-100 w-full max-w-xl p-10 rounded-md'>
                <h1 className="text-center text-5xl font-Caveat">Registro de Usuario</h1>
                <form onSubmit={onSubmit}>
                    <div className="flex items-center justify-center p-4">
                        <img className='imgRedonda'
                            src={userImage}
                            alt="User"
                        />
                    </div>
                    {
                        registerErrors.map((error, i)=>(
                            <div key={i}>
                                {error}
                            </div>
                        ))
                    }
                    <div className="flex justify-end items-center relative">
                        <SlUser size={40} className='bg-sky-100 mx-1 rounded-md'/>
                        <input type="text"
                            className='w-full bg-sky-50 text-sky-500 px-4 py-2 my-2 rounded-md'
                            placeholder='Nombre de usuario'
                            autoComplete='Nombre de usuario'
                            {...register("username", {required: true, minLength: 5, maxLength: 30})}
                        />
                    </div>
                    {
                        errors.username?.type==="required" && (
                            <p>El nombre de usuario es requerido</p>
                        )
                    }
                    {
                        errors.username?.type==="minLength" && (
                            <p>El nombre de usuario debe contener al menos 5 caracteres</p>
                        )
                    }
                    {
                        errors.username?.type==="maxLength" && (
                            <p>El nombre de usuario debe ser máximo de 30 caracteres</p>
                        )
                    }
                    <div className="flex justify-end items-center relative">
                        <SlEnvolope size={40} className='bg-sky-100 mx-1 rounded-md'/>
                        <input type="email"
                            className='w-full bg-sky-50 text-sky-500 px-4 py-2 my-2 rounded-md'
                            placeholder='Email'
                            autoComplete='Email'
                            {...register("email", {required: true,})}
                        />
                    </div>
                    {
                        errors.email && (
                            <p>El email es requerido</p>
                        )
                    }
                    <div className="flex justify-end items-center relative">
                        <SlLock size={40} className='bg-sky-100 mx-1 rounded-md'/>
                        <input type="password"
                            className='w-full bg-sky-50 text-sky-500 px-4 py-2 my-2 rounded-md'
                            placeholder='Contraseña'
                            {...register("password", {required: true, minLength: 5})}
                        />
                    </div>
                    {
                        errors.password?.type==="required" && (
                            <p>La contraseña es requerida</p>
                        )
                    }
                    {
                        errors.password?.type==="minLength" && (
                            <p>La contraseña debe contener al menos 5 caracteres</p>
                        )
                    }
                    <div className='flex items-center justify-center'>
                        <button type='submit'
                            className="bg-transparent hover:bg-cyan-600 text-sky-500
                            font-semibold hover:text-white mb-2 py-2 px-4 border border-cyan-600 hover:border-transparent rounded">
                            Registrar
                        </button>
                    </div>
                </form>
                {/* <div className='flex items-center justify-center'>
                    <button type='submit' onClick={toLink}
                        className="bg-transparent hover:bg-cyan-600 text-sky-500
                            font-semibold hover:text-white mb-2 py-2 px-4 border border-cyan-600 hover:border-transparent rounded">
                        Iniciar Sesión
                    </button>
                </div> */}
                <p className="text-center text-xs">
                    MidnaSw &#9400; 2023 Derechos Reservados
                </p>
            </div>
        </div>
    )
}

export default RegisterPage