import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import weather_codes from "./weather_codes.json";

function App() {
  const [city, setCity] = useState(""); // user input city
  const [cityData, setCityData] = useState(null); // fetched city data from geocoding API

  const [selectedLocation, setSelectedLocation] = useState(null); // user selected location from the list.
  const [forecast, setForecast] = useState(null); // fetched weather data for the selected location from open meteo API

  // NEW STATE: To track which day's hourly forecast to show.
  // It will store a date string like "2025-10-01".

  // format is "YYYY-MM-DD"
  const [selectedDay, setSelectedDay] = useState("");

  /* 
  metric ->
  temperature in Celsius
  wind speed in km/h
  precipitation in mm

  imperial ->
  temperature in Fahrenheit
  wind speed in mph
  precipitation in inches
  */
  const [system, setSystem] = useState("metric"); // "metric" | "imperial" | "custom"

  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [windUnit, setWindUnit] = useState("kmh");
  const [precipUnit, setPrecipUnit] = useState("mm");
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

    let baseUrl = `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.lat}&longitude=${selectedLocation.lon}&current=weather_code,temperature_2m,is_day,apparent_temperature,wind_speed_10m,relative_humidity_2m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code,is_day,temperature_2m&forecast_days=7&timezone=auto`;

    let params = [];

    if (system === "imperial") {
      // full imperial mode
      params.push("temperature_unit=fahrenheit");
      params.push("wind_speed_unit=mph");
      params.push("precipitation_unit=inch");
    } else if (system === "custom") {
      // only add overrides that are not metric defaults
      if (temperatureUnit === "fahrenheit")
        params.push("temperature_unit=fahrenheit");
      if (windUnit === "mph") params.push("wind_speed_unit=mph");
      if (precipUnit === "inch") params.push("precipitation_unit=inch");
    }

    // if parameters exist (imperial or custom), append them to the base URL, otherwise use the base URL as is (metric).
    const url = baseUrl + (params.length ? "&" + params.join("&") : "");
    axios
      .get(url)
      .then((response) => {
        setForecast(response.data);
        console.log("Fetched weather data:", response.data);
        // Set the selected day to the first day 'today.'
        if (response.data?.daily?.time?.length > 0) {
          setSelectedDay(response.data.daily.time[0]);
        }
      })
      .catch((err) => console.error("Error fetching weather:", err));
  }, [selectedLocation, system, temperatureUnit, windUnit, precipUnit]);

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

  // --------
  // State handlers for unit system changes
  // --------

  // handle quick switch between metric and imperial
  function switchSystem(newSystem) {
    if (newSystem === "metric") {
      setSystem("metric");
      setTemperatureUnit("celsius");
      setWindUnit("kmh");
      setPrecipUnit("mm");
    } else if (newSystem === "imperial") {
      setSystem("imperial");
      setTemperatureUnit("fahrenheit");
      setWindUnit("mph");
      setPrecipUnit("inch");
    }
  }
  // handle changes in custom units
  function handleTemperatureChange(unit) {
    setSystem("custom");
    setTemperatureUnit(unit);
  }

  function handleWindChange(unit) {
    setSystem("custom");
    setWindUnit(unit);
  }

  function handlePrecipChange(unit) {
    setSystem("custom");
    setPrecipUnit(unit);
  }

  // hourly data = get the hourly data for the selected day
  const hourlyDataForSelectedDay = forecast
    ? // Merge the 2 arrays 'time' and 'temperature_2m' into an array of objects
      // UPDATED: Merging all required hourly data, including weather_code and is_day.
      forecast.hourly.time
        .map((time, index) => ({
          time: new Date(time),
          temp: forecast.hourly.temperature_2m[index],
          weatherCode: forecast.hourly.weather_code[index],
          isDay: forecast.hourly.is_day[index],
        }))
        .filter((item) => {
          // Use the 'sv' (Swedish) locale settings to reliably get the
          // YYYY-MM-DD format based on the item's LOCAL time zone.
          const itemLocalDay = item.time.toLocaleDateString("sv", {
            year: "numeric",
            month: "2-digit", // Use '2-digit' for reliable formatting
            day: "2-digit",
          }); // Result: "2025-10-03"

          // selectedDay is also YYYY-MM-DD (e.g., "2025-10-03")
          return itemLocalDay === selectedDay;
        })
    : [];

  //--------
  // TODO: HERE

  // Conditionally filter the hours to display
  let displayableHourlyData = hourlyDataForSelectedDay;
  if (forecast) {
    // Get today's date in YYYY-MM-DD format
    const todayString = new Date().toISOString().split("T")[0];

    // If the selected day is today...
    if (selectedDay === todayString) {
      const now = new Date();
      // filter out past hours
      displayableHourlyData = hourlyDataForSelectedDay.filter(
        (item) => item.time >= now
      );
    } else {
      // For future days, show all 24 hours (no filtering needed)
      displayableHourlyData = hourlyDataForSelectedDay;
    }
  }
  // Logic for the CURRENT weather icon
  const isDay = forecast?.current?.is_day ? "day" : "night";
  const currentWeatherIcon =
    weather_codes?.[forecast?.current?.weather_code]?.[isDay];
  //--------
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
          {/* Units Switch */}
          <div>
            <h4>Quick Switch</h4>
            <button onClick={() => switchSystem("metric")}>Metric</button>
            <button onClick={() => switchSystem("imperial")}>Imperial</button>

            <h4>Custom Units</h4>
            <label>Temperature:</label>
            <select
              value={temperatureUnit}
              onChange={(e) => handleTemperatureChange(e.target.value)}
            >
              <option value="celsius">Celsius (°C)</option>
              <option value="fahrenheit">Fahrenheit (°F)</option>
            </select>

            <label>Wind:</label>
            <select
              value={windUnit}
              onChange={(e) => handleWindChange(e.target.value)}
            >
              <option value="kmh">km/h</option>
              <option value="mph">mph</option>
            </select>

            <label>Precipitation:</label>
            <select
              value={precipUnit}
              onChange={(e) => handlePrecipChange(e.target.value)}
            >
              <option value="mm">Millimeters</option>
              <option value="inch">Inches</option>
            </select>
          </div>

          <h2>
            Weather for {selectedLocation.name}
            {/* UPDATED: Current Weather Icon - dynamic day/night */}
            <img
              src={currentWeatherIcon?.image ?? ""}
              alt={currentWeatherIcon?.description ?? "current weather"}
              style={{
                verticalAlign: "middle",
                margin: "0 10px",
                height: "50px",
              }}
            />
            {new Date(forecast.current.time.split("T")[0]).toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </h2>
          <p>
            Temperature: {forecast.current.temperature_2m}
            {forecast.current_units.temperature_2m}
          </p>
          <p>
            Feels like: {forecast.current.apparent_temperature}
            {forecast.current_units.temperature_2m}
          </p>
          <p>Humidity: {forecast.current.relative_humidity_2m} %</p>
          <p>
            Wind speed: {forecast.current.wind_speed_10m}{" "}
            {forecast.current_units.wind_speed_10m}
          </p>
          <p>
            precipitation: {forecast.current.precipitation}{" "}
            {forecast.current_units.precipitation}
          </p>

          <h3>7-day Forecast</h3>
          <ul>
            {forecast.daily.time.map((date, index) => {
              // UPDATED: Daily Forecast Icon Logic
              const dailyWeatherCode = forecast.daily.weather_code[index];
              // ALWAYS use the .day icon for a daily summary.
              const dailyWeatherIcone = weather_codes?.[dailyWeatherCode]?.day;

              return (
                <li key={date}>
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                  <img
                    src={dailyWeatherIcone?.image ?? ""}
                    alt={dailyWeatherIcone?.description ?? "weather"}
                    style={{
                      verticalAlign: "middle",
                      margin: "0 5px",
                      height: "40px",
                    }}
                  />
                  : Min {forecast.daily.temperature_2m_min[index]}
                  {forecast.current_units.temperature_2m}, Max{" "}
                  {forecast.daily.temperature_2m_max[index]}
                  {forecast.current_units.temperature_2m}
                </li>
              );
            })}
          </ul>
          <h3>Hourly Forecast</h3>
          <label htmlFor="day-select">Select a day: </label>
          <select
            id="day-select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {forecast.daily.time.map((date, index) => {
              let label = "";
              if (index === 0) label = "Today";
              else if (index === 1) label = "Tomorrow";
              else
                label = new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                });
              return (
                <option key={date} value={date}>
                  {label}
                </option>
              );
            })}
          </select>

          <ul>
            {displayableHourlyData.map((item) => {
              const hourlyIsDay = item.isDay ? "day" : "night";
              const hourlyWeatherIcon =
                weather_codes?.[item.weatherCode]?.[hourlyIsDay];

              return (
                <li key={item.time.toISOString()}>
                  {item.time.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                  <img
                    src={hourlyWeatherIcon?.image ?? ""}
                    alt={hourlyWeatherIcon?.description ?? "weather"}
                    style={{
                      verticalAlign: "middle",
                      margin: "0 5px",
                      height: "40px",
                    }}
                  />
                  : {item.temp}
                  {forecast.current_units.temperature_2m}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
