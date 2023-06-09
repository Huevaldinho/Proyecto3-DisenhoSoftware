import React from "react";

function HeaderComentarios(props) {
  return (
    <thead className="bg-gray-50 text-center">
      <tr className="text-center">
        <th
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Número de chat
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Integrantes
        </th>
      </tr>
    </thead>
  );
}

export default HeaderComentarios;