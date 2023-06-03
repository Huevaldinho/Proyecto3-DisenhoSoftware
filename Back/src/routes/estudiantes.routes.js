import express from "express";
var router = express.Router();

import {
    getEstudiantes,
    postEstudiantes,
    putEstudiante,
    deleteEstudiante
    
} from "../controllers/estudiantes.controller.js";


// Método get para recuperar todos los estudiantes y mostrarlos
router.get('/estudiantes', getEstudiantes);
// Método post para meter estudiantes mediante un excel, recibe un body que es el array de los estudiantes leidos de excel
router.post('/estudiantes',postEstudiantes);
//Método put para modificar un estudiante, recibe un body con los catos a cambiar
router.put('/estudiantes', putEstudiante);
//método delete para cambiar el estado de un estudiante y ponerlo inactivo, recibe el carnet del estudiante
router.delete('/estudiantes/:id', deleteEstudiante);

export default router;