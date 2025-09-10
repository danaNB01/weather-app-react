import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=24.6877&longitude=46.7219&daily=sunrise,sunset&current=temperature_2m,rain,is_day&timezone=GMT";
  useEffect(() => {
    function fetchData() {
      axios
        .get(url)
        .then((response) => {
          setWeatherData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }

    const interval = setInterval(fetchData, 10000); // Fetch data every 10 seconds
    fetchData(); // Initial fetch

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      {weatherData ? (
        <div className="App">
          <h1>Current Temperature: {weatherData.current.temperature_2m}°C</h1>
          <h2>Is it day? {weatherData.current.is_day ? "Yes ☀️" : "No 🌙"}</h2>
          <h3>Rain: {weatherData.current.rain} mm</h3>
          <h3>Sunrise: {weatherData.daily.sunrise[0].split("T")[1]}</h3>
          <h3>Sunset: {weatherData.daily.sunset[0].split("T")[1]}</h3>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  );
}

export default App;
