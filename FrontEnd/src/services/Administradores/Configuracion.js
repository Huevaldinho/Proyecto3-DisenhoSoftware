//*Importa la url y puerto
import { API_URL } from '../config';
export default class Configuracion {

    //*Constructores
    constructor() {
    }
    //*Metodos
    /**
     * Metodo para iniciar sesion.
     * @param {String} correoIn 
     * @param {String} contrasennaIn 
     * @returns {JSON con forma {_id,email,password,rol,estado} si encuentra al usuario
     *           1 si no encuentra al usuario} RespuestaAPI
     */
    async iniciarSesion(correoIn, contrasennaIn) {
        try {
            const response = await fetch(`${API_URL}/inicio/${correoIn}/${contrasennaIn}`, {
                method: 'POST'
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("Configuracion: iniciarSesion retorna:", data)
            return data;
        } catch (error) {
            console.error('Error en Configuracion, en metodo iniciarSesion: ', error);
            return null;
        }
    }
    /**
     * Metodo para cambiar la contrasenna de un usuario.
     * Llama a la API para cambiar la contrasenna en la base de datos.
     * @param {String} correoIn 
     * @param {String} contrasennaIn 
     * @returns 
     */
    async cambiarContrasenna(correoIn, contrasennaIn) {
        try {
            const response = await fetch(`${API_URL}/inicio/${correoIn}/${contrasennaIn}`, {
                method: 'PUT'
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("Configuracion: cambiarContrasenna retorna:", data)
            return data;
        } catch (error) {
            console.error('Error en Configuracion, en metodo cambiarContrasenna: ', error);
            return null;
        }
    }
}



