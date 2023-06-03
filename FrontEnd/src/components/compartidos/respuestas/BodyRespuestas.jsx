import React, { useState } from "react";
import FilaRespuesta from "./FilaRespuestas";

function BodyRespuesta({ respuestas }) {
  if (respuestas.lenght == 0)
    return <tbody className="bg-white divide-y divide-gray-200"></tbody>;
    console.log(respuestas);
  return (
    
    <tbody className="bg-white divide-y divide-gray-200">
      {respuestas.map((respuesta, index) => (
        <FilaRespuesta key={index} respuesta={respuesta} index={index} />
      ))}
    </tbody>
  );
}

export default BodyRespuesta;