import React from "react";

//Para el calendario
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
function RecordatorioAgregarActividad({
  handleRecordatoriosChange,
  recordatorios,
}) {
  return (
    <div className="flex flex-col text-center">
      <label htmlFor="fecha-hora">Seleccione las fechas de recordatorio:</label>
      <Datetime
        onChange={(e) => {
          handleRecordatoriosChange(e._d);
        }}
        dateFormat="DD/MM/YYYY"
        className="border rounded-md  text-center"
        inputProps={{
          id: "fecha-hora",
          className: "text-center w-full h-full",
        }}
      />
      <div className="text-center">
        <p className="text-center font-light text-yellow-300">
          Fechas seleccionadas (vuelve a seleccionarla en el calendario para
          eliminarla)
        </p>
        <ul>
          {recordatorios.map((date) => (
            <li key={date.toString()}>
              {date
                .toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, "-")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecordatorioAgregarActividad;
