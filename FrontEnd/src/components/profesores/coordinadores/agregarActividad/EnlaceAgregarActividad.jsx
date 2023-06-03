import React from "react";

function EnlaceAgregarActividad({ cssElementosForm, setEnlace }) {
  return (
    <div className="text-center">
      <label htmlFor="enlace">Enlace:</label>
      <input
        type="text"
        id="enlace"
        className={cssElementosForm}
        placeholder={"Las actividades presenciales no requieren enlace."}
        onChange={(e) => setEnlace(e.target.value)}
      />
    </div>
  );
}

export default EnlaceAgregarActividad;
