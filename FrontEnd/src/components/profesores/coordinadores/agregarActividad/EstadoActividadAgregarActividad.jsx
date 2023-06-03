import React from "react";
import Estado from "../../../../services/enums/estado";
import Select from "react-select";

function EstadoActividad({ setEstadoSeleccionado }) {
  const estadosActividad = Object.values(Estado);
  return (
    <div className="text-center">
      <label htmlFor="estadoActividad">Estado de actividad:</label>
      <Select
        placeholder="Seleccione el estado"
        id="tipoActividad"
        className="text-center"
        required
        options={estadosActividad.map((estado, index) => ({
          key: index,
          value: estado,
          label: estado.toString(),
        }))}
        onChange={(estadoSeleccionado) =>
          setEstadoSeleccionado(estadoSeleccionado.value)
        }
      ></Select>
    </div>
  );
}

export default EstadoActividad;
