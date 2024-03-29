import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { MainControllerContext } from "../../contexts/MainControllerContext";
function MenuEstudiantes() {
  const { proximaActividad } = useContext(MainControllerContext);

  const navigate = useNavigate(); //* Para redireccionar.
  const handleChats = (e) => {
    e.preventDefault();
    navigate("/infoChats");
  };
  const handleNotificaciones = (e) => {
    e.preventDefault();
    navigate("/infoNotificaciones");
  };

  const handlePlanDeTrabajo = (e) => {
    e.preventDefault();
    navigate("/planDeTrabajo");
  };
  const handleSalir = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const handleActividadMasProxima = async (e) => {
    e.preventDefault();
    console.log("Proxima actividad");
    let actividadMasProxima = await proximaActividad();
    if (actividadMasProxima != null) {
      navigate("/detallesActividad", {
        state: { actividad: actividadMasProxima },
      });
    }
  };

  const estiloBotones =
    "text-center p-3 m-3bg-blue-600 border-collapse shadow-xl hover:bg-green-600 bg-blue-600 rounded-3xl";
  return (
    <div className="container p-5 m-3">
      <h1 className="text-center font-bold text-5xl">Menú Estudiantes </h1>
      <div
        id="containerBotonInformacionEquipoGuia"
        className="text-center p-2 m-2 "
      >
        <div id="containerBotonPlanDeTrabajo" className="p-5 m-3">
          <button className={estiloBotones} onClick={handlePlanDeTrabajo}>
            Plan de Trabajo
          </button>
        </div>
        <div id="containerBotonInformacionEstudiantes" className="p-5 m-3">
          <button className={estiloBotones} onClick={handleActividadMasProxima}>
            Proxima actividad
          </button>
        </div>
        <div id="containerBotonChats" className="p-5 m-3">
          <button className={estiloBotones} onClick={handleChats}>
            Chats
          </button>
        </div>
        <div id="containerBotonChats" className="p-5 m-3">
          <button className={estiloBotones} onClick={handleNotificaciones}>
            Notificaciones
          </button>
        </div>
        <div className="text-center">
          <button
            className="text-center rounded-xl p-3 m-2 bg-red-500 hover:bg-red-800  "
            onClick={handleSalir}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuEstudiantes;
