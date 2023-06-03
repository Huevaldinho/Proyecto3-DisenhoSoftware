import {
    asignarAsistente
} from "../database/DAOProfesor.js"; //Importación de DAOProfesor

//Método post para asignar un asistente a un campus, recibe por parametros el codigo y campus del profesor
export const postAsistente= async (req, res) => {
    const asistenteNuevo = await asignarAsistente(req.params.codigo, req.params.campusP);
    console.log(asistenteNuevo);
    res.json(asistenteNuevo);
}