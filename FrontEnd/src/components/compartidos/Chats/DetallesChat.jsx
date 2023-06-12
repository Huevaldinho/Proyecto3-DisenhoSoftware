import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function DetallesChat() {
  const location = useLocation();
  const mensajes = location.state && location.state.mensajes ? location.state.mensajes : [];
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  const handleChange = (event) => {
    setNuevoMensaje(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //!Logica para enviar el mensaje
    console.log("Mensaje enviado:", nuevoMensaje);
    setNuevoMensaje("");
  };
    if (mensajes.length == 0) {
    return (
      <>
        <div className="text-center font-bold text-4xl text-red-500">
          No hay mensajes para mostrar.
        </div>
        <div className="text-center py-8 font-bold text-1l">
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nuevoMensaje}
          onChange={handleChange}
          placeholder="Escribe tu mensaje..."
          className="border border-gray-300 p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Enviar
        </button>
      </form>
        </div>
        
      </>
    );
  }
  return (
    <div className="flex flex-col gap-4 text-center">
      {mensajes.map((mensaje, index) => (
        <div key={index} className="bg-gray-200 rounded p-4">
          <p className="font-bold mb-2">Mensaje de: {mensaje.emisor.nombre1}</p>
          <p className=" text-blue-400">{mensaje.mensaje}</p>
          <p className="text-decoration-line: underline">Fecha y hora: {mensaje.fechaHora}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nuevoMensaje}
          onChange={handleChange}
          placeholder="Escribe tu mensaje..."
          className="border border-gray-300 p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default DetallesChat;


