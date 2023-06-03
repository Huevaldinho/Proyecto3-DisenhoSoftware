import ROLE from '../enums/role';
class DTOEstudiante {
    //*Atributos
    carnet = 0;
    nombre = "";
    nombre2 = "";
    apellido1 = "";
    apellido2 = "";
    correo = "";
    contrasenna = '';
    rol = ROLE.ESTUDIANTE;
    campus = '';
    estado = '';
    celular = "";
    /*
      carnet: estudiante.carnet,
      nombre: estudiante.nombre,
      nombre2: estudiante.nombre2,
      apellido1: estudiante.apellido1,
      apellido2: estudiante.apellido2,
      correo: correoEstado,
      contrasenna: estudiante.contrasenna,
      rol: estudiante.rol,
      campus: estudiante.campus,
      estado: estadoState,
      celular: telefonoEstado,
     */
    //*Constructores
    constructor(carnet, nombre, nombre2, apellido1, apellido2, correo, contrasenna, rol, campus, estado, celular) {
        this.carnet = carnet;
        this.nombre = nombre;
        this.nombre2 = nombre2;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.correo = correo;
        this.contrasenna = contrasenna;
        this.rol = rol;
        this.campus = campus;
        this.estado = estado;
        this.celular = celular;
    }
    //*Setters
    setCarnet(carnet) { this.carnet = carnet; }
    setNombre(nombre) { this.nombre = nombre; }
    setNombre2(nombre2) { this.nombre2 = nombre2; }
    setApellido1(apellido1) { this.apellido1 = apellido1; }
    setApellido2(apellido2) { this.apellido2 = apellido2; }
    setCorreo(correo) { this.correo = correo; }
    setCelular(celular) { this.celular = celular; }
    setCampus(campus) { this.campus = campus; }
    setRole(role) { this.role = role; }
    //*Getters
    getCarnet() { return this.carnet; }
    getNombre() { return this.nombre; }
    getNombre2() { return this.nombre2; }
    getApellido1() { return this.apellido1; }
    getApellido2() { return this.apellido2; }
    getCorreo() { return this.correo; }
    getCelular() { return this.celular; }
    getCampus() { return this.campus; }
    getRole() { return this.role; }

}
export default DTOEstudiante;