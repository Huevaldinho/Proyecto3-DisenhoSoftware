import React, { useEffect, useContext } from "react";
import Role from "../../../services/enums/role";
import { MainControllerContext } from "../../../contexts/MainControllerContext";
function HeaderInfoProfesores(props) {
  const { usuario, setUsuario } = useContext(MainControllerContext);
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
  return (
    <thead className="bg-gray-50 text-center">
      <tr className="text-center">
        <th
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Código
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Nombre
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Rol
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Campus
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Estado
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Coordinador
        </th>
        <th
          hidden={storedUser.rol === Role.SUPERUSUARIO ? false : true}
          scope="col"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Asignar asistente
        </th>
      </tr>
    </thead>
  );
}

export default HeaderInfoProfesores;
