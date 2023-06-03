import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormularioModificarProfesor from "../../components/profesores/FormularioModificarProfesor";

function InformacionProfesor(props) {
  const navigate=useNavigate();
  /*
   *Quien llama a esta llamada es el menu de profesores,
   *ahi es donde se encuentra la informacion del estudiante que se desea
   *modificar.
   */
   const handleClick = (e) => {
    e.preventDefault();
    navigate("/infoProfesores");
  };
  return (
    <div className="container m-auto">
      <h1 className="p-4 m-3 text-center font-bold text-4xl">
        Información de Profesor
      </h1>
      <FormularioModificarProfesor />
      <div className="text-center">
        <button
          className="text-center bg-red-500 hover:bg-red-800  rounded-xl p-3 m-2"
          onClick={handleClick}
        >
          Regresar 
        </button>
      </div>
    </div>
  );
}

export default InformacionProfesor;