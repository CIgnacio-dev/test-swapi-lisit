import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Título de la Aplicación */}
        <Link to="/" className="text-2xl font-bold hover:text-blue-400">
      Star Wars App
    </Link>
        {/* Botón de Menú Hamburguesa para Móviles */}
        <button
          className="text-white text-3xl md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? '✖' : '☰'}
        </button>
        {/* Menú de Navegación para Escritorio */}
        <ul className="hidden md:flex space-x-10">
          <li>
            <NavLink
              to="/people"
              className={({ isActive }) =>
                isActive ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-400'
              }
            >
              Personajes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/starships"
              className={({ isActive }) =>
                isActive ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-400'
              }
            >
              Naves Espaciales
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/planets"
              className={({ isActive }) =>
                isActive ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-400'
              }
            >
              Planetas
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Menú Desplegable para Móviles */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 p-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <NavLink
                to="/people"
                className="text-white hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                Personajes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/starships"
                className="text-white hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                Naves Espaciales
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/planets"
                className="text-white hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                Planetas
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
