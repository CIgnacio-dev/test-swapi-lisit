import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../services/apiService';
import Spinner from '../components/Spinner';

interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

const PeopleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPerson = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchData(`people/${id}/`);
        setPerson(data);
      } catch (error) {
        console.error('Error al obtener los datos de la persona:', error);
        setError('Hubo un problema al cargar los datos. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadPerson();
  }, [id]);

  // Mostrar el spinner mientras se cargan los datos
  if (loading) return <Spinner />;

  // Mostrar mensaje de error si ocurre un problema
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Mostrar los detalles de la persona si los datos están disponibles
  if (!person) return <div>No se encontró la información de la persona.</div>;

  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-lg text-white">
      <h2 className="text-3xl font-bold mb-4">{person.name}</h2>
      <p><strong>Altura:</strong> {person.height} cm</p>
      <p><strong>Peso:</strong> {person.mass} kg</p>
      <p><strong>Color de Cabello:</strong> {person.hair_color}</p>
      <p><strong>Color de Piel:</strong> {person.skin_color}</p>
      <p><strong>Color de Ojos:</strong> {person.eye_color}</p>
      <p><strong>Año de Nacimiento:</strong> {person.birth_year}</p>
      <p><strong>Género:</strong> {person.gender}</p>
    </div>
  );
};

export default PeopleDetail;
