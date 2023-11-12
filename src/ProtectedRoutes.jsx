// Importamos Navigate, que nos permite redireccionar la aplicación
import { Navigate, Outlet } from 'react-router-dom';

// Importo la función useAccess desde el contexto AccessContext
import { useAccess } from './context/AccessContext';

function ProtectedRoutes(){
    const { isAuthenticated, loading } = useAccess();

    console.log("Loading: " + loading);
    console.log("isAthenticated: " + isAuthenticated);

    // Si la aplicación se esta cargando mandamos un mensaje a pantalla
    if(loading){
        return <h1>Cargando...</h1>
    }

    // Verificamos si se inicio sesión
    if(!isAuthenticated && !loading)
        return <Navigate to="/login" replace />

    return(
        <Outlet />
    )
}

export default ProtectedRoutes