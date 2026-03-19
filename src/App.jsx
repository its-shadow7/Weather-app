import './App.css'
import { useContext } from 'react'
import { ApiContext } from './context/OpenWeatherApi'
import SearchComponent from './components/Search'
import WeatherDisplay from './components/WeatherDisplay'

function App() {
  const { unit, toggleUnit } = useContext(ApiContext);

  return (
    <div className="min-h-screen bg-blue-900 flex flex-col items-center p-6 relative">
      
      {/* Unit Toggle Button */}
      <button 
        onClick={toggleUnit}
        className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg active:scale-95"
      >
        Switch to {unit === 'metric' ? '°F' : '°C'}
      </button>

      <h1 className="text-3xl text-white font-bold mb-8 mt-4 tracking-wide">Weather Explorer</h1>
      
      <SearchComponent />
      <WeatherDisplay />
    </div>
  )
}

export default App