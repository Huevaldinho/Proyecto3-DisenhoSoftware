import React, { useContext } from "react";
//Para abrir detalles de actividad
import { useNavigate } from "react-router-dom";
import { MainControllerContext } from "../../../contexts/MainControllerContext";

function FilaNotificacion({ notificacion, index }) {
  const { usuario, modificarNotificacion } = useContext(MainControllerContext);
  const navigate = useNavigate();

  if (notificacion === undefined || notificacion == {})
    return <tr>Ha ocurrido un error, intente otra vez.</tr>;

  const handleClick = (e) => {
    e.preventDefault();
    for (let i = 0; i < notificacion.receptores.length; i++) {
      if (notificacion.receptores[i]._id === usuario._id) {
        notificacion.receptores[i].estado = "LEIDA";
        break;
      }
    }
    modificarNotificacion(notificacion);

    navigate("/detallesNotificacion", {
      state: { notificacion: notificacion },
    });
  };

  const styleRow =
    "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900";

  const styleFilas =
    index % 2 === 0
      ? "bg-gray-200 hover:bg-blue-300"
      : "bg-gray-200 hover:bg-blue-300";

  let estado;
  notificacion.receptores.forEach((receptor) => {
    if (receptor._id === usuario._id) {
      estado = receptor.estado;
    }
  });

  return (
    <tr onDoubleClick={handleClick} className={styleFilas}>
      <td className={styleRow}>{notificacion.emisor.nombre}</td>
      <td className={styleRow}>
        {estado === "NO_LEIDA" ? "No leída" : "Leída"}
      </td>
      <td className={styleRow}>{notificacion.asunto}</td>
      <td className={styleRow}>{notificacion.fecha}</td>
    </tr>
  );
}

export default FilaNotificacion;
