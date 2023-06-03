class DTOActividad {
    //*Atributos
    _id = null;//Autogenerado por base de datos.
    nombre = '';
    descripcion = "";
    semana = null;//[1-16]
    estado = null;//Estado
    modalidad = null;//True o False
    tipoActividad = null;//TipoActividad
    fechaHora = null;//String
    fechaHoraPublicacion = null;//String
    enlace = '';
    afiche = '';
    responsables = [];//
    recordatorios = [];//Array fechas en string
    //evidencias = [];
    /*
     _id: actividad._id,
      nombre,
      descripcion,
      semana,
      estado,
      modalidad,
      tipoActividad,
      fechaHora: fecheHora,
      fechaHoraPublicacion: fecheHoraPublicacion,
      enlace,
      afiche: actividad.afiche,
      responsables,
      recordatorios,
    */

    //*Constructores
    constructor(id, nombre, semana, tipoActividad, descripcion, responsables, fechaHora, fechaHoraPublicacion,
         recordatorios, modalidad, enlace, afiche, estado) {
        this._id = id;
        this.nombre = nombre;
        this.semana = semana;
        this.tipoActividad = tipoActividad;
        this.descripcion = descripcion;
        this.responsables = responsables;
        this.fechaHora = fechaHora;
        this.fechaHoraPublicacion = fechaHoraPublicacion;
        this.recordatorios = recordatorios;
        this.modalidad = modalidad;
        this.enlace = enlace;
        this.afiche = afiche;
        this.estado = estado;
        
    }

    //*Setters
    /**
     * Metodo para asignar la fecha a la actividad.
     * @param {Date} fecha: Fecha de la actividad.
     */
    setFecha(fecha) {
        this.fecha = fecha;
    }
    /**
     * Metodo para asignar la descripcion de una actividad.
     * @param {String} descripcion: Descripcion de la actividad.
     */
    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }
    /**
     * Metodo para asignar el tipo de actividad.
     * @param {TipoActividad (enum)} tipoActividad: Tipo de la actividad.
     */
    setTipoActividad(tipoActividad) {
        this.tipoActividad = tipoActividad;
    }
    //*Getters
    /**
     * Metodo para obtener la fecha de la actividad.
     * @returns Date fecha: Fecha de la actividad.
     */
    getFecha() {
        return this.fecha;
    }
    /**
     * Metodo para obtener la descripcion de la actividad.
     * @returns String descripcion: Descripcion de la actividad.
     */
    getDescripcion() {
        return this.descripcion;
    }
    /**
     * Metodo para obtener el tipo de la actividad.
     * @returns TipoActividad(enum): Tipo de la actividad.
     */
    getTipoActividad() {
        return this.tipoActividad;
    }
}
export default DTOActividad;