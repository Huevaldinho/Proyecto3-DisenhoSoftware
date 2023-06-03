import {
    getEquipoGuia,
    ingresarProfesoresEquipo,
    eliminarProfesorEquipo
} from "../database/DAOProfesor.js"; //Importación de DAOProfesor

export const getEquipo = async (req, res) => {
    const equipo = await getEquipoGuia();
    console.log(equipo);
    res.json(equipo);
}

//Método para ingresar los profesores al equipo, recibe un body con los datos de los profesores que conformaran el equipo guía
export const postEquipo = async (req, res) => {
    const equipo = await ingresarProfesoresEquipo(req.body);
    console.log(equipo);
    res.json(equipo);
}

//Método para eliminar a un profesor de un equipo, solamente cambia su estado
export const deleteEquipo = async (req, res) => {
    const equipo = await eliminarProfesorEquipo(req.params.id);
    console.log(equipo);
    res.json(equipo);
}