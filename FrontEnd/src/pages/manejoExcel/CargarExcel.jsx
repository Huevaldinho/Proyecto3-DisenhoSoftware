import React from 'react';
import * as XLSX from 'xlsx';
import { useState, useContext } from "react";
import { MainControllerContext } from "../../contexts/MainControllerContext";
import { useNavigate, useLocation } from "react-router-dom";

function CargarExcel() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [jsonData, setEstudiantes] = useState(null);
  const { registrarEstudiantes } = useContext(MainControllerContext);

  const handleClick = (e) => {
    e.preventDefault();
    let mandarDatos = jsonData;
    console.log("Datos que se envian:", mandarDatos);
    registrarEstudiantes(mandarDatos);

    //Redireccionar
    navigate("/informacionEstudiantesProfesores");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      jsonData.shift();
      setEstudiantes(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="text-center p-16">
      <div className="pt-4 text-center text-3xl text-red-500 py-6">
        <p>Por Favor elija el archivo de Excel que desea cargar</p>
      </div>
      <div className="max-w-sm mx-auto bg-white shadow py-8 px-6">
        <form className=" flex items-center space-x-6" action="">
          <input
            type="file"
            onChange={handleFileUpload}
            className="block w-full text-sm text-slate-500 file:text-sm file:font-semibold file:py-2 file:px-4 file:bg-violet-50 file:text-violet-700 file:rounded-full file:border-0 file:mr-4 hover:file:bg-violet-100"
          />
        </form>
      </div>
      <div>
        <button
          onClick={handleClick}
          className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
        >
          Subir
        </button>
      </div>
    </div>
  );
}

export default CargarExcel;