import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div>
      <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Lo sentimos, no pudimos encontra esta página.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-400">
              No te preocupes, con el botón inferior podrás regresar al menú
              principal.
            </p>
            <Link
              rel="noopener noreferrer"
              to="/login"
              className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
export default NotFound;
