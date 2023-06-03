import React from "react";
import Select from "react-select";

function SemanasAgregarActividad({ setSemanaSeleccionada }) {
  const semanas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <div className="text-center">
      <label htmlFor="semanaActividad">Semana:</label>
      <Select
        placeholder="Seleccione la semana"
        id="semana"
        className="text-center"
        required
        options={semanas.map((semana, index) => ({
          key: index,
          value: semana,
          label: semana.toString(),
        }))}
        onChange={(semanaSeleccionada) =>
          setSemanaSeleccionada(semanaSeleccionada?.value)
        }
      ></Select>
    </div>
  );
}

export default SemanasAgregarActividad;
