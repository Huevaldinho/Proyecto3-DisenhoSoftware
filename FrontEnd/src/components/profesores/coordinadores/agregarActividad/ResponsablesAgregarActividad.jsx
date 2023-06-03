import React from "react";
//Main controller
import { useContext, useEffect } from "react";
import { MainControllerContext } from "../../../../contexts/MainControllerContext";

function ResponsablesAgregarActividad({
  handleResponsableChange,
  cssElementosForm,
}) {
  const { profesores, consultarProfesores } = useContext(MainControllerContext);

  const updateState = () => {
    setTimeout(() => {
      consultarProfesores();
    }, 1000);
  };

  // Efecto que actualiza el estado de myState después de que el componente ha sido montado
  useEffect(() => {
    updateState();
  }, []);

  if (profesores.length == 0) {
    return (
      <div className="text-center">
        <h1 className="text-center  font-semibold  ">Responsable (s):</h1>
        <text className="text-red-500">No hay profesores registrados.</text>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-center">Responsable (s):</h1>
      {profesores.map((responsable, index) => (
        <div key={index} className={cssElementosForm}>
          <input
            type="checkbox"
            id={`responsable-${index}`}
            name={`responsable-${index}`}
            checked={responsable.seleccionado}
            onChange={(e) => handleResponsableChange(responsable)}
            className="w-fit p-2 m-2"
          />

          <label
            htmlFor={`responsable-${index}`}
            className="text-center w-fit hover:bg-green-500"
          >
            {"  " +
              responsable.nombre +
              " " +
              responsable.apellido1 +
              " " +
              responsable.apellido2}
          </label>
        </div>
      ))}
    </div>
  );
}

export default ResponsablesAgregarActividad;
