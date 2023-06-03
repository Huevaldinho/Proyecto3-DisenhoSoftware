import React from "react";
import { MainControllerContext } from "../../contexts/MainControllerContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaProfesores from "../../components/compartidos/informacionProfesores/TablaProfesores";
import Role from "../../services/enums/role";

function informacionProfesores(props) {
  const navigate = useNavigate();
  const { profesores, consultarProfesores, usuario, setUsuario } = useContext(
    MainControllerContext
  );

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/registrarProfesor");
  };
  const handleClickReturnProfes = () => {
    navigate("/menuProfesores");
  };
  const handleClickReturnAsistentes = () => {
    navigate("/menuAsistentes");
  };
  const handleClickReturnSuperUsuario = () => {
    navigate("/menuSuperUsuario");
  };
  const handleClickReturnEstudiantes = () => {
    navigate("/menuEstudiantes");
  };

  let storedUser = usuario;
  const updateState = () => {
    setTimeout(() => {
      consultarProfesores();
      storedUser = JSON.parse(localStorage.getItem("usuario"));
      try {
        JSON.parse(storedUser);
      } catch (error) {
        setUsuario(storedUser);
      }
    }, 1000);
  };

  // Efecto que actualiza el estado de myState después de que el componente ha sido montado
  useEffect(() => {
    updateState();
  }, []);

  if (storedUser == null) return <p>Cargando</p>;

  if (profesores.length == 0) {
    return (
      <p className="text-center font-semibold text-5xl m-auto">
        Cargando profesores...
      </p>
    );
  }

  const menuAregresar = (e) => {
    e.preventDefault();
    switch (storedUser.rol) {
      case Role.PROFESOR: {
        handleClickReturnProfes();
        break;
      }
      case Role.ASISTENTE: {
        handleClickReturnAsistentes();
        break;
      }
      case Role.SUPERUSUARIO: {
        handleClickReturnSuperUsuario();
        break;
      }
      case Role.ESTUDIANTE: {
        handleClickReturnEstudiantes();
        break;
      }
    }
  };

  return (
    <div className="container m-auto ">
      <div className="text-center" id="nombrePlanConteiner">
        <h1 className="text-center font-bold text-5xl p-5">
          Información del Equipo
        </h1>
      </div>
      <div className="text-center" id="tablaProfesores">
        {/*Las actividades se las pasa a la tabla por props */}
        <TablaProfesores profesores={profesores} />
      </div>
      <div
        className="text-center rounded-md bg-green-500 p-2 m-3 h-auto w-auto hover:bg-green-800"
        id="containerBotonAgregarActividad"
        hidden={storedUser.rol === Role.ASISTENTE ? false : true}
      >
        {/*Boton para agregar una actividad nueva*/}
        <button className="text-center w-full h-full" onClick={handleClick}>
          Agregar Profesor
        </button>
      </div>
      <div
        className="text-center rounded-md bg-red-500 p-2 m-3 h-auto w-auto hover:bg-red-800"
        id="containerBotonAgregarActividad"
      >
        {/*Boton para regresar la menu profesores*/}
        <button className="text-center w-full h-full" onClick={menuAregresar}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default informacionProfesores;
