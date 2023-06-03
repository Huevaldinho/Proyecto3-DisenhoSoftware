import React from 'react'

function NombreActividad({cssElementosForm,setNombreActividad}) {
  return (
    <div className="text-center">
        <label htmlFor="nombreActividad" className="">
          Nombre de la actividad:
        </label>
        <input
          type="text"
          id="nombreActividad"
          className={cssElementosForm}
          onChange={(e) => {
            setNombreActividad(e.target.value);
          }}
        />
      </div>
  )
}

export default NombreActividad