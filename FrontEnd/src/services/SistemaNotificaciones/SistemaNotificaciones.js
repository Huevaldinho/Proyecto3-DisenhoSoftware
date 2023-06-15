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
    /**
     * Metodo para enviar una notificacion.
     * @param {Notificacion} notificacion 
     * @returns {JSON} Notificacion creada
     */
    async notificar(notificacion) {
        try {
            const response = await fetch(`${API_URL}/notificacion/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    asunto: notificacion.asunto,
                    cuerpo: notificacion.cuerpo,
                    fecha: notificacion.fecha,
                    hora: notificacion.hora,
                    emisor: notificacion.emisor,
                    receptores: notificacion.receptores,
                })
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("SistemaNotificaciones notificar retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en SistemaNotificaciones, en metodo notificar: ', error);
            return null;
        }
    }
    /**
     * Metodo para modificar una notificacion.
     * @param {Notificacion} notificacion 
     */
    async modificarNotificacion(notificacion) {
        try {
            const response = await fetch(`${API_URL}/notificacion/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: notificacion._id,
                    asunto: notificacion.asunto,
                    cuerpo: notificacion.cuerpo,
                    fecha: notificacion.fecha,
                    hora: notificacion.hora,
                    emisor: notificacion.emisor,
                    receptores: notificacion.receptores
                })
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("SistemaNotificaciones modificarNotificacion retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en SistemaNotificaciones, en metodo modificarNotificacion: ', error);
            return null;
        }
    }

}