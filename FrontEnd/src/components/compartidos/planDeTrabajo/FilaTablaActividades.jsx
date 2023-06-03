import React from "react";
//Para abrir detalles de actividad
import { useNavigate } from "react-router-dom";

function FilaTablaActividades({ actividad, index }) {
  const navigate = useNavigate();
  if (actividad == {}) return <tr></tr>;

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/detallesActividad", { state: { actividad: actividad } });
  };
  const styleRow =
    "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900";
  const styleFilas =
    index % 2 === 0
      ? "bg-gray-200 hover:bg-blue-300"
      : "bg-gray-100 hover:bg-blue-300";
  return (
    <tr onDoubleClick={handleClick} className={styleFilas}>
      <td className={styleRow}>{actividad.nombre}</td>
      <td className={styleRow}>{actividad.fechaHora}</td>
      <td className={styleRow}>{actividad.semana}</td>
      <td className={styleRow}>{actividad.tipoActividad}</td>
      <td className={styleRow}>{actividad.estado}</td>
    </tr>
  );
}

export default FilaTablaActividades;
