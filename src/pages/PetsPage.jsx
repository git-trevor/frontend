import { useEffect } from "react"
import { usePets } from "../context/PetsContext"
import PetCard from "../components/PetCard";

// Importamos Navigate, que nos permite redireccionar la aplicación
import { useNavigate } from 'react-router-dom';

// Importo iconos que utilizare
import { PiPawPrint } from "react-icons/pi";

function PetsPage(){
    const { getPets, pets } = usePets();
    const navigate = useNavigate();

    // Ejecuto la función getPets después de cargar el componente
    useEffect(()=>{
        getPets();
    }, [])

    if(pets.length === 0){
        return(
            <div className="flex items-center justify-center h-screen">
                <div className="bg-sky-100 max-w-md w-full p-10 rounded-full">
                    <h1 className="text-center text-5xl font-Caveat">MediPet</h1>
                    <div className="flex items-center justify-between font-Caveat text-xl">
                        <PiPawPrint size={25} />No tienes mascotas registradas<PiPawPrint size={25} />
                    </div>
                    <div>
                        <p className="text-center text-xl font-Caveat">
                            Te invitamos a registrar tus mascotas dando click en el botón que se encuentra en la parte superior a la derecha.
                        </p>
                        <hr className="my-5 h-px border-t-2" />
                        <p className="text-center text-xs">
                            MidnaSw &#9400; 2023 Derechos Reservados
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="h-screen">
            <div className="bg-sky-100 p-0 m-3 rounded-3xl">
                <h1 className="text-center text-5xl font-Caveat">Tus Mascotas</h1>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
                {
                    pets.map((pets)=>(
                        <PetCard pet={pets}
                            key={pets._id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default PetsPage