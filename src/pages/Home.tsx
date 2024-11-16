import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Imagen de Fondo */}
      <img
        src="https://starwars-visualguide.com/assets/img/categories/starships.jpg"
        alt="Star Wars Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Contenido Principal */}
      <div className="relative z-10 p-6 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg max-w-lg mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Star Wars App</h1>
        <p className="text-lg mb-6">
          Bienvenido a la prueba técnica para <strong>Lisit</strong>. Explora personajes, naves espaciales y planetas del universo de Star Wars.
        </p>
        <div className="flex gap-4">
          <Link
            to="/people"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Personajes
          </Link>
          <Link
            to="/starships"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Naves Espaciales
          </Link>
          <Link
            to="/planets"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Planetas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
