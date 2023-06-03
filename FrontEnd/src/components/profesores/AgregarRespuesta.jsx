import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { MainControllerContext } from "../../contexts/MainControllerContext";
function AgregarRespuesta(props) {
  const { usuario,responderComentario } = useContext(MainControllerContext);
  const [respuesta, setRespuesta] = useState(null); //Para la descripcion
  const navigate = useNavigate();
  const { state } = useLocation();
  let comentario = state.comentario; //Saca el comentario al que le esta respondiendo
  let actividad = state.actividad;

  const handleClick = (e) => {
    e.preventDefault();
    let mandarDatos = {
      idActividad: comentario.idActividad,
      descripcion: respuesta,
      fecha: new Date()
        .toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(/\//g, "-")
        .replace(",", ""),
      autor: usuario.nombre + " " + usuario.apellido1 + " " + usuario.apellido2,
      idRespuesta: comentario._id,
    };

    responderComentario(mandarDatos);
    //Redireccionar
    navigate("/detallesActividad", { state: { actividad: actividad } });
  };
  const handleRespuesta = (e) => {
    setRespuesta(e.target.value);
  };
  const handleRegresar = (e)=>{
    e.preventDefault();
    navigate("/detallesActividad", { state: { actividad: actividad } });

  }
  return (
    <div>
      <div className=" p-3 m-4 text-center items-center">
        <h1 className="p-4 m-3 text-center font-bold text-4xl items-center">
          Agregar Respuesta
        </h1>
      </div>
      <form className="text-center pt-5 pl-5 pr-5 mt-10 ml-10 mr-10 mb-2 rounded-2xl  grid grid-rows-2 grid-flow-col gap-1 bg-slate-800 items-center">
        <div>
          <label className="block mb-2  text-lg font-medium text-gray-900 dark:text-white">
            Ingrese su respuesta
          </label>
          <textarea
            onChange={handleRespuesta}
            name=""
            id="comentario"
            cols="20"
            rows="5"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
        <div
          className="text-center rounded-md bg-green-500 p-2 m-3 h-auto w-auto hover:bg-green-800"
          id="containerBotonAgregarActividad"
        >
          <button className="text-center  " onClick={handleClick}>
            Agregar Respuesta
          </button>
        </div>
      </form>
      {/*Boton regreso a detalles actividad */}
      <div className="text-center">
        <button
          className="text-center bg-red-500 hover:bg-red-800  rounded-xl p-3 m-2"
          onClick={handleRegresar}
        >
          Regresar a detalles actividad
        </button>
      </div>
    </div>
  );
}

export default AgregarRespuesta;
