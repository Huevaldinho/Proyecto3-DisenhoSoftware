import React from "react";
//Para abrir detalles de actividad
import { useNavigate } from "react-router-dom";

function FilaRespuesta({ respuesta, index }) {
  if (respuesta == {}) return <tr></tr>;
  const styleRow =
    "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900";
  const styleFilas =
    index % 2 === 0
      ? "bg-gray-200 hover:bg-blue-300"
      : "bg-gray-100 hover:bg-blue-300";
  if (respuesta.idRespuesta != null)
    return (
      <tr className={styleFilas}>
        <td className={styleRow}>{respuesta.descripcion}</td>
        <td className={styleRow}>{respuesta.autor}</td>
        <td className={styleRow}>{respuesta.fecha}</td>
      </tr>
    );
}

export default FilaRespuesta;
