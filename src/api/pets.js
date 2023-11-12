import axios from './axios';

// Llamada al backend de MediPet para obtener todas las mascotas
export const getPetsRequest = () => axios.get('/pets');

// Llamada al backend de MediPet para obtener una mascota por id
export const getPetRequest = (id) => axios.put('/pets/' + id);

// Llamada al backend de MediPet para registrar una mascota
export const createPetRequest = (pet) => axios.post('/pets', pet);

// Llamada al backend de MediPet para completar la información de la mascota
export const completeInfoPetRequest = (id, petInfo) => axios.post('/petsInfo/' + id, petInfo);

// Llamada al backend de MediPet para obtener la información de la mascota
export const getInfoPetRequest = (id) => axios.put('/petsInfo/' + id);

// Llamada al backend de MediPet para eliminar una mascota por id
export const deletePetRequest = (id) => axios.delete('/pets/' + id);

// Llamada al backend de MediPet para editar información de una mascota por id
export const updatePetRequest = (id, product) => axios.put('/pets/' + id, product);