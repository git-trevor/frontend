import axios from './axios';

// Llamada al backend de MediPet para registrar usuarios
export const registerRequest = user => axios.post('/registro', user);

// Llamada al backend de MediPet para iniciar sesión
export const loginRequest = user => axios.post('/login', user);

// Llamada al backend de MediPet para verficar el token
export const verifyTokenRequest = user => axios.get('/verify');

// Llamada al backend de MediPet para cerrar sesión
export const logoutRequest = () => axios.post('/logout');