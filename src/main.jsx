import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import OpenWeatherApi from './context/OpenWeatherApi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OpenWeatherApi>
      <App />
    </OpenWeatherApi>
  </StrictMode>,
)
