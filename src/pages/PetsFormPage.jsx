// Importamos useForm de react hook para la validación del form
import { useForm } from 'react-hook-form';

// Importo la imagen de la huella
import pawImage from '../assets/paw.png'

// Importo iconos que utilizare
import { MdPets } from "react-icons/md";
import { PiGenderIntersexFill, PiCalendarBlankBold } from "react-icons/pi";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { AiFillPicture } from "react-icons/ai";


// Importo el contexto de mascotas
import { usePets } from '../context/PetsContext';

// Importamos Navigate para redireccionar
import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

function PetsFormPage(){
    const { register, handleSubmit, setValue, formState: {errors} } = useForm(
        {
            defaultValues: {
                gender: 'H',
                age_day: new Date().getDate(),
                age_month: new Date().getMonth() + 1,
                age_year: new Date().getFullYear()
            }
        }
    );
    const { createPet, getPet, updatePet } = usePets();
    const navigate = useNavigate();
    const params = useParams();
    const [sexo, setSexo] = useState('H');

    useEffect(()=>{
        async function loadPet(){
            if(params.id){
                const pet = await getPet(params.id);
                setValue("name", pet.name);
                setValue("gender", pet.gender);
                setValue("age_day", pet.age_day);
                setValue("age_month", pet.age_month);
                setValue("age_year", pet.age_year);
                setSexo(pet.gender);
            }
        }

        loadPet();
    }, [])

    const onSubmit = handleSubmit((data)=>{
        if(params.id){
            updatePet(params.id, data);
        } else{
            data.gender = sexo;
            createPet(data);
        }

        navigate('/pets');
    })

    return(
        <div className='flex items-center justify-center h-screen '>
            <div className='bg-sky-100 w-full max-w-xl p-10 rounded-md'>
                <h1 className="text-center text-5xl font-Caveat">Registro de Mascotas</h1>
                <form onSubmit={onSubmit}>
                    <div className="flex items-center justify-center p-4">
                        <img className='imgRedonda'
                            src={pawImage}
                            alt="Paw"
                        />
                    </div>
                    {/* {
                        registerErrors.map((error, i)=>(
                            <div key={i}>
                                {error}
                            </div>
                        ))
                    } */}
                    {/* div para subir la foto */}
                    {/* <div className="flex justify-start items-center relative">
                        <AiFillPicture size={40} className='bg-sky-100 mx-1 rounded-md'/>  
                        <input type="file"
                            name="url_img" 
                            className='w-full bg-sky-50 text-sky-500 px-4 py-2 my-2 rounded-md'
                            {...register("url_img")}
                        />
                    </div> */}
                    <div className="flex justify-end items-center relative">
                        <MdPets size={40} className='bg-sky-100 mx-1 rounded-md'/>
                        <input type="text"
                            className='w-full bg-sky-50 text-sky-500 px-4 py-2 my-2 rounded-md'
                            placeholder='Nombre de mascota'
                            autoComplete='Nombre de mascota'
                            autoFocus
                            {...register("name", {required: true, maxLength: 15})}
                        />
                    </div>
                    {
                        errors.name?.type==="required" && (
                            <p>El nombre de la mascota es requerido</p>
                        )
                    }
                    {
                        errors.name?.type==="maxLength" && (
                            <p>El nombre de la mascota debe ser máximo de 15 caracteres</p>
                        )
                    }
                    <div className="flex justify-start items-center relative">
                        <PiGenderIntersexFill size={40} className='bg-sky-100 mx-0.5 rounded-md'/>
                        {/* <input type="text"
                            className='w-full bg-sky-50 text-sky-500 px-4 py-2 my-2 rounded-md'
                            placeholder='Hembra o Macho'
                            autoComplete='Hembra o Macho'
                            value={sexo}
                            onChange={e => setSexo(e.target.value)}
                            {...register("gender", {required: true, minLength: 1, maxLength: 1})}
                        /> */}
                        <button type='button'
                            className={sexo === 'H' ?
                            "font-semibold -mb-0.5 py-2 px-4 border rounded text-white bg-pink-400 border-pink-400 hover:text-white hover:bg-pink-400 hover:border-transparent"
                            :
                            "font-semibold -mb-0.5 py-2 px-4 border rounded text-pink-400 border-pink-400 hover:text-white hover:bg-pink-400 hover:border-transparent"}
                            onClick={() => setSexo('H')}
                        >
                            {/* Hembra */}
                            <BsGenderFemale size={20} className='bg-transparent mx-1 rounded-md'/>
                        </button>
                        <button type='button'
                            className={sexo === 'M' ?
                            "font-semibold mx-2 -mb-0.5 py-2 px-4 border rounded text-white bg-blue-400 border-blue-400 hover:text-white hover:bg-blue-400 hover:border-transparent"
                            :
                            "font-semibold mx-2 -mb-0.5 py-2 px-4 border rounded text-blue-400 border-blue-400 hover:text-white hover:bg-blue-400 hover:border-transparent"}
                            onClick={() => setSexo('M')}
                        >
                            {/* Macho */}
                            <BsGenderMale size={20} className='bg-transparent mx-1 rounded-md'/>
                        </button>
                    </div>
                    {
                        errors.gender?.type==="required" && (
                            <p>El genero de la mascota es requerido</p>
                        )
                    }
                    {
                        errors.gender?.type==="minLength" && (
                            <p>El genero debe ser mínimo de un caracter</p>
                        )
                    }
                    {
                        errors.gender?.type==="maxLength" && (
                            <p>El genero debe ser máximo de un caracter</p>
                        )
                    }
                    {
                        errors.gender?.type==="enum" && (
                            <p>El genero sólo puede ser H-Hembra o M-Macho</p>
                        )
                    }
                    {/* [Inicio] Datos para registrar la fecha de nacimiento */}
                    <div className="flex justify-normal relative ">
                        <PiCalendarBlankBold size={35} className='bg-sky-100 mx-1 rounded-md'/>
                        <h1 className="text-left text-xl">Fecha de Nacimiento</h1>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2 py-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                                Día
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-sky-50 text-sky-500 py-3 px-4 pr-8 rounded leading-tight
                                    focus:outline-none" id="grid-day"
                                    {...register("age_day", {required: true, min: 1, max: 31, valueAsNumber: true})}>
                                    <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option>
                                    <option value={4}>4</option><option value={5}>5</option><option value={6}>6</option>
                                    <option value={7}>7</option><option value={8}>8</option><option value={9}>9</option>
                                    <option value={10}>10</option><option value={11}>11</option><option value={12}>12</option>
                                    <option value={13}>13</option><option value={14}>14</option><option value={15}>15</option>
                                    <option value={16}>16</option><option value={17}>17</option><option value={18}>18</option>
                                    <option value={19}>19</option><option value={20}>20</option><option value={21}>21</option>
                                    <option value={22}>22</option><option value={23}>23</option><option value={24}>24</option>
                                    <option value={25}>25</option><option value={26}>26</option><option value={27}>27</option>
                                    <option value={28}>28</option><option value={29}>29</option><option value={30}>30</option>
                                    <option value={31}>31</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                            {
                                errors.age_day?.type==="required" && (
                                    <p>Se debe ingresar el día de nacimiento</p>
                                )
                            }
                            {
                                errors.age_day?.type==="min" && (
                                    <p>Día inválido</p>
                                )
                            }
                            {
                                errors.age_day?.type==="max" && (
                                    <p>Día inválido</p>
                                )
                            }
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                                Mes
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-sky-50 text-sky-500 py-3 px-4 pr-8 rounded leading-tight
                                    focus:outline-none" id="grid-month"
                                    {...register("age_month", {required: true, min: 1, max: 12, valueAsNumber: true})}>
                                    <option value={1}>Enero</option><option value={2}>Febrero</option><option value={3}>Marzo</option>
                                    <option value={4}>Abril</option><option value={5}>Mayo</option><option value={6}>Junio</option>
                                    <option value={7}>Julio</option><option value={8}>Agosto</option><option value={9}>Septiembre</option>
                                    <option value={10}>Octubre</option><option value={11}>Noviembre</option><option value={12}>Diciembre</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            {
                                errors.age_month?.type==="required" && (
                                    <p>Se debe ingresar el mes de nacimiento</p>
                                )
                            }
                            {
                                errors.age_month?.type==="min" && (
                                    <p>Mes inválido</p>
                                )
                            }
                            {
                                errors.age_month?.type==="max" && (
                                    <p>Mes inválido</p>
                                )
                            }
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                                Año
                            </label>
                            <input className="appearance-none block w-full bg-sky-50 text-sky-500 border rounded py-3 px-4
                                leading-tight" id="grid-year" type="number" max={new Date().getFullYear()}
                                {...register("age_year", {valueAsNumber: true})}
                            />
                        </div>
                        {
                                errors.age_year?.type==="required" && (
                                    <p>Se debe ingresar el año de nacimiento</p>
                                )
                            }
                    </div>
                    {/* [Fin] Datos para registrar la fecha de nacimiento */}
                    <div className='flex items-center justify-center'>
                        <button type='submit'
                            className="bg-transparent hover:bg-cyan-600 text-sky-500
                            font-semibold hover:text-white mb-2 py-2 px-4 border border-cyan-600 hover:border-transparent rounded">
                            Guardar
                        </button>
                    </div>
                </form>
                <p className="text-center text-xs">
                    MidnaSw &#9400; 2023 Derechos Reservados
                </p>
            </div>
        </div>
    )
}

export default PetsFormPage