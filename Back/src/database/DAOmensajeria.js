import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    miembros: { type: Array, required: true },
    mensajes: { type: Array, required: true },
});

const mensajeSchema = new mongoose.Schema({
    emisor: { type: JSON, required: true },
    mensaje: { type: String, required: true},
    fechaHora: { type: String, required: true}
});

const usuarioSchema = new mongoose.Schema({
    identificador: {type: String, required: true},
    nombre1: { type: String, required: true},
    nombre2: { type: String, required: true},
    apellido1: { type: String, required: true},
    apellido2: { type: String, required: true}
});


const Chat = mongoose.model('Chat',chatSchema,'Chat');
const Mensaje = mongoose.model('Mensaje',mensajeSchema,'Mensaje');
const Usuario = mongoose.model('Usuario',usuarioSchema,'Usuario');

//Insertar chat 
export async function obtenerChats(id){
    try {
        const c = await Chat.find({"miembros.identificador": id});
        return c;
    } catch (error) {
        console.log(error)
    }
};


//Insertar chat 
export async function insertarChat(DTOMensajeria){
    try {
        let creador = new Usuario({
            identificador: DTOMensajeria._id,
            nombre1: DTOMensajeria.nombre1,
            nombre2: DTOMensajeria.nombre2,
            apellido1: DTOMensajeria.apellido1,
            apellido2: DTOMensajeria.apellido2
        });
        let nuevoChat = new Chat({
            //crear el nuevo objeto para enviarlo a la db
            miembros: [creador],
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
        let emisorN = new Usuario({
            identificador: DTOMensajeria._id,
            nombre1: DTOMensajeria.nombre1,
            nombre2: DTOMensajeria.nombre2,
            apellido1: DTOMensajeria.apellido1,
            apellido2: DTOMensajeria.apellido2
        });
        let nuevoMensaje = new Mensaje({
            //crear el nuevo objeto para enviarlo a la db
            idChat: DTOMensajeria.idChat,
            emisor: emisorN,
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
        let miembroN = new Usuario({
            identificador: DTOMensajeria._id,
            nombre1: DTOMensajeria.nombre1,
            nombre2: DTOMensajeria.nombre2,
            apellido1: DTOMensajeria.apellido1,
            apellido2: DTOMensajeria.apellido2
        });
        chat.miembros.push(miembroN); //agrega el id de la actividad al plan de trabajo
        chat.save();
        return chat;
    } catch (error) {
        console.log(error)
    }
};
