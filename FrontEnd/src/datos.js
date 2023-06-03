export const estudiantes = [{
    carnet: 2021035489,
    nombre: "Felipe",
    nombre2: "De Jesus",
    apellido1: "Obando",
    apellido2: "Arrieta",
    correo: "felipeobando@estudiantec.cr",
    celular: "70130686",
    campus: "Central Cartago",
    rol: "Estudiante",
    estado: "Activo",
    contrasenna: "1234"
}, {
    carnet: 2021047883,
    nombre: "Damian",
    nombre2: "José",
    apellido1: "Obando",
    apellido2: "Cerdas",
    correo: "damiobando@estudiantec.cr",
    celular: "85805240",
    campus: "Central Cartago",
    rol: "Estudiante",
    estado: "Inactivo",
    contrasenna: "1234"
},
{
    carnet: 2021047896,
    nombre: "Anthony",
    nombre2: "Steve",
    apellido1: "Jimenez",
    apellido2: "Barrantes",
    correo: "damiobando@estudiantec.cr",
    celular: "85805240",
    campus: "Central Cartago",
    rol: "Estudiante",
    estado: "Activo",
    contrasenna: "1234"
}
];

const actividades =
    [{
        id: 1,
        semana: 1,
        nombreActividad: "Actividad bienvenida",
        tipoActividad: "Recreación",
        descripcion: "Actividad para dar bienvenida a los nuevos ingresos, se realizaran juegos.",
        responsable: [{ nombre: "Laura", apellido1: "Coto", codigo: 100 }, { nombre: "Mauricio", apellido1: "Herrera", codigo: 123 }],//Pueden ser 1 o mas profes.
        fechaHora: '05-05-2023 12:00:00',
        fechaPublicacion: "01-05-2023 12:00:00",
        recordatorios: ["02-05-2023 12:00:00", "03-05-2023 12:00:00", "04-05-2023 12:00:00"],
        modalidad: true,//Presencial.
        enlace: null,
        afiche: "url de afiche",
        estado: "Planeada",
        evidencia: null
    }, {
        id: 2,
        semana: 1,
        nombreActividad: "Actividad bienvenida",
        tipoActividad: "Recreación",
        descripcion: "Actividad para dar bienvenida a los nuevos ingresos, se realizaran juegos.",
        responsable: [{ nombre: "Laura", apellido1: "Coto", codigo: 100 }],//Pueden ser 1 o mas profes.
        fechaHora: '15-05-2023 12:00:00',
        fechaPublicacion: "01-05-2023 12:00:00",
        recordatorios: ["02-05-2023 12:00:00", "03-05-2023 12:00:00", "04-05-2023 12:00:00"],
        modalidad: true,//Presencial.
        enlace: null,
        afiche: "url de afiche",
        estado: "Planeada",
        evidencia: null
    }, {
        id: 3,
        semana: 3,
        nombreActividad: "Actividad bienvenida",
        tipoActividad: "Recreación",
        descripcion: "Actividad para dar bienvenida a los nuevos ingresos, se realizaran juegos.",
        responsable: [{ nombre: "Laura", apellido1: "Coto", codigo: 100 }],//Pueden ser 1 o mas profes.
        fechaHora: '10-05-2023 12:00:00',
        fechaPublicacion: "01-05-2023 12:00:00",
        recordatorios: ["02-05-2023 12:00:00", "03-05-2023 12:00:00", "04-05-2023 12:00:00"],
        modalidad: true,//Presencial.
        enlace: null,
        afiche: "url de afiche",
        estado: "Planeada",
        evidencia: null
    }, {
        id: 4,
        semana: 2,
        nombreActividad: "Actividad bienvenida",
        tipoActividad: "Recreación",
        descripcion: "Actividad para dar bienvenida a los nuevos ingresos, se realizaran juegos.",
        responsable: [{ nombre: "Laura", apellido1: "Coto", codigo: 100 }],//Pueden ser 1 o mas profes.
        fechaHora: '20-05-2023 12:00:00',
        fechaPublicacion: "01-05-2023 12:00:00",
        recordatorios: ["02-05-2023 12:00:00", "03-05-2023 12:00:00", "04-05-2023 12:00:00"],
        modalidad: true,//Presencial.
        enlace: null,
        afiche: "url de afiche",
        estado: "Planeada",
        evidencia: null
    }
    ];
export const profesores = [{
    id: 1,
    nombre: "Mauricio",
    nombre2: "Ignacio",
    apellido1: "Arroyo",
    apellido2: "Herrera",
    correo: "mauarroyo@estudiantec.cr",
    celular: "85805240",
    campus: "Central Cartago",
    rol: "Profesor",
    estado: "Activo",
    coordinador: "Coordinador"

}, {
    id: 2,
    nombre: "Laura",
    nombre2: "Maria",
    apellido1: "Coto",
    apellido2: "Sarmiento",
    correo: "laucoto@estudiantec.cr",
    celular: "85805240",
    campus: "Central Cartago",
    rol: "Profesor",
    estado: "Activo",
    coordinador: "Coordinador"
}


];
export const comentarios = [
    {"idActividad" :  1,
    "descripcion" : "Gran Actividad",
    "fecha" : "12/07/2014",
    "Autor" : "Anthony Jimenez",
    "idRespuesta" :  null

}
];

export const profPlanilla = {
    id: 1,
    nombre: "Profesores 2023",
    profesores
}
export let planDeTrabajo = {
    id: 1,
    nombre: "Plan de Trabajo 2023",
    actividades
}

