import React from "react";

function DescripcionAgregarActividad({
  setDescripcionIngresada,
  cssElementosForm,
}) {
  return (
    <div className="text-center">
      {/*Descripcion */}
      <label htmlFor="descripcion">Descripción:</label>
      <textarea
        id="descripcion"
        required
        className={cssElementosForm}
        onChange={(e) => {
          setDescripcionIngresada(e.target.value);
        }}
      />
    </div>
  );
}

export default DescripcionAgregarActividad;
