//Importa el Router para redireccionar a las paginas.
import Router from "./routes/Router";
import { MainControllerContextProvider } from "./contexts/MainControllerContext";
function App() {
  /*
   * App lo unico que hace es renderizar al Router.jsx que se encarga
   *de redireccionar a cada url declarado.
   */
  return (
    /*
      *El router funciona para redireccionar a los url correspondientes (paginas).
      !Todas las paginas deben declararse en el Router.jsx. Si no se hace va a redireccionar a NotFound.jsx
    */
    <MainControllerContextProvider>
      <Router id="router" />
    </MainControllerContextProvider>
  );
}

export default App;
