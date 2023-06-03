import React from "react";
import FormularioAgregarProfesor from "../../components/profesores/FormularioAgregarProfesor";

function RegistrarProfesor(props) {
  /*
   *Quien llama a esta llamada es el menu de profesores,
   *ahi es donde se encuentra la informacion del estudiante que se desea
   *modificar.
   */
  return (
    <div className="container m-auto">
      <h1 className="p-4 m-3 text-center font-bold text-4xl">
        Registrar Profesor
      </h1>
      <FormularioAgregarProfesor />
    </div>
  );
}

export default RegistrarProfesor;