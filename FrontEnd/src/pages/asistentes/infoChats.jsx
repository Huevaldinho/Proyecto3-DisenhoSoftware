import React from "react";
import { MainControllerContext } from "../../contexts/MainControllerContext";
import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TablaChats from "../../components/compartidos/Chats/TablaChats";
function infoChats(props) {
  const { chats, obtenerChats, usuario, setUsuario } = useContext(
    MainControllerContext
  );
  let navigate = useNavigate();

  let storedUser = usuario;
  const updateState = () => {
    setTimeout(() => {
      storedUser = JSON.parse(localStorage.getItem("usuario"));
      try {
        JSON.parse(storedUser);
      } catch (error) {
        setUsuario(storedUser);
      }
      obtenerChats(storedUser._id);
    }, 1000);
  };
  // Efecto que actualiza el estado de myState después de que el componente ha sido montado
  useEffect(() => {
    updateState();
  }, []);
  
  if (chats.length === 0) {
  if (storedUser == null) return <p>Cargando</p>;


  const handleRegresar = (e) => {
    e.preventDefault();
    if (storedUser.rol === "Asistente") navigate("/menuAsistentes");
    else if (storedUser.rol === "Profesor") navigate("/menuProfesores");
    else if (storedUser.rol === "Estudiante") navigate("/menuEstudiantes");
  };

  if (chats.length == 0) {
    return (
      <>
        <div className="text-center font-bold text-4xl text-red-500">
          No hay chats para mostrar.
        </div>
        <div className="text-center">
          <button
            className="text-center bg-red-500 hover:bg-red-800  rounded-xl p-3 m-2"
            onClick={handleRegresar}
          >
            Regresar
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="container m-auto ">
      <div className="text-center" id="nombrePlanConteiner">
        <h1 className="text-center font-bold text-5xl p-5">
          Chats Disponibles
        </h1>
      </div>
      <div className="text-center" id="tablaProfesores">
        {/*Las actividades se las pasa a la tabla por props */}
        <TablaChats chats={chats} />
      </div>
      <div className="text-center">
        <button
          className="text-center bg-red-500 hover:bg-red-800  rounded-xl p-3 m-2"
          onClick={handleRegresar}
        >
          Regresar
        </button>
      </div>
    </div>
  );
}

export default infoChats;
