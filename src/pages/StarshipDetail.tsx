import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStarship } from '../services/apiService';

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  starship_class: string;
}

const StarshipDetail: React.FC = () => {
  const { id } = useParams();
  const [starship, setStarship] = useState<Starship | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStarship = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchStarship(id as string);
        setStarship(data);
      } catch (error) {
        console.error('Error al obtener los datos de la nave:', error);
        setError('No se pudieron cargar los datos de la nave. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadStarship();
  }, [id]);

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!starship) return <div className="text-center">No se encontraron detalles para esta nave.</div>;

  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-4">{starship.name}</h2>
      <p><strong>Modelo:</strong> {starship.model}</p>
      <p><strong>Fabricante:</strong> {starship.manufacturer}</p>
      <p><strong>Costo:</strong> {starship.cost_in_credits} créditos</p>
      <p><strong>Longitud:</strong> {starship.length} metros</p>
      <p><strong>Velocidad Máxima:</strong> {starship.max_atmosphering_speed}</p>
      <p><strong>Tripulación:</strong> {starship.crew}</p>
      <p><strong>Pasajeros:</strong> {starship.passengers}</p>
      <p><strong>Capacidad de Carga:</strong> {starship.cargo_capacity}</p>
      <p><strong>Clase de Nave:</strong> {starship.starship_class}</p>
    </div>
  );
};

export default StarshipDetail;
