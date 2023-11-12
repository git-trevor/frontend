// Importamos useForm de react hook para la validación del form
import { useForm } from 'react-hook-form';

// Importo la imagen de la huella
import pawImage from '../assets/paw.png'

// Importo el contexto de mascotas
import { usePets } from '../context/PetsContext';

// Importamos Navigate para redireccionar
import { useNavigate, useParams } from 'react-router-dom';

import { useEffect } from 'react';

function InfoPetPage(){
    const { register, handleSubmit, setValue, formState: {errors} } = useForm(
        {
            defaultValues: {
                pet_breed: '',
                pet_weight: 0.0,
                pet_traits: '',
                pet_sterilized: 'N'
            }
        }
    );

    const { completePet, getInfoPet } = usePets();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        async function loadInfoPet(){
            const infoPet = await getInfoPet(params.id);

            if(infoPet){
                setValue("pet_breed", infoPet.pet_breed);
                setValue("pet_weight", infoPet.pet_weight);
                setValue("pet_traits", infoPet.pet_traits);
                setValue("pet_sterilized", infoPet.pet_sterilized);
            } else{
                console.log('Holi');
                setValue("pet_breed", '');
                setValue("pet_weight", 0.0);
                setValue("pet_traits", '');
                setValue("pet_sterilized", 'N');
            }
        }

        loadInfoPet();
    }, [])

    const onSubmit = handleSubmit((data)=>{
        completePet(params.id, data);
        navigate('/pets');
    })

    return(
        <div className='flex items-center justify-center'>
            <div className='bg-sky-100 w-full max-w-xl p-10 rounded-md'>
                <h1 className="text-center text-4xl font-Caveat">Completa la información de tu mascota</h1>
                <form onSubmit={onSubmit}>
                    <div className="flex items-center justify-center p-4">
                        <img className='imgRedonda'
                            src={pawImage}
                            alt="Paw"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='breed'
                            className="text-center text-2xl font-Caveat px-2"
                        >Raza:</label>
                        <input type="text"
                            className='w-full bg-sky-50 text-sky-500 px-2 py-2 my-2 rounded-md'
                            placeholder='Raza de tu mascota'
                            autoComplete='Raza de tu mascota'
                            autoFocus
                            {...register("pet_breed", {maxLength: 25})}
                        />
                    </div>
                    {
                        errors.pet_breed?.type==="maxLength" && (
                            <p>La raza de la mascota debe ser máximo de 25 caracteres.</p>
                        )
                    }
                    <div>
                        <label
                            htmlFor='weight'
                            className="text-center text-2xl font-Caveat px-3"
                        >Peso:</label>
                        <input type="text"
                            className='w-full bg-sky-50 text-sky-500 px-2 py-2 my-2 rounded-md'
                            placeholder='Peso de tu mascota'
                            autoComplete='Peso de tu mascota'
                            {...register("pet_weight", {valueAsNumber: true})}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='sterilized'
                            className="text-center text-2xl font-Caveat px-3"
                        >¿Tu mascota esta esterilizada?</label>
                        <select
                            className="block appearance-none w-full bg-sky-50 text-sky-500 py-3 px-4 pr-8 rounded leading-tight focus:outline-none"
                            id="grid-day"
                            {...register("pet_sterilized")}
                        >
                            <option value={'S'}>Sí</option>
                            <option value={'N'}>No</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor='traits'
                            className="text-center text-2xl font-Caveat px-3"
                        >Características:</label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block appearance-none w-full bg-sky-50 text-sky-500 py-3 px-4 pr-8 rounded leading-tight
                                    focus:outline-none"
                            placeholder="Características de tu mascota. . ."
                            {...register("pet_traits", {maxLength: 300})}
                        ></textarea>
                    </div>
                    {
                        errors.pet_traits?.type==="maxLength" && (
                            <p>Las características no deben sobrepasar los 300 caracteres.</p>
                        )
                    }
                    <div className='flex items-center justify-center py-4'>
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

export default InfoPetPage