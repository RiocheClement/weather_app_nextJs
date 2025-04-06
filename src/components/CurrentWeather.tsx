'use client';
import { WeatherData } from '@/types/weather';
import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';
import Image from 'next/image';

interface CurrentWeatherProps {
  data: WeatherData;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{data.name}, {data.sys.country}</h2>
            <p className="text-sm">{new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long'
            })}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center">
              <Image 
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
                alt={data.weather[0].description} 
                width={80} 
                height={80}
              />
              <span className="text-4xl font-bold">{Math.round(data.main.temp)}°C</span>
            </div>
            <p className="capitalize">{data.weather[0].description}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <WiThermometer className="text-3xl text-orange-500" />
            <span className="text-sm">Ressenti</span>
            <span className="font-bold">{Math.round(data.main.feels_like)}°C</span>
          </div>
          <div className="flex flex-col items-center">
            <WiHumidity className="text-3xl text-blue-500" />
            <span className="text-sm">Humidité</span>
            <span className="font-bold">{data.main.humidity}%</span>
          </div>
          <div className="flex flex-col items-center">
            <WiStrongWind className="text-3xl text-gray-500" />
            <span className="text-sm">Vent</span>
            <span className="font-bold">{Math.round(data.wind.speed * 3.6)} km/h</span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Lever du soleil</p>
            <p className="font-semibold">{formatDate(data.sys.sunrise)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Coucher du soleil</p>
            <p className="font-semibold">{formatDate(data.sys.sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
