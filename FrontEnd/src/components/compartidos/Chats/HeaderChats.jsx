import React from "react";

function HeaderChats(props) {
  return (
    <thead className="bg-gray-50 text-center">
      <tr className="text-center">
        <th
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Nombre del chat
        </th>
      </tr>
    </thead>
  );
}

export default HeaderChats;