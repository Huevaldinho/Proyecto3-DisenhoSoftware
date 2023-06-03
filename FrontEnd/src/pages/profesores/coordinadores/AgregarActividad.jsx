import React from "react";
import { useNavigate } from "react-router-dom";
import FormularioAgregarActividad from "../../../components/profesores/coordinadores/agregarActividad/FormularioAgregarActividad";

function AgregarActividad(props) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/planDeTrabajo");
  };

  return (
    <div className="text-center">
      {/*Texto */}
      <div>
        <h1 className="text-center font-semi p-3 m-3 text-5xl">
          Agregar actividad
        </h1>
      </div>
      <FormularioAgregarActividad />
      {/*Boton regreso a plan de trabajo */}
      <div className="text-center w-full">
        <button
          className="text-center bg-red-500 hover:bg-red-800  rounded-xl p-3 m-2"
          onClick={handleClick}
        >
          Regresar a Plan de Trabajo
        </button>
      </div>
    </div>
  );
}

export default AgregarActividad;
