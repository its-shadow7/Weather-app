import React, { useState, useContext } from 'react';
import { ApiContext } from '../context/OpenWeatherApi';

const SearchComponent = () => {
  // Controlled Input
  const [cityInput, setCityInput] = useState('');
  const { getWeatherData, error, loading, recentCities } = useContext(ApiContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return;

    await getWeatherData(cityInput);
    setCityInput(''); // Clears input after the call
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <form 
        onSubmit={handleSearch} 
        className="relative flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-blue-400"
      >
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter city (e.g. Tokyo, London)..."
          className="w-full bg-transparent px-6 py-4 text-white placeholder-blue-100/50 outline-none text-lg"
        />
        
        <button
          type="submit"
          disabled={loading}
          className="mr-2 bg-blue-500 hover:bg-blue-600 active:scale-95 disabled:opacity-50 text-white px-6 py-2 rounded-xl font-semibold transition-all shadow-lg flex justify-center items-center min-w-[100px]"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            'Search'
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-4 flex justify-center">
          <span className="bg-red-500/20 backdrop-blur-md border border-red-500/50 text-red-200 text-sm py-1 px-4 rounded-full animate-pulse">
            ⚠️ {error}
          </span>
        </div>
      )}

      {/* Recent Searches Bonus Feature */}
      {recentCities.length > 0 && (
        <div className="mt-6 animate-fade-in">
          <p className="text-blue-200/80 text-xs font-semibold mb-3 text-center uppercase tracking-widest">Recent Searches</p>
          <div className="flex flex-wrap justify-center gap-2">
            {recentCities.map((city, idx) => (
              <button
                key={idx}
                onClick={() => getWeatherData(city)}
                className="bg-white/5 hover:bg-white/20 border border-white/10 text-blue-100 px-4 py-1.5 rounded-full text-sm transition-all active:scale-95"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;