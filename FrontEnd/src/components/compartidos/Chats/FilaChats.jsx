import React from "react";
//Para abrir detalles de actividad
import { useNavigate } from "react-router-dom";

function FilaChats({ chat, index }) {
  const navigate = useNavigate();
  if (chat===undefined || chat == {}) return <tr></tr>;

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/detallesChat", {
      state: { mensajes: chat.mensajes }, // Pasar chat.mensajes como parte del estado
    });
  };
  const styleRow =
    "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900";
  const styleFilas =
    index % 2 === 0
      ? "bg-gray-200 hover:bg-blue-300"
      : "bg-gray-100 hover:bg-blue-300";
  return (
    <tr onDoubleClick={handleClick} className={styleFilas}>
      <td className={styleRow}>{chat._id}</td>
      <td className={styleRow}>{chat.nombre}</td>
    </tr>
  );
}

export default FilaChats;



