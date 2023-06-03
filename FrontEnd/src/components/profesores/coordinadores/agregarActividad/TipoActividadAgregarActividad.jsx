import React from "react";
import Select from "react-select";
//Para mostrar tipo de actividades
import TipoActividad from "../../../../services/enums/tipoActividad";
function TipoActividadAgregarActividad({ setTipoActividadSeleccionada }) {
  const tipoActividades = Object.values(TipoActividad);

  return (
    <div>
      <label htmlFor="tipoActividad">Tipo de actividad:</label>
      <Select
        placeholder="Seleccione el tipo de actividad"
        id="tipoActividadSelect"
        className="text-center"
        required
        options={tipoActividades.map((tipo, index) => ({
          key: index,
          value: tipo,
          label: tipo.toString(),
        }))}
        onChange={(tipoActividadSeleccionada) =>
          setTipoActividadSeleccionada(tipoActividadSeleccionada.value)
        }
      ></Select>
    </div>
  );
}

export default TipoActividadAgregarActividad;
