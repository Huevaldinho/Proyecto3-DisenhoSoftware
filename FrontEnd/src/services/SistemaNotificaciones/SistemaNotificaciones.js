import { API_URL } from "../config";
export default class SistemaNotificaciones {
    //-chats:Collection<Chat> se maneja en el mainContext.
    constructor() { }
    //*Metodos
    async obtenerNotificaciones(usuario) {
        try {
            const response = await fetch(`${API_URL}/notificacion/recibidas/${usuario._id}/?tu=${usuario.rol === "Profesor" ? 1 : 2}`, {
                method: 'GET'
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("SistemaNotificaciones obtenerNotificaciones retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en SistemaNotificaciones, en metodo obtenerNotificaciones: ', error);
            return null;
        }
    }

}