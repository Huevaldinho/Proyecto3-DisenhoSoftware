import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaInformacionEstudiantes from "../../components/compartidos/informacionEstudiantes/TablaInformacionEstudiantes";
import { MainControllerContext } from "../../contexts/MainControllerContext";
import Role from "../../services/enums/role";
function InformacionEstudiantes(props) {
  const { usuario, setUsuario } = useContext(MainControllerContext);
  const navigate = useNavigate();

  const handleAgregarEstudiante = (e) => {
    e.preventDefault();
    navigate("/agregarEstudiante");
  };
  const handleClickReturnMenuProfesores = (e) => {
    e.preventDefault();
    navigate("/menuProfesores");
  };
  const handleClickReturnMenuAsistentes = (e) => {
    e.preventDefault();
    navigate("/menuAsistentes");
  };
  let storedUser = usuario;
  const updateState = () => {
    setTimeout(() => {
      storedUser = JSON.parse(localStorage.getItem("usuario"));
      try {
        JSON.parse(storedUser);
      } catch (error) {
        setUsuario(storedUser);
      }
    }, 1000);
  };

  // Efecto que actualiza el estado de myState después de que el componente ha sido montado
  useEffect(() => {
    updateState();
  }, []);

  if (storedUser == null) return <p>Cargando</p>;

  return (
    <div className="container m-auto">
      <div className="text-center" id="nombrePlanConteiner">
        <h1 className="text-center font-bold text-5xl p-5">Estudiantes</h1>
      </div>
      <div className="text-center m-auto" id="tablaActividades">
        {/*Las actividades se las pasa a la tabla por props */}
        <TablaInformacionEstudiantes />
      </div>
      <div
        className="text-center rounded-md bg-green-500 p-2 m-3 h-auto w-auto hover:bg-green-800"
        id="containerBotonAgregarActividad"
        hidden={storedUser.rol === Role.ASISTENTE ? false : true}
      >
        {/*Boton para agregar una actividad nueva, solo para asistentes*/}
        <button
          className="text-center w-full h-full"
          onClick={handleAgregarEstudiante}
        >
          Agregar Estudiantes
        </button>
      </div>

      <div
        className="text-center rounded-md bg-red-500 p-2 m-3 h-auto w-auto hover:bg-red-800"
        id="containerBotonAgregarActividad"
      >
        {/*Boton para regresar la menu profesores*/}
        {storedUser.rol === Role.PROFESOR ? (
          <button
            className="text-center w-full h-full"
            onClick={handleClickReturnMenuProfesores}
          >
            Regresar al Menú de Profesores
          </button>
        ) : (
          <button
            className="text-center w-full h-full"
            onClick={handleClickReturnMenuAsistentes}
          >
            Regresar al Menú de Asistentes
          </button>
        )}
      </div>
    </div>
  );
}

export default InformacionEstudiantes;
