import React, { useContext, useEffect } from "react";
//Para abrir detalles de actividad
import { useNavigate } from "react-router-dom";
import { MainControllerContext } from "../../../contexts/MainControllerContext";
import Role from "../../../services/enums/role";
function FilaInfoProfesores({ profesor, index }) {
  const { asignarAsistente, usuario, setUsuario, consultarProfesores } =
    useContext(MainControllerContext);
  const navigate = useNavigate();
  if (profesor == {}) return <tr></tr>;

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/informacionProfesor", { state: { profesor: profesor } });
  };
  const handleAsignarAsistente = async (e) => {
    console.log("Asignar asisente ejecutado");
    e.preventDefault();
    let respuesta = await asignarAsistente(profesor.codigo, profesor.campus);
    //No hubo errores.
    if (Object.keys(respuesta).length !== 0) {
      alert("Asistente asignado correctamente.");
      navigate("/infoProfesores");
    } else
      alert("No se ha podido modificado asignar asistente, intente de nuevo.");
  };
  const styleRow =
    "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900";
  const styleFilas =
    index % 2 === 0
      ? "bg-gray-200 hover:bg-blue-300"
      : "bg-gray-100 hover:bg-blue-300";

  let storedUser = usuario;
  const updateState = () => {
    setTimeout(() => {
      storedUser = JSON.parse(localStorage.getItem("usuario"));
      try {
        JSON.parse(storedUser);
      } catch (error) {
        setUsuario(storedUser);
      }
    }, 1000);
  };

  // Efecto que actualiza el estado de myState después de que el componente ha sido montado
  useEffect(() => {
    updateState();
  }, []);

  if (storedUser == null) return <p>Cargando</p>;

  return (
    <tr onDoubleClick={handleClick} className={styleFilas}>
      <td className={styleRow}>{profesor.codigo}</td>
      <td className={styleRow}>
        {profesor.nombre} {profesor.nombre2} {profesor.apellido1}{" "}
        {profesor.apellido2}
      </td>
      <td className={styleRow}>{profesor.rol}</td>

      <td className={styleRow}>{profesor.campus}</td>
      <td className={styleRow}>
        {profesor.estado == "Activo" ? "Activo" : "Inactivo"}
      </td>
      <td className={styleRow}>
        {profesor.coordinador == "NOCOORDINADOR" ? "No" : "Si"}
      </td>
      <td
        hidden={storedUser.rol === Role.SUPERUSUARIO ? false : true}
        className={styleRow}
      >
        <button
          onClick={handleAsignarAsistente}
          disabled={usuario.rol === Role.SUPERUSUARIO ? false : true}
          className="text-center bg-green-500 hover:bg-green-800 rounded-md p-1 "
        >
          Asignar
        </button>
      </td>
    </tr>
  );
}

export default FilaInfoProfesores;
