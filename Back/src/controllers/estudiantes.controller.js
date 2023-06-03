import {
    getEstudiantesMongo,
    ingresarEstudiantes,
    eliminarEstudiante,
    modificarEstudiante
} from "../database/DAOEstudiante.js"; //Importación de DAOEstudiante

//Método para traer todos los estudiantes de la base de datos, relacionado al metodo get de la ruta de estudiantes
export const getEstudiantes = async (req, res) => {
    const estudiantes = await getEstudiantesMongo();
    res.json(estudiantes);
}

//Método post para insertar todos los estudiantes, recibe una lista por el body u los inserta
export const postEstudiantes = async (req, res) => {
    console.log(req.body)
    const estudiantes = await ingresarEstudiantes(req.body);
    console.log(estudiantes);
    res.json(estudiantes);
}

//Método put para modificar un estudiante, este recibe un Body con los datos que actuara como un DTOEstudiante
//Recibe un body
export const putEstudiante = async (req, res) => {
    const estudianteMod = await modificarEstudiante(req.body);
    console.log(estudianteMod);
    if (typeof estudianteMod === 'string')
        res.send(estudianteMod);
    else 
        res.json(estudianteMod);
}

//Método delete que se encarga de cambiar el estado de un estudiante a inactivo, recibe un id en params
export const deleteEstudiante = async (req, res) => {
    const estudianteBorrado = await eliminarEstudiante(req.params.id);
    console.log(estudianteBorrado);
    res.json(estudianteBorrado);
}