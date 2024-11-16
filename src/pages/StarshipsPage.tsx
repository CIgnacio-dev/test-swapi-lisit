import React, { useState, useEffect } from 'react';
import { fetchStarships } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

interface Starship {
  name: string;
  model: string;
  cargo_capacity: string;
  manufacturer: string;
  url: string;
}

const StarshipsPage: React.FC = () => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStarships = async () => {
      try {
        setLoading(true);
        setError(null);
        const { results } = await fetchStarships(searchTerm);
        setStarships(results);
      } catch (error) {
        console.error('Error al obtener las naves espaciales:', error);
        setError('No se pudieron cargar los datos de las naves espaciales. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadStarships();
  }, [searchTerm]);

  // Función para redirigir a la página de detalles de la nave
  const handleDetailClick = (starshipUrl: string) => {
    const starshipId = starshipUrl.split('/').filter(Boolean).pop();
    navigate(`/starships/${starshipId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Búsqueda de Naves Espaciales</h1>
      <input
        type="text"
        placeholder="Buscar nave..."
        className="border p-2 rounded w-full text-black mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <ul className="space-y-4">
          {starships.map((ship) => (
            <li key={ship.name} className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
              <h3 className="text-2xl font-bold">{ship.name}</h3>
              <p><strong>Modelo:</strong> {ship.model}</p>
              <p><strong>Capacidad de Carga:</strong> {ship.cargo_capacity}</p>
              <p><strong>Fabricante:</strong> {ship.manufacturer}</p>
              <button
                onClick={() => handleDetailClick(ship.url)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                Ver Detalle
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StarshipsPage;
