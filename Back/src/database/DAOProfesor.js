import mongoose from "mongoose"; //importación de librerias
import { subirFotoNube } from "../database/connectionCloud.js";

const profesorSchema = new mongoose.Schema({
  codigo: { type: String, required: true },
  cedula: { type: String, required: true },
  nombre: { type: String, required: true },
  nombre2: { type: String, required: true },
  apellido1: { type: String, required: true },
  apellido2: { type: String, required: true },
  telefono: { type: String, required: true },
  celular: { type: String, required: true },
  correo: { type: String, required: true },
  campus: { type: String, required: true },
  contrasenna: { type: String, required: true },
  estado: { type: String, required: true },
  coordinador: { type: String, required: true },
  rol: { type: String, required: true },
  equipo: { type: String, required: true },
  foto: { type: String },
});

const Profesor = mongoose.model("Profesor", profesorSchema, "Profesor");

const contrasennaReg = /^[0-9]{8}$/;
const correoReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telefonoReg = /^2\d{3}-\d{4}(\s\[\d{4}\])$/;
const cedulaReg = /^[1-9]{1}[0-9]{8}$/;
const celularReg = /^[678]\d{7}$/;

//Metodo para poder validar inicio de sesión de profesor
export async function validarProfesor(correoP, contrasennaP) {
  try {
    const data = await Profesor.findOne({ correo: correoP });
    if (data) {
      if (data.contrasenna == contrasennaP) return data;
      else return "2";
    } else {
      return "1";
    }
  } catch (error) {
    return error;
  }
}

//Método que retorna los datos del profesor (si lo encuentra) mediante el correo
export async function validarProfesorCambiarContra(correoP, contrasennaP) {
  try {
    const contrasennaReg = /^[0-9]{8}$/;
    var data = await Profesor.findOne({ correo: correoP });
    if (data) {
      if (contrasennaP.match(contrasennaReg)) {
        data.contrasenna = contrasennaP;
        data.save();
        return data;
      } else return "2"; //La contraseña no corresponde al formato de minimo 8 caracteres, al menos 1 letra y 1 número
    } else {
      return "1"; //No se encontro al usuario en el sistema
    }
  } catch (error) {
    return error;
  }
}

//Método para agregar un profesor
//DTOProfesor es un json

export const agregarProfesor = async (DTOProfesor, fileFoto) => {
  console.log("Post profesor middlewhere");
  try {
    var fotoP;
    const data = await Profesor.findOne({ correo: DTOProfesor.correo });
    const dataT = await Profesor.findOne({ telefono: DTOProfesor.telefono });
    const dataC = await Profesor.findOne({ cedula: DTOProfesor.cedula });
    const dataCel = await Profesor.findOne({ celular: DTOProfesor.celular });
    if (!DTOProfesor.contrasenna.match(contrasennaReg)) return "1"; //error si la contraseña no es aceptada
    if (!DTOProfesor.correo.match(correoReg)) return "2"; //error si el correo no es aceptado
    if (!DTOProfesor.telefono.match(telefonoReg)) return "3"; //error si el telefono no es aceptado
    if (!DTOProfesor.cedula.match(cedulaReg)) return "4"; //error si la cedula no es aceptada
    if (
      DTOProfesor.nombre == "" ||
      DTOProfesor.apellido1 == "" ||
      DTOProfesor.apellido2 == ""
    )
      return "5"; //error si alguno de estos campos esta vacio
    if (data) return "6"; //error si ya existia un profesor registrado
    if (dataT) return "7"; //error si ya existia el telefono registrado
    if (dataC) return "8"; //error si ya existia la cedula registrada
    if (dataCel) return "9"; //error si ya existia el celular registrada
    if (!DTOProfesor.celular.match(celularReg)) return "10"; //error si el celular no es aceptada
    if (fileFoto != "") {
      fotoP = await subirFotoNube(fileFoto);
      if (fotoP == "11") return "11";
    } else fotoP = "";
    const codigoP = await asignarCodigo(DTOProfesor.campus);
    let p = new Profesor({
      codigo: codigoP,
      cedula: DTOProfesor.cedula,
      nombre: DTOProfesor.nombre,
      nombre2: DTOProfesor.nombre2,
      apellido1: DTOProfesor.apellido1,
      apellido2: DTOProfesor.apellido2,
      telefono: DTOProfesor.telefono,
      celular: DTOProfesor.celular,
      correo: DTOProfesor.correo,
      campus: DTOProfesor.campus,
      contrasenna: DTOProfesor.contrasenna,
      estado: "Activo",
      coordinador: DTOProfesor.coordinador,
      equipo: DTOProfesor.equipo,
      rol: DTOProfesor.rol,
      foto: fotoP,
    });
    p.save();
    return p;
  } catch (error) {
    return error;
  }
};

//Función que asigna el código cuando se registra un profesor
async function asignarCodigo(campusP) {
  const lista = await Profesor.find({ campus: campusP });
  var num = lista.length + 1;
  var codigoP;
  if (campusP == "Campus Tecnológico Central Cartago")
    if (num < 100) return (codigoP = "CA-0" + num);
    else return (codigoP = "CA-" + num);
  if (campusP == "Campus Tecnológico Local San Carlos")
    if (num < 100) return (codigoP = "SC-0" + num);
    else return (codigoP = "SC-" + num);
  if (campusP == "Campus Tecnológico Local San José")
    if (num < 100) return (codigoP = "SJ-0" + num);
    else return (codigoP = "SJ-" + num);
  if (campusP == "Centro Académico de Alajuela")
    if (num < 100) return (codigoP = "AL-0" + num);
    else return (codigoP = "AL-" + num);
  if (campusP == "Centro Académico de Limón")
    if (num < 100) return (codigoP = "LI-0" + num);
    else return (codigoP = "LI-" + num);
}

//Metodo para hacer la consulta de todos los estudiantes
export async function getProfesoresMongo() {
  try {
    const data = await Profesor.find({
      $or: [{ rol: "Profesor" }, { rol: "Asistente" }],
    });
    if (data) {
      return data;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

//Método para modificar un profesor, relacionado con la ruta de put de Profesor
//DTOProfesor es un json que viene de Body
export const modificarProfesor = async (DTOProfesor, path) => {
  console.log("put profesor middlewhere");
  try {
    var fotoP;
    var p = await Profesor.findOne({ codigo: DTOProfesor.codigo });
    const data = await Profesor.findOne({ correo: DTOProfesor.correo });
    const dataT = await Profesor.findOne({ telefono: DTOProfesor.telefono });
    const dataC = await Profesor.findOne({ cedula: DTOProfesor.cedula });
    const dataCel = await Profesor.findOne({ celular: DTOProfesor.celular });
    var dataCoordinador = await Profesor.findOne({
      campus: DTOProfesor.campus,
      coordinador: "COORDINADOR",
    });
    if (!DTOProfesor.correo.match(correoReg)) return "2"; //error si el correo no es aceptado
    if (!DTOProfesor.telefono.match(telefonoReg)) return "3"; //error si el telefono no es aceptado
    if (!DTOProfesor.cedula.match(cedulaReg)) return "4"; //error si la cedula no es aceptada
    if (
      DTOProfesor.nombre == "" ||
      DTOProfesor.apellido1 == "" ||
      DTOProfesor.apellido2 == ""
    )
      return "5"; //error si alguno de estos campos esta vacio
    if (p.correo != DTOProfesor.correo && data) return "6"; //error si ya existia un profesor registrado
    if (p.telefono != DTOProfesor.telefono && dataT) return "7"; //error si ya existia el telefono registrado
    if (p.cedula != DTOProfesor.cedula && dataC) return "8"; //error si ya existia la cedula registrada
    if (p.celular != DTOProfesor.celular && dataCel) return "9"; //error si ya existia el celular registrada
    if (!DTOProfesor.celular.match(celularReg)) return "10"; //error si el celular no es aceptada
    if (path != "") {
      fotoP = await subirFotoNube(path);
      if (fotoP == "11") return "11";
      p.foto = fotoP;
    }
    p.cedula = DTOProfesor.cedula;
    p.nombre = DTOProfesor.nombre;
    p.nombre2 = DTOProfesor.nombre2;
    p.apellido1 = DTOProfesor.apellido1;
    p.apellido2 = DTOProfesor.apellido2;
    p.telefono = DTOProfesor.telefono;
    p.correo = DTOProfesor.correo;
    p.celular = DTOProfesor.celular;
    p.campus = DTOProfesor.campus;
    p.contrasenna = DTOProfesor.contrasenna;
    if (
      p.coordinador == "NOCOORDINADOR" &&
      DTOProfesor.coordinador == "COORDINADOR"
    ) {
      if (dataCoordinador) {
        dataCoordinador.coordinador = "NOCOORDINADOR";
        dataCoordinador.save();
      }
      p.coordinador = "COORDINADOR";
    } else p.coordinador = DTOProfesor.coordinador;
    p.estado = DTOProfesor.estado;
    p.rol = DTOProfesor.rol;
    p.equipo = DTOProfesor.equipo;
    p.save();
    return p;
  } catch (error) {
    return error;
  }
};

//Método encargado de hacer que un profesor este inactivo, relacionado con la ruta de delete de Profesor
//_id es la cedula del profesor
export const eliminarProfesor = async (_id) => {
  console.log("delete profesor middlewhere");
  try {
    var p = await Profesor.findOne({ cedula: _id });
    p.estado = "Inactivo";
    p.save();
    return p;
  } catch (error) {
    return error;
  }
};

//Método encargado de asignar un profesor a asistente
//codigoP es el codigo del profesor
export const asignarAsistente = async (codigoP, campusP) => {
  try {
    var data = await Profesor.findOne({ campus: campusP, rol: "Asistente" });
    if (data) {
      data.rol = "Profesor";
      data.save();
    }
    var p = await Profesor.findOne({ codigo: codigoP });
    p.rol = "Asistente";
    p.save();
    return p;
  } catch (error) {
    return error;
  }
};

//Metodo para hacer del Equipo Guia
export async function getEquipoGuia() {
  try {
    const data = await Profesor.find({ equipo: "Equipo" });
    if (data) {
      return data;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

//Método post para modificar los profesores y que sean parte del Equipo Guia
export const ingresarProfesoresEquipo = async (lista) => {
  try {
    for (const DTOProfesor of lista) {
      var p = await Profesor.findOne({ cedula: DTOProfesor.cedula });
      p.equipo = "Equipo";
      p.save();
    }
    return lista;
  } catch (error) {
    return error;
  }
};

//Método delete para eliminar a un profesor del Equipo Guía
export const eliminarProfesorEquipo = async (_id) => {
  console.log("delete profesorEquipo middlewhere");
  try {
    var p = await Profesor.findOne({ cedula: _id });
    p.estado = "NOEquipo";
    p.save();
    return p;
  } catch (error) {
    return error;
  }
};

//Metodo para hacer la consulta de todos los estudiantes
export async function getProfesoresActividad(lista) {
  try {
    const data = await Profesor.find({ _id: { $in: lista } });
    if (data) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
}
