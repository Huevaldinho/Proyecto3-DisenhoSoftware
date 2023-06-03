import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DTOProfesor from "../../services/DTOs/DTOProfesor";
import { validarCorreoTelefono } from "../../validation/ValidarInputs";
import { MainControllerContext } from "../../contexts/MainControllerContext";
import { campus } from "../../services/campus";

function FormularioAgregarProfesor(props) {
  const { registrarProfesor } = useContext(MainControllerContext);
  const navigate = useNavigate();
  const [cedula, setCedula] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [nombre2, setNombre2] = useState(null);
  const [apellido1, setApellido1] = useState(null);
  const [apellido2, setApellido2] = useState(null);
  const [correo, setCorreo] = useState(null);
  const [contrasenna, setContrasenna] = useState(null);
  const [coordinador, setCoordinador] = useState(null);
  const [telefono, setTelefono] = useState(null);
  const [campusSeleccionado, setCampus] = useState(
    "Campus Tecnológico Central Cartago"
  );
  const [celular, setCelular] = useState(null);
  const [file, setFile] = useState(null); //Imagen opcional

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const manejoErrores = async (respuesta) => {
    switch (respuesta) {
      case 1: {
        alert("Ha ocurrido un error, formato de contraseña incorrecto.");
        return false;
      }
      case 2: {
        alert("Ha ocurrido un error, correo incorrecto.");
        return false;
      }
      case 3: {
        alert(
          "Ha ocurrido un error, telefono incorrecto (8 números y debe empezar con 2|6|8)."
        );
        return false;
      }
      case 4: {
        alert(
          "Ha ocurrido un error, cedula incorrecta (empieza con 1|2|3|4|5|6|7|8|9 seguido de 8 números)."
        );
        return false;
      }
      case 5: {
        alert(
          "Ha ocurrido un error, nombre, primer apellido o segundo apellido vacio."
        );
        return false;
      }
      case 6: {
        alert(
          "Ha ocurrido un error, el correo con el que quiere ingresar ya estaba registrado antes."
        );
        return false;
      }
      case 7: {
        alert(
          "Ha ocurrido un error, el teléfono con el que quiere ingresar ya estaba registrado antes."
        );
        return false;
      }
      case 8: {
        alert(
          "Ha ocurrido un error, la cédula con el que quiere ingresar ya estaba registrado antes."
        );
        return false;
      }
      case 9: {
        alert(
          "Ha ocurrido un error, el celular con el que quiere ingresar ya estaba registrado antes."
        );
        return false;
      }
      case 10: {
        alert(
          "Ha ocurrido un error, el celular no cumple con el formato (empieza con +506 (2|4|6|7|8) seguido de 7 números)."
        );
        return false;
      }
      default: {
        return true;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let dtoProfe = new DTOProfesor(
      cedula,
      nombre,
      nombre2,
      apellido1,
      apellido2,
      correo,
      contrasenna,
      "Profesor",
      "",
      "Coordinador" ? "COORDINADOR" : "NOCOORDINADOR",
      telefono,
      campusSeleccionado,
      "",
      "Equipo",
      celular,
      ""
    );
    const respuesta = await registrarProfesor(dtoProfe, file);
    if (manejoErrores(respuesta)) {
      //No hubo errores.
      if (Object.keys(respuesta).length !== 0) {
        alert("Se ha registrado exitosamente al profesor.");
        navigate("/infoProfesores");
      } else alert("No se ha podido registar al profesor, intente de nuevo.");
    }
  };
  const handleClickReturn = (e) => {
    e.preventDefault();
    navigate("/infoProfesores");
  };
  const cssElementosForm = "mb-1 w-full sm:w-min md:w-9/11 lg:w-max p-4";
  const styleInputs =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  return (
    <div className=" p-3 m-4 text-center items-center">
      <div className="text-center">
        <form className="text-center pt-5 pl-5 pr-5 mt-10 ml-10 mr-10 mb-2 rounded-2xl  grid grid-rows-3 grid-flow-col gap-1 bg-slate-800">
          {/*Carnet*/}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Cédula
            </label>
            <input
              type="text"
              className={styleInputs}
              disabled={false}
              onChange={(e) => {
                setCedula(e.target.value);
              }}
            />
          </div>
          {/*Primer nombre */}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Primer nombre
            </label>

            <input
              type="text"
              className={styleInputs}
              disabled={false}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
          </div>
          {/*Segundo nombre */}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Segundo nombre
            </label>
            <input
              type="text"
              className={styleInputs}
              disabled={false}
              onChange={(e) => {
                setNombre2(e.target.value);
              }}
            />
          </div>
          {/*Apellido 1 */}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Primer apellido
            </label>
            <input
              type="text"
              className={styleInputs}
              disabled={false}
              onChange={(e) => {
                setApellido1(e.target.value);
              }}
            />
          </div>
          {/*Apellido 2 */}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Segundo apellido
            </label>
            <input
              type="text"
              className={styleInputs}
              disabled={false}
              onChange={(e) => {
                setApellido2(e.target.value);
              }}
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
              className={styleInputs}
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
              className={styleInputs}
              onChange={(e) => {
                setTelefono(e.target.value);
              }}
            />
          </div>
          {/* Celular */}
          <div className={cssElementosForm}>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Celular
            </label>
            <input
              type="text"
              className={styleInputs}
              onChange={(e) => {
                setCelular(e.target.value);
              }}
            />
          </div>
          {/* Contrasenna */}
          <div className={cssElementosForm}>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contraseña
            </label>
            <input
              type="password"
              className={styleInputs}
              onChange={(e) => {
                setContrasenna(e.target.value);
              }}
            />
          </div>
          <br></br>
          {/*Coordinador */}
          <div className={cssElementosForm}>
            <label
              htmlFor="coordinador"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Elija si es coordinador
            </label>
            <select
              id="cCoordinador"
              className={styleInputs}
              onChange={(e) => {
                setCoordinador(e.target.value);
              }}
            >
              <option value="Coordinador">Coordinador</option>
              <option value="No Coordinador">No coordinador</option>
            </select>
          </div>
          {/*Campus */}
          <div className={cssElementosForm}>
            <label
              htmlFor="campus"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Elija el campus
            </label>
            <select
              id="ccampus"
              className={styleInputs}
              onChange={(e) => {
                setCampus(e.target.value);
              }}
            >
              {campus.map((campusIn, index) => {
                return (
                  <option value={campusIn} key={index}>
                    {campusIn}
                  </option>
                );
              })}
            </select>
          </div>
          {/*Foto*/}
          <div className={cssElementosForm}>
            <label htmlFor="file">Foto:</label>
            <input type="file" id="file" onChange={handleFileChange} required />
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
      <div className="text-center w-full" id="containerBotonAgregarActividad">
        {/*Boton para regresar la menu profesores*/}
        <button
          className="text-white m-3 bg-red-500 hover:bg-red-900  font-medium rounded-lg w-auto p-4  text-center "
          onClick={handleClickReturn}
        >
          Regresar al Información del Equipo
        </button>
      </div>
    </div>
  );
}
export default FormularioAgregarProfesor;
