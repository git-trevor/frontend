// Importamos librerias de react router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importamos las páginas de registro y login
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PetsPage from "./pages/PetsPage";
import PetsFormPage from "./pages/PetsFormPage";
import ProfilePage from "./pages/ProfilePage";
import InfoPetPage from './pages/InfoPetPage';

// Importamos contextos
import { AccessProvider } from "./context/AccessContext";
import { PetsProvider } from "./context/PetsContext";

// Importamos componente para rutas protegidas
import ProtectedRoutes from "./ProtectedRoutes";

// Importamos la barra de navegación
import Navbar from "./components/Navbar";

function App(){
  return(
    <AccessProvider>
      <PetsProvider>
        <BrowserRouter>
          <main className="container max-auto px-5">
            <Navbar/>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoutes />}>
                {/* [Inicio] Páginas con acceso protegido por login */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/pets" element={<PetsPage />} />
                <Route path="/add-pet" element={<PetsFormPage />} />
                <Route path="/pet/:id" element={<PetsFormPage />} />
                <Route path="/petsInfo/:id" element={<InfoPetPage />} />
                {/* [Fin] Páginas con acceso protegido por login */}
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </PetsProvider>
    </AccessProvider>
  )
}

export default App