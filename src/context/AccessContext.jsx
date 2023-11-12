// Importamos componentes que mantendran el estado de las variables en memoria.
import { createContext, useState, useContext, useEffect } from "react";

// Importo la petición de registro
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/access";

// Importamos libreria para validar cookies
import Cookies from 'js-cookie'

export const AccessContext = createContext();

export const useAccess = ()=>{
    const context = useContext(AccessContext);

    if(!context){
        throw new Error('useAccess debe estar definido en un contexto.');
    }

    return context;
}

export const AccessProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para crear usuarios
    const signup = async (user)=>{
        try{
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch(error){
            // Si existe un error al registrar un usuario lo guardamos en la variable.
            setErrors(error.response.data.message);
        }
    }

    // Función para iniciar sesión
    const signin = async (user)=>{
        try{
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch(error){
            // Si existe un error al registrar un usuario lo guardamos en la variable.
            setErrors(error.response.data.message);
        }
    }

    // Función para cerrar la sesión
    const logout = ()=>{
        logoutRequest();
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(()=>{
        if(errors.length > 0){
            const timer = setTimeout(()=>{
            setErrors([]);
        }, 3000);

        return ()=> clearTimeout(timer);
        }
    }, [errors]);

    useEffect(()=>{
        async function checkLogin(){
            const cookies = Cookies.get();

            if(!cookies.token){
                // Si no hay una cookie, el usuario no esta autenticado
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try{
                const res = await verifyTokenRequest(cookies.token);

                // Si el servior no responde con un token
                if(!res.data){
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch(error){
                console.log(error);
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
            }
        }
        checkLogin();
    }, [])

    return(
        <AccessContext.Provider value={{
            signup,
            user,
            isAuthenticated,
            errors,
            signin,
            loading,
            logout
        }}>
            {children}
        </AccessContext.Provider>
    )    
}