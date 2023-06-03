import React from "react";
import { MainControllerContext } from "../../contexts/MainControllerContext";
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TablaRespuestas from "../../components/compartidos/respuestas/TablaRespuestas";
function ListaRespuestas(props) {
  const navigate = useNavigate();
  const { consultarRespuestas, respuestas } = useContext(MainControllerContext);
  const { state } = useLocation();

  let comentario = state?.comentario;
  let actividad = state?.actividad;

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/agregarRespuesta", {
      state: { comentario: comentario, actividad: actividad },
    });
  };
  const handleRegresarDetallesActividad = (e) => {
    e.preventDefault();
    navigate("/detallesActividad", { state: { actividad: actividad } });
  };

  const updateState = () => {
    setTimeout(() => {
      consultarRespuestas(comentario._id);
    }, 1000);
  };

  // Efecto que actualiza el estado de myState después de que el componente ha sido montado
  useEffect(() => {
    updateState();
  }, []);

  if (respuestas == null || respuestas.length == 0) {
    return (
      <div className="p-3 m-auto">
        <h1 className="text-center font-semibold text-3xl p-2 m-1">
          No hay respuestas disponibles...
        </h1>
        <button
          className="text-center w-full h-full p-1 m-2 bg-green-500 hover:bg-green-800"
          onClick={handleClick}
        >
          Agregar respuesta
        </button>
        <div
          className="text-center rounded-md bg-red-500 p-2 m-3 h-auto w-auto hover:bg-red-800"
          id="containerBotonAgregarActividad"
        >
          <button
            className="text-center w-full h-full"
            onClick={handleRegresarDetallesActividad}
          >
            Regresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container m-auto">
      <div className="text-center" id="nombrePlanConteiner">
        <h1 className="text-center font-bold text-5xl p-5">Respuestas</h1>
      </div>
      <div className="text-center" id="tablaProfesores">
        {/*Las actividades se las pasa a la tabla por props */}
        <TablaRespuestas respuestas={respuestas} />
      </div>
      <div
        className="text-center rounded-md bg-green-500 p-2 m-3 h-auto w-auto hover:bg-green-800"
        id="containerBotonAgregarActividad"
      >
        {/*Boton para agregar una actividad nueva*/}
        <button className="text-center w-full h-full" onClick={handleClick}>
          Agregar Respuesta
        </button>
      </div>
      <div
        className="text-center rounded-md bg-red-500 p-2 m-3 h-auto w-auto hover:bg-red-800"
        id="containerBotonAgregarActividad"
      >
        <button
          className="text-center w-full h-full"
          onClick={handleRegresarDetallesActividad}
        >
          Regresar al plan de trabajo
        </button>
      </div>
    </div>
  );
}

export default ListaRespuestas;
