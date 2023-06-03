import FilaTablaActividades from "./FilaTablaActividades";

function BodyTablaActividades({ actividades }) {
  if (actividades.length == 0)
    return <tbody className="bg-white divide-y divide-gray-200"></tbody>;
  return (
    <tbody className="bg-white divide-y divide-gray-200 text-center">
      {actividades.map((actividad, index) => (
        <FilaTablaActividades key={index} actividad={actividad} index={index} />
      ))}
    </tbody>
  );
}

export default BodyTablaActividades;
