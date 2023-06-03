import express from "express";
var router = express.Router();

import {
    getPlan,
    putPlan,
} from "../controllers/plan.controller.js";


// Método get para recuperar todos los estudiantes y mostrarlos
router.get('/planTrabajo', getPlan);
router.put('/planTrabajo', putPlan);

export default router;