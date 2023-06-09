import React from "react";
//Componentes de tabla
import HeaderChats from "./HeaderChats";
import BodyChats from "./BodyChats";
function TablaChats({ chats }) {

  if (chats.length === 0) {

    return (
      <div className="text-center font-bold text-4xl text-red-500">
        No hay chats para mostrar.
      </div>
    );
  }
  return (
    <div className="flex flex-col mt-8 text-center ">
      <h1 className="text-center font-light p-2 text-blue-600">
        Pulsa doble click para ver los mensajes del chat
      </h1>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 text-center">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 text-center">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg text-center">
            <table className="min-w-full divide-y divide-gray-200  text-center">
              <HeaderChats/>
              <BodyChats chats={chats} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TablaChats;

