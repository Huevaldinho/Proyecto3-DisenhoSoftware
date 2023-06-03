import { API_URL } from '../config';

class AdminActividades {
    //*Constructores
    constructor() { }
    //*Metodos
    async crearActividad(dtoActividad, afiche) {
        try {
            const formData = new FormData();
            formData.append("afiche", afiche); //Agrega el afiche o null

            // Agregar los campos de datos al FormData
            for (let key in dtoActividad) {
                if (key === "recordatorios") {
                    const recordatorios = dtoActividad[key];
                    recordatorios.forEach((recordatorio, index) => {
                        formData.set(`recordatorios[${index}]`, recordatorio);
                    });
                } else if (key === 'responsables') {
                    const responsables = dtoActividad[key];
                    // console.log("Responsables:", responsables);
                    // responsables.forEach((responsable, index) => {
                    //     formData.set(`responsables[${index}]`, responsable);
                    // });
                    responsables.forEach((usuario, index) => {
                        Object.entries(usuario).forEach(([key, value]) => {
                            formData.append(`responsables[${index}][${key}]`, value);
                        });
                    });
                }
                else {
                    formData.append(key, dtoActividad[key]);
                }
            }
            console.log("Form que se envia al back:", formData)
            const response = await fetch(`${API_URL}/actividades`, {
                method: 'POST',
                body: formData
            });

            let data = await response.json();
            console.log("AdminActividades, en metodo crearActividad retorna:", data)
            return data;
        } catch (error) {
            console.error('Error en AdminActividades, en metodo crearActividad:', error);
        }
    }
    async consultarPlanDeTrabajo() {
        try {
            const response = await fetch(`${API_URL}/planTrabajo`, {
                method: 'GET'
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("AdminActividades consultarPlanDeTrabajo retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en AdminActividades, en metodo consultarPlanDeTrabajo: ', error);
            return null;
        }
    }
    async consultarComentarios(id) {
        try {
            const response = await fetch(`${API_URL}/comentario/${id}`, {
                method: 'GET'
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("AdminActividades consultarComentarios retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en AdminActividades, en metodo consultarComentarios: ', error);
            return null;
        }
    }
    /**
   * Metodo para cambiar el nomrbe del plan de trabajo.
   * @param {String} nuevoNombre 
   * @returns {_id,nombre,Array[id actividades],__v}
   */
    async cambiarNombrePlanTrabajo(nuevoNombre) {
        try {
            const response = await fetch(`${API_URL}/planTrabajo/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nombre": nuevoNombre
                })
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("AdminActividades cambiarNombrePlanTrabajo retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en AdminActividades, en metodo cambiarNombrePlanTrabajo: ', error);
            return null;
        }
    }
    /**
     * POST
     * Comentario nuevo.
     * @param {JSON = "idActividad","descripcion","fecha","autor","idRespuesta"} datos 
     * Retorna 
     */
    async comentarActividad(datos) {
        try {
            const response = await fetch(`${API_URL}/comentario/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "idActividad": datos.idActividad,
                    "descripcion": datos.descripcion,
                    "fecha": datos.fecha,
                    "autor": datos.autor,
                    "idRespuesta": "null"
                })
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("AdminActividades comentarActividad retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en AdminActividades, en metodo comentarActividad: ', error);
            return null;
        }
    }
    async consultarRespuestas(idComentario) {
        try {
            const response = await fetch(`${API_URL}/respuesta/${idComentario}`, {
                method: 'GET'
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("AdminActividades consultarRespuestas retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en AdminActividades, en metodo consultarRespuestas: ', error);
            return null;
        }
    }
    async responderComentario(datos) {
        try {
            console.log("Datos responderComentario:", datos)

            const response = await fetch(`${API_URL}/comentario/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "idActividad": datos.idActividad,
                    "descripcion": datos.descripcion,
                    "fecha": datos.fecha,
                    "autor": datos.autor,
                    "idRespuesta": datos.idRespuesta
                })
            });
            let data = await response.json(); // Convertir datos a formato JSON
            console.log("AdminActividades responderComentario retorna :", data)
            return data;
        } catch (error) {
            console.error('Error en AdminActividades, en metodo responderComentario: ', error);
            return null;
        }
    }
    /**
     *  Metodo para actualizar los datos de una actividad
     * @param {DTOActividad} dtoActividad:DTOActividad con los datos modificados.
     * @param {File} afiche: Archivo de afiche.
     * @param {FileList} evidencias:Lista de archivos de las evidencias.
     * @returns 
     */
    async actualizarActividad(dtoActividad, afiche, evidencias) {
        try {
            const formData = new FormData();
            //Mete la lista de archivos al form
            formData.append('archivos', afiche)
            for (let i = 0; i < evidencias.length; i++) {
                formData.append('archivos', evidencias[i]);
            }

            // Agregar los campos de datos al FormData
            for (let key in dtoActividad) {
                if (key === "recordatorios") {
                    const recordatorios = dtoActividad[key];
                    recordatorios.forEach((recordatorio, index) => {
                        formData.set(`recordatorios[${index}]`, recordatorio);
                    });
                } else if (key === 'responsables') {
                    const responsables = dtoActividad[key];
                    responsables.forEach((usuario, index) => {
                        Object.entries(usuario).forEach(([key, value]) => {
                            formData.append(`responsables[${index}][${key}]`, value);
                        });
                    });
                }
                else {
                    formData.append(key, dtoActividad[key]);
                }
            }

            console.log("Form que se envia al back:", formData)

            const response = await fetch(`${API_URL}/actividades`, {
                method: 'PUT',
                body: formData
            });
            let data = await response.json();
            console.log(" AdminActividades, en metodo actualizarActividad retorna:", data)
            return data;
            //let data = await response.json();
            //console.log("AdminActividades, en metodo actualizarActividad retorna:", data)
            //return data;
        } catch (error) {
            console.error('Error en AdminActividades, en metodo actualizarActividad:', error);
        }
    }

}
export default AdminActividades;
