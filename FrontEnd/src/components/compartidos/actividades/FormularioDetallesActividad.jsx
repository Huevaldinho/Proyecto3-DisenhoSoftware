import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { MainControllerContext } from "../../../contexts/MainControllerContext";
import Estado from "../../../services/enums/estado";
import TipoActividad from "../../../services/enums/tipoActividad";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import ResponsablesAgregarActividad from "../../profesores/coordinadores/agregarActividad/ResponsablesAgregarActividad";
import DTOActividad from "../../../services/DTOs/DTOActividad";

function FormularioDetallesActividad(props) {
  const { setUsuario, usuario, actualizarActividad } = useContext(
    MainControllerContext
  );
  const navigate = useNavigate();
  const { state } = useLocation();
  const semanas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const estadosActividad = Object.values(Estado);
  const tipoActividades = Object.values(TipoActividad);
  const modalidades = ["Presencial", "Virtual"];

  const cssElementosForm = "text-center";

  let actividad = state?.actividad;

  const [nombre, setNombre] = useState(actividad.nombre); //Nombre
  const [semana, setSemana] = useState(actividad.semana); //Semana
  const [descripcion, setDescripcion] = useState(actividad.descripcion); //Descripcion
  const [tipoActividad, setTipoActividad] = useState(actividad.tipoActividad); //Tipo actividad
  const [modalidad, setModalidad] = useState(actividad.modalidad); //Modalidad
  const [estado, setEstado] = useState(actividad.estado); //Estado
  const [fecheHora, setFechaHora] = useState(actividad.fechaHora); //Fecha hora actividad
  const [fecheHoraPublicacion, setFechaHoraPublicacion] = useState(
    actividad.fechaHoraPublicacion
  ); //Fecha hora publicacion
  const [recordatorios, setRecordatorios] = useState(actividad.recordatorios); //Recordatorios
  const [responsables, setResponsables] = useState(actividad.responsables); //Responsables
  const [afiche, setAfiche] = useState(null); //Afiche opcional
  const [enlace, setEnlace] = useState(actividad.enlace); //Enlace depende de modalidad
  const [evidencias, setEvidencias] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  useEffect(() => {
    updateState();
  }, []);

  if (storedUser == null) return <p>Cargando</p>;

  const desactiviar = !(
    usuario.rol === "Profesor" && usuario.coordinador === "COORDINADOR"
  );

  const openCarousel = (index) => {
    setCurrentImageIndex(index);
    setShowCarousel(true);
  };
  const closeCarousel = (e) => {
    e.preventDefault();
    setShowCarousel(false);
  };
  const nextImage = (e) => {
    e.preventDefault();
    const nextIndex = (currentImageIndex + 1) % actividad.evidencias.length;
    setCurrentImageIndex(nextIndex);
  };
  const previousImage = (e) => {
    e.preventDefault();
    const prevIndex =
      (currentImageIndex - 1 + actividad.evidencias.length) %
      actividad.evidencias.length;
    setCurrentImageIndex(prevIndex);
  };
  const handleShowImage = (e) => {
    e.preventDefault();
    setShowImage(true);
  };
  const handleCloseImage = (e) => {
    e.preventDefault();
    setShowImage(false);
  };
  const handleFileChange = (event) => {
    setAfiche(event.target.files[0]);
  };
  const convertirDateAString = (fecha) => {
    return `${("0" + fecha.getDate()).slice(-2)}-${(
      "0" +
      (fecha.getMonth() + 1)
    ).slice(-2)}-${fecha.getFullYear()} ${("0" + fecha.getHours()).slice(
      -2
    )}:${("0" + fecha.getMinutes()).slice(-2)}:${(
      "0" + fecha.getSeconds()
    ).slice(-2)}`;
  };
  const agregarRecordatorio = (recordatorio) => {
    setRecordatorios([...recordatorios, recordatorio]);
  };
  const eliminarRecordatorio = (i) => {
    const indiceAEliminar = i;
    if (indiceAEliminar > -1) {
      const nuevoArray = [...recordatorios];
      nuevoArray.splice(indiceAEliminar, 1);
      setRecordatorios(nuevoArray);
    }
  };
  const handleRecordatoriosChange = (recordatorioIn) => {
    console.log("Recordatorios:", recordatorios);

    recordatorioIn = convertirDateAString(recordatorioIn);
    console.log("Recordatorio in:", recordatorioIn);
    if (recordatorios.length == 0) {
      //Si no hay recordatorios en el arreglo
      agregarRecordatorio(recordatorioIn);
    } else {
      for (let i = 0; i < recordatorios.length; i++) {
        if (recordatorios[i] === recordatorioIn) {
          eliminarRecordatorio(i);
          return;
        }
      }
      agregarRecordatorio(recordatorioIn);
    }
  };
  const handleEliminarRecordatorio = (e) => {
    eliminarRecordatorio(e.target.getAttribute("index"));
  };
  const handleEliminarResponsable = (evento) => {
    const index = evento.target.getAttribute("index");
    const newArray = [
      ...responsables.slice(0, index),
      ...responsables.slice(index + 1),
    ];
    setResponsables(newArray);
  };
  const handleResponsableChange = (responsableIn) => {
    if (responsables.length == 0) {
      //Si no hay responsables en el arreglo
      setResponsables([...responsables, responsableIn]);
    } else {
      //Si ya hay responsables, hay que fijarse si el responsableIn ya esta registrado
      //si esta registrado es porque se está desmarcando.
      for (let i = 0; i < responsables.length; i++) {
        if (responsables[i]._id == responsableIn._id) {
          handleEliminarResponsable(i);
          return;
        }
      }
      setResponsables([...responsables, responsableIn]);
    }
  };
  const handleEvidencias = (evento) => {
    const files = evento.target.files;
    setEvidencias(files);
  };
  const handleEnviar = async (e) => {
    e.preventDefault();

    let dtoActividad = new DTOActividad(
      actividad._id,
      nombre,
      semana,
      tipoActividad,
      descripcion,
      responsables,
      fecheHora,
      fecheHoraPublicacion,
      recordatorios,
      modalidad,
      enlace,
      actividad.afiche,
      estado
    );

    let respuesta = await actualizarActividad(dtoActividad, afiche, evidencias);
    if (Object.keys(respuesta).length !== 0) {
      alert("Se ha modificado exitosamente la actividad.");
      navigate("/planDeTrabajo");
    } else alert("No se ha podido modificar la actividad, intente de nuevo.");
  };

  return (
    <div className="p-3 m-auto text-center items-center">
      <div className="text-center">
        <form className="text-center p-5 m-2 rounded-2xl grid grid-cols-1 bg-slate-800 sm:grid-cols-2 gap-4 ">
          {/*Nombre actividad */}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nombre actividad
            </label>
            <input
              disabled={desactiviar}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
              defaultValue={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
          </div>
          {/*Semana*/}
          <div className="text-center">
            <label htmlFor="semanaActividad">Semana:</label>
            <Select
              placeholder="Seleccione la semana"
              id="semana"
              className="text-center"
              isDisabled={desactiviar}
              options={semanas.map((semana, index) => ({
                key: index,
                value: semana,
                label: semana.toString(),
              }))}
              value={{ value: parseInt(semana), label: parseInt(semana) }}
              onChange={(semanaSeleccionada) =>
                setSemana(semanaSeleccionada?.value.toString())
              }
            ></Select>
          </div>
          {/*Descripcion */}
          <div className={cssElementosForm}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Descripción
            </label>
            <textarea
              disabled={desactiviar}
              defaultValue={actividad.descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
              className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>
          {/*Tipo actividad */}
          <div>
            <label htmlFor="tipoActividad">Tipo de actividad:</label>
            <Select
              placeholder="Seleccione el tipo de actividad"
              id="tipoActividadSelect"
              className="text-center"
              isDisabled={desactiviar}
              value={{ value: tipoActividad, label: tipoActividad }}
              onChange={(tipoActividad) =>
                setTipoActividad(tipoActividad?.value)
              }
              options={tipoActividades.map((tipo, index) => ({
                key: index,
                value: tipo,
                label: tipo.toString(),
              }))}
            ></Select>
          </div>
          {/*Modalidad */}
          <div className="text-center">
            <label htmlFor="modalidad">Modalidad:</label>
            <Select
              id="modalidadSelect"
              className="text-center"
              isDisabled={desactiviar}
              options={modalidades.map((modalidad, index) => ({
                key: index,
                value: modalidad,
                label: modalidad.toString(),
              }))}
              value={{ value: modalidad, label: modalidad }}
              onChange={(modalidadSeleccionada) =>
                setModalidad(modalidadSeleccionada.value)
              }
            ></Select>
          </div>
          {/**Enlace */}
          <div className="text-center">
            {enlace != "null" && modalidad != "Presencial" && (
              <div className="text-center">Enlace para la reunión:{enlace}</div>
            )}
            <label htmlFor="enlace">Cambiar enlace:</label>
            <input
              type="text"
              id="enlace"
              disabled={desactiviar && modalidad == "Presencial" ? true : false}
              className={"text-center p-1 m-2 h-auto w-auto"}
              onChange={(e) => setEnlace(e.target.value)}
            />
            {modalidad == "Presencial" ? (
              <p className="text-center font-light text-red-600">
                No requiere enlace
              </p>
            ) : (
              <p className="text-center font-light text-blue-600">
                {" "}
                Ingrese enlace de la reunión
              </p>
            )}
          </div>
          {/*Estado */}
          <div className="text-center">
            <label htmlFor="estadoActividad">Estado de actividad:</label>
            <Select
              placeholder="Seleccione el estado"
              id="tipoActividad"
              className="text-center"
              required
              isDisabled={desactiviar}
              value={{ value: estado, label: estado }}
              options={estadosActividad.map((estado, index) => ({
                key: index,
                value: estado,
                label: estado.toString(),
              }))}
              onChange={(estadoSeleccionado) =>
                setEstado(estadoSeleccionado.value)
              }
            ></Select>
          </div>
          {/*Fecha hora actividad*/}
          <div className="flex flex-col text-center">
            <label htmlFor="fecha-hora">Fecha y hora de la actividad:</label>
            <Datetime
              value={fecheHora}
              onChange={(fechaHoraSeleccionada) => {
                setFechaHora(convertirDateAString(fechaHoraSeleccionada._d));
              }}
              dateFormat="DD/MM/YYYY"
              timeFormat="HH:mm"
              className="border rounded-md  text-center"
              inputProps={{
                id: "fecha-hora",
                disabled: desactiviar,
                className: "text-center w-full h-full",
              }}
            />
          </div>
          <br></br>
          {/*Fecha de publicacion */}
          <div className="flex flex-col text-center">
            <label htmlFor="fecha-hora">Fecha y hora de publicación:</label>
            <Datetime
              value={fecheHoraPublicacion}
              onChange={(fechaHoraSeleccionada) => {
                setFechaHoraPublicacion(
                  convertirDateAString(fechaHoraSeleccionada._d)
                );
              }}
              dateFormat="DD/MM/YYYY"
              timeFormat="HH:mm"
              className="border rounded-md  text-center"
              inputProps={{
                id: "fecha-hora",
                disabled: desactiviar,
                className: "text-center w-full h-full",
              }}
            />
          </div>
          {/**Responsables */}
          <div className={cssElementosForm}>
            <ResponsablesAgregarActividad
              cssElementosForm={cssElementosForm}
              handleResponsableChange={handleResponsableChange}
            />
            {responsables.length > 0 ? (
              <p className="text-light text-yellow-500">
                Doble click para eliminar responsable
              </p>
            ) : (
              <p className="text-red-500">No hay responsables registrados</p>
            )}
            <ul>
              {responsables.length > 0 ? (
                responsables.map((persona, index) => (
                  <>
                    <li
                      className="hover:bg-red-900"
                      key={persona.codigo}
                      index={index}
                      disabled={desactiviar}
                      onDoubleClick={handleEliminarResponsable}
                    >
                      {"* "} {persona.nombre} {persona.apellido1}
                    </li>
                  </>
                ))
              ) : (
                <></>
              )}
            </ul>
          </div>
          {/**Recordatorios */}
          <div className="flex flex-col text-center">
            <label htmlFor="fecha-hora">
              Seleccione las fechas de recordatorio:
            </label>
            <Datetime
              onChange={(e) => {
                handleRecordatoriosChange(e._d);
              }}
              dateFormat="DD/MM/YYYY"
              className="border rounded-md  text-center"
              inputProps={{
                id: "fecha-hora",
                disabled: desactiviar,
                className: "text-center w-full h-full",
              }}
            />
            {/*Muestra los recordatorios seleccionados */}
            <div className="text-center">
              {recordatorios.length > 0 ? (
                <>
                  <p className="text-center font-light text-yellow-300">
                    Fechas de recordatorio seleccionadas (doble click para
                    eliminarla)
                  </p>
                  <ul>
                    {recordatorios.map((date, index) => (
                      <li
                        key={date.toString()}
                        index={index}
                        onDoubleClick={handleEliminarRecordatorio}
                        className="hover:bg-red-900"
                        disabled={desactiviar}
                      >
                        {date}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-center text-red-500 font-light">
                  No se han seleccionado recordatorios.
                </p>
              )}
            </div>
          </div>
          {/**Evidencias*/}
          <div className="text-center">
            <label htmlFor="evidencias">Evidencias:</label>
            {actividad.evidencias.length > 0 ? (
              <div className="flex flex-wrap justify-center">
                {actividad.evidencias.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="w-1/4 p-2 cursor-pointer"
                    onClick={() => openCarousel(index)}
                  >
                    <img
                      src={imageUrl}
                      alt={`Image ${index}`}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <br></br>
                <input
                  type="file"
                  disabled={desactiviar}
                  multiple
                  onChange={handleEvidencias}
                />
              </>
            )}

            {showCarousel && (
              <div className="fixed inset-0 flex items-center justify-center bg-black">
                <button
                  className="absolute top-4 right-4 text-white text-xl"
                  onClick={closeCarousel}
                >
                  X
                </button>
                <div className="relative">
                  <img
                    src={actividad.evidencias[currentImageIndex]}
                    alt={`Image ${currentImageIndex}`}
                    className="max-w-full max-h-full"
                  />
                  <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 px-2 py-1 rounded"
                    onClick={previousImage}
                  >
                    &lt;
                  </button>
                  <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 px-2 py-1 rounded"
                    onClick={nextImage}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}
          </div>
          {/**Afiche */}
          <div className={cssElementosForm}>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Afiche
            </label>
            {actividad.afiche === "" ? (
              <div
                className={
                  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
              >
                <input
                  disabled={desactiviar}
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  required={false}
                />
              </div>
            ) : (
              <>
                <div className={"text-center"}>
                  <button
                    onClick={handleShowImage}
                    className="text-center bg-blue-500 rounded-md hover:bg-blue-900 hover:rounded-lg p-1 m-1"
                  >
                    Ver afiche
                  </button>
                  {showImage && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black">
                      <button
                        className="absolute top-4 right-4 text-white text-xl"
                        onClick={handleCloseImage}
                      >
                        X
                      </button>
                      <img
                        className="max-w-full max-h-full"
                        src={actividad.afiche}
                        alt="FullScreenImage"
                      />
                    </div>
                  )}
                  {showImage && (
                    <button onClick={handleCloseImage}>Cerrar afiche</button>
                  )}
                </div>
                <div className={cssElementosForm}>
                  <label htmlFor="file">Cambiar afiche:</label>
                  <input
                    disabled={desactiviar}
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    required={false}
                  />
                </div>
              </>
            )}
          </div>
        </form>
        {/*Boton enviar */}
        {!desactiviar && (
          <div className="text-center bg-green-500 hover:bg-green-800 rounded-2xl p-3 m-5">
            <button
              type="submit"
              className="text-center w-full"
              onClick={handleEnviar}
            >
              Enviar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormularioDetallesActividad;
