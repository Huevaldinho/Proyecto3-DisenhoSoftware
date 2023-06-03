import React from "react";
//Componentes de tabla

import HeaderComentarios from "./HeaderComentarios";
import BodyComentarios from "./BodyComentarios";

function TablaComentarios({ comentarios }) {
  //Valida que existan actividades para mostrar.
  if (comentarios.length == 0) {
    //Si no hay actividades todavia
    return (
      <div className="text-center font-bold text-4xl text-red-500">
        No hay profesores para mostrar.
      </div>
    );
  }
  return (
    <div className="flex flex-col mt-8 text-center">
      <h1 className="text-center font-light p-2 text-blue-600">
        Pulsa doble click para ver respuestas al comentario
      </h1>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <HeaderComentarios />
              <BodyComentarios comentarios={comentarios} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TablaComentarios;
