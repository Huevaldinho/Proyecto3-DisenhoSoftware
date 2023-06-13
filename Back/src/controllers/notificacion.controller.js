import {
  getNotificacionesRecibidasDB,
  getNotificacionEspecificaDB,
  getNotificacionesEnviadasDB,
  postNotificacionDB,
  putNotificacionDB
} from "../database/DAONotificacion.js"; //database methods

export const getNotificacionesRecibidas = async (req, res) => {
  const notificacionesRecibidas = await getNotificacionesRecibidasDB(req.params.idUsuario, req.query.tu);
  res.json(notificacionesRecibidas);
};

export const getNotificacionEspecifica = async (req, res) => {
  const notificacionEspecifica = await getNotificacionEspecificaDB(req.params.idNotificacion);
  res.json(notificacionEspecifica);
};

export const getNotificacionesEnviadas = async (req, res) => {
  const notificacionesEnviadas = await getNotificacionesEnviadasDB(req.params.idUsuario);
  res.json(notificacionesEnviadas);
};

export const postNotificacion = async (req, res) => {
  const nuevaNotificacion = await postNotificacionDB(req.body);
  res.json(nuevaNotificacion);
};

export const putNotificacion = async (req, res) => {
  const notificacionModificada = await putNotificacionDB(req.body)
  res.json(notificacionModificada);
}