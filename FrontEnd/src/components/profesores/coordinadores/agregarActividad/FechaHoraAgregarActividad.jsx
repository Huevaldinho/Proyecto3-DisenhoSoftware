import React from "react";

//Para el calendario
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
function FechaHoraAgregarActividad({
  fechaHoraSeleccionada,
  setFechaHoraSeleccionada,
  texto
}) {
  return (
    <div className="flex flex-col text-center">
      <label htmlFor="fecha-hora">{texto}</label>
      <Datetime
        value={fechaHoraSeleccionada}
        onChange={(fechaHoraSeleccionada) => {
          setFechaHoraSeleccionada(fechaHoraSeleccionada._d);
        }}
        dateFormat="DD/MM/YYYY"
        timeFormat="HH:mm"
        className="border rounded-md  text-center"
        inputProps={{
          id: "fecha-hora",
          className: "text-center w-full h-full",
        }}
      />
    </div>
  );
}

export default FechaHoraAgregarActividad;
