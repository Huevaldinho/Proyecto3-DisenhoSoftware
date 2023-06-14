import React from "react";
import { useLocation } from "react-router-dom";

const DetallesNotificacion = () => {
  const location = useLocation();
  const notificacion = location.state.notificacion;

  const marcarNoLeida = () => {
    // Aquí puedes agregar la lógica para marcar la notificación como no leída
    console.log("Notificación marcada como no leída:", notificacion);
  };

  return (
    <div className="bg-white shadow-md p-8 rounded-lg text-center">
      <p className="text-lg font-bold mb-4">Detalles de la Notificación</p>
      <p>
        <span className="font-semibold">Emisor:</span> {notificacion.emisor.nombre}
      </p>
      <p>
        <span className="font-semibold">Asunto:</span> {notificacion.asunto}
      </p>
      <p>
        <span className="font-semibold">Mensaje:</span> {notificacion.cuerpo}
      </p>
      <p>
        <span className="font-semibold">Fecha y hora:</span> {notificacion.fecha} {notificacion.hora}
      </p>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={marcarNoLeida}
      >
        Marcar como no leída
      </button>
    </div>
  );
};

export default DetallesNotificacion;
