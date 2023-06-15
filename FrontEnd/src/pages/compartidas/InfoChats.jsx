import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainControllerContext } from "../../contexts/MainControllerContext";
import TablaChats from "../../components/compartidos/Chats/TablaChats";

function InfoChats(props) {
  const { chats, obtenerChats, usuario, setUsuario } = useContext(
    MainControllerContext
  );
  let navigate = useNavigate();

  let storedUser = usuario;
  const updateState = () => {
    storedUser = JSON.parse(localStorage.getItem("usuario"));
    try {
      JSON.parse(storedUser);
    } catch (error) {
      setUsuario(storedUser); //Almacena usuario
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateState();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      obtenerChats(storedUser._id); //Actualiza los chats cada 2 segundos.
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [chats, storedUser._id]);

  if (storedUser == null) return <p>Cargando</p>;

  const handleRegresar = (e) => {
    e.preventDefault();
    if (storedUser.rol === "Asistente") navigate("/menuAsistentes");
    else if (storedUser.rol === "Profesor") navigate("/menuProfesores");
    else if (storedUser.rol === "Estudiante") navigate("/menuEstudiantes");
  };
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/crearChat");
  };

  if (chats.length == 0) {
    return (
      <>
        <div className="text-center font-bold text-4xl text-red-500 p-2 m-2">
          No hay chats para mostrar.
        </div>
        <div
          hidden={storedUser.rol === "Estudiante"}
          className="text-center bg-green-500 hover:bg-green-800 rounded-2xl p-3 m-5"
        >
          <button
            type="submit"
            className="text-center w-full"
            onClick={handleClick}
          >
            Crear Chat
          </button>
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
    <div className="container m-auto">
      <div className="text-center" id="nombrePlanConteiner">
        <h1 className="text-center font-bold text-5xl p-5">
          Chats Disponibles
        </h1>
      </div>
      <div className="text-center" id="tablaProfesores">
        {/*Las actividades se las pasa a la tabla por props */}
        <TablaChats chats={chats} />
      </div>

      <div
        hidden={storedUser.rol === "Estudiante"}
        className="text-center bg-green-500 hover:bg-green-800 rounded-2xl p-3 m-5"
      >
        <button
          type="submit"
          className="text-center w-full"
          onClick={handleClick}
        >
          Crear Chat
        </button>
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

export default InfoChats;
