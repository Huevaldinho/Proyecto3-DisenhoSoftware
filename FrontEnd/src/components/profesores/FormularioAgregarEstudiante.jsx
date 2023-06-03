import { useState } from "react";
import EstadoUsuario from "../../services/enums/estadoUsuario";
function FormularioAgregarEstudiante({
  carnet,
  nombre,
  segundoNombre,
  apellido1,
  apellido2,
  correo,
  telefono,
  estado,
}) {
  const [estadoState, setEstado] = useState(estado);
  const [correoEstado, setCorreo] = useState(correo);
  const [telefonoEstado, setTelefono] = useState(telefono);

/**
   * Funcion para validar un carnet vacio.
   * @param {String} carnet:carnet a validar.
   * @returns true si es valido.
   *        | false si es invalido.
   */
const validarVacio = (carnet) => {
  //Declaracion de expresion regular para validar correos validos.
  if (/^\s*$/.test(carnet)) {
    console.log("Campo Lleno");
    return true;
}
  console.log("Campo Vacio");
  return false;
};

  /**
   * Funcion para validar un telefono.
   * @param {String} telefono: Telefono a validar.
   * @returns true si el telefono es valido.
   *        | false si el telefono es invalido.
   */
  const validarTelefono = (telefono) => {
    const regexTelefono = /^(\+506)?[24678]\d{7}$/;
    if (regexTelefono.test(telefono)) {
      console.log("Telefono valido");
      return true;
    }
    console.log("Telefono invalido.");
    return false;
  };
  /**
   * Funcion para validar un correo electronico.
   * @param {String} correo:Correo a validar.
   * @returns true si es valido.
   *        | false si es invalido.
   */
  const validarCorreo = (correo) => {
    //Declaracion de expresion regular para validar correos validos.
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexCorreo.test(correo)) {
      console.log("Correo valido.");
      return true;
    }
    console.log("Correo invalido.");
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
  const validarDatosFormulario = (correo, telefono) => {
    //Validar correo.
    if (validarCorreo(correo)) {
      //Validar telefono.
      if (validarTelefono(telefono)) {
        //Validacion Carnet.
        if (validarVacio(carnet)){
          //Validacion nombre.
          if(validarVacio(nombre)){
            //Validacion segundoNombre.
            if(validarVacio(segundoNombre)){
              //Validacion apellido1.
              if(validarVacio(apellido1)){
                //Validacion apellido2.
                if(validarVacio(apellido2)){
                  return 0;
                }else{
                  return 7;
                  //Segundo Apellido Vacio
                }
              }else{
                return 6;
                //Primer Apellido Vacio
              }
            }else{
              return 5;
              //Segundo Nombre Vacio
            }
          }else{
            return 4;
            //Nombre Vacio
          }
        }else{
          return 3;
          //Carnet Invalido
        }
        
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
   * Funcion para manejar el envio del formulario.
   * @param {*} e: Evento que activa el boton. No es inportante.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(estadoState, correoEstado, telefonoEstado);
    //*Validar datos del formulario.
    switch (validarDatosFormulario(correoEstado, telefonoEstado)) {
      case 0: {
        //Validacion exitosa
        //*Distinguir si es modificacion o si es eliminacion
        if (estadoState == EstadoUsuario.ACTIVO) {
          console.log("Se ha modificado exitosamente la informacion");
          //*LLamar al controlador para hacer el cambio
        } else {
          console.log("Se ha eliminado al estudiante");
          //*LLamar al controlador para hacer el cambio
        }
        break;
      }
      case 1: {
        //Telefono invalido.
        alert("Telefono invalido, ingrese otro.");
        break;
      }
      case 2: {
        //Correo invalido.
        alert("Correo invalido, ingrese otro.");
        break;
      }
      // Carnet validado
      case 3:{
        alert("Carnet vacio, agregue alguno.");
        break;
      }
      case 4:{
        alert("Nombre vacio, debe agregar uno.");
        break;
      }
      case 5:{
        alert("Segundo nombre vacio, debe agregar uno.");
        break;
      }
      case 6:{
        alert("Primer apellido vacio, debe agregar uno.");
        break;
      }
      case 7:{
        alert("Segundo apellido vacio, debe agregar uno.");
        break;
      }
      }

  };
  const cssElementosForm = "mb-1 w-full sm:w-min md:w-9/11 lg:w-max p-4";

  //Lo que no se adapta al tamano de la pantall es el contenido del form
  return (
    <div className=" p-3 m-4 text-center items-center">
      <div className="text-center">
        <form className="text-center pt-5 pl-5 pr-5 mt-10 ml-10 mr-10 mb-2 rounded-2xl  grid grid-rows-2 grid-flow-col gap-1 bg-slate-800 items-center">
            {/*Carnet */}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Carnet
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={nombre}
              disabled={false}
            />
            </div>
          {/*Primer nombre */}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Primer nombre
            </label>

            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={nombre}
              disabled={false}
            />
            
          </div>
          {/*Segundo nombre */}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Segundo nombre
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={segundoNombre}
              disabled={false}
            />
            
          </div>
          {/*Apellido 1 */}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Primer apellido
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={apellido1}
              disabled={false}
            />

          </div>
          {/*Apellido 2 */}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Segundo apellido
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={apellido2}
              disabled={false}
            />

          </div>
          {/*Correo */}
          <div className={"mb-6 w-auto  "}>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Correo
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={correoEstado}
              onChange={(e) => {
                setCorreo(e.target.value);
              }}
            />
          </div>
          {/* Telefono */}
          <div className={cssElementosForm}>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Telefono
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
              }}
            />
          </div>
          {/*Estado */}
          <br></br>
          <div className={cssElementosForm}>
            <label
              htmlFor="estados"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Seleccione el estado
            </label>
            <select
              id="cEstados"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setEstado(e.target.value);
              }}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </form>
      </div>
      <div className={"text-center w-full "}>
        {/*Boton aceptar */}
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-900  font-medium rounded-lg w-auto p-4  text-center "
          onClick={handleSubmit}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}

export default FormularioAgregarEstudiante;
