//*Importa la url y puerto
import { API_URL } from '../config';

class AdminEstudiantes {
    //*Constructores
    constructor() { }
    /**
     * Metodo para obtener los estudiantes en la base de datos.
     * Utiliza la apli.
     * @returns [estudiantes] si logra hacer el request.
     *          null si no lo logra.
     */
    async verEstudiantes() {
        try {
            const response = await fetch(`${API_URL}/estudiantes`, {
                method: 'GET'
            });
            let data = await response.json(); // Convertir datos a formato JSON
            return data;
        } catch (error) {
            console.error('Error en AdminEstudiantes, en metodo getInformacionEstudiantes: ', error);
            return null;
        }
    }
    //aaa
    async registrarEstudiantes(estudiantes) {
        try {
            const response = await fetch(`${API_URL}/estudiantes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(estudiantes)
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("AdminEstudiantes registrarEstudiantes retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en AdminEstudiantes, en metodo registrarEstudiantes: ', error);
            return null;
        }
    }
    async modificarInformacionEstudiante(dtoEstudiante) {
        try {
            const response = await fetch(`${API_URL}/estudiantes/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dtoEstudiante)
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("AdminEstudiantes modificarInformacionEstudiante retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en AdminEstudiantes, en metodo modificarInformacionEstudiante: ', error);
            return null;
        }

    }

}
export default AdminEstudiantes;