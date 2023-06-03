import mongoose from "mongoose"; //importación de librerias


//Schema del estudiante, estos son sus atributos en la base de datos
const estudianteSchema = new mongoose.Schema({
    carnet: {type: String, required: true},
    nombre: {type: String, required: true},
    nombre2: {type: String, required: true},
    apellido1: {type: String, required: true},
    apellido2: {type: String, required: true},
    celular: {type: String, required: true},
    correo: {type: String, required: true},
    campus: {type: String, required: true},
    contrasenna: {type: String, required: true},
    estado: {type: String, required: true},
    rol: {type: String, required: true},
});

//Objeto que hace de estudiante, con este se hacen todos los métodos
const Estudiante = mongoose.model('Estudiante',estudianteSchema,'Estudiante');

//Metodo para poder validar inicio de sesión de estudiante
export async function validarEstudiante(correoP,contrasennaP){
    try {
        const data = await Estudiante.findOne({ correo: correoP}); 
        if (data) {
            if (data.contrasenna == contrasennaP)
                return data
            else
                return "2"
        } else {
            return "1"
        }
    } catch (error) {
        console.log(error)
    }
};

//Método que retorna los datos del estudiante (si lo encuentra) mediante el correo
export async function validarEstudianteCambiarContra(correoP, contrasennaP){
    try {
        const contrasennaReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        var data = await Estudiante.findOne({ correo: correoP}); 
        if (data) {
            if (contrasennaP.match(contrasennaReg)) {
                data.contrasenna = contrasennaP;
                data.save();
                return data
            }
            else return "2" //La contraseña no corresponde al formato de minimo 8 caracteres, al menos 1 letra y 1 número
        } else {
            return "1" //No se encontro al usuario en el sistema
        }
    } catch (error) {
        console.log(error)
    }
};

//Metodo para hacer la consulta de todos los estudiantes
export async function getEstudiantesMongo(){
    try {
        const data = await Estudiante.find(); 
        if (data) {
            return data
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
    }
};

//Método que ingresa estudiantes a la base de datos mongo, esta es una lista de Json que contiene cada uno 
//los datos de los estudiantes, devuelve esta misma lista 
export const ingresarEstudiantes = async (lista) => {
    try {
        for (const DTOEstudiante of lista) {
            var e = await Estudiante.findOne({carnet: DTOEstudiante[0]});
            if(e) {
                e.carnet = DTOEstudiante[0];
                e.nombre = DTOEstudiante[1];
                e.nombre2 = DTOEstudiante[2];
                e.apellido1 = DTOEstudiante[3];
                e.apellido2 = DTOEstudiante[4];
                e.correo = DTOEstudiante[5];
                e.campus = DTOEstudiante[8];
                e.contrasenna = DTOEstudiante[6];
                e.estado = DTOEstudiante[9];
                e.rol =  DTOEstudiante[7];
                e.celular = DTOEstudiante[10];
            } else {
                e = new Estudiante({
                    carnet: DTOEstudiante[0],
                    nombre: DTOEstudiante[1],
                    nombre2: DTOEstudiante[2],
                    apellido1: DTOEstudiante[3],
                    apellido2: DTOEstudiante[4],
                    correo: DTOEstudiante[5],
                    campus: DTOEstudiante[8],
                    contrasenna: DTOEstudiante[6],
                    estado: DTOEstudiante[9],
                    celular: DTOEstudiante[10],
                    rol: DTOEstudiante[7]
                })
            }
            e.save();
        }; 
        return lista;
    } catch (error) {
        return error;
    }
};

//Método para modificar un profesor, relacionado con la ruta de put de Profesor
//DTOProfesor es un json que viene de Body
export const modificarEstudiante = async (DTOEstudiante) => {
    console.log("mod estudiante middlewhere");
    try {
        var e = await Estudiante.findOne({carnet: DTOEstudiante.carnet}); 
        const correoReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const telefonoReg = /^(7|6|8){1}[0-9]{7}$/;
        const data = await Estudiante.findOne({ correo: DTOEstudiante.correo });
        const dataT = await Estudiante.findOne({ celular: DTOEstudiante.celular });
        if (!DTOEstudiante.correo.match(correoReg)) 
            return "2"; //error si el correo no es aceptado
        if (!DTOEstudiante.celular.match(telefonoReg)) return "3"; //error si el telefono no es aceptado
        if (e.correo != DTOEstudiante.correo && data) return "4" //error si ya existia un profesor registrado*/
        if (e.celular != DTOEstudiante.celular && dataT) return "5"
        e.carnet = DTOEstudiante.carnet;
        e.nombre = DTOEstudiante.nombre;
        e.nombre2 = DTOEstudiante.nombre2;
        e.apellido1 = DTOEstudiante.apellido1;
        e.apellido2 = DTOEstudiante.apellido2;
        e.correo = DTOEstudiante.correo;
        e.campus = DTOEstudiante.campus;
        e.contrasenna = DTOEstudiante.contrasenna;
        e.estado = DTOEstudiante.estado;
        e.rol =  DTOEstudiante.rol;
        e.celular = DTOEstudiante.celular;
        e.save();
        return e;
      } catch (error) {
        return error;
    }
};

//Método encargado de hacer que un estudiante este inactivo, relacionado con la ruta de delete de Estudiante 
//_id es el carnet del estudiante
export const eliminarEstudiante = async (_id) => {
    console.log("delete estudiante middlewhere");
    try {
        var e = await Estudiante.findOne({carnet: _id});
        e.estado = "Inactivo";
        e.save();
        return e;
      } catch (error) {
        return error;
    }
};