import {
    obtenerChats,
    insertarChat,
    insertarMensaje,
    obtenerMensajes,
    insertarMiembro
  } from "../database/DAOmensajeria.js"; //database methods


//Métodos de chat
export const getChat = async (req, res) => {
    //devuelve todos las actividades
    const chat = await obtenerChats(req.params.id);
    res.json(chat);
};

export const postChat = async (req, res) => {
    //devuelve todos las actividades
    const chat = await insertarChat(req.body);
    res.json(chat);
};

export const putChat = async (req, res) => {
  //devuelve todos las actividades
  const chat = await insertarMiembro(req.body);
  res.json(chat);
};

//Métodos de mensaje
export const getMensaje = async (req, res) => {
  //devuelve todos las actividades
  const chat = await obtenerMensajes(req.params.id);
  res.json(chat);
};

export const postMensaje = async (req, res) => {
  //devuelve todos las actividades
  const chat = await insertarMensaje(req.body);
  res.json(chat);
};


