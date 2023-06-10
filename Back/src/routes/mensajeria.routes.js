import express from "express";
var router = express.Router();

import {
    getMensaje,
    postMensaje,
} from "../controllers/mensajeria.controller.js"; //importación de métodos de controller profesor

// Método get para obtener chats de una persona
router.get('/mensaje/:id', getMensaje);
// Método post para crear un chat 
router.post('/mensaje', postMensaje);

export default router;