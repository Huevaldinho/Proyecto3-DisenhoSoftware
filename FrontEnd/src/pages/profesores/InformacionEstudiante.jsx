import React from "react";
import FormularioInformacionEstudiante from "../../components/profesores/FormularioInformacionEstudiante";
import { useNavigate } from "react-router-dom";
/**
 * Este componente es la pagina que se mostrara cuando se necesite
 * modificar la informacion de un estudiante.
 * Esta modificacion incluye poner en estado inactivo al estudiante,
 * es decir, tambien funciona para eliminar a un estudiante.
 *
 * @returns Pagina para modificar o eliminar a un estudiante.
 *
 */
function InformacionEstudiante(props) {
  const nagivate = useNavigate();
  /*
   *Quien llama a esta llamada es el menu de profesores,
   *ahi es donde se encuentra la informacion del estudiante que se desea
   *modificar.
   */
  const handleClick = (e) => {
    e.preventDefault();
    nagivate("/informacionEstudiantesProfesores");
  };
  return (
    <div className="container m-auto">
      <h1 className="p-4 m-3 text-center font-bold text-4xl">
        Información de estudiante
      </h1>
      <FormularioInformacionEstudiante />
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

export default InformacionEstudiante;
