import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { getProfesoresActividad } from "../database/DAOProfesor.js"; //Importación de DAOProfesor
import { subirFotoNube } from "../database/connectionCloud.js";
//Schema asociado a plan de actividades, es el cual se guardará en mongo
const planSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  actividades: { type: Array, required: true },
});

//Schema asociado a actividad, es el cual se guardara en mongo
const actividadSchema = new mongoose.Schema({
  afiche: { type: String, required: false },
  descripcion: { type: String, required: true },
  enlace: { type: String, required: false },
  estado: { type: String, required: true },
  evidencias: { type: Array, required: false },
  fechaHora: { type: String, required: true },
  fechaHoraPublicacion: { type: String, required: true },
  modalidad: { type: String, required: true },
  nombre: { type: String, required: true },
  recordatorios: { type: Array, required: true },
  responsables: { type: Array, required: true },
  semana: { type: String, required: true },
  tipoActividad: { type: String, required: true },
});

//Schema asociado a comentario, es el cual se guardara en mongo
const comentarioSchema = new mongoose.Schema({
  idActividad: { type: ObjectId, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: String, required: true },
  autor: { type: String, required: true },
  idRespuesta: { type: ObjectId },
});

// Objeto
const Plan = mongoose.model("Plan", planSchema, "Plan"); //"Objeto plan" que actuara como conexión entre mongo y el api
const Actividad = mongoose.model("Actividad", actividadSchema, "Actividad"); //"Objeto Actividad" que actuara como conexión entre mongo y el api
const Comentario = mongoose.model("Comentario", comentarioSchema, "Comentario"); //"Objeto comentario" que actuara como conexión entre mongo y el api

async function guardarEnplanDB(nombreActividad) {
  try {
    const plan = await Plan.findOne(); //devuelve el primer plan que encuentre (el único)
    const actividad = await Actividad.findOne({ nombre: nombreActividad }); //tengo la actividad

    plan.actividades.push(actividad._id); //agrega el id de la actividad al plan de trabajo
    await plan.save();
  } catch (error) {
    return error;
  }
}

export const getPlanDB = async () => {
  // try {
  //   const plan = await Plan.findOne(); //devuelve el primer plan que encuentre (el único)
  //   const idsActividades = plan.actividades;

  //   const actividades = await Actividad.find({
  //     _id: { $in: idsActividades },
  //   });
  //   for (let i in actividades) {
  //     var actividad = actividades[i];
  //     const idResponsables = actividad.responsables;
  //     const responsables = await getProfesoresActividad(idResponsables);
  //     actividad.responsables = responsables;
  //   }
  //   if (actividades) return actividades;
  //   return false;
  // } catch (error) {
  //   return error;
  // }
  try {
    const plan = await Plan.findOne();
    const idsActividades = plan.actividades;

    const actividades = await Actividad.find({ _id: { $in: idsActividades } });
    plan.actividades = actividades
    for (let i in actividades) {
      var actividad = actividades[i];
      const idResponsables = actividad.responsables;
      const responsables = await getProfesoresActividad(idResponsables);
      actividad.responsables = responsables;
    }
    if (plan) return plan;
    return false;
  } catch (error) {
    return error;
  }
};

export const modificarPlanDB = async (nuevoPlan) => {
  try {
    var plan = await Plan.findOne(); //encuentra el unico plan
    plan.nombre = nuevoPlan.nombre;
    plan.save();
    return plan;
  } catch (error) {
    return error;
  }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const getActividadesDB = async () => {
  try {
    const plan = await Plan.findOne(); //devuelve el primer plan que encuentre (el único)
    const idsActividades = plan.actividades;

    const actividades = await Actividad.find({ _id: { $in: idsActividades } });
    for (let i in actividades) {
      var actividad = actividades[i];
      const idResponsables = actividad.responsables;
      const responsables = await getProfesoresActividad(idResponsables);
      actividad.responsables = responsables;
    }
    if (actividades) return actividades;
    return false;
  } catch (error) {
    return error;
  }
};

export const ingresarActividadDB = async (DTOActividad, filePhoto) => {
  try {
    const actividadExistente = await Actividad.findOne({
      nombre: DTOActividad.nombre,
    }); //si ya existe con ese nombre
    if (actividadExistente) return "-1";

    let rutaFoto = filePhoto !== "" ? await subirFotoNube(filePhoto) : ""; //si la ruta está vacía, el campo es ""
    if (rutaFoto === "11") rutaFoto = ""; //si es "11" no se pudo subir
    const idsResponsables = DTOActividad.responsables.map(
      (responsable) => responsable._id
    ); //obtiene únicamente los ids de los responsables
    let nuevaActividad = new Actividad({
      //crear el nuevo objeto para enviarlo a la db
      afiche: rutaFoto, //guarda la ruta del archivo en la nube, sea PDF o JPG o similar
      descripcion: DTOActividad.descripcion,
      enlace: DTOActividad.enlace,
      estado: DTOActividad.estado,
      evidencias: [],
      fechaHora: DTOActividad.fechaHora,
      fechaHoraPublicacion: DTOActividad.fechaHoraPublicacion,
      modalidad: DTOActividad.modalidad,
      nombre: DTOActividad.nombre,
      recordatorios: DTOActividad.recordatorios,
      responsables: idsResponsables, //guarda el array del id de los responsables
      semana: DTOActividad.semana,
      tipoActividad: DTOActividad.tipoActividad,
    });
    nuevaActividad.save();
    guardarEnplanDB(nuevaActividad.nombre); //envía a guardar el id de la nueva actividad en el array de plan

    return nuevaActividad;
  } catch (error) {
    console.log("Error:", error);
    return error;
  }
};

export const modificarActividadDB = async (DTOActividad, archivos) => {
  try {
    console.log(DTOActividad)
    const actividadExistente = await Actividad.findById(DTOActividad._id);
    if (!actividadExistente) return "-1";
    const idsResponsables = DTOActividad.responsables.map(
      (responsable) => responsable._id
    ); //obtiene únicamente los ids de los responsables
    actividadExistente.descripcion = DTOActividad.descripcion;
    actividadExistente.enlace = DTOActividad.enlace;
    actividadExistente.estado = DTOActividad.estado;
    actividadExistente.fechaHora = DTOActividad.fechaHora;
    actividadExistente.fechaHoraPublicacion = DTOActividad.fechaHoraPublicacion;
    actividadExistente.modalidad = DTOActividad.modalidad;
    actividadExistente.nombre = DTOActividad.nombre;
    actividadExistente.recordatorios = DTOActividad.recordatorios;
    actividadExistente.responsables = idsResponsables; //guarda el array del id de los responsables
    actividadExistente.semana = DTOActividad.semana;
    actividadExistente.tipoActividad = DTOActividad.tipoActividad;
    if ((archivos[0] != null || archivos[0]) && archivos[0] != "") {
      let rutaFoto = await subirFotoNube(archivos[0]);
      actividadExistente.afiche = rutaFoto
    }
    if (archivos.length > 1) {
      for (let i = 1; i <= archivos.length; i++) {
        if (archivos[i] != null || archivos[i]) {
          let rutaFoto = await subirFotoNube(archivos[i]);
          actividadExistente.evidencias.push(rutaFoto)
        }
      }
    }

    actividadExistente.save();

    return actividadExistente;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const eliminarActividadDB = async (DTOActividad) => {
  try {
    const actividadEliminada = DTOActividad;

    const plan = await Plan.findOne(); //devuelve el primer plan que encuentre (el único)
    plan.actividades.pull(DTOActividad._id);
    await plan.save();

    return actividadEliminada;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//Método que retorna todos los comentarios de una actividad en especifico
export async function getComentariosActividad(idA) {
  try {
    const data = await Comentario.find({ idActividad: idA });
    if (data) {
      return data;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

//Método que agregara un comentario a mongo
export const agregarComentario = async (comentario) => {
  console.log("Post comentario middlewhere");
  try {
    if (comentario.descripcion == "") return "1";
    let c = new Comentario({
      idActividad: comentario.idActividad,
      descripcion: comentario.descripcion,
      fecha: comentario.fecha,
      autor: comentario.autor,
      idRespuesta: null,
    });
    c.save();
    return c;
  } catch (error) {
    return error;
  }
};

//Método para agregar una respuesta a un comentario
export const agregarRespuesta = async (comentario) => {
  console.log("Put respuesta middlewhere");
  try {
    if (comentario.descripcion == "") return "1";
    let c = new Comentario({
      idActividad: comentario.idActividad,
      descripcion: comentario.descripcion,
      fecha: comentario.fecha,
      autor: comentario.autor,
      idRespuesta: comentario.idRespuesta,
    });
    c.save();
    return c;
  } catch (error) {
    return error;
  }
};

//Método que retorna todos los comentarios de una actividad en especifico
export async function getRespuestas(idA) {
  try {
    const data = await Comentario.find({ idRespuesta: idA });
    if (data) {
      return data;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}
