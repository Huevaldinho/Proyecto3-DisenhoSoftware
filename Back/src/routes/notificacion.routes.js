import express from "express";
var router = express.Router();
import multer from "multer";

import {
  getNotificacionesRecibidas,
  getNotificacionEspecifica,
  getNotificacionesEnviadas,
  postNotificacion,
  putNotificacion
} from "../controllers/notificacion.controller.js";

/**
 * @name getNotificacionesRecibidasDB
 * @param idUsuario
 * @param tipoUsuario (1 para profesor - 2 para estudiante)
 * @returns Todas las notificaciones recibidas por el usuario especificado en el parámetro. 
 */
router.get("/notificacion/recibidas/:idUsuario", getNotificacionesRecibidas);

/**
 * @name getNotificacionEspecificaDB
 * @param idNotificacion 
 * @returns La estructura de una notificación única. (Recordar cambiar el estado de los receptores a LEIDA)
 */
router.get("/notificacion/:idNotificacion", getNotificacionEspecifica);

/**
 * @name getNotificacionesEnviadasDB
 * @param idUsuario 
 * @returns Todas las notificaciones enviadas por el usuario especificado en el parámetro
 */
router.get("/notificacion/enviadas/:idUsuario", getNotificacionesEnviadas);

/**
 * @name postNotificacionDB
 * @param DTONotificacion 
 * @returns La notificación que se ingresó.
 */
router.post("/notificacion", postNotificacion);

/**
 * @name putNotificacionDB
 * @param DTONotificacion 
 * @returns La notificación modificada.
 */
router.put("/notificacion", putNotificacion);


export default router;
