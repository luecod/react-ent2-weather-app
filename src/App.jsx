import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()

  useEffect(() => {
    //Se ejecuta cuando llega la informacion de la ubicacion
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj)
    }
    //Llama la api del navigados para usar la ubicacion actual
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  console.log(coords)

  //------------- Peticion del clima -----------
  useEffect(() => {
    if (coords) {
      const APIKEY = 'd1ee6b3670bfa63ce17cf453ffe4a5a1'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      axios.get(URL)
        .then(res => {
          const celcius = (res.data.main.temp - 273.15).toFixed(0)
          const farenheit = ((celcius * 9 / 5) + 32).toFixed(0)
          setTemperature({ celcius, farenheit })
          setWeather(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [coords])




  return (
    <div className="App">
      {
        weather ?
          <WeatherCard weather={weather} temperature={temperature} />
          :
          <Loading />
      }


    </div>
  )
}

export default App
