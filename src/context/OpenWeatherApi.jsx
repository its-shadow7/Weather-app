import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '55316fff43ea13d0e2ef1634551009c4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const ApiContext = createContext();

function OpenWeatherApi({ children }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric'); 
  
  const [recentCities, setRecentCities] = useState(() => {
    const saved = localStorage.getItem('recentCities');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
  }, [recentCities]);

  //fetch Metric data 
  async function getWeatherData(city) {
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric' // default unit is metric
        }
      });

      setWeather(response.data);
      
      setRecentCities(prev => {
        const filtered = prev.filter(c => c.toLowerCase() !== response.data.name.toLowerCase());
        return [response.data.name, ...filtered].slice(0, 5);
      });

    } catch (error) {
      if (error.response?.status === 404) {
        setError("Invalid City Name. Please try again.");
      } else {
        setError("Failed to get weather data.");
      }
    } finally {
      setLoading(false);
    }
  }

  const toggleUnit = () => {
    setUnit(prevUnit => prevUnit === 'metric' ? 'imperial' : 'metric');
  };

  useEffect(() => {
    getWeatherData(recentCities.length != 0?recentCities[0]:"Bangalore"); // default city Banglore
  }, []); 

  return (
    <ApiContext.Provider value={{ 
      weather, error, loading, unit, toggleUnit, getWeatherData, recentCities 
    }}>
      {children}
    </ApiContext.Provider>
  );
}

export default OpenWeatherApi;
