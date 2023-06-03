import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import COORDINADOR from "../../services/enums/coordinador";
import { MainControllerContext } from "../../contexts/MainControllerContext";
import DTOProfesor from "../../services/DTOs/DTOProfesor";
import Role from "../../services/enums/role";
import { campus } from "../../services/campus";
function FormularioModificarProfesor(props) {
  const { actualizarProfesor, eliminarMiembro, usuario, setUsuario } =
    useContext(MainControllerContext);
  const navigate = useNavigate();
  const location = useLocation();
  let profesor = location?.state.profesor;
  const [nombre1, setNombre1] = useState(profesor.nombre); //Nombre 1
  const [nombre2, setNombre2] = useState(profesor.nombre2); //Nombre 2
  const [apellido1, setApellido1] = useState(profesor.apellido1); //Apellido 1
  const [apellido2, setApellido2] = useState(profesor.apellido2); //Apellido 2
  const [correo, setCorreo] = useState(profesor.correo); //Correo
  const [telefono, setTelefono] = useState(profesor.telefono); //Telefono
  const [estado, setEstado] = useState(profesor.estado); //Estado
  const [coordinador, setCord] = useState(profesor.coordinador); //Coordinador
  const [celular, setCelular] = useState(profesor.celular); //Celular
  const [cedula, setCedula] = useState(profesor.cedula); //Cedula
  const [file, setFile] = useState(null); //Imagen opcional

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleChangeCoordinador = (e) => {
    setCord(e.target.value === "Coordinador" ? "COORDINADOR" : "NOCOORDINADOR");
  };
  const manejoErrores = async (respuesta) => {
    switch (respuesta) {
      case 1: {
        alert(
          "Ha ocurrido un error, formato de contraseña incorrecto. Debe tener el formato: NNNNNNNN"
        );
        return false;
      }
      case 2: {
        alert("Ha ocurrido un error, correo incorrecto.");
        return false;
      }
      case 3: {
        alert(
          "Ha ocurrido un error, telefono incorrecto. Debe tener el formato: 2NNN-NNNN [NNNN]"
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
          "Ha ocurrido un error, el celular no cumple con el formato: 6|7|8 seguido de 7 números"
        );
        return false;
      }
      default: {
        return true;
      }
    }
  };

  const redireccionar = async () => {
    let dtoProfe = new DTOProfesor(
      cedula,
      nombre1,
      nombre2,
      apellido1,
      apellido2,
      correo,
      profesor.contrasenna,
      profesor.rol,
      profesor.codigo,
      coordinador,
      telefono,
      profesor.campus,
      estado,
      profesor.equipo,
      celular,
      profesor.foto
    );
    const respuesta = await actualizarProfesor(dtoProfe, file);

    if (manejoErrores(respuesta) != false) {
      //No hubo errores.
      if (Object.keys(respuesta).length !== 0) {
        alert("Se ha modificado exitosamente al profesor.");
        navigate("/infoProfesores");
      }
    }
  };

  const handleModificar = (e) => {
    e.preventDefault();
    redireccionar();
  };

  const handleBorrar = async (e) => {
    e.preventDefault();
    const respuesta = await eliminarMiembro(parseInt(profesor.cedula));
    if (Object.keys(respuesta).length !== 0) {
      alert("Se ha eliminado exitosamente al profesor.");
      navigate("/infoProfesores");
    } else alert("No se ha podido eliminar al profesor, intente de nuevo.");
  };

  let storedUser = usuario;
  const updateState = () => {
    setTimeout(() => {
      storedUser = JSON.parse(localStorage.getItem("usuario"));
      try {
        JSON.parse(storedUser);
      } catch (error) {
        setUsuario(storedUser);
      }
    }, 1000);
  };

  // Efecto que actualiza el estado de myState después de que el componente ha sido montado
  useEffect(() => {
    updateState();
  }, []);

  if (storedUser == null) return <p>Cargando</p>;
  let puedeAsignarCoordinador = !(
    storedUser.rol === Role.ASISTENTE && storedUser.campus === campus[0]
  );

  let puedeModificar = !(
    storedUser.codigo === profesor.codigo ||
    (storedUser.rol === Role.ASISTENTE && storedUser.campus === profesor.campus)
  );

  //*Styles
  const cssElementosForm = "col-span-1 md:col-span-2 lg:col-span-1";
  const styleInputs =
    "text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  return (
    <div className="p-3 m-auto text-center items-center">
      <div className="text-center">
        <form className="text-center p-5 m-2 rounded-2xl  bg-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {/*Foto */}
          <div className={cssElementosForm}>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Foto
            </label>
            {profesor.foto === "" ? (
              <div className={cssElementosForm}>
                <label htmlFor="file">Agregar foto:</label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  required={false}
                  disabled={puedeModificar}
                />
              </div>
            ) : (
              <>
                <img src={profesor.foto} alt="Imagen" />
                <div className={cssElementosForm}>
                  <label htmlFor="file">Cambiar foto:</label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    required={false}
                    disabled={puedeModificar}
                  />
                </div>
              </>
            )}
          </div>
          {/*Codigo*/}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Código
            </label>
            <input
              type="text"
              className={styleInputs}
              disabled={true}
              value={profesor.codigo}
            />
            <p className="font-thin text-red-700">No modificable</p>
          </div>
          {/*Primer nombre */}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Primer nombre
            </label>

            <input
              disabled={puedeModificar}
              type="text"
              className={styleInputs}
              defaultValue={nombre1}
              onChange={(e) => {
                setNombre1(e.target.value);
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
              disabled={puedeModificar}
              defaultValue={nombre2}
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
              disabled={puedeModificar}
              className={styleInputs}
              defaultValue={apellido1}
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
              disabled={puedeModificar}
              defaultValue={apellido2}
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
              disabled={puedeModificar}
              id="email"
              className={styleInputs}
              defaultValue={correo}
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
              Telefono (2NNN-NNNN [NNNN])
            </label>
            <input
              type="text"
              disabled={puedeModificar}
              className={styleInputs}
              defaultValue={telefono}
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
              Celular (6|7|8 seguido de 7 números)
            </label>
            <input
              type="text"
              disabled={puedeModificar}
              className={styleInputs}
              defaultValue={celular}
              onChange={(e) => {
                setCelular(e.target.value);
              }}
            />
          </div>
          {/* Cedula */}
          <div className={cssElementosForm}>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cédula
            </label>
            <input
              type="text"
              className={styleInputs}
              defaultValue={cedula}
              disabled={puedeModificar}
              onChange={(e) => {
                setCedula(e.target.value);
              }}
            />
          </div>
          {/*Estado */}
          <div className={cssElementosForm}>
            <label
              htmlFor="estados"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Seleccione el estado
            </label>
            <select
              disabled={puedeModificar}
              id="cEstados"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setEstado(e.target.value);
              }}
              defaultValue={estado == "Activo" ? "Activo" : "Inactivo"}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          {/*Coordinador */}
          <div className={cssElementosForm}>
            <label
              htmlFor="coordinador"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Elija si es coordinador
            </label>
            <select
              disabled={puedeAsignarCoordinador}
              id="cCoordinador"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChangeCoordinador}
              defaultValue={
                coordinador === "COORDINADOR" ? "Coordinador" : "No coordinador"
              }
            >
              <option value="Coordinador">Coordinador</option>
              <option value="No coordinador">No coordinador</option>
            </select>
          </div>

          {/*Boton para eliminar al profe*/}
          <div
            className="text-center rounded-md bg-red-500 p-2 m-3 h-auto w-auto hover:bg-red-800"
            id="containerBotonAgregarActividad"
            hidden={puedeModificar}
          >
            <button
              disabled={puedeModificar}
              className="text-center w-full h-full"
              onClick={handleBorrar}
            >
              Inactivar Profesor
            </button>
          </div>
        </form>
      </div>
      <div className={"text-center w-full "}>
        {/*Boton aceptar */}
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-900  font-medium rounded-lg w-auto p-4  text-center "
          onClick={handleModificar}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}

export default FormularioModificarProfesor;
