import express from "express";
var router = express.Router();

import {
    postAsistente
} from "../controllers/asistente.controller.js"; //importación de métodos de controller profesor


// Método port para asignar un asistente, recibe un codigo y campus por parametro
router.post('/asistente/:codigo/:campusP', postAsistente);

export default router;