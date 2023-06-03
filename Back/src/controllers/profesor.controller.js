import {
    getProfesoresMongo,
    agregarProfesor,
    modificarProfesor,
    eliminarProfesor
} from "../database/DAOProfesor.js"; //Importación de DAOProfesor

//Método para obtener y mostrar todos los profesores
export const getProfesores = async (req, res) => {
    const profesores = await getProfesoresMongo();
    console.log(profesores);
    res.json(profesores);
}

//Método post para agregar un profesor, este recibe un Body con los datos que actuara como un DTOProfesor
export const postProfesor = async (req, res) => {
    console.log(req.body)
    var profesorNuevo;
    if (!req.file || req.file == null)
        profesorNuevo = await agregarProfesor(req.body,"");
    else
        profesorNuevo = await agregarProfesor(req.body,req.file.path);
    console.log(profesorNuevo);
    if (typeof profesorNuevo === 'string')
        res.send(profesorNuevo);
    else
        res.json(profesorNuevo);

}

//Método post para agregar un profesor, este recibe un Body con los datos que actuara como un DTOProfesor
export const putProfesor = async (req, res) => {
    var profesorMod;
    if (!req.file || req.file == null)
        profesorMod = await modificarProfesor(req.body,"");
    else
        profesorMod = await modificarProfesor(req.body,req.file.path);
    console.log(profesorMod);
    if (typeof profesorMod === 'string')
        res.send(profesorMod);
    else
        res.json(profesorMod);
}

//Método delete que se encarga de cambiar el estado de un profesor a inactivo
export const deleteProfesor = async (req, res) => {
    const profesorBorrado = await eliminarProfesor(req.params.id);
    console.log(profesorBorrado);
    res.json(profesorBorrado);
}