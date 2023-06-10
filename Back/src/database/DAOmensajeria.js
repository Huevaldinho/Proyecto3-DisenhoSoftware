import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    miembros: { type: Array, required: true },
    mensajes: { type: Array, required: true },
});

const mensajeSchema = new mongoose.Schema({
    emisor: { type: ObjectId, required: true },
    mensaje: { type: String, required: true},
    fechaHora: { type: String, required: true}
});

const Chat = mongoose.model('Chat',chatSchema,'Chat');
const Mensaje = mongoose.model('Mensaje',mensajeSchema,'Mensaje');

//Insertar chat 
export async function obtenerChats(id){
    try {
        const c = await Chat.find({ miembros: { $elemMatch: { $eq: id } } });
        return c;
    } catch (error) {
        console.log(error)
    }
};


//Insertar chat 
export async function insertarChat(DTOMensajeria){
    try {
        let nuevoChat = new Chat({
            //crear el nuevo objeto para enviarlo a la db
            miembros: [DTOMensajeria._id],
            mensajes: []
          });
        nuevoChat.save();
        return nuevoChat;
    } catch (error) {
        console.log(error)
    }
};


//Insertar un mensaje
export async function insertarMensaje(DTOMensajeria){
    try {
        let chat = await Chat.findById(DTOMensajeria.idChat); //devuelve el primer plan que encuentre (el único)
        let nuevoMensaje = new Mensaje({
            //crear el nuevo objeto para enviarlo a la db
            idChat: DTOMensajeria.idChat,
            emisor: DTOMensajeria.emisor,
            mensaje: DTOMensajeria.mensaje,
            fechaHora: DTOMensajeria.fechaHora
          });
        chat.mensajes.push(nuevoMensaje); //agrega el id de la actividad al plan de trabajo
        chat.save();
        return nuevoMensaje;
    } catch (error) {
        console.log(error)
    }
};

//Obtener mensajes de un chat
export async function obtenerMensajes(id){
    try {
        const m = await Mensaje.find({idChat: id});
        return m;
    } catch (error) {
        console.log(error)
    }
};


//Metodo para insertar un miembro
export async function insertarMiembro(DTOMensajeria){
    try {
        let chat = await Chat.findById(DTOMensajeria.idChat); //devuelve el primer plan que encuentre (el único)
        chat.miembros.push(DTOMensajeria._id); //agrega el id de la actividad al plan de trabajo
        chat.save();
        return chat;
    } catch (error) {
        console.log(error)
    }
};
