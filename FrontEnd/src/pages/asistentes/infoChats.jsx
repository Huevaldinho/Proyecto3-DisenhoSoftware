import React from "react";
import { MainControllerContext } from "../../contexts/MainControllerContext";
import { useContext, useEffect,  } from "react";
import TablaChats from "../../components/compartidos/Chats/TablaChats"
function infoChats(props) {
  const { chats, consultarChats } = useContext(
    MainControllerContext
  );
  const updateState = () => {
    setTimeout(() => {
      consultarChats();
      
    }, 1000);
  };
  // Efecto que actualiza el estado de myState después de que el componente ha sido montado
  useEffect(() => {
    updateState();
  }, []);
  
  if (chats.length == 0) {
    return (
      <p className="text-center font-semibold text-5xl m-auto">
        Cargando chats
      </p>
    );
  }
  return (
    <div className="container m-auto ">
      <div className="text-center" id="nombrePlanConteiner">
        <h1 className="text-center font-bold text-5xl p-5">
          Chats Disponibles 
        </h1>
      </div>
      <div className="text-center" id="tablaProfesores">
        {/*Las actividades se las pasa a la tabla por props */}
        <TablaChats chats={chats} />
      </div>
    </div>
  );
}

export default infoChats;