import React from "react";

function HeaderNotificacion(props) {
  return (
    <thead className="bg-gray-50 text-center">
      <tr className="text-center">
        <th
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Emisor
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Asunto
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Fecha
        </th>
      </tr>
    </thead>
  );
}

export default HeaderNotificacion;