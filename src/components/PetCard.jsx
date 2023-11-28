// Importo imagen
import image from '../assets/204.jpg'

// Importamos el contexto de las mascotas
import { usePets } from '../context/PetsContext';

import { Link } from 'react-router-dom';

import { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react'
import { MdEditDocument, MdDescription, MdDelete } from "react-icons/md";

function classNames(...classes){
    return classes.filter(Boolean).join(' ')
}

function PetCard({pet}){
    const { deletePet } = usePets();

    var sexo = pet.gender;
    var day = pet.age_day;
    var month = pet.age_month;
    var str_day = day.toString();
    var str_month = month.toString();

    if(str_day.length === 1)
        str_day = '0' + str_day

    if(str_month.length === 1)
        str_month = '0' + str_month

    if(sexo === 'H')
        sexo = 'Hembra';
    else
        sexo = 'Macho';

    return(
        <div className="bg-sky-100 w-full max-w-xs border border-cyan-600 rounded-2xl shadow-2xl">
            <div className="flex justify-end px-2 pt-2">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-sky-100 px-3 py-2 font-Caveat text-base ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-white">
                            . . .
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-sky-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            <div className="py-1">
                                <Menu.Item>
                                    {
                                        ({ active }) => (
                                            <Link
                                                to={'/pet/' + pet._id}
                                                className={classNames(
                                                    active ? 'bg-sky-200 font-Caveat text-xl' : 'font-Caveat text-xl',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                            <MdEditDocument className="h-5 w-8 inline-flex" />Editar Datos
                                            </Link>
                                        )
                                    }
                                </Menu.Item>
                                <Menu.Item>
                                    {
                                        ({ active }) => (
                                            <Link
                                                to={'/petsInfo/' + pet._id}
                                                className={classNames(
                                                    active ? 'bg-sky-200 font-Caveat text-xl' : 'font-Caveat text-xl',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                            <MdDescription className="h-5 w-8 inline-flex" />Completar Información
                                            </Link>
                                        )
                                    }
                                </Menu.Item>
                                <Menu.Item>
                                    {
                                        ({ active }) => (
                                            <Link
                                                onClick={()=>{deletePet(pet._id);}}
                                                className={classNames(
                                                    active ? 'bg-sky-200 font-Caveat text-xl' : 'font-Caveat text-xl',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                            <MdDelete className="h-5 w-8 inline-flex" />Eliminar
                                            </Link>
                                        )
                                    }
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <div className="bg-sky-100 flex flex-col items-center pb-5 rounded-2xl">
                <img className="w-52 h-52 rounded-full shadow-lg" src={image} />
                <h5 className="font-Caveat font-bold text-2xl my-3">Nombre: {pet.name}</h5>
                <span className="font-Caveat text-xl">Sexo: {sexo}</span>
                <span className="font-Caveat text-xl">Fecha de Nacimiento: {str_day} / {str_month} / {pet.age_year}</span>
            </div>
            {/* <div className="flex gap-x-2 items-center justify-center px-6 pb-2">
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
            </div> */}
        </div>
    )
}

export default PetCard