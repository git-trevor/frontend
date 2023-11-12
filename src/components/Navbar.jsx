import { Link } from "react-router-dom"
import { useAccess } from "../context/AccessContext"

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
                            <li className="font-Caveat text-xl">
                                Bienvenido {user.username}
                            </li>
                            <li>
                                <Link to='/add-pet'
                                    className="bg-transparent hover:bg-cyan-600 text-sky-500
                                    font-semibold hover:text-white mb-2 py-1 px-2 border border-cyan-600 hover:border-transparent rounded"
                                >Agregar Mascota</Link>
                            </li>
                            <li>
                                <Link to='/'
                                    className="bg-transparent hover:bg-cyan-600 text-sky-500
                                    font-semibold hover:text-white mb-2 py-1 px-2 border border-cyan-600 hover:border-transparent rounded"
                                    onClick={()=>{logout()}}>Cerrar Sesión</Link>
                            </li>
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