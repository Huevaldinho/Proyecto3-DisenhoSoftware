import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MainControllerContext } from "../../../contexts/MainControllerContext";

function DetallesChat() {
  const { usuario, setUsuario, enviarMensaje, chats } = useContext(
    MainControllerContext
  );

  const location = useLocation();
  const mensajes =
    location.state && location.state.mensajes ? location.state.mensajes : [];
  const chat = location.state.chat;
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  let storedUser = usuario;
  const updateState = () => {
    setTimeout(() => {
      storedUser = JSON.parse(localStorage.getItem("usuario"));
      try {
        JSON.parse(storedUser);
      } catch (error) {
        setUsuario(storedUser);
      }
    }, 1000);
  };

  useEffect(() => {
    updateState();
  }, []);

  if (storedUser == null) return <p>Cargando</p>;

  const handleChange = (event) => {
    setNuevoMensaje(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let fechaHora = new Date()
      .toLocaleString("es-ES", {
        timeZone: "UTC",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/\//g, "-")
      .replace(",", "");
    let respuesta = await enviarMensaje(
      nuevoMensaje,
      storedUser,
      chat._id,
      fechaHora
    );
    if (!(Object.keys(respuesta).length !== 0)) {
      alert("No se ha podido enviar el mensaje, intente de nuevo.");
    }
    console.log("Respuesta:", respuesta);
    setNuevoMensaje("");
  };
  if (mensajes.length == 0) {
    return (
      <>
        <div className="text-center font-bold text-4xl text-red-500">
          <p className="text-center font-bold text-5xl p-3 m-2 text-black">
            {chat.nombre}
          </p>
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
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Enviar
            </button>
          </form>
        </div>
      </>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="text-center font-bold text-5xl p-3 m-2">{chat.nombre}</p>
      {mensajes.map((mensaje, index) => (
        <div key={index} className="bg-gray-200 rounded p-4">
          <p className="font-bold mb-2">Mensaje de: {mensaje.emisor.nombre1}</p>
          <p>{mensaje.mensaje}</p>
          <p className="text-decoration-line: underline ">
            Fecha y hora: {mensaje.fechaHora}
          </p>
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default DetallesChat;
