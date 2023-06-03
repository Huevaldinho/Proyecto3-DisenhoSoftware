import React, { useState } from "react";
import FilaComentarios from "./FilaComentarios";

function BodyComentarios({ comentarios }) {
  if (comentarios.lenght == 0)
    return <tbody className="bg-white divide-y divide-gray-200"></tbody>;
    console.log(comentarios);
  return (
    
    <tbody className="bg-white divide-y divide-gray-200">
      {comentarios.map((comentario, index) => (
        <FilaComentarios key={index} comentario={comentario} index={index} />
      ))}
    </tbody>
  );
}

export default BodyComentarios;
