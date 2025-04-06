import axios from 'axios';
import { WeatherData } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const response = await axios.get<WeatherData>(`${API_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'fr'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo:', error);
    throw error;
  }
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await axios.get<WeatherData>(`${API_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'fr'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo:', error);
    throw error;
  }
}
