// Importamos componentes que mantendran el estado de las variables en memoria.
import { createContext, useContext, useState } from "react";

// Importo las funciones de llamada al backend
import { createPetRequest, getPetsRequest, deletePetRequest, getPetRequest, updatePetRequest,
    completeInfoPetRequest, getInfoPetRequest } from "../api/pets";

const PetsContext = createContext();

export const usePets = ()=>{
    const context = useContext(PetsContext);

    if(!context){
        throw new Error("usePets debe estar dentro de un PetsProvider.")
    }

    return context;
}

export function PetsProvider({children}){
    const [pets, setPets] = useState([]);

    // Función para registrar una mascota
    const createPet = async(pet)=>{
        try{
            await createPetRequest(pet);
            getPets();
        } catch(error){
            console.log(error);
        }
    }

    // Función para obtener las mascotas
    const getPets = async()=>{
        try{
            const res = await getPetsRequest();

            // Asignamos la respuesta del backend al areglo de mascotas
            setPets(res.data);
        } catch(error){
            console.log(error);
        }
    }

    // Función para eliminar una mascota de la base de datos
    const deletePet = async(id)=>{
        try{
            const res = await deletePetRequest(id);

            if(res.status === 200){
                setPets(pets.filter(pet => pets._id != id));
                getPets();
            }
        } catch(error){
            console.log(error);
        }
    }

    // Función para obtener una mascota por id
    const getPet = async(id)=>{
        try{
            const res = await getPetRequest(id);
            return res.data;
        } catch(error){
            console.log(error);
        }
    }

    // Función para actualizar la info de la mascota
    const updatePet = async(id, pet)=>{
        try{
            await updatePetRequest(id, pet);
        } catch(error){
            console.log(error);
        }
    }

    // Función para completar info de una mascota
    const completePet = async(id, petInfo)=>{
        try{
            await completeInfoPetRequest(id, petInfo);
        } catch(error){
            console.log(error);
        }
    }

    // Función para obtener info de una mascota por id
    const getInfoPet = async(id)=>{
        try{
            const res = await getInfoPetRequest(id);

            return res.data;
        } catch(error){
            console.log(error);
        }
    }

    return(
        <PetsContext.Provider value={{
            pets,
            createPet,
            getPets,
            deletePet,
            getPet,
            updatePet,
            completePet,
            getInfoPet
        }}>
            {children}
        </PetsContext.Provider>
    )
}