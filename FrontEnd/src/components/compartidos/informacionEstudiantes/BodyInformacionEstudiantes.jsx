import FilaInformacionEstudiantes from "./FilaInformacionEstudiantes";
function BodyInformacionEstudiantes({ estudiantes }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {estudiantes.map((estudiante, index) => (
        <FilaInformacionEstudiantes
          key={estudiante.carnet}
          estudiante={estudiante}
          index={index}
        />
      ))}
    </tbody>
  );
}

export default BodyInformacionEstudiantes;
