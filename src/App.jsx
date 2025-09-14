import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState(""); // user input city
  const [cityData, setCityData] = useState(null); // fetched city data from geocoding API

  const [selectedLocation, setSelectedLocation] = useState(null); // user selected location from the list.
  const [forecast, setForecast] = useState(null); // fetched weather data for the selected location from open meteo API

  // fetch city data when user inputs a city
  useEffect(() => {
    if (!city) return;
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
    axios
      .get(url)
      .then((response) => {
        setCityData(response);
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
      });
  }, [city]);

  // fetch weather data when user selects a location
  useEffect(() => {
    if (!selectedLocation) return;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.lat}&longitude=${selectedLocation.lon}&current_weather=true`;
    axios
      .get(url)
      .then((response) => setForecast(response.data))
      .catch((err) => console.error("Error fetching weather:", err));
  }, [selectedLocation]);

  // handle form submission
  function handleSearch(event) {
    event.preventDefault();
    const enteredCity = event.target[0].value.trim();
    setCity(enteredCity);
  }

  // filter cities to exlude the matching time zones
  const filteredData = cityData?.data?.results
    ? cityData.data.results.filter((item) =>
        item.name.toLowerCase().includes(city.toLowerCase())
      )
    : [];

  return (
    <>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Enter city name" />
        <button type="submit">Search</button>
      </form>

      {/* show the list of cities */}
      {filteredData.length > 0 && (
        <ul>
          {filteredData.map((item) => (
            <li
              key={`${item.id}-${item.latitude}-${item.longitude}`}
              style={{ cursor: "pointer", margin: "5px 0" }}
              onClick={() =>
                setSelectedLocation({
                  name: `${item.name}, ${item.country}`,
                  lat: item.latitude,
                  lon: item.longitude,
                })
              }
            >
              {item.name}, {item.country}
            </li>
          ))}
        </ul>
      )}

      {/* weather data of the selected city */}
      {forecast && (
        <div>
          <h2>Weather for {selectedLocation.name}</h2>
          <p>Temperature: {forecast.current_weather.temperature}°C</p>
          <p>Wind speed: {forecast.current_weather.windspeed} km/h</p>
        </div>
      )}
    </>
  );
}

export default App;
