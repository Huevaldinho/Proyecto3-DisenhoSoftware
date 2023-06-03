import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/**
 * !NO borrar index.html porque ahí renderiza la app.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/*Renderiza al componente App.jsx */}
  </React.StrictMode>
);

/*
  !Instalar dependencias del proyecto con el comando: npm install
  !Para correr el proyecto tiene que ejecutar el comando en la consola: npm run dev

 ! El proyecto se va a organizar de la siguiente forma:
      *components: Aqui se crean los componentes de toda la aplicacion. Puede ser separado por pantalla.
      *assets: archivos como imagenes
      *contexts: Aqui se crean los contextos que se vayan a necesitar.
      *pages: Las paginas enteras, estas paginas van a utilizar los componentes creados anteriormente.
      *routes: Se definen las rutas (URLs) de la aplicacion.
      *services: Logica de la aplicacion, como la conexion con la api y el controlador.
*/