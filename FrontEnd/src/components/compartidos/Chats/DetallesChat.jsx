import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MainControllerContext } from "../../../contexts/MainControllerContext";

function DetallesChat() {
  const { usuario, setUsuario, enviarMensaje, chats, obtenerChats } =
    useContext(MainControllerContext);

  const location = useLocation();
  const navigate = useNavigate();
  const chat = location.state.chat;
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  let mensajes;

  for (let i = 0; i < chats.length; i++) {
    if (chats[i]._id === chat._id) {
      mensajes = chats[i].mensajes;
      break;
    }
  }

  let storedUser = usuario;
  const updateState = () => {
    storedUser = JSON.parse(localStorage.getItem("usuario"));
    try {
      JSON.parse(storedUser);
    } catch (error) {
      setUsuario(storedUser);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateState();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (storedUser == null) return <p>Cargando</p>;

  useEffect(() => {
    const interval = setInterval(() => {
      obtenerChats(storedUser._id); //Actualiza los chats cada 4 segundos.
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [chats, storedUser._id]);

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
  let mensajesAlreves = [];
  for (let i = mensajes.length - 1; i >= 0; i--) {
    mensajesAlreves.push(mensajes[i]);
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="text-center font-bold text-5xl p-3 m-2">{chat.nombre}</p>
      <form className="mb-5" onSubmit={handleSubmit}>
        <input
          type="text"
          value={nuevoMensaje}
          onChange={handleChange}
          placeholder="Escribe tu mensaje..."
          className="border border-gray-300 p-2 rounded m-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Enviar
        </button>
      </form>
      {mensajesAlreves.map((mensaje, index) => (
        <div key={index} className="bg-gray-200 rounded p-3 hover:bg-blue-500">
          <p className="font-bold mb-2">Mensaje de: {mensaje.emisor.nombre1}</p>
          <p>{mensaje.mensaje}</p>
          <p className="text-decoration-line: underline ">
            Fecha y hora: {mensaje.fechaHora}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DetallesChat;
