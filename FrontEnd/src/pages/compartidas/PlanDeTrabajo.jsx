import React from "react";
import TablaActividades from "../../components/compartidos/planDeTrabajo/TablaActividades";
import { MainControllerContext } from "../../contexts/MainControllerContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PlanDeTrabajo(props) {
  const navigate = useNavigate();
  const [nombrePlan, setNombrePlan] = useState(null);

  const {
    consultarPlanDeTrabajo,
    planDeTrabajo,
    cambiarNombrePlanTrabajo,
    usuario,
    setUsuario,
  } = useContext(MainControllerContext);
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/agregarActividad");
  };
  const handleReturnMenuProfes = (e) => {
    e.preventDefault();
    navigate("/menuProfesores");
  };
  const handleReturnMenuAsistentes = (e) => {
    e.preventDefault();
    navigate("/menuAsistentes");
  };

  function esJSON(variable) {
    if (
      typeof variable === "object" &&
      variable !== null &&
      !Array.isArray(variable)
    )
      return true;
    return false;
  }
  const handleCambiarNombrePlan = async () => {
    if (nombrePlan != null) {
      let response = await cambiarNombrePlanTrabajo(nombrePlan);
      if (esJSON(response)) {
        alert("Se ha cambiado exitosamente el nombre del plan de trabajo.");
        updateState();
      } else
        alert("Error, no se ha logrado cambiar el nombre del plan de trabajo.");
    }
  };

  let storedUser = usuario;
  const updateState = () => {
    setTimeout(() => {
      consultarPlanDeTrabajo();
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

  if (Object.keys(planDeTrabajo).length == 0) {
    return (
      <p className="text-center font-semibold text-5xl">
        Cargando plan de trabajo...
      </p>
    );
  }

  //Se utiliza para mostrar el boton de agregar actividad
  //tambien para poder cambiar el nombre del plan de trabajo
  let permisoAgregarActividad =
    storedUser.rol == "Profesor" && storedUser.coordinador == "COORDINADOR";
  return (
    <div className="container m-auto ">
      <div className="text-center" id="nombrePlanConteiner">
        <input
          className="text-center font-bold text-5xl p-5"
          defaultValue={
            planDeTrabajo != undefined && planDeTrabajo != {}
              ? planDeTrabajo?.nombre
              : "Nombre plan de trabajo"
          }
          placeholder="Ingrese nombre del plan de trabajo"
          disabled={!permisoAgregarActividad}
          onChange={(e) => {
            setNombrePlan(e.target.value);
          }}
        ></input>
        {/**Boton cambiar nombre plan de trabajo */}
        {permisoAgregarActividad ? (
          <div className="text-center" id="containerBotonAgregarActividad">
            <button
              className="text-center bg-green-500 hover:bg-green-800  rounded-xl p-3 m-2"
              onClick={handleCambiarNombrePlan}
            >
              Cambiar nombre del plan de trabajo
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="text-center" id="tablaActividades">
        {/*Las actividades se las pasa a la tabla por props */}
        <TablaActividades actividades={planDeTrabajo?.actividades} />
      </div>
      {permisoAgregarActividad ? (
        <div
          className="text-center rounded-xl p-3 m-2 bg-green-500 hover:bg-green-800"
          id="containerBotonAgregarActividad"
        >
          {/*Boton para agregar una actividad nueva*/}
          <button className="text-center w-full h-full" onClick={handleClick}>
            Agregar actividad
          </button>
        </div>
      ) : (
        <></>
      )}
      <div
        className="text-center rounded-md bg-red-500 p-2 m-3 h-auto w-auto hover:bg-red-800"
        id="containerBotonAgregarActividad"
      >
        {/*Boton para regresar la menu correspondiente*/}
        {storedUser.rol == "Asistente" ? (
          <button
            className="text-center w-full h-full"
            onClick={handleReturnMenuAsistentes}
          >
            Regresar al Menú de Asistentes
          </button>
        ) : (
          <button
            className="text-center w-full h-full"
            onClick={handleReturnMenuProfes}
          >
            Regresar al Menú de Profesores
          </button>
        )}
      </div>
    </div>
  );
}

export default PlanDeTrabajo;
