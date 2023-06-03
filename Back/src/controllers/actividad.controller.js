import {
  getActividadesDB,
  ingresarActividadDB,
  modificarActividadDB,
  eliminarActividadDB,
} from "../database/DAOActividad.js"; //database methods

export const getActividades = async (req, res) => {
  //devuelve todos las actividades
  const actividades = await getActividadesDB();
  res.json(actividades);
};

export const postActividad = async (req, res) => {
  let nuevaActividad = "";
  if (!req.file || req.file == null)
    nuevaActividad = await ingresarActividadDB(req.body, "");
  else
    nuevaActividad = await ingresarActividadDB(req.body, req.file.path);
  console.log("Nueva actividad:", nuevaActividad)
  res.json(nuevaActividad);
};

export const putActividad = async (req, res) => {
  let nuevasRutas = [];
  if (!req.files || req.files.length === 0) {
    nuevasRutas.push(""); // Agregar una ruta vacía al array
  } else {
    nuevasRutas = req.files.map((archivo) => archivo.path);
  }
  const nuevaActividad = await modificarActividadDB(req.body, nuevasRutas);
  res.json(nuevaActividad);
};

export const deleteActividad = async (req, res) => {
  const actividad = await eliminarActividadDB(req.body);
  res.json(actividad);
};
