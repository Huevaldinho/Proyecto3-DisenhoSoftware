import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { getEstudiantesMongo, getUsuariosBloqueadosEstudianteDB } from "../database/DAOEstudiante.js"; // Todos los estudiantes
import { getProfesoresMongo, getUsuariosBloqueadosProfesorDB } from "../database/DAOProfesor.js"; // Todos los estudiantes

const notificacionSchema = new mongoose.Schema({
  //Schema que se guardará en cada campo
  asunto: { type: String, required: true },
  cuerpo: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  emisor: { type: mongoose.Schema.Types.Mixed, required: true },
  receptores: { type: Array, required: true },
});

const Notificacion = mongoose.model("Notificacion", notificacionSchema, "Notificacion"); //Objeto de conexión entre mongo y la api

/**
 * @name  obtenerUsuariosBloqueados
 * @param idUsuario
 * @param tipoUsuario (1 para profesor - 2 para estudiante)
 * @returns Arreglo del campo con los usuarios bloqueados
 */
export async function obtenerUsuariosBloqueados(idUsuario, tipoUsuario){
  let usuariosBloqueados = null;
  if (tipoUsuario == "1") {
    // Es profesor
    usuariosBloqueados = await getUsuariosBloqueadosProfesorDB(idUsuario);
  } else if (tipoUsuario == "2") {
    // Es estudiante
    usuariosBloqueados = await getUsuariosBloqueadosEstudianteDB(idUsuario);
  } else {
    return [];
  }
  return usuariosBloqueados
}

/**
 * @name getNotificacionesRecibidasDB
 * @param idUsuario
 * @param tipoUsuario (1 para profesor - 2 para estudiante)
 * @returns Todas las notificaciones recibidas por el usuario especificado en el parámetro. 
 */
export const getNotificacionesRecibidasDB = async (idUsuario, tipoUsuario) => {
  // No importa si el usuario es Profesor o Estudiante
  try {
    const notificacionesParaMostrar = await Notificacion.find({
      // Obtiene todas las notificaciones en las que se encuentre idUsuario en receptores
      receptores: { $elemMatch: { _id: idUsuario } },
    });

    let usuariosBloqueados = await obtenerUsuariosBloqueados(idUsuario, tipoUsuario); // Obtiene a los usuariosBloqueados por el usuario

    for (let i = 0; i < notificacionesParaMostrar.length; i++) { // Omite las notificaciones emitidas por usuarios bloqueados
      if (usuariosBloqueados.includes(notificacionesParaMostrar[i].emisor._id)) {
        notificacionesParaMostrar.splice(i, 1) // Elimina el elemento en el índice 1
      }
    }
    return notificacionesParaMostrar ?? false;

  } catch (error) {
    return error
  }
};

/**
 * @name getNotificacionEspecificaDB
 * @param idNotificacion 
 * @returns La estructura de una notificación única. (Recordar cambiar el estado de los receptores a LEIDA)
 */
export const getNotificacionEspecificaDB = async (idNotificacion) => {
  try {
    const notificacion = await Notificacion.find({_id: idNotificacion})
    return notificacion ?? false

  } catch (error) {
    return error
  }
}

/**
 * @name getNotificacionesEnviadasDB
 * @param idUsuario 
 * @returns Todas las notificaciones enviadas por el usuario especificado en el parámetro
 */
export const getNotificacionesEnviadasDB = async (idUsuario) => {
  try {
    const notificaciones = await Notificacion.find({ "emisor._id": idUsuario });
    return notificaciones ?? false;
  } catch (error) {
    return error;
  }
};

/**
 * @name postNotificacionDB
 * @param DTONotificacion 
 * @returns La notificación que se ingresó.
 */
export const postNotificacionDB = async (DTONotificacion) => {
  try {
    // Filtrar los campos necesarios del objeto DTONotificacion
    const { asunto, cuerpo, fecha, hora, emisor, receptores } = DTONotificacion;
    const emisorReducido = {
      tipoUsuario: emisor.tipoUsuario,
      _id: emisor._id,
      nombre: emisor.nombre,
    };

    // Distinción entre enviar a todas las personas, o receptores específicos
    let receptoresReducidos = null;
    if (DTONotificacion.receptores.length === 0) {
      const estudiantes = await getEstudiantesMongo();
      const profesores = await getProfesoresMongo();
      receptoresReducidos = profesores
        .map(({ _id }) => ({ tipoUsuario: 1, _id, estado: "NO_LEIDA" })) // Obtener info necesaria de Profesores
        .concat(
          estudiantes.map(({ _id }) => ({tipoUsuario: 2, _id, estado: "NO_LEIDA"})) // Obtener info necesaria de Estudiantes
        );
    } else {
      receptoresReducidos = receptores.map(
        ({ tipoUsuario, _id, estado }) => ({ tipoUsuario, _id, estado:"NO_LEIDA" })
      );
    }

    console.log(receptoresReducidos);
    
    // Crear la nueva instancia de Notificacion con los campos reducidos
    let nuevaNotificacion = new Notificacion({
      asunto,
      cuerpo,
      fecha,
      hora,
      emisor: emisorReducido,
      receptores: receptoresReducidos,
    });

    nuevaNotificacion.save();
    return nuevaNotificacion;
  } catch (error) {
    return error;
  }
};

/**
 * @name putNotificacionDB
 * @param DTONotificacion 
 * @returns La notificación modificada.
 */
export const putNotificacionDB = async (DTONotificacion) => {
  try {
    const notificacionExistente = await Notificacion.findById(DTONotificacion._id);
    if (!notificacionExistente) {
      return false; // La notificación no existe en la base de datos
    }

    // Actualizar los campos necesarios de la notificación existente
    notificacionExistente.asunto = DTONotificacion.asunto;
    notificacionExistente.cuerpo = DTONotificacion.cuerpo;
    notificacionExistente.fecha = DTONotificacion.fecha;
    notificacionExistente.hora = DTONotificacion.hora;
    notificacionExistente.emisor = {
      tipoUsuario: DTONotificacion.emisor.tipoUsuario,
      _id: DTONotificacion.emisor._id,
      nombre: DTONotificacion.emisor.nombre,
    };
    notificacionExistente.receptores = DTONotificacion.receptores.map(
      (receptor) => ({
        tipoUsuario: receptor.tipoUsuario,
        _id: receptor._id,
        estado: receptor.estado,
      })
    );

    await notificacionExistente.save();

    return notificacionExistente;
  } catch (error) {
    console.error(error);
    return false; // Ocurrió un error al modificar la notificación
  }
};
