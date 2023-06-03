import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validarLogin } from "../../validation/ValidarInputs";
import { MainControllerContext } from "../../contexts/MainControllerContext";

function CambiarContraseanna() {
  const { cambiarContrasenna } = useContext(MainControllerContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validarLogin(email, password)) {
      //Valida inputs
      //*Validar inputs.
      let respuestaAPI = await cambiarContrasenna(email, password); //manda request
      if (respuestaAPI === 1) {
        //Correo no registrado
        alert("El correo ingresado no está registrado.");
      } else if (respuestaAPI === 2) {
        //Contraseña no es la registrada
        alert("La contraseña ingresada no cumple con el formato correcto.");
      } else {
        alert("Se ha cambiado la contraseña exitosamente.");
        navigate("/login"); //Contra cambiada
      }
    } else {
      alert(
        "No se ha podido iniciar sesion. Correo o contraseña inválidos. Intente de nuevo."
      );
    }
  };
  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto m-10 flex-1 flex flex-col items-center justify-center px-2">
        <form
          className="bg-slate-800 px-6 py-8 rounded-xl shadow-md text-black w-full"
          onSubmit={handleSubmit}
          method="post"
        >
          <h1 className="mb-8 text-3xl text-center text-white">
            Cambiar contraseña
          </h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Contraseña"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <button
            type="submit"
            className="w-full text-center py-3 bg-blue-500
        rounded bg-green text-white hover:bg-blue-300 focus:outline-none my-1"
          >
            Cambiar
          </button>

          <div className="text-white mt-6 text-center">
            <Link
              className="underline border-b border-blue text-blue hover:text-blue-500 text-white"
              to="/login"
            >
              Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CambiarContraseanna;
