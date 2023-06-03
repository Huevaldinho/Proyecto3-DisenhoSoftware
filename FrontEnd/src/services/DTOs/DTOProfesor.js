class DTOProfesor {
  //*Atributos
  cedula = ''
  nombre = ''
  nombre2 = ''
  apellido1 = ''
  apellido2 = ''
  correo = ''
  contrasenna = ''
  rol = ''
  codigo = ''
  coordinador = ''
  telefono = ''
  campus = ''
  estado = ''
  equipo = ''
  celular = ''
  foto = '';
  /*
      cedula,
      nombre: nombre1,
      nombre2,
      apellido1,
      apellido2,
      correo,
      contrasenna: profesor.contrasenna,
      rol: profesor.rol,
      codigo: profesor.codigo,
      coordinador,
      telefono,
      campus: profesor.campus,
      estado,
      equipo: profesor.equipo,
      celular,
      foto: profesor.foto,
  */
  //*Constructores
  constructor(cedula, nombre, nombre2, apellido1, apellido2, correo, contrasenna, rol,
    codigo, coordinador, telefono, campus, estado, equipo, celular, foto) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.nombre2 = nombre2;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.correo = correo;
    this.contrasenna = contrasenna;
    this.rol = rol;
    this.codigo = codigo;
    this.coordinador = coordinador;
    this.telefono = telefono;
    this.campus = campus;
    this.estado = estado;
    this.equipo = equipo;
    this.celular = celular;
    this.foto = foto;
  }

  //*To String
  toString() {
    console.log(this.cedula, this.nombre, this.nombre2, this.apellido1,
      this.apellido2, this.correo, this.contrasenna, this.rol, this.codigo, this.coordinador, this.telefono,
      this.campus, this.estado, this.equipo, this.celular, this.foto)
  }
  //*Getters
  getCedula() {
    return this.cedula;
  }
  /**
   * Metodo para obtener nombre del profesor.
   * @returns String nombre: Nombre 
   */
  getNombre() {
    return this.nombre;
  }
  getNombre2() {
    return this.nombre2;
  }
  getApellido1() {
    return this.apellido1;
  }
  getApellido2() {
    return this.apellido2;
  }
  getCorreo() {
    return this.correo;
  }
  getContrasenna() {
    return this.contrasenna;
  }
  getRol() {
    return this.rol;
  }
  getCodigo() {
    return this.codigo;
  }
  getCoordinador() {
    return this.coordinador;
  }
  getTelefono() {
    return this.telefono;
  }
  getCampus() {
    return this.campus;
  }
  getEstado() {
    return this.estado;
  }
  getEquipo() {
    return this.equipo;
  }
  getCelular() {
    return this.celular;
  }
  getFoto() {
    return this.foto;
  }
  //*Setters
  setFoto(foto) {
    this.foto = foto;
  }
  setCelular(celular){
    this.celular=celular;
  }
}
export default DTOProfesor;