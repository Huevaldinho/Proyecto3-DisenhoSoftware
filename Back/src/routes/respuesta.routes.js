import express from "express";
var router = express.Router();

import {
    getRespuesta
} from "../controllers/comentario.controller.js"; //importación de métodos de controller profesor

// Métogo get para obtener todas las respuestas a un comentario 
router.get('/respuesta/:idA',getRespuesta)

export default router;