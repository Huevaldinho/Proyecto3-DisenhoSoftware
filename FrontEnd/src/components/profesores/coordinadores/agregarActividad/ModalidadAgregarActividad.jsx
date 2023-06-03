import React from "react";
import Select from "react-select";

function ModalidadAgregarActividad({
  setModalidadSeleccionada,
}) {
  const modalidades = ["Presencial", "Virtual"];

  return (
    <div className="text-center">
      <label htmlFor="modalidad">Modalidad:</label>
      <Select
        id="modalidadSelect"
        className="text-center"
        required
        options={modalidades.map((modalidad, index) => ({
          key: index,
          value: modalidad,
          label: modalidad.toString(),
        }))}
        onChange={(modalidadSeleccionada) =>
          setModalidadSeleccionada(modalidadSeleccionada.value)
        }
      ></Select>
    </div>
  );
}

export default ModalidadAgregarActividad;
