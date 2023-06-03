import React, { useContext, useState } from "react";
import { MainControllerContext } from "../../../contexts/MainControllerContext";
function HeaderInformacionEstudiantes() {
  const {
    ordenarEstudiantesPorCarnet,
    ordenarEstudiantesPorNombre,
    ordenarEstudiantesPorCampus,
  } = useContext(MainControllerContext);

  return (
    <thead className="bg-gray-50 text-center">
      <tr className="text-center">
        <th
          onDoubleClick={ordenarEstudiantesPorNombre}
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Nombre
        </th>
        <th
          onDoubleClick={ordenarEstudiantesPorCarnet}
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Carnet
        </th>
        <th
          onDoubleClick={ordenarEstudiantesPorCampus}
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Campus
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Estado
        </th>
      </tr>
    </thead>
  );
}

export default HeaderInformacionEstudiantes;
