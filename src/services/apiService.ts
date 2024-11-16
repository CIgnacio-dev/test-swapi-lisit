import axios from 'axios';

const api = axios.create({
  baseURL: 'https://swapi.dev/api/',
});

// Función genérica para hacer solicitudes a cualquier endpoint
export const fetchData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};

// Función  para buscar personas
export const fetchPeople = async (searchTerm: string, page: number = 1) => {
  try {
    const response = await api.get(`/people/?search=${searchTerm}&page=${page}`);
    return { results: response.data.results, total: response.data.count };
  } catch (error) {
    console.error('Error al obtener los personajes:', error);
    return { results: [], total: 0 };
  }
};

// Función para obtener los datos de un residente
export const fetchResident = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos del residente:', error);
    return null;
  }
};

// Búsqueda de planetas
export const fetchPlanets = async (searchTerm: string, page: number = 1) => {
  try {
    const response = await api.get(`/planets/?search=${searchTerm}&page=${page}`);
    return {
      results: response.data.results,
      total: response.data.count,
    };
  } catch (error) {
    console.error('Error al obtener los planetas:', error);
    return { results: [], total: 0 };
  }
};

// Búsqueda de naves espaciales
export const fetchStarships = async (searchTerm: string, page: number = 1) => {
  try {
    const response = await api.get(`/starships/?search=${searchTerm}&page=${page}`);
    return {
      results: response.data.results,
      total: response.data.count,
    };
  } catch (error) {
    console.error('Error al obtener las naves espaciales:', error);
    return { results: [], total: 0 };
  }
};

//  detalles de una nave específica
export const fetchStarship = async (id: string) => {
  try {
    const response = await api.get(`/starships/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los detalles de la nave:', error);
    throw error;
  }
};
