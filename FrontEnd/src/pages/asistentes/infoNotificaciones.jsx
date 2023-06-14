import React from "react";
import { MainControllerContext } from "../../contexts/MainControllerContext";
import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TablaNotificacion from "../../components/compartidos/notificaciones/TablaNotificaciones.jsx";
function infoChats(props) {
  const { notificaciones, obtenerNotificaciones} = useContext(
    MainControllerContext
  );
  let navigate = useNavigate();

  const updateState = () => {
    setTimeout(() => {
        obtenerNotificaciones();
    }, 1000);
  };
  useEffect(() => {
    updateState();
  }, []);
  console.log("Viendo que tiene noti en infoNoti", notificaciones)
  if (notificaciones.length === 0) {
    return (
      <>
        <p className="text-center text-5xl font-bold">
          No hay notificaciones disponibles
        </p>
        <div className="text-center">
          <button
            className=" bg-red-500 rounded-xl p-3 m-2"

          >
            Regresar
          </button>
        </div>
      </>
    );
  }
  
  if (notificaciones.length == 0) {
    return (
      <>
        <div className="text-center font-bold text-4xl text-red-500 p-2 m-2">
          No hay notificaciones para mostrar.
        </div>
        <div className="text-center">
          <button
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
        <h1 className="text-center font-bold text-5xl p-5">
          Notificaciones
        </h1>
      </div>
      <div className="text-center" id="tablaProfesores">
        {/*Las actividades se las pasa a la tabla por props */}
        <TablaNotificacion notificaciones={notificaciones} />
      </div>
    </div>
  );
}

export default infoChats;