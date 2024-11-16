import React, { useState, useEffect } from 'react';
import { fetchPlanets, fetchResident } from '../services/apiService';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

interface Planet {
  name: string;
  climate: string;
  population: string;
  terrain: string;
  diameter: string;
  residents: string[];
}

const PlanetsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [climateFilter, setClimateFilter] = useState<string[]>([]);
  const [terrainFilter, setTerrainFilter] = useState<string[]>([]);
  const [residentNames, setResidentNames] = useState<{ [url: string]: string }>({});
  const [uniqueClimates, setUniqueClimates] = useState<string[]>([]);
  const [uniqueTerrains, setUniqueTerrains] = useState<string[]>([]);
  const [openAccordion, setOpenAccordion] = useState<{ [planetName: string]: boolean }>({});
  const navigate = useNavigate();

  // Cargar datos de los planetas y obtener climas y terrenos únicos
  useEffect(() => {
    const loadPlanets = async () => {
      try {
        setLoading(true);
        setError(null);
        const { results } = await fetchPlanets(searchTerm);
        setPlanets(results);

        // Obtener climas y terrenos únicos
        const climates = new Set<string>();
        const terrains = new Set<string>();
        results.forEach((planet: Planet) => {
          planet.climate.split(',').map((c) => climates.add(c.trim()));
          planet.terrain.split(',').map((t) => terrains.add(t.trim()));
        });
        setUniqueClimates(Array.from(climates));
        setUniqueTerrains(Array.from(terrains));
      } catch (error) {
        console.error('Error al obtener los planetas:', error);
        setError('No se pudieron cargar los datos de los planetas. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadPlanets();
  }, [searchTerm]);

  // Cargar nombres de los residentes
  const loadResidentName = async (url: string) => {
    if (!residentNames[url]) {
      const residentData = await fetchResident(url);
      if (residentData) {
        setResidentNames((prev) => ({ ...prev, [url]: residentData.name }));
      }
    }
  };

  const handleResidentClick = (url: string) => {
    const residentId = url.split('/').filter(Boolean).pop();
    navigate(`/people/${residentId}`);
  };

  const handleClimateChange = (climate: string) => {
    setClimateFilter(
      climateFilter.includes(climate) ? climateFilter.filter((c) => c !== climate) : [...climateFilter, climate]
    );
  };

  const handleTerrainChange = (terrain: string) => {
    setTerrainFilter(
      terrainFilter.includes(terrain) ? terrainFilter.filter((t) => t !== terrain) : [...terrainFilter, terrain]
    );
  };

  const toggleAccordion = (planetName: string) => {
    setOpenAccordion((prev) => ({ ...prev, [planetName]: !prev[planetName] }));
  };

  // Filtrar planetas por climas y terrenos seleccionados
  const filteredPlanets = planets.filter((planet) => {
    const planetClimates = planet.climate.split(',').map((c) => c.trim());
    const planetTerrains = planet.terrain.split(',').map((t) => t.trim());

    const matchesClimate = climateFilter.length === 0 || climateFilter.some((c) => planetClimates.includes(c));
    const matchesTerrain = terrainFilter.length === 0 || terrainFilter.some((t) => planetTerrains.includes(t));

    return matchesClimate && matchesTerrain;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Búsqueda de Planetas</h1>
      <input
        type="text"
        placeholder="Buscar planeta..."
        className="border p-2 rounded w-full text-black mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Filtrar por Clima</h2>
        <div className="flex flex-wrap gap-4">
          {uniqueClimates.map((climate) => (
            <label key={climate} className="flex items-center">
              <input
                type="checkbox"
                checked={climateFilter.includes(climate)}
                onChange={() => handleClimateChange(climate)}
                className="mr-2"
              />
              <span className="text-white">{climate}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Filtrar por Terreno</h2>
        <div className="flex flex-wrap gap-4">
          {uniqueTerrains.map((terrain) => (
            <label key={terrain} className="flex items-center">
              <input
                type="checkbox"
                checked={terrainFilter.includes(terrain)}
                onChange={() => handleTerrainChange(terrain)}
                className="mr-2"
              />
              <span className="text-white">{terrain}</span>
            </label>
          ))}
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <ul className="space-y-4">
          {filteredPlanets.length > 0 ? (
            filteredPlanets.map((planet) => (
              <li key={planet.name} className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-white">{planet.name}</h3>
                <p className="text-gray-300">Clima: {planet.climate}</p>
                <p className="text-gray-300">Terreno: {planet.terrain}</p>
                <button
                  onClick={() => toggleAccordion(planet.name)}
                  className="mt-2 text-blue-400 flex items-center hover:underline"
                >
                  {openAccordion[planet.name] ? 'Ocultar Residentes' : 'Mostrar Residentes'}
                  <span
                    className={`ml-2 transform transition-transform duration-300 ${
                      openAccordion[planet.name] ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openAccordion[planet.name] ? 'max-h-screen' : 'max-h-0'
                  }`}
                >
                  <ul className="ml-4 mt-2 space-y-1">
                    {planet.residents.length > 0 ? (
                      planet.residents.map((residentUrl) => {
                        loadResidentName(residentUrl);
                        return (
                          <li
                            key={residentUrl}
                            className="text-blue-400 cursor-pointer hover:underline"
                            onClick={() => handleResidentClick(residentUrl)}
                          >
                            {residentNames[residentUrl] || 'Cargando...'}
                          </li>
                        );
                      })
                    ) : (
                      <p className="text-gray-400">No hay residentes conocidos</p>
                    )}
                  </ul>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-400">No se encontraron resultados</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default PlanetsPage;
