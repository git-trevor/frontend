// Importo imagen
import image from '../assets/204.jpg'

// Importamos el contexto de las mascotas
import { usePets } from '../context/PetsContext';

import { Link } from 'react-router-dom';

function PetCard({pet}){
    const { deletePet } = usePets();

    var sexo = pet.gender;

    if(sexo === 'H')
        sexo = 'Hembra';
    else
        sexo = 'Macho';

    return(
        <div className="bg-sky-100 w-full max-w-xs border border-cyan-600 rounded-2xl shadow-2xl">
            <div className="flex justify-end px-2 pt-2">
                <button id="dropdownButton" data-dropdown-toggle="dropdown"
                    className="inline-block text-cyan-600 dark:text-cyan-400 hover:bg-cyan-900 dark:hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-600 dark:focus:ring-cyan-900 rounded-lg text-sm p-1.5" type="button">
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                </button>
                {/* Dropdown menu */}
                <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2" aria-labelledby="dropdownButton">
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-sky-100 flex flex-col items-center pb-5">
                <img className="w-52 h-52 rounded-full shadow-lg" src={image} />
                <h5 className="font-Caveat font-bold text-xl my-3">Nombre: {pet.name}</h5>
                <span className="font-Caveat text-xl">Sexo: {sexo}</span>
                <span className="font-Caveat text-xl">Fecha de Nacimiento: {pet.age_day} / {pet.age_month} / {pet.age_year}</span>
            </div>
            <div className="flex gap-x-2 items-center justify-center px-6 pb-2">
                <Link to={'/pet/' + pet._id} className="bg-transparent hover:bg-cyan-600 text-sky-500
                    font-semibold hover:text-white mb-2 py-2 px-4 border border-cyan-600 hover:border-transparent rounded"
                >Editar</Link>
                <button className="bg-transparent hover:bg-cyan-600 text-sky-500
                    font-semibold hover:text-white mb-2 py-2 px-4 border border-cyan-600 hover:border-transparent rounded"
                    onClick={()=>{
                        deletePet(pet._id);
                    }}
                >Eliminar</button>
            </div>
            <div className="flex items-center justify-center pb-2">
                <Link to={'/petsInfo/' + pet._id} className="bg-transparent hover:bg-cyan-600 text-sky-500
                    font-semibold hover:text-white mb-2 py-2 px-4 border border-cyan-600 hover:border-transparent rounded"
                >Completar Información</Link>
            </div>
        </div>
    )
}

export default PetCard