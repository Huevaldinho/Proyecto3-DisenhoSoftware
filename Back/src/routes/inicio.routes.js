import express from "express";
var router = express.Router();

import {
    postInicio,
    putInicio
} from "../controllers/inicio.controller.js";

// Métodos asiaciados a la ventana de inicio de sesión

// Método get para recuperar el email y contraseña del cliente y poder validarlos para iniciar sesión
router.post('/inicio/:email/:password', postInicio);

// Método put para cambiar la contraseña del usuario, requiere el email y la nueva contraseña
router.put('/inicio/:email/:password', putInicio);

export default router;