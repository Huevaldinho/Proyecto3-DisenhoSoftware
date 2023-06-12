import { API_URL } from "../config";
export default class SistemaMensajeria {
    //-chats:Collection<Chat> se maneja en el mainContext.
    //hacer peticiones a api.

    constructor() { }
    //*Metodos
    /**
     * Metodo para pedir a la api los chats de un usuario.
     * @param {String} idMiembro 
     * @returns {Array de Chats,Chats en formato JSON}
     */
    async obtenerChats(idMiembro) {
        try {
            const response = await fetch(`${API_URL}/chat/${idMiembro}`, {
                method: 'GET'
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("SistemaMensajeria obtenerChats retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en SistemaMensajeria, en metodo obtenerChats: ', error);
            return null;
        }
    }

    async crearChat(creadorChat) {
        try {
            const response = await fetch(`${API_URL}/chat/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: creadorChat._id,
                    nombre1: creadorChat.nombre1,
                    nombre2: creadorChat.nombre2,
                    apellido1: creadorChat.apellido1,
                    apellido2: creadorChat.apellido2
                })
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("SistemaMensajeria crearChat retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en SistemaMensajeria, en metodo crearChat: ', error);
            return null;
        }
    }
    async enviarMensaje(mensaje, emisor, idChat, fechaHora) {
        try {
            console.log("Emisor:",emisor)
            const response = await fetch(`${API_URL}/mensaje/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idChat: idChat,
                    mensaje: mensaje,
                    fechaHora: fechaHora,
                    _id: emisor._id,
                    nombre1: emisor.nombre,
                    nombre2: emisor.nombre2,
                    apellido1: emisor.apellido1,
                    apellido2: emisor.apellido2
                })
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("SistemaMensajeria crearChat retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en SistemaMensajeria, en metodo crearChat: ', error);
            return null;
        }
    }
}