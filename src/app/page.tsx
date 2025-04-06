'use client';
import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import { getWeatherByCity, getWeatherByCoords } from '@/services/weatherService';
import { WeatherData } from '@/types/weather';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer la météo basée sur la géolocalisation au chargement
  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await getWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeatherData(data);
            setError(null);
          } catch (err) {
            setError("Impossible de récupérer la météo pour votre position");
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.error(err);
          setLoading(false);
          setError("Géolocalisation non disponible. Veuillez rechercher une ville.");
        }
      );
    }
  }, []);

  const handleSearch = async (city: string) => {
    setLoading(true);
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError("Ville non trouvée. Vérifiez l'orthographe et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-6">Météo en Temps Réel</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-12">Chargement...</div>
      ) : (
        weatherData && <CurrentWeather data={weatherData} />
      )}
    </main>
  );
}
