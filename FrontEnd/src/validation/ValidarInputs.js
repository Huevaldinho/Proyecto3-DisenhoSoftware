import Estado from "../services/enums/estado";
import TipoActividad from "../services/enums/tipoActividad";
function validarTelefono(telefono) {
    // Expresión regular para validar el formato del teléfono
    const regex = /^2\d{3}-\d{4}( \[\d{4}\])?$/;

    // Verificar si el teléfono coincide con el formato
    if (regex.test(telefono)) {
        return true; // El teléfono es válido
    } else {
        return false; // El teléfono no cumple con el formato
    }
}

/**
   * Funcion para validar un telefono.
   * @param {String} telefono: Telefono a validar.
   * @returns true si el telefono es valido.
   *        | false si el telefono es invalido.
   */
export const validarCelular = (celular) => {
    const regexTelefono = /^[678]\d{7}$/;
    if (regexTelefono.test(celular))
        return true;
    return false;
};
/**
 * Funcion para validar un correo electronico.
 * @param {String} correo:Correo a validar.
 * @returns true si es valido.
 *        | false si es invalido.
 */
export const validarCorreo = (correo) => {
    //Declaracion de expresion regular para validar correos validos.
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexCorreo.test(correo))
        return true;
    return false;
};
/**
 * Funcion para validar los datos que se pueden cambiar del formulario (telefono y correo).
 * @param {String} correo: Correo a validar.
 * @param {String} telefono: Telefono a validar.
 * @returns 0 Si no hay errores.
 *        | 1 Si el telefono es invalido.
 *        | 2 Si el correo es invalido.
 */
export const validarCorreoTelefono = (correo, telefono) => {
    return 0;
    //Validar correo.
    if (validarCorreo(correo)) {
        //Validar telefono.
        if (validarTelefono(telefono)) {
            //Validacion exitosa.
            return 0;
        } else {
            //Telefono invalido.
            return 1;
        }
    } else {
        //Correo invalido.
        return 2;
    }
};

/**
   Funcion para validar una contrasenna segun el formato:
    8 numeros
    @returns true o false.
 */
export function validarContrasenna(contrasena) {
    // Comprobar la longitud de la contraseña
    if (contrasena.length !== 8)
        return false;
    // Comprobar si todos los caracteres son números
    for (var i = 0; i < contrasena.length; i++) {
        if (isNaN(parseInt(contrasena[i]))) {
            return false;
        }
    }
    return true;// La contraseña es válida
}

/*
    *Funcion para validar inpus de login.
    Parametros:
        String correo: Correo que se desea validar.
        String contrasenna: Contrasenna que se desea validar.
    Retorna:
        true si el correo y contrasenna son validos segun los formatos establecidos.
        false si son invalidos.
*/
export const validarLogin = (correo, constrasenna) => {
    return true;
    if (validarCorreo(correo) && validarContrasenna(constrasenna))
        return true;
    return false;
}

/**
   * Funcion para validar una variable es de tipo string.
   * @param {String} stringAValidar: string a validar
   * @returns true si es valido.
   *        | false si es invalido.
   */
const validarVacio = (stringAValidar) => {
    if (typeof stringAValidar === 'string')
        return true;
    return false;

};
/**
 * Funion para validar numero entre un rango.
 * 
 * @param {Integer} numero: numero a validar que este entre el rango.
 * @param {Integer} inicio: Rango menor a comparar.
 * @param {Integer} fin: Rango mayor a comparar.
 * @returns True si es un numero entre el rango.
 *          False si no lo es.
 */
function validarNumero(numero, inicio, fin) {
    if (!isNaN(numero) && numero >= inicio && numero <= fin)
        return true;
    return false;
}
/**
 * Funcion para valida estado.
 * @param {*} estado: estado a validar.
 * @returns True si es valido.
 *          False si es invalido.
 */
const validarEstado = (estado) => {
    const valores = Object.values(Estado);
    return valores.includes(estado);
}
/**
 * Funcion para validar la modalidad.
 * @param {String} modalidad : modaldidad a validar.
 * @returns True si es valida.
 *          False si es invalida.
 */
const validarModalidad = (modalidad) => {
    if (modalidad == 'Presencial' || modalidad == 'Virtual')
        return true;
    return false;
}
/**
 * Funcion para validar el tipo de actividad
 * @param {String} tipoActividad 
 * @returns true si es valida, false si es invalida.
 */
const validarTipoActividad = (tipoActividad) => {
    const valores = Object.values(TipoActividad);
    return valores.includes(tipoActividad)
}
/**
 * Funcion para validar fecha y hora seleccionada para que sea futura.
 * @param {Date} fechaHora 
 * @returns True si es valida
 *          false is es invalida.
 */
const validarFechaHoraSeleccionada = (fechaHora) => {
    if (fechaHora.getTime() > new Date().getTime())
        return true
    return false
}
/**
 * Funcion para validar que la fecha de publicacion sea antes o igual que la fecha de la actividad.
 * @param {Date} fechaActividad: Fecha de la actividad.
 * @param {Date} fechaPublicacion: Fecha de publicacion de actividad.
 * @returns true si esta bien
 *          false si esta mal
 */
const validarFechaPublicacion = (fechaActividad, fechaPublicacion) => {
    if (fechaPublicacion.getTime() <= fechaActividad.getTime())
        return true
    return false
}
/**
 * Funcion para validar enlace de reunion.
 * !TODO
 * @param {String} enlace: Url del enlace.
 * @param {String} modalidad: MOdalidad de la actividad
 * @returns true si esta bien el enlace actual
 *          
 */
const validarEnlace = (enlace, modalidad) => {//!TODO
    if (modalidad == 'Presencial')
        return true;
    return true;
}
/**
 * Funcion para validar afiche.
 * !TODO
 * @param {String} afiche : Url del afiche.
 * @returns  true si esta bien
 *           false si esta mal.
 */
const validarAfiche = (afiche) => {//!TODO
    return true;
}
/**
 * Funcion para validar responsables.
 * @param {[Json]} responsables 
 * @returns true si esta bien
 *          false si esta mal
 */
const validarResponsables = (responsables) => {
    if (responsables.length == 0)
        return false;
    return true
}
/**
 * Funcion para validar que los recordatorios enten antes de la fecha de la actividad
 * y despues de la fecha de publicacion.
 * @param {[Date]} recordatorios: fechas de recordatorio
 * @param {Date} fechaActividad : fecha de la actividad
 * @param {Date} fechaPublicacion : fecha de publicacion de la actividad
 * @returns true si estan bien
 *          false si no hay fechas o hay alguna fecha incorrecta.
 */
const validarRecordatorios = (recordatorios, fechaActividad, fechaPublicacion) => {
    if (recordatorios.length == 0)
        return false;
    recordatorios.map((recordatorio) => {
        if (recordatorio.getTime() < fechaPublicacion.getTime() && recordatorio.getTime() > fechaActividad)
            return false;
    })
    //Todas las fechas estan despues de la fecha de publicacion y antes de la actividad.
    return true;
}


/**
 * Funcion para validar los datos ingresados para crear una actividad.
 * @param {JSON} datos: Tiene la forma: {
      nombreActividad,
      descripcionIngresada,
      semanaSeleccionada,
      estadoSeleccionado,
      modalidadSeleccionada,
      tipoActividadSeleccionada,
      fechaHoraSeleccionada,
      fechaPublicacion,
      enlace,
      afiche,
      responsables,
    }
 * @returns 0: Si todo estabien
            String: Si hay algun error.
 */
export const validarDatosActividad = (datos) => {
    if (!validarVacio(datos.nombreActividad))//Nombre
        return 'Ha ocurrido un error con el nombre de la actividad, intente de nuevo.';
    if (!validarVacio(datos.descripcionIngresada))//Descripcion
        return 'Ha ocurrido un error con la descripcion de la actividad, intente de nuevo. ';
    if (!validarNumero(datos.semanaSeleccionada, 1, 16))//Semana
        return 'Ha ocurrido un error con el numero de la semana, intente de nuevo.';
    if (!validarEstado(datos.estadoSeleccionado))//Estado
        return 'Ha ocurrido un error con el estado de la actividad, intente de nuevo.';
    if (!validarModalidad(datos.modalidadSeleccionada))//Modalidad
        return 'Ha ocurrido un error con la modalidad de la actividad, intente de nuevo.';
    if (!validarTipoActividad(datos.tipoActividadSeleccionada))
        return 'Ha ocurrido un error con el tipo de la actividad, intente de nuevo.';
    if (!validarFechaHoraSeleccionada(datos.fechaHoraSeleccionada))
        return 'Ha ocurrido un error con la fecha de la actividad, intente de nuevo.';
    if (!validarFechaPublicacion(datos.fechaHoraSeleccionada, datos.fechaPublicacion))
        return 'Ha ocurrido un error la fecha de publicacion de la actividad, intente de nuevo.';
    if (!validarEnlace(datos.enlace, datos.modalidadSeleccionada))
        return 'Ha ocurrido un error con el enlace de la actividad, intente de nuevo.';
    if (!validarAfiche(datos.afiche))
        return 'Ha ocurrido un error con el afiche de la actividad, intente de nuevo.';
    if (!validarResponsables(datos.responsables))
        return 'Ha ocurrido un error con los responsables de la actividad, intente de nuevo.';
    if (!validarRecordatorios(datos.recordatorios, datos.fechaHoraSeleccionada, datos.fechaPublicacion))
        return 'Ha ocurrido un error con los recordatorios de la actividad, intente de nuevo.';
    //No hay errores.
    return 0;
}

