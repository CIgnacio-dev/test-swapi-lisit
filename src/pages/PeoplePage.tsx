import React, { useState, useEffect } from 'react';
import { fetchPeople } from '../services/apiService';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

interface Person {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
  url: string;
}

const PeoplePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState('');
  const [birthYearFilter, setBirthYearFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setLoading(true);
        setError(null);
        const { results } = await fetchPeople(searchTerm);
        setPeople(results);
      } catch (error) {
        console.error('Error al obtener los personajes:', error);
        setError('No se pudieron cargar los datos de los personajes. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, [searchTerm]);

  const handleDetailClick = (personUrl: string) => {
    const personId = personUrl.split('/').filter(Boolean).pop();
    navigate(`/people/${personId}`);
  };

  const filteredPeople = people.filter((person) => {
    const matchesGender = genderFilter === '' || person.gender === genderFilter;
    const matchesBirthYear = birthYearFilter === '' || person.birth_year === birthYearFilter;
    return matchesGender && matchesBirthYear;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Búsqueda de Personajes</h1>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar personaje..."
          className="border p-2 rounded w-full md:w-1/2 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="border p-2 rounded text-black w-full md:w-1/4"
        >
          <option value="">Filtrar por Género</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="n/a">N/A</option>
        </select>
        <input
          type="text"
          placeholder="Filtrar por Año de Nacimiento"
          className="border p-2 rounded text-black w-full md:w-1/4"
          value={birthYearFilter}
          onChange={(e) => setBirthYearFilter(e.target.value)}
        />
      </div>

      {/* Resultados */}
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <ul className="space-y-4">
          {filteredPeople.length > 0 ? (
            filteredPeople.map((person) => (
              <li key={person.name} className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-white">{person.name}</h3>
                <p className="text-gray-300">Género: {person.gender}</p>
                <p className="text-gray-300">Año de Nacimiento: {person.birth_year}</p>
                <p className="text-gray-300">Altura: {person.height} cm</p>
                <p className="text-gray-300">Peso: {person.mass} kg</p>
                <button
                  onClick={() => handleDetailClick(person.url)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                  Ver Detalle
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-400">No se encontraron personajes</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default PeoplePage;
