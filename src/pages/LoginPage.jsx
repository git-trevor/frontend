// Importamos useForm de react hook para la validación del form
import { useForm } from 'react-hook-form';

// Importo iconos que utilizare
import { SlEnvolope, SlLock } from "react-icons/sl";

// Importo la imagen de la huella
import userImage from '../assets/user.png'

// Importo la función useAccess desde el contexto AccessContext
import { useAccess } from '../context/AccessContext';

// Importamos Navigate, que nos permite redireccionar la aplicación
import { useNavigate } from 'react-router-dom';

// Importamos useEffect, libreria que nos permite definir cuándo un segmento de código se va a ejecutar
import { useEffect, useState } from 'react';

// Importamos íconos para mostrar/ocultar password
import { TbEye, TbEyeClosed } from "react-icons/tb";

function LoginPage(){
  const { register, handleSubmit, formState:{errors} } = useForm();
  const { signin, isAuthenticated, errors: signinErrors } = useAccess();
  const [ mostrarPassword, setMostrarPassword ] = useState(false);
  const navigate = useNavigate();

  const toggleMostrarPassword=()=>{
    setMostrarPassword(mostrarPassword ? false : true);
  }

  useEffect(()=>{
    if(isAuthenticated)
      navigate('/pets');
    else
      console.log('No esta autenticado');
  }, [isAuthenticated])

  const onSubmit = handleSubmit((data)=>{
    signin(data);
  })

  const toLink = (()=>{
    navigate('/register')
  })

  return(
    <div className='flex items-center justify-center h-screen '>
      <div className='bg-sky-100 w-full max-w-xl p-10 rounded-md'>
        <h1 className="text-center text-5xl font-Caveat">Login</h1>
        <form onSubmit={onSubmit}>
          <div className="flex items-center justify-center p-4">
            <img className='imgRedonda'
              src={userImage}
              alt="User"
            />
          </div>
          {
            signinErrors.map((error, i)=>(
              <div key={i}>
                {error}
              </div>
              ))
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
            <input type={mostrarPassword ? "text" : "password"}
                className='w-full bg-sky-50 text-sky-500 px-4 py-2 my-2 rounded-md'
                placeholder='Contraseña'
              {...register("password", {required: true, minLength: 5})}
            />
            {
              mostrarPassword ?
                <TbEye size={30} className='absolute mr-2 w-10' onClick={toggleMostrarPassword} />
                :
                <TbEyeClosed size={30} className='absolute mr-2 w-10' onClick={toggleMostrarPassword} />
            }
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
            Iniciar Sesión
          </button>
          </div>
        </form>
        {/* <div className='flex items-center justify-center'>
          <button type='submit' onClick={toLink}
            className="bg-transparent hover:bg-cyan-600 text-sky-500
              font-semibold hover:text-white mb-2 py-2 px-4 border border-cyan-600 hover:border-transparent rounded">
            Crear Cuenta
          </button>
        </div> */}
        <p className="text-center text-xs">
          MidnaSw &#9400; 2023 Derechos Reservados
        </p>
      </div>
    </div>
  )
}

export default LoginPage