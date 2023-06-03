import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { MainControllerContext } from "../../contexts/MainControllerContext";
function AgregarComentario(props) {
  const { comentarActividad, usuario } = useContext(MainControllerContext);
  const [comentario, setComentario] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  let actividad = state.actividad;
  const handleClick = (e) => {
    e.preventDefault();
    let mandarDatos = {
      idActividad: actividad._id,
      descripcion: comentario,
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
      idRespuesta: null,
    };
    console.log("Datos que se envian:", mandarDatos);
    comentarActividad(mandarDatos);
    //Redireccionar
    navigate("/detallesActividad", { state: {actividad:actividad} });
  };
  const handleComentario = (e) => {
    setComentario(e.target.value);
  };
  const handleRegresarDetalleActividad = (e) => {
    e.preventDefault();
    navigate("/detallesActividad",{ state: { actividad: actividad } });
  };
  return (
    <div>
      <div className=" p-3 m-4 text-center items-center">
        <h1 className="p-4 m-3 text-center font-bold text-4xl items-center">
          Agregar Comentario
        </h1>
      </div>
      <form className="text-center pt-5 pl-5 pr-5 mt-10 ml-10 mr-10 mb-2 rounded-2xl  grid grid-rows-2 grid-flow-col gap-1 bg-slate-800 items-center">
        <div>
          <label className="block mb-2  text-lg font-medium text-gray-900 dark:text-white">
            Ingrese su comentario
          </label>
          <textarea
            onChange={handleComentario}
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
            Agregar Comentario
          </button>
        </div>
      </form>
      <div
        className="text-center rounded-md bg-red-500 p-2 m-3 h-auto w-auto hover:bg-red-800"
        id="containerBotonAgregarActividad"
      >
        <button
          className="text-center w-full h-full"
          onClick={handleRegresarDetalleActividad}
        >
          Regresar
        </button>
      </div>
    </div>
  );
}

export default AgregarComentario;
