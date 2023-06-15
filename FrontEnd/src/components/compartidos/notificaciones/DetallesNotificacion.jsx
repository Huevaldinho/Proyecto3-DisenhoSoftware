import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MainControllerContext } from "../../../contexts/MainControllerContext";

const DetallesNotificacion = () => {
  const { usuario, modificarNotificacion } = useContext(MainControllerContext);

  const navigate = useNavigate();
  const location = useLocation();
  const notificacion = location.state.notificacion;

  

  const marcarNoLeida = () => {
    for (let i = 0; i < notificacion.receptores.length; i++) {
      if (notificacion.receptores[i]._id === usuario._id) {
        notificacion.receptores[i].estado = "NO_LEIDA";
        break;
      }
    }
    modificarNotificacion(notificacion);
    alert("Se ha marcado como no leida.");
  };

  const handleRegresar = (e) => {
    e.preventDefault();
    navigate("/infoNotificaciones");
  };
  return (
    <div className="bg-white shadow-md p-8 rounded-lg text-center">
      <div>
        {" "}
        <div className="">
          <p className="text-lg font-bold m-2">Detalles de la Notificación</p>
        </div>
        <p>
          <span className="font-semibold">Emisor:</span>{" "}
          {notificacion.emisor.nombre}
        </p>
        <p>
          <span className="font-semibold">Asunto:</span> {notificacion.asunto}
        </p>
        <p>
          <span className="font-semibold">Mensaje:</span> {notificacion.cuerpo}
        </p>
        <p>
          <span className="font-semibold">Fecha y hora:</span>{" "}
          {notificacion.fecha} {notificacion.hora}
        </p>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          onClick={marcarNoLeida}
        >
          Marcar como no leída
        </button>
      </div>
      <div className="text-center p-2 m-2">
        <button
          onClick={handleRegresar}
          className="rounded text-center p-1 bg-red-500 hover:bg-red-900"
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default DetallesNotificacion;
