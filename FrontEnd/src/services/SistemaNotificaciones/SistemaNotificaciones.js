import { API_URL } from "../config";
export default class SistemaNotificaciones {
    //-chats:Collection<Chat> se maneja en el mainContext.
    //hacer peticiones a api.

    constructor() { }
    //*Metodos
    async obtenerNotificaciones() {
        
    let data = [{"asunto" : "Importante", "fecha" : "2023-06-11","emisor" : {"nombre" : "Anthony" }}]
    return data;
    
    }
    
}