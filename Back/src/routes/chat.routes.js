import express from "express";
var router = express.Router();

import {
    getChat,
    postChat,
    putChat
} from "../controllers/mensajeria.controller.js"; //importación de métodos de controller profesor

// Método get para obtener chats de una persona
router.get('/chat/:id', getChat);
// Método post para crear un chat 
router.post('/chat', postChat);
// Método put para agregar miembros a un chat
router.put('/chat', putChat);

export default router;