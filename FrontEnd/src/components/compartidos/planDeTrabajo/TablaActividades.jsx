import React from "react";
//Componentes de tabla
import HeaderTablaActividades from "./HeaderTablaActividades";
import BodyTablaActividades from "./BodyTablaActividades";
import { useNavigate } from "react-router-dom";
function TablaActividades({ actividades }) {
  //Valida que existan actividades para mostrar.
  if (actividades.length === 0) {
    //Si no hay actividades todavia
    return (
      <div className="text-center font-bold text-4xl text-red-500">
        No hay actividades para mostrar.
      </div>
    );
  }

  function sortByDate(array, key) {
    return array.sort((a, b) => {
      var dateA = new Date(
        a[key].split(" ")[0].split("-").reverse().join("/") +
          " " +
          a[key].split(" ")[1]
      ).getTime();
      var dateB = new Date(
        b[key].split(" ")[0].split("-").reverse().join("/") +
          " " +
          b[key].split(" ")[1]
      ).getTime();
      return dateA - dateB;
    });
  }
  //Ordena las actividades por fecha mas proxima.
  sortByDate(actividades, "fechaHora");

  //Si hay actividades para mostrar.
  return (
    <div className="flex flex-col mt-8 text-center ">
      <h1 className="text-center font-light p-2 text-blue-600">
        Pulsa doble click para ver detalles de actividad
      </h1>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 text-center">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 text-center">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg text-center">
            <table className="min-w-full divide-y divide-gray-200  text-center">
              <HeaderTablaActividades />
              <BodyTablaActividades actividades={actividades} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TablaActividades;
