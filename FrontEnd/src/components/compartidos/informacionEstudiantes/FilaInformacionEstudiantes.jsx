import React, { useContext } from "react";
//Para abrir detalles de estudiantes
import { useNavigate } from "react-router-dom";
import { MainControllerContext } from "../../../contexts/MainControllerContext";
function FilaInformacionEstudiante({ estudiante, index }) {
  const { profesores } = useContext(MainControllerContext);
  const navigate = useNavigate();

  if (estudiante == {}) return <tr></tr>;

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/informacionEstudiante", { state: { estudiante: estudiante } });
  };
  const styleRow =
    "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900";
  const styleFilas =
    index % 2 === 0
      ? "bg-gray-200 hover:bg-blue-300"
      : "bg-gray-100 hover:bg-blue-300";
  return (
    <tr onDoubleClick={handleClick} className={styleFilas}>
      <td className={styleRow}>
        {estudiante.nombre} {estudiante.nombre2} {estudiante.apellido1}{" "}
        {estudiante.apellido2}
      </td>
      <td className={styleRow}>{estudiante.carnet}</td>
      <td className={styleRow}>{estudiante.campus}</td>
      <td className={styleRow}>{estudiante.estado}</td>
    </tr>
  );
}

export default FilaInformacionEstudiante;
