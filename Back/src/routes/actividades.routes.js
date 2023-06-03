import express from "express";
var router = express.Router();
import multer from "multer";

import {
    getActividades,
    postActividad,
    putActividad,
    deleteActividad
} from "../controllers/actividad.controller.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directorio donde se guardarán temporalmente los archivos subidos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nombre de archivo único
  },
});

const upload = multer({ storage });

// Método get para recuperar todos los estudiantes y mostrarlos
router.get('/actividades', getActividades);
router.post('/actividades', upload.single('afiche'), postActividad);
router.put('/actividades', upload.array('archivos', 10), putActividad);
router.delete('/actividades', deleteActividad);

export default router;