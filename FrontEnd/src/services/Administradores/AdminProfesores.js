import { API_URL } from '../config';
class AdminProfesores {
    //*Constructores
    constructor() { }
    //*Metodos
    //*SUPER USUARIO
    /**
    * Metodo para asignar asistente
    * @param {String} codigo de asistente
    * @param {String} campus a asigar asistente
    */
    async asignarAsistente(codigo, campus) {
        try {
            const response = await fetch(`${API_URL}/asistente/${codigo}/${campus}`, {
                method: 'POST'
            });
            let data = await response.json();
            console.log('AdminProfesores,  metodo asignarAsistente retorna: ', data);
            return data;
        } catch (error) {
            console.error('Error en AdminProfesores, en metodo asignarAsistente: ', error);
        }
    }

    /**
     * Metodo para registrar a un profesor.
     * Utiliza la API.
     * @param {JSON} dtoProfe 
     * @returns {JSON} dtoProfe registrado
     */
    async registrarProfesor(dtoProfe, foto) {
        try {
            const formData = new FormData();
            formData.append("image", foto); //Agrega la foto o null

            // Agregar los campos de datos al FormData
            for (let key in dtoProfe) {
                formData.append(key, dtoProfe[key]);
            }
            const response = await fetch(`${API_URL}/profesor`, {
                method: 'POST',
                body: formData
            });
            let data = await response.json();
            console.log("AdminProfesores, en metodo registrarProfesor retorna:", data)
            return data;
        } catch (error) {
            console.error('Error en AdminProfesores, en metodo registrarProfesor: ', error);
        }
    }
    /**
     * Metodo para obtener los profesores
     * Trae los datos con la API.
     * @returns {Array JSON} 
     * Json con forma:{ "_id":,"rol": ,"estado","apellido1","apellido2","campus","cedula","coordinador",
        "equipo","nombre","telefono","celular","codigo","contrasenna","correo"}
     */
    async consultarProfesores() {
        try {
            const response = await fetch(`${API_URL}/profesor`, {
                method: 'GET'
            });
            let data = await response.json(); // Convertir datos a formato JSON
            return data;
        } catch (error) {
            console.error('Error en AdminProfesores, en metodo consultarProfesores: ', error);
            return null;
        }
    }
    /**
     * Metodo para cambiar los datos de un profesor.
     * Hace peticion a la API.
     * @param {JSON} dtoProfe 
     * @param {File| null} foto del profe
     */
    async actualizarProfesor(dtoProfe, foto) {
        try {
            const formData = new FormData();
            formData.append("image", foto); //Agrega la foto o null

            // Agregar los campos de datos al FormData
            for (let key in dtoProfe) {
                formData.append(key, dtoProfe[key]);
            }
            console.log("FormData:", formData);
            const response = await fetch(`${API_URL}/profesor`, {
                method: 'PUT',
                body: formData
            });
            let data = await response.json();
            console.log("AdminProfesores, en metodo actualizarProfesor retorna:", data)
            return data;
        } catch (error) {
            console.error('Error en AdminProfesores, en metodo actualizarProfesor: ', error);
        }
    }
    /**
     * Metodo para eliminar (inactivar )a un miembro del equipo.
     * Llama a la API para inactivarlo en la base de datos.
     * @param {int} cedula 
     * @returns {JSON de profesor}
     */
    async eliminarMiembro(cedula) {
        try {
            const response = await fetch(`${API_URL}/profesor/${cedula}`, {
                method: 'DELETE'
            });
            return await response.json()
        } catch (error) {
            console.error('Error en AdminProfesores, en metodo eliminarMiembro: ', error);
        }
    }
}
export default AdminProfesores;