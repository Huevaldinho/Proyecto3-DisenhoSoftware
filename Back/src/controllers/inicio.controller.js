import {
    validarProfesor,
    validarProfesorCambiarContra
} from "../database/DAOProfesor.js"; //Importación de DAOProfesor

import {
    validarEstudiante,
    validarEstudianteCambiarContra
} from "../database/DAOEstudiante.js"; //Importación de DAOProfesor

//Método asociado a getInicio, este método hace que se valide cuando se inicie sesión y dice si es un profesor, asistente o estudiante
/*
Profesor / coordinador / Asistente
Estudiante
4 = No existe en el sistema
*/
export const postInicio = async (req, res) => {
    var validar = await validarProfesor(req.params.email, req.params.password) 
    console.log(validar)
    if (validar == "1") {
        var validar2 = await validarEstudiante(req.params.email, req.params.password) 
        if (validar == "1" || validar == "2") {
            res.send(validar2)
        }
        else
            res.json(validar2)
    }
    else if(validar == "2")
        res.send(validar)
    else
        res.json(validar)
}

// Método Put que encuentra el email registrado en la base de datos y cambia su contraseña
export const putInicio = async (req, res) => {
    var validar = await validarProfesorCambiarContra(req.params.email, req.params.password) 
    console.log(validar)
    if (validar == "1") {
        var validar2 = await validarEstudianteCambiarContra(req.params.email, req.params.password) 
        if (validar == "1" || validar == "2") {
            res.send(validar2)
        }
        else
            res.json(validar2)
    }
    else if(validar == "2")
        res.send(validar)
    else
        res.json(validar)
}