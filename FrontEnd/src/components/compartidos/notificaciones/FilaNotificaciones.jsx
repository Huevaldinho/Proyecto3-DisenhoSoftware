import React from "react";
//Para abrir detalles de actividad
import { useNavigate } from "react-router-dom";

function FilaNotificacion({ notificacion, index }) {
  const navigate = useNavigate();
  if (notificacion===undefined || notificacion == {}) return <tr>Ha ocurrido un error, intente otra vez.</tr>;

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/detallesNotificacion", {
      state: { notificacion: notificacion}, // Pasar chat.mensajes como parte del estado
    });
  };
  const styleRow =
    "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hover:bg-blue-900";
  const styleFilas =
    index % 2 === 0
      ? "bg-gray-200 hover:bg-blue-300"
      : "bg-gray-100 hover:bg-blue-300";
  return (
    <tr onDoubleClick={handleClick} className={styleFilas}>
      <td className={styleRow}>{notificacion.emisor.nombre}</td>
      <td className={styleRow}>{notificacion.asunto}</td>
      <td className={styleRow}>{notificacion.fecha}</td>
    </tr>
  );
}

export default FilaNotificacion;
