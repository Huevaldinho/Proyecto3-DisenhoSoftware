import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonasChat from "./PersonasChat";
function CrearChat(props) {
  //*Los permisos aun no se crean pero para agregar solo el coordinador puede hacerlo.
  const navigate = useNavigate();

  //Use states
  const [nombreChat, setNombreChat] = useState(null); 

  const [integrantes, setIntegrantes] = useState([]); 



    
  const eliminarElemento = (elemento) => {
    const indiceAEliminar = integrantes.indexOf(elemento);
    if (indiceAEliminar > -1) {
      const nuevoArray = [...integrantes];
      nuevoArray.splice(indiceAEliminar, 1);
      setIntegrantes(nuevoArray);
    }
  };
  //Para agregar integrantes
  const agregarIntegrante = (Integrante) => {
    setIntegrantes([...integrantes, Integrante]);
  };
  //Para manejar los integrantes
  const handleIntegrante = (IntegranteIn) => {
    if (integrantes.length == 0) {
      //Si no hay integrantes en el arreglo
      agregarIntegrante(IntegranteIn);
    } else {
      //Si ya hay integrantes, hay que fijarse si el integrantesIn ya esta registrado
      //si esta registrado es porque se está desmarcando.
      for (let i = 0; i < integrantes.length; i++) {
        if (integrantes[i]._id == integrantes._id) {
          eliminarElemento(IntegranteIn);
          return;
        }
      }
      agregarIntegrante(IntegranteIn);
    }
  };

  //*Styles
  const cssElementosForm =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  return (
    <div>
        <h1 className="p-4 m-3 text-center font-bold text-4xl items-center" >Crear Nuevo Chat</h1>

    <form className="pt-5 pl-5 pr-5 mt-10 ml-10 mr-10 mb-2 rounded-2xl bg-slate-800 grid grid-cols-2 gap-4 text-center">
    <div className="text-center">
        <label htmlFor="nombreChat" className="">
          Nombre del Chat:
        </label>
        <input
          type="text"
          id="nombreChat"
          className={cssElementosForm}
          onChange={(e) => {
            setNombreChat(e.target.value);
          }}
        />
      </div>

      {/* integrantes*/}
      <PersonasChat
        cssElementosForm={cssElementosForm}
        handleResponsableChange={handleIntegrante}
      />
      
    </form>
    <div className="text-center bg-green-500 hover:bg-green-800 rounded-2xl p-3 m-5">
        <button
          type="submit"
          className="text-center w-full"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default CrearChat;