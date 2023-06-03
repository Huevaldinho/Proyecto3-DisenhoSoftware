import React, { useContext } from "react";
import { useState } from "react"; //Para obtner en tiempo real la info ingresada
//Settear fecha yora Calendarios por defecto (toma la fecha actual)
import moment from "moment";

//Componentes del formulario
import NombreActividad from "./NombreActividad";
import SemanasAgregarActividad from "./SemanasAgregarActividad";
import EstadoActividad from "./EstadoActividadAgregarActividad";
import TipoActividadAgregarActividad from "./TipoActividadAgregarActividad";
import FechaHoraAgregarActividad from "./FechaHoraAgregarActividad";
import ModalidadAgregarActividad from "./ModalidadAgregarActividad";
import EnlaceAgregarActividad from "./EnlaceAgregarActividad";
import DescripcionAgregarActividad from "./DescripcionAgregarActividad";
import RecordatorioAgregarActividad from "./RecordatorioAgregarActividad";
import ResponsablesAgregarActividad from "./ResponsablesAgregarActividad";
import AficheAgregarActividad from "./AficheAgregarActividad";
//Validar datos
import { validarDatosActividad } from "../../../../validation/ValidarInputs";
//Controlador
import { MainControllerContext } from "../../../../contexts/MainControllerContext";
//DTOActividad
import { useNavigate } from "react-router-dom";

function FormularioAgregarActividad(props) {
  //*Los permisos aun no se crean pero para agregar solo el coordinador puede hacerlo.
  const { crearActividad } = useContext(MainControllerContext);
  const navigate = useNavigate();

  //Use states
  const [nombreActividad, setNombreActividad] = useState(null); //Nombre
  const [fechaHoraSeleccionada, setFechaHoraSeleccionada] = useState(moment()); //Fecha y hora de actividad
  const [fechaPublicacion, setFechaPublicacion] = useState(moment()); //Fecha y hora de publicacion
  const [descripcionIngresada, setDescripcionIngresada] = useState(null); //Descripcion
  const [semanaSeleccionada, setSemanaSeleccionada] = useState(null); //Semana
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null); //Estado
  const [modalidadSeleccionada, setModalidadSeleccionada] = useState(null); //Modalidad
  const [tipoActividadSeleccionada, setTipoActividadSeleccionada] =
    useState(null); //Tipo actividad
  const [enlace, setEnlace] = useState(null); //Enlace
  const [afiche, setAfiche] = useState(null); //Afiche
  const [responsables, setResponsables] = useState([]); //Responsables
  const [recordatorios, setRecordatorios] = useState([]); //Recordatorios

  //Para agregar recordatorio
  const agregarRecordatorio = (recordatorio) => {
    setRecordatorios([...recordatorios, recordatorio]);
  };
  //Para eliminar responsables
  const eliminarRecordatorio = (i) => {
    const indiceAEliminar = i;
    if (indiceAEliminar > -1) {
      const nuevoArray = [...recordatorios];
      nuevoArray.splice(indiceAEliminar, 1);
      setRecordatorios(nuevoArray);
    }
  };
  //Para manejar los recordatorios
  const handleRecordatoriosChange = (recordatorioIn) => {
    if (recordatorios.length == 0) {
      //Si no hay recordatorios en el arreglo
      agregarRecordatorio(recordatorioIn);
    } else {
      for (let i = 0; i < recordatorios.length; i++) {
        if (
          recordatorios[i].toISOString().substr(0, 10) ===
          recordatorioIn.toISOString().substr(0, 10)
        ) {
          eliminarRecordatorio(i);
          return;
        }
      }
      agregarRecordatorio(recordatorioIn);
    }
  };
  //Para agregar responsables
  const agregarResponsable = (responsable) => {
    setResponsables([...responsables, responsable]);
  };
  //Para eliminar responsables
  const eliminarElemento = (elemento) => {
    const indiceAEliminar = responsables.indexOf(elemento);
    if (indiceAEliminar > -1) {
      const nuevoArray = [...responsables];
      nuevoArray.splice(indiceAEliminar, 1);
      setResponsables(nuevoArray);
    }
  };
  //Para manejar los responsables
  const handleResponsableChange = (responsableIn) => {
    if (responsables.length == 0) {
      //Si no hay responsables en el arreglo
      agregarResponsable(responsableIn);
    } else {
      //Si ya hay responsables, hay que fijarse si el responsableIn ya esta registrado
      //si esta registrado es porque se está desmarcando.
      for (let i = 0; i < responsables.length; i++) {
        if (responsables[i]._id == responsableIn._id) {
          eliminarElemento(responsableIn);
          return;
        }
      }
      agregarResponsable(responsableIn);
    }
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
  const convertirRecordatorioAString = (dates) => {
    let datesString = [];
    dates.map((fecha) => {
      datesString.push(convertirDateAString(fecha));
    });
    return datesString;
  };
  const handleErrores = async (respuestaValidacion) => {
    switch (respuestaValidacion) {
      case 0: {
        //Validacion exitosa
        let dtoActividad = {
          nombre: nombreActividad,
          semana: semanaSeleccionada,
          tipoActividad: tipoActividadSeleccionada,
          descripcion: descripcionIngresada,
          responsables,
          fechaHora: convertirDateAString(fechaHoraSeleccionada),
          fechaHoraPublicacion: convertirDateAString(fechaPublicacion),
          recordatorios: convertirRecordatorioAString(recordatorios),
          modalidad: modalidadSeleccionada,
          enlace,
          estado: estadoSeleccionado,
          evidencias: null, //Evidencias.
        };
        let respuestaMainController = await crearActividad(
          dtoActividad,
          afiche
        );
        if (Object.keys(respuestaMainController).length !== 0) {
          alert("Se ha creado exitosamente la actividad.");
          navigate("/planDeTrabajo");
        } else alert("No se ha podido crear la actividad, intente de nuevo.");
        break;
      }
      default: {
        alert(respuestaValidacion);
        break;
      }
    }
  };
  const handleEnviar = (e) => {
    e.preventDefault();
    let datos = {
      nombreActividad,
      descripcionIngresada,
      semanaSeleccionada,
      estadoSeleccionado,
      modalidadSeleccionada,
      tipoActividadSeleccionada,
      fechaHoraSeleccionada,
      fechaPublicacion,
      enlace,
      afiche,
      responsables,
      recordatorios,
    };

    let validarDatos = validarDatosActividad(datos);
    handleErrores(validarDatos);
  };

  //*Styles
  const cssElementosForm =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  return (
    <form className="pt-5 pl-5 pr-5 mt-10 ml-10 mr-10 mb-2 rounded-2xl bg-slate-800 grid grid-cols-2 gap-4">
      {/*Nombre*/}
      <NombreActividad
        cssElementosForm={cssElementosForm}
        setNombreActividad={setNombreActividad}
      />
      {/*Semana*/}
      <SemanasAgregarActividad setSemanaSeleccionada={setSemanaSeleccionada} />
      {/*Estado actividad */}
      <EstadoActividad setEstadoSeleccionado={setEstadoSeleccionado} />
      {/*Tipo actividad */}
      <TipoActividadAgregarActividad
        setTipoActividadSeleccionada={setTipoActividadSeleccionada}
      />
      {/*Fecha y hora */}
      <FechaHoraAgregarActividad
        setFechaHoraSeleccionada={setFechaHoraSeleccionada}
        fechaHoraSeleccionada={fechaHoraSeleccionada}
        texto={"Fecha y hora de la actividad:"}
      />
      {/*Fecha publicacion */}
      <FechaHoraAgregarActividad
        setFechaHoraSeleccionada={setFechaPublicacion}
        fechaHoraSeleccionada={fechaPublicacion}
        texto={" Fecha y hora de publicación:"}
      />
      {/*Modalidad */}
      <ModalidadAgregarActividad
        setModalidadSeleccionada={setModalidadSeleccionada}
      />
      {/*Enlace */}
      <EnlaceAgregarActividad
        cssElementosForm={cssElementosForm}
        setEnlace={setEnlace}
      />
      {/*Descripcion */}
      <DescripcionAgregarActividad
        cssElementosForm={cssElementosForm}
        setDescripcionIngresada={setDescripcionIngresada}
      />
      {/* Recordatorio*/}
      <RecordatorioAgregarActividad
        handleRecordatoriosChange={handleRecordatoriosChange}
        recordatorios={recordatorios}
      />
      {/* Responsables*/}
      <ResponsablesAgregarActividad
        cssElementosForm={cssElementosForm}
        handleResponsableChange={handleResponsableChange}
      />
      {/*Afiche FALTA GUARDAR EL AFICHE*/}
      <AficheAgregarActividad setAfiche={setAfiche} />

      {/*Boton enviar */}
      <div className="text-center bg-green-500 hover:bg-green-800 rounded-2xl p-3 m-5">
        <button
          type="submit"
          className="text-center w-full"
          onClick={handleEnviar}
        >
          Enviar
        </button>
      </div>
    </form>
  );
}

export default FormularioAgregarActividad;
