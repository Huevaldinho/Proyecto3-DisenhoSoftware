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
}