import { BrowserRouter, Routes, Route } from "react-router-dom";

//!Para poder declarar las rutas hay que importar el archivo al cual va a redireccionar la ruta.
//Otras pages
import NotFound from "../pages/otrasPages/NotFound";
//Auth
import Login from "../pages/auth/Login";
import CambiarContraseanna from "../pages/auth/CambiarContraseanna";
//Profesores
import InformacionEstudiante from "../pages/profesores/InformacionEstudiante";
import AgregarEstudiante from "../pages/profesores/AgregarEstudiante";
import MensajeGenerarReporte from "../pages/manejoExcel/MensajeGenerarReporte";
import MenuProfesoresGuia from "../pages/profesores/MenuProfesoresGuia";
import InformacionEstudiantesProfesores from "../pages/profesores/InformacionEstudiantesProfesores";
import CargarExcel from "../pages/manejoExcel/CargarExcel";
import InfoProfesores from "../pages/profesores/InfoProfesores";
import InformacionProfesor from "../pages/asistentes/InformacionProfesor";
//Coordinadores
import MenuAsistentes from "../pages/asistentes/MenuAsistentes";
import PlanDeTrabajo from "../pages/compartidas/PlanDeTrabajo";
import DetallesActividad from "../pages/compartidas/DetallesActividad";
import AgregarActividad from "../pages/profesores/coordinadores/AgregarActividad";
import { Navigate } from "react-router-dom";
import RegistrarProfesor from "../pages/asistentes/RegistrarProfesor";
import ListaComentarios from "../components/profesores/ListaComentarios";
import ListaRespuestas from "../components/profesores/ListaRespuestas";
import AgregarComentario from "../components/profesores/AgregarComentario";
import AgregarRespuesta from "../components/profesores/AgregarRespuesta";
import MenuSuperUsuario from "../pages/superUsuario/MenuSuperUsuario";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Ruta al iniciar aplicacion es login. */}
        <Route index element={<Navigate to="/login" />} />

        {/*Menu super usuario */}
        <Route path="/menuSuperUsuario" element={<MenuSuperUsuario />} />

        {/*Inicio routues de COMPARTIDAS */}
        <Route path="/planDeTrabajo" element={<PlanDeTrabajo />} />
        <Route path="/detallesActividad" element={<DetallesActividad />} />
        <Route path="/listaComentarios" element={<ListaComentarios />} />
        <Route path="/listaRespuestas" element={<ListaRespuestas />} />
        <Route path="/agregarComentario" element={<AgregarComentario />} />
        <Route path="/agregarRespuesta" element={<AgregarRespuesta />} />

        {/*Inicio routes de ESTUDIANTES */}
        <Route
          path="/mensajeGenerarReporte"
          element={<MensajeGenerarReporte />}
        />
        <Route
          path="/InformacionEstudiante"
          element={<InformacionEstudiante />}
        />
        <Route path="/agregarEstudiante" element={<CargarExcel />} />

        {/*Inicio routes de PROFESORES */}
        <Route
          path="/informacionEstudiantesProfesores"
          element={<InformacionEstudiantesProfesores />}
        />
        <Route path="/menuProfesores" element={<MenuProfesoresGuia />} />
        <Route path="/infoProfesores" element={<InfoProfesores />}></Route>
        <Route path="/informacionProfesor" element={<InformacionProfesor />} />
        <Route path="/registrarProfesor" element={<RegistrarProfesor />} />

        {/*Inicio routes de COORDINADORES */}
        <Route path="/agregarActividad" element={<AgregarActividad />} />

        {/*Inicio routues de ASISTENTES */}
        <Route path="/menuAsistentes" element={<MenuAsistentes />} />

        {/*Inicio routues de AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/cambiarContrasenna" element={<CambiarContraseanna />} />

        {/*Routes EXCEL */}
        <Route path="/cargarExcel" element={<CargarExcel />} />

        {/*Rutas NO ENCONTRADAS */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
