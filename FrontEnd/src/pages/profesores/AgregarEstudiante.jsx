import React from 'react'
import FormularioAgregarEstudiante from '../../components/profesores/FormularioAgregarEstudiante';
function AgregarEstudiante() {
  //!Los datos se deben pasar por parametro cuando se llame a este componente.
  /*
  
    {carnet,nombre,segundoNombre,apellido1,apellido2,correo,telefono,estado}
  */
    
      return (
        <div className="container m-auto">
          <h1 className="p-4 m-3 text-center font-bold text-4xl items-center">
            Agregar Estudiante
          </h1>
          <FormularioAgregarEstudiante
            carnet={""}
            nombre={""}
            segundoNombre={""}
            apellido1={""}
            apellido2={""}
            correo={""}
            telefono={""}
            estado={""}
          />
        </div>
      );
}

export default AgregarEstudiante
