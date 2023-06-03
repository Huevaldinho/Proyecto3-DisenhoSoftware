import React, { useState } from "react";
import FilaInfoProfesores from "./FilaInfoProfesores";

function BodyInfoProfesores({ profesores }) {
  if (profesores.lenght == 0)
    return <tbody className="bg-white divide-y divide-gray-200"></tbody>;
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {profesores.map((profesor, index) => (
        <FilaInfoProfesores
          key={index}
          profesor={profesor}
          index={index}
        />
      ))}
    </tbody>
  );
}

export default BodyInfoProfesores;
