import React, { useContext } from 'react';
import { ApiContext } from '../context/OpenWeatherApi';

const WeatherDisplay = () => {
  const { weather, error, loading, unit } = useContext(ApiContext);

  if (loading && !weather) {
    return <div className="mt-10 text-blue-200 animate-pulse text-lg">Fetching weather...</div>;
  }

  if (error || !weather) return null;

  const { name, main, weather: details, wind, sys } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${details[0].icon}@4x.png`;
  
  // Base metric values from the API
  let displayTemp = main.temp;
  let displayFeelsLike = main.feels_like;
  let displayWindSpeed = wind.speed;

  // Math Conversion if unit is Imperial
  if (unit === 'imperial') {
    displayTemp = (displayTemp * 9/5) + 32;
    displayFeelsLike = (displayFeelsLike * 9/5) + 32;
    displayWindSpeed = displayWindSpeed * 2.23694; // convert m/s to mph
  }

  const tempSymbol = unit === 'metric' ? 'C' : 'F';
  const speedSymbol = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className={`w-full max-w-md mx-auto mt-6 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 text-white shadow-2xl">
        
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight">{name}</h2>
          <p className="text-blue-200 font-medium tracking-widest uppercase text-xs mt-1">
            {sys.country}
          </p>
        </div>

        <div className="flex flex-col items-center my-6">
          <img 
            src={iconUrl} 
            alt={details[0].description} 
            className="w-32 h-32 drop-shadow-lg"
          />
          <div className="text-center">
            {/* Using Math.round on the converted values */}
            <h1 className="text-7xl font-light tabular-nums">
              {Math.round(displayTemp)}<span className="text-4xl">°{tempSymbol}</span>
            </h1>
            <p className="text-xl capitalize text-blue-100/80 mt-2 font-medium">
              {details[0].description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center">
            <span className="text-blue-200/60 text-xs uppercase font-bold">Humidity</span>
            <span className="text-2xl font-semibold mt-1">{main.humidity}%</span>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center">
            <span className="text-blue-200/60 text-xs uppercase font-bold">Wind Speed</span>
            {/* toFixed(1) keeps wind speed looking tidy */}
            <span className="text-2xl font-semibold mt-1">{displayWindSpeed.toFixed(1)} <small className="text-sm font-normal">{speedSymbol}</small></span>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center">
            <span className="text-blue-200/60 text-xs uppercase font-bold">Feels Like</span>
            <span className="text-2xl font-semibold mt-1">{Math.round(displayFeelsLike)}°{tempSymbol}</span>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center">
            <span className="text-blue-200/60 text-xs uppercase font-bold">Pressure</span>
            <span className="text-2xl font-semibold mt-1">{main.pressure} <small className="text-sm font-normal">hPa</small></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;