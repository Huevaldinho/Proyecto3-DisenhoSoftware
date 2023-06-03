import express from "express";
var router = express.Router();

import {
    getComentarios,
    postComentario,
    putComentario
} from "../controllers/comentario.controller.js";

// Métogo get para obtener todos los comentarios sobre una actividad, este recibe como parametro el id de la activididad deseada
router.get('/comentario/:idA',getComentarios)
// Método post para realizar un comentario
router.post('/comentario',postComentario);
// Método put para responder un comentario
router.put('/comentario',putComentario);

export default router;