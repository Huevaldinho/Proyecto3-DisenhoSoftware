import FilaNotificacion from "./FilaNotificaciones";

function BodyNotificacion({ notificaciones }) {
    console.log("Notificaciones debería ser vacio", notificaciones)
  if (notificaciones.length == 0)
    return <tbody className="bg-white divide-y divide-gray-200"></tbody>;
  return (
    <tbody className="bg-white divide-y divide-gray-200 text-center p-3 m-2">
      {notificaciones.map((notificacion, index) => (
        <FilaNotificacion key={index} notificacion={notificacion} index={index} />
      ))}
    </tbody>
  );
}

export default BodyNotificacion;