import React from "react";
//Main controller
import { useContext, useEffect } from "react";
import { MainControllerContext } from "../../../contexts/MainControllerContext";

function PersonasChat({ cssElementosForm, handleIntegrante }) {
  const {
    usuario,
    profesores,
    consultarProfesores,
    estudiantes,
    verEstudiantes,
  } = useContext(MainControllerContext);

  let estudiantesMistaSede = [];
  
  const updateState = () => {
    setTimeout(() => {
      consultarProfesores();
      verEstudiantes();
    }, 1000);
  };
  useEffect(() => {
    updateState();
  }, []);

  if (profesores.length == 0) {
    return (
      <div className="text-center">
        <h1 className="text-center  font-semibold  ">Disponibles:</h1>
        <text className="text-red-500">No hay personas registradas.</text>
      </div>
    );
  }
  //Para mostrar solo los estudiantes de la sede del profe que esta creando el chat.
  for (let i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].campus === usuario.campus)
      estudiantesMistaSede.push(estudiantes[i]);
  }

  return (
    <div>
      <div>
        <h1 className="text-center">Profesores:</h1>
        {profesores.map((profesor, index) => (
          <div key={index} className={cssElementosForm}>
            <input
              type="checkbox"
              id={`responsable-${index}`}
              name={`responsable-${index}`}
              checked={profesor.seleccionado}
              onChange={(e) => handleIntegrante(profesor)}
              className="w-fit p-2 m-2"
            />

            <label
              htmlFor={`responsable-${index}`}
              className="text-center w-fit hover:bg-green-500"
            >
              {"  " +
                profesor.nombre +
                " " +
                profesor.apellido1 +
                " " +
                profesor.apellido2}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-center">Estudiantes:</h1>
        {estudiantesMistaSede.map((estudiante, index) => (
          <div key={index} className={cssElementosForm}>
            <input
              type="checkbox"
              id={`responsable-${index}`}
              name={`responsable-${index}`}
              checked={estudiante.seleccionado}
              onChange={(e) => handleIntegrante(estudiante)}
              className="w-fit p-2 m-2"
            />

            <label
              htmlFor={`responsable-${index}`}
              className="text-center w-fit hover:bg-green-500"
            >
              {"  " +
                estudiante.nombre +
                " " +
                estudiante.apellido1 +
                " " +
                estudiante.apellido2}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonasChat;
