//Importaciones necesarias
import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import inicioRoutes from "./src/routes/inicio.routes.js";
import profesoresRoutes from "./src/routes/profesor.routes.js";
import estudiantesRoutes from "./src/routes/estudiantes.routes.js";
import comentarioRoutes from "./src/routes/comentarios.routes.js";
import equipoRoutes from "./src/routes/equipo.routes.js";
import actividadesRoutes from "./src/routes/actividades.routes.js"
import planRoutes from "./src/routes/plan.routes.js"
import {systemDB}  from "./src/database/connection.js";
import asistenteRoutes from "./src/routes/asistente.routes.js"
import respuestaRoutes from "./src/routes/respuesta.routes.js"
/*import readXlsxFile from "read-excel-file/node";
import fs from "fs";*/

const app = express();
systemDB; //conexión con base de datos

// Configurar Cloudinary


/*NPM NECESARIOS
npm i express -D
npm i morgan -D
npm i mongoose -D
npm i babel -D
npm i read-excel-file
npm i cors -D
*/ 

//npm start para iniciar el api
//ctrl+c para terminarlo
//Datos para conectarse a mongoDB Atlas

// Conexión a MongoDB Atlas

app.use(express.json()); //para leer jsons
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(inicioRoutes); //rutas de la ventana de Inicio Sesión
app.use(estudiantesRoutes); //rutas de la ventana de los estudiantes
app.use(profesoresRoutes); //rutas de la ventana de los profesores
app.use(planRoutes) // rutas relacionadas al plan
app.use(actividadesRoutes); //rutas relacionadas a las actividades
app.use(equipoRoutes);
app.use(comentarioRoutes); //rutas relacionadas a los comentarios
app.use(asistenteRoutes); //rutas relacionadas a los asistentes
app.use(respuestaRoutes);

/*readXlsxFile(fs.createReadStream('estudiantes.xlsx')).then((rows) => {
    console.log(rows);
})*/

const port = 3000

app.listen(port,() => {
    console.log('Server on port '+port);
});

