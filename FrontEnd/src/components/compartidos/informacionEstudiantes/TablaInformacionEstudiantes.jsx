import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

// Componentes de tabla
import BodyInformacionEstudiantes from "./BodyInformacionEstudiantes";
import HeaderInformacionEstudiantes from "./HeaderInformacionEstudiantes";

// Controlador
import { MainControllerContext } from "../../../contexts/MainControllerContext";

function TablaInformacionEstudiantes(props) {
  const { estudiantes, verEstudiantes } = useContext(MainControllerContext);
  const navigate = useNavigate();

  // Función que actualiza el estado de estudiantes al ejecutar la función verEstudiantes
  // verEstudiantes hace la petición al API para cambiar el estado de estudiantes
  const updateState = () => {
    setTimeout(() => {
      verEstudiantes();
    }, 1000);
  };

  const handleGenerateExcel = (e) => {
    e.preventDefault();

    // Datos en formato JSON
    console.log("Estudiantes en tabla estudiantes: ", estudiantes);

    const jsonData = estudiantes;
    const jsonSinEdad = jsonData.map(({ _id, ...rest }) => rest);
    const jsonDataFinal = jsonSinEdad.map(({ __v, ...rest }) => rest);

    // Crear una hoja de cálculo nueva
    const workbook = XLSX.utils.book_new();

    const campuses = jsonDataFinal.map((persona) => persona.campus);
    const uniqueCampuses = Array.from(new Set(campuses));

    uniqueCampuses.slice(0, 5).forEach((campus, index) => {
      const worksheet = XLSX.utils.json_to_sheet([]);

      const filteredData = jsonDataFinal.filter(
        (persona) => persona.campus === campus
      );

      const data = filteredData.map(({ _id, ...rest }) => rest);

      // Agregar encabezado
      const header = Object.keys(data[0]);
      XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });

      XLSX.utils.sheet_add_json(worksheet, data, {
        skipHeader: true,
        origin: "A2",
      });

      XLSX.utils.book_append_sheet(workbook, worksheet, `Hoja ${index + 1}`);
    });

    // Guardar el archivo como Excel
    const excelData = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    const excelBlob = new Blob([excelData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(excelBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "datos.xlsx";
    a.click();

    // Navegar a la ruta "/informacionEstudiantesProfesores"
    navigate("/informacionEstudiantesProfesores");
  };

  // Efecto que actualiza el estado de estudiantes después de que el componente ha sido montado
  useEffect(() => {
    updateState();
  }, []);

  if (estudiantes.length === 0) {
    // Si no hay estudiantes
    return (
      <div className="text-center font-bold text-4xl text-red-500">
        No hay Estudiantes para mostrar.
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-8 text-center">
      <h1 className="text-center font-light p-2 text-blue-600">
        Pulsa doble click para ver detalles del estudiante
      </h1>
      <h1 className="text-center font-light p-2 text-yellow-500">
        Pulsa doble click en las columnas para ordenarlas por ese campo
      </h1>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <HeaderInformacionEstudiantes />
              <BodyInformacionEstudiantes estudiantes={estudiantes} />
            </table>
          </div>
        </div>
      </div>
      <div
        className="text-center rounded-md bg-blue-500 p-2 m-3 h-auto w-auto hover:bg-blue-800"
        id="containerBotonAgregarActividad"
      >
        {/* Boton para regresar al menú de profesores */}
        <button
          className="text-center w-full h-full"
          onClick={handleGenerateExcel}
        >
          Generar Reporte
        </button>
      </div>
    </div>
  );
}

export default TablaInformacionEstudiantes;
