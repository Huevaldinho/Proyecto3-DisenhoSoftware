class DTOAsistente {
  //*Atributos
  nombre = "";
  nombre2 = "";
  apellido1 = "";
  apellido2 = "";
  correo = "";
  celular = "";
  campus = "";
  //*Constructores
  constructor() { }
  constructor(nombre, nombre2, apellido1, apellido2, correo, celular, campus) {
    this.nombre = nombre;
    this.nombre2 = nombre2;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.correo = correo;
    this.celular = celular;
    this.campus = campus;
  }
  //*Setters
  setNombre(nombre) { this.nombre = nombre; }
  setNombre2(nombre2) { this.nombre2 = nombre2; }
  setApellido1(apellido1) { this.apellido1 = apellido1; }
  setApellido2(apellido2) { this.apellido2 = apellido2; }
  setCorreo(correo) { this.correo = correo; }
  setCelular(celular) { this.celular = celular; }
  setCampus(campus) { this.campus = campus; }
  //*Getters
  getNombre() { return this.nombre; }
  getNombre2() { return this.nombre2; }
  getApellido1() { return this.apellido1; }
  getApellido2() { return this.apellido2; }
  getCorreo() { return this.correo; }
  getCelular() { return this.celular; }
}
export default DTOAsistente;