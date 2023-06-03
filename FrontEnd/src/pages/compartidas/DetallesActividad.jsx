import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormularioDetallesActividad from "../../components/compartidos/actividades/FormularioDetallesActividad";
import ListaComentarios from "../../components/profesores/ListaComentarios";
import { MainControllerContext } from "../../contexts/MainControllerContext";
function DetallesActividad(props) {
  const navigate = useNavigate();
  const { usuario, setUsuario } = useContext(MainControllerContext);
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/planDeTrabajo");
  };
  let storedUser = usuario;
  const updateState = () => {
    setTimeout(() => {
      storedUser = JSON.parse(localStorage.getItem("usuario"));
      try {
        JSON.parse(storedUser);
      } catch (error) {
        setUsuario(storedUser);
      }
    }, 1000);
  };

  useEffect(() => {
    updateState();
  }, []);

  if (storedUser == null) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="text-center m-auto">
      {/*Texto */}
      <div>
        <h1 className="text-center font-semi p-3 m-3 text-5xl">
          Detalles de actividad
        </h1>
      </div>
      <FormularioDetallesActividad />
      {/*Muestra los comentarios solo a los profesores */}
      {storedUser.rol == "Profesor" ? <ListaComentarios /> : <></>}
      {/*Boton regreso a plan de trabajo */}
      <div className="text-center">
        <button
          className="text-center  rounded-xl p-3 m-2 bg-red-500 hover:bg-red-800 "
          onClick={handleClick}
        >
          Regresar al plan de trabajo
        </button>
      </div>
    </div>
  );
}

export default DetallesActividad;
