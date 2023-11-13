import { Link } from "react-router-dom"
import { useAccess } from "../context/AccessContext"
import { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react'
import { IoCaretDownOutline } from 'react-icons/io5'
import { MdPets, MdGames, MdLogout } from "react-icons/md";

function classNames(...classes){
    return classes.filter(Boolean).join(' ')
}

function Navbar(){
    const { isAuthenticated, logout, user } = useAccess();

    return(
        <nav className="flex justify-between rounded-full bg-sky-100 my-2 py-3 px-5">
            <Link to={
                isAuthenticated ? '/pets' : '/'
            }>
                <h1 className="font-Caveat text-3xl">MediPet</h1>
            </Link>
            <ul className="flex gap-x-2.5 my-1.5">
                {
                    isAuthenticated ? (
                        <>
                            <li className="font-Caveat text-3xl">
                                {/* Bienvenido {user.username} */}
                                Bienvenido
                            </li>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button
                                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-sky-100 px-3 py-2 font-Caveat text-base ring-0 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-white">
                                        {/* <IoBagSharp className="-mr-1 h-5 w-5" /> */}
                                        {user.username}
                                        <IoCaretDownOutline className="-mr-1 h-5 w-5 text-cyan-600 hover:text-white" aria-hidden="true" />
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
                                                            to='/pets'
                                                            className={classNames(
                                                                active ? 'bg-sky-200 font-Caveat text-xl' : 'font-Caveat text-xl',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                        <MdPets className="h-5 w-8 inline-flex" />Mis Mascotas
                                                        </Link>
                                                    )
                                                }
                                            </Menu.Item>
                                            <Menu.Item>
                                                {
                                                    ({ active }) => (
                                                        <Link
                                                            to='/add-pet'
                                                            className={classNames(
                                                                active ? 'bg-sky-200 font-Caveat text-xl' : 'font-Caveat text-xl',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                        <MdGames className="h-5 w-8 inline-flex" />Agregar Mascota
                                                        </Link>
                                                    )
                                                }
                                            </Menu.Item>
                                            <Menu.Item>
                                                {
                                                    ({ active }) => (
                                                        <Link
                                                            onClick={()=>{logout()}}
                                                            to='/'
                                                            className={classNames(
                                                                active ? 'bg-sky-200 font-Caveat text-xl' : 'font-Caveat text-xl',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                        <MdLogout className="h-5 w-8 inline-flex" />Cerrar Sesión
                                                        </Link>
                                                    )
                                                }
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            {/* <li>
                                <Link to='/add-pet'
                                    className="bg-transparent hover:bg-cyan-600 text-sky-500
                                    font-semibold hover:text-white mb-2 py-1 px-2 border border-cyan-600 hover:border-transparent rounded"
                                >Agregar Mascota</Link>
                            </li> */}
                            {/* <li>
                                <Link to='/'
                                    className="bg-transparent hover:bg-cyan-600 text-sky-500
                                    font-semibold hover:text-white mb-2 py-1 px-2 border border-cyan-600 hover:border-transparent rounded"
                                    onClick={()=>{logout()}}>Cerrar Sesión</Link>
                            </li> */}
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/login'
                                    className="bg-transparent hover:bg-cyan-600 text-sky-500
                                        font-semibold hover:text-white mb-2 py-1 px-2 border border-cyan-600 hover:border-transparent rounded"
                                >Login</Link>
                            </li>
                            <li>
                                <Link to='/register'
                                    className="bg-transparent hover:bg-cyan-600 text-sky-500
                                    font-semibold hover:text-white mb-2 py-1 px-2 border border-cyan-600 hover:border-transparent rounded"
                                >Registro</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}

export default Navbar