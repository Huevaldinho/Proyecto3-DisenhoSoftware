import React, { useContext, useEffect } from "react";
import { MainControllerContext } from "../../contexts/MainControllerContext";
import { useNavigate } from "react-router-dom";
import TablaNotificacion from "../../components/compartidos/notificaciones/TablaNotificaciones.jsx";

function InfoNotificaciones(props) {
  const { notificaciones, obtenerNotificaciones, usuario, setUsuario } =
    useContext(MainControllerContext);

  let navigate = useNavigate();

  let storedUser = usuario;
  const updateUsuario = () => {
    storedUser = JSON.parse(localStorage.getItem("usuario"));
    try {
      JSON.parse(storedUser);
    } catch (error) {
      setUsuario(storedUser); //Almacena usuario
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      updateUsuario();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateState = () => {
    setTimeout(() => {
      if (storedUser != null) obtenerNotificaciones(storedUser);
    }, 1000);
  };

  useEffect(() => {
    updateState();
  }, []);

  if (storedUser === null) {
    return <p className="text-5xl text-center font-bold">Cargando...</p>;
  }

  const handleRegresar = (e) => {
    e.preventDefault();
    if (storedUser.rol === "Asistente") navigate("/menuAsistentes");
    else if (storedUser.rol === "Profesor") navigate("/menuProfesores");
    else if (storedUser.rol === "Estudiante") navigate("/menuEstudiantes");
  };

  if (notificaciones.length === 0) {
    return (
      <>
        <div className="text-center font-bold text-4xl text-black p-2 m-2">
          No hay notificaciones para mostrar.
        </div>
        <div className="text-center">
          <button
            onClick={handleRegresar}
            className="text-center bg-red-500 hover:bg-red-800  rounded-xl p-3 m-2"
          >
            Regresar
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="container m-auto">
      <div className="text-center" id="nombrePlanConteiner">
        <h1 className="text-center font-bold text-5xl p-5">Notificaciones</h1>
      </div>
      <div className="text-center" id="tablaProfesores">
        {/*Las actividades se las pasa a la tabla por props */}
        <TablaNotificacion notificaciones={notificaciones} />
        <div className="text-center">
          <button
            onClick={handleRegresar}
            className="text-center bg-red-500 hover:bg-red-800  rounded-xl p-3 m-2"
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoNotificaciones;
