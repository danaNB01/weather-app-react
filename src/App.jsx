import axios from "axios";
import { useState, useEffect } from "react";

import logo from "./assets/logo.png";

const weather_codes = {
  0: {
    day: {
      description: "Sunny",
      image: "http://openweathermap.org/img/wn/01d@2x.png",
    },
    night: {
      description: "Clear",
      image: "http://openweathermap.org/img/wn/01n@2x.png",
    },
  },
  1: {
    day: {
      description: "Mainly Sunny",
      image: "http://openweathermap.org/img/wn/01d@2x.png",
    },
    night: {
      description: "Mainly Clear",
      image: "http://openweathermap.org/img/wn/01n@2x.png",
    },
  },
  2: {
    day: {
      description: "Partly Cloudy",
      image: "http://openweathermap.org/img/wn/02d@2x.png",
    },
    night: {
      description: "Partly Cloudy",
      image: "http://openweathermap.org/img/wn/02n@2x.png",
    },
  },
  3: {
    day: {
      description: "Cloudy",
      image: "http://openweathermap.org/img/wn/03d@2x.png",
    },
    night: {
      description: "Cloudy",
      image: "http://openweathermap.org/img/wn/03n@2x.png",
    },
  },
  45: {
    day: {
      description: "Foggy",
      image: "http://openweathermap.org/img/wn/50d@2x.png",
    },
    night: {
      description: "Foggy",
      image: "http://openweathermap.org/img/wn/50n@2x.png",
    },
  },
  48: {
    day: {
      description: "Rime Fog",
      image: "http://openweathermap.org/img/wn/50d@2x.png",
    },
    night: {
      description: "Rime Fog",
      image: "http://openweathermap.org/img/wn/50n@2x.png",
    },
  },
  51: {
    day: {
      description: "Light Drizzle",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Light Drizzle",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  53: {
    day: {
      description: "Drizzle",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Drizzle",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  55: {
    day: {
      description: "Heavy Drizzle",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Heavy Drizzle",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  56: {
    day: {
      description: "Light Freezing Drizzle",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Light Freezing Drizzle",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  57: {
    day: {
      description: "Freezing Drizzle",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Freezing Drizzle",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  61: {
    day: {
      description: "Light Rain",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Light Rain",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  63: {
    day: {
      description: "Rain",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Rain",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  65: {
    day: {
      description: "Heavy Rain",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Heavy Rain",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  66: {
    day: {
      description: "Light Freezing Rain",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Light Freezing Rain",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  67: {
    day: {
      description: "Freezing Rain",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Freezing Rain",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  71: {
    day: {
      description: "Light Snow",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Light Snow",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  73: {
    day: {
      description: "Snow",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Snow",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  75: {
    day: {
      description: "Heavy Snow",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Heavy Snow",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  77: {
    day: {
      description: "Snow Grains",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Snow Grains",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  80: {
    day: {
      description: "Light Showers",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Light Showers",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  81: {
    day: {
      description: "Showers",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Showers",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  82: {
    day: {
      description: "Heavy Showers",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Heavy Showers",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  85: {
    day: {
      description: "Light Snow Showers",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Light Snow Showers",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  86: {
    day: {
      description: "Snow Showers",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Snow Showers",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  95: {
    day: {
      description: "Thunderstorm",
      image: "http://openweathermap.org/img/wn/11d@2x.png",
    },
    night: {
      description: "Thunderstorm",
      image: "http://openweathermap.org/img/wn/11n@2x.png",
    },
  },
  96: {
    day: {
      description: "Light Thunderstorms With Hail",
      image: "http://openweathermap.org/img/wn/11d@2x.png",
    },
    night: {
      description: "Light Thunderstorms With Hail",
      image: "http://openweathermap.org/img/wn/11n@2x.png",
    },
  },
  99: {
    day: {
      description: "Thunderstorms With Hail",
      image: "http://openweathermap.org/img/wn/11d@2x.png",
    },
    night: {
      description: "Thunderstorms With Hail",
      image: "http://openweathermap.org/img/wn/11n@2x.png",
    },
  },
};

// --- Child Components ---
function SearchBar({ onSearch, searchTerm, onSearchTermChange }) {
  return (
    <form onSubmit={onSearch} className="flex gap-2">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          name="city"
          placeholder="Search for a place..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="w-full py-3 pl-10 pr-4 bg-slate-800 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Search
      </button>
    </form>
  );
}

function LocationList({ locations, onSelectLocation }) {
  return (
    <div className="bg-slate-800 rounded-lg mt-2 shadow-lg absolute w-full max-w-md z-10">
      <ul>
        {locations.map((item, index) => (
          <li
            key={`${item.id}-${item.latitude}-${item.longitude}`}
            className={`p-4 cursor-pointer hover:bg-slate-700 text-left ${
              index < locations.length - 1 ? "border-b border-slate-700" : ""
            }`}
            onClick={() => onSelectLocation(item)}
          >
            {item.name}, {item.country}
          </li>
        ))}
      </ul>
    </div>
  );
}

function UnitSettings({
  system,
  onSwitchSystem,
  onTemperatureChange,
  onWindChange,
  onPrecipChange,
  temperatureUnit,
  windUnit,
  precipUnit,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isMetric = system === "metric";
  const isImperial = system === "imperial";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors"
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
        Units
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-lg shadow-xl p-4 z-10">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => {
                onSwitchSystem("metric");
                setIsOpen(false);
              }}
              className={`p-2 rounded text-sm transition-colors ${
                isMetric && system !== "custom"
                  ? "bg-sky-600 text-white"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              Metric
            </button>
            <button
              onClick={() => {
                onSwitchSystem("imperial");
                setIsOpen(false);
              }}
              className={`p-2 rounded text-sm transition-colors ${
                isImperial && system !== "custom"
                  ? "bg-sky-600 text-white"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              Imperial
            </button>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase mb-2">
            Temperature
          </p>
          <div className="flex flex-col items-start mb-4 border-b border-slate-700 pb-4">
            <button
              onClick={() => onTemperatureChange("celsius")}
              className="w-full text-left p-2 hover:bg-slate-700 rounded flex justify-between items-center text-sm"
            >
              Celsius (°C){" "}
              {temperatureUnit === "celsius" && (
                <span className="text-sky-400">✔</span>
              )}
            </button>
            <button
              onClick={() => onTemperatureChange("fahrenheit")}
              className="w-full text-left p-2 hover:bg-slate-700 rounded flex justify-between items-center text-sm"
            >
              Fahrenheit (°F){" "}
              {temperatureUnit === "fahrenheit" && (
                <span className="text-sky-400">✔</span>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase mb-2">
            Wind Speed
          </p>
          <div className="flex flex-col items-start mb-4 border-b border-slate-700 pb-4">
            <button
              onClick={() => onWindChange("kmh")}
              className="w-full text-left p-2 hover:bg-slate-700 rounded flex justify-between items-center text-sm"
            >
              km/h{" "}
              {windUnit === "kmh" && <span className="text-sky-400">✔</span>}
            </button>
            <button
              onClick={() => onWindChange("mph")}
              className="w-full text-left p-2 hover:bg-slate-700 rounded flex justify-between items-center text-sm"
            >
              mph{" "}
              {windUnit === "mph" && <span className="text-sky-400">✔</span>}
            </button>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase mb-2">
            Precipitation
          </p>
          <div className="flex flex-col items-start">
            <button
              onClick={() => onPrecipChange("mm")}
              className="w-full text-left p-2 hover:bg-slate-700 rounded flex justify-between items-center text-sm"
            >
              Millimeters (mm){" "}
              {precipUnit === "mm" && <span className="text-sky-400">✔</span>}
            </button>
            <button
              onClick={() => onPrecipChange("inch")}
              className="w-full text-left p-2 hover:bg-slate-700 rounded flex justify-between items-center text-sm"
            >
              Inches (in){" "}
              {precipUnit === "inch" && <span className="text-sky-400">✔</span>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CurrentWeather({ forecast, locationName }) {
  const isDay = forecast?.current?.is_day ? "day" : "night";
  const weatherInfo = weather_codes?.[forecast?.current?.weather_code]?.[isDay];
  return (
    <div className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">{locationName}</h2>
          <p className="text-slate-200">
            {new Date(forecast.current.time).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <img
              src={weatherInfo?.image ?? ""}
              alt={weatherInfo?.description ?? "current weather"}
              className="w-20 h-20 -mt-2 -mr-2"
            />
            <p className="text-7xl font-extrabold">
              {Math.round(forecast.current.temperature_2m)}°
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="bg-black/20 rounded-lg p-4">
          <p className="text-slate-300 text-sm">Feels Like</p>
          <p className="text-xl font-semibold">
            {Math.round(forecast.current.apparent_temperature)}°
          </p>
        </div>
        <div className="bg-black/20 rounded-lg p-4">
          <p className="text-slate-300 text-sm">Humidity</p>
          <p className="text-xl font-semibold">
            {forecast.current.relative_humidity_2m}%
          </p>
        </div>
        <div className="bg-black/20 rounded-lg p-4">
          <p className="text-slate-300 text-sm">Wind</p>
          <p className="text-xl font-semibold">
            {Math.round(forecast.current.wind_speed_10m)}{" "}
            {forecast.current_units.wind_speed_10m}
          </p>
        </div>
        <div className="bg-black/20 rounded-lg p-4">
          <p className="text-slate-300 text-sm">Precipitation</p>
          <p className="text-xl font-semibold">
            {forecast.current.precipitation}{" "}
            {forecast.current_units.precipitation}
          </p>
        </div>
      </div>
    </div>
  );
}

function DailyForecast({ forecast }) {
  return (
    <div className="bg-slate-800/50 rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-4">Daily forecast</h3>
      <div className="grid grid-cols-4 md:grid-cols-7 gap-2 sm:gap-4">
        {forecast.daily.time.map((date, index) => {
          const dailyWeatherCode = forecast.daily.weather_code[index];
          const weatherInfo = weather_codes?.[dailyWeatherCode]?.day;
          return (
            <div
              key={date}
              className="bg-slate-800 rounded-lg p-3 flex flex-col items-center gap-1 text-sm"
            >
              <p className="font-semibold">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <img
                src={weatherInfo?.image ?? ""}
                alt={weatherInfo?.description ?? "weather"}
                className="w-12 h-12"
              />
              <p>
                <span className="font-bold">
                  {Math.round(forecast.daily.temperature_2m_max[index])}°
                </span>
                <span className="text-slate-400 ml-1">
                  {Math.round(forecast.daily.temperature_2m_min[index])}°
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HourlyForecast({
  forecast,
  selectedDay,
  onSelectDay,
  displayableHourlyData,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const todayString = new Date().toLocaleDateString("sv");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toLocaleDateString("sv");
  let buttonLabel = new Date(selectedDay).toLocaleDateString("en-US", {
    weekday: "long",
  });
  if (selectedDay === todayString) {
    buttonLabel = "Today";
  } else if (selectedDay === tomorrowString) {
    buttonLabel = "Tomorrow";
  }

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Hourly forecast</h3>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors"
          >
            {buttonLabel}
            <svg
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-xl z-10">
              {forecast.daily.time.map((date, index) => {
                let label = new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                });
                if (index === 0) label = "Today";
                if (index === 1) label = "Tomorrow";
                return (
                  <button
                    key={date}
                    onClick={() => {
                      onSelectDay(date);
                      setIsOpen(false);
                    }}
                    className="w-full text-left p-2 hover:bg-slate-600 rounded-lg text-sm"
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* FINAL CHANGE: Added fixed height and vertical scrolling to the list */}
      <ul className="space-y-4 h-96 overflow-y-auto">
        {displayableHourlyData.map((item) => {
          const hourlyIsDay = item.isDay ? "day" : "night";
          const weatherInfo = weather_codes?.[item.weatherCode]?.[hourlyIsDay];
          return (
            <li
              key={item.time.toISOString()}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <img
                  src={weatherInfo?.image ?? ""}
                  alt={weatherInfo?.description ?? "weather"}
                  className="w-10 h-10"
                />
                <p className="font-semibold text-sm">
                  {item.time.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                </p>
              </div>
              <p className="text-slate-300 font-semibold text-sm">
                {Math.round(item.temp)}°
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// --- NEW Edge Case Components ---
// --- NEW Edge Case Components ---
function LoadingState() {
  return (
    // We'll use the main tag to keep the grid structure consistent with the final layout.
    <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* This single div will span all columns and contain the centered loading indicator.
          We use flexbox to center its children both horizontally and vertically. */}
      <div className="md:col-span-3 bg-slate-800/50 rounded-2xl p-8 h-96 flex flex-col items-center justify-center">
        {/* Container for the three animated dots */}
        <div className="flex items-center gap-2">
          {/* Each div is a dot. `animate-bounce` creates the up-and-down motion.
              We use inline styles for `animationDelay` to stagger the bounce, creating the "wave" effect. */}
          <div className="h-3 w-3 bg-slate-400 rounded-full animate-bounce"></div>
          <div
            className="h-3 w-3 bg-slate-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="h-3 w-3 bg-slate-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        {/* The "Loading..." text below the dots. */}
        <p className="mt-4 text-slate-400">Loading...</p>
      </div>
    </main>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="text-center py-20">
      <div className="mb-4 text-red-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">
        Something went wrong
      </h2>
      <p className="text-slate-400 mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-5 rounded-lg transition-colors flex items-center gap-2 mx-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h5M20 20v-5h-5"
          />
          <path d="M4 9a9 9 0 0 1 14.24-4.52" />
          <path d="M20 15a9 9 0 0 1-14.24 4.52" />
        </svg>
        Retry
      </button>
    </div>
  );
}

function NoResultsMessage() {
  return (
    <p className="text-center text-slate-400 mt-4">No search result found!</p>
  );
}

// --- Main App Component ---
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [system, setSystem] = useState("metric");
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [windUnit, setWindUnit] = useState("kmh");
  const [precipUnit, setPrecipUnit] = useState("mm");

  // NEW states for loading, error, and no results
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  // Debounced effect for search-as-you-type suggestions
  useEffect(() => {
    setNoResults(false); // Reset no results on new search
    if (searchTerm.length < 3) {
      setCityData(null);
      return;
    }
    const timer = setTimeout(() => {
      setCity(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch city suggestions
  useEffect(() => {
    if (!city) return;
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
    axios
      .get(url)
      .then((response) => {
        if (response.data.results) {
          setCityData(response.data);
          setNoResults(response.data.results.length === 0);
        } else {
          setCityData(null);
          setNoResults(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
        setError("Could not fetch city suggestions. Please try again.");
      });
  }, [city]);

  // Fetch weather data
  useEffect(() => {
    if (!selectedLocation) return;
    setIsLoading(true);
    setError(null);
    let baseUrl = `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.lat}&longitude=${selectedLocation.lon}&current=weather_code,temperature_2m,is_day,apparent_temperature,wind_speed_10m,relative_humidity_2m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code,temperature_2m,is_day&forecast_days=7&timezone=auto`;
    let params = [];
    if (system === "imperial") {
      params.push(
        "temperature_unit=fahrenheit",
        "wind_speed_unit=mph",
        "precipitation_unit=inch"
      );
    } else if (system === "custom") {
      if (temperatureUnit === "fahrenheit")
        params.push("temperature_unit=fahrenheit");
      if (windUnit === "mph") params.push("wind_speed_unit=mph");
      if (precipUnit === "inch") params.push("precipitation_unit=inch");
    }
    const url = baseUrl + (params.length ? "&" + params.join("&") : "");
    axios
      .get(url)
      .then((response) => {
        setForecast(response.data);
        if (response.data?.daily?.time?.length > 0 && !selectedDay) {
          setSelectedDay(response.data.daily.time[0]);
        }
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
        setError(
          "We couldn't connect to the server. Please try again in a few moments."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedLocation, system, temperatureUnit, windUnit, precipUnit]);

  // Handler functions
  function handleSearch(event) {
    event.preventDefault();
    const enteredCity = event.target.city.value.trim();
    if (enteredCity) {
      setSearchTerm(enteredCity);
      setCity(enteredCity);
    }
  }

  const handleSelectLocation = (location) => {
    setCityData(null);
    setSearchTerm("");
    setSelectedLocation({
      name: `${location.name}, ${location.country}`,
      lat: location.latitude,
      lon: location.longitude,
    });
  };

  const retryFetch = () => {
    // Create a copy to trigger the useEffect dependency change
    if (selectedLocation) {
      setSelectedLocation({ ...selectedLocation });
    }
    setError(null);
  };

  function switchSystem(newSystem) {
    setSystem(newSystem);
    if (newSystem === "metric") {
      setTemperatureUnit("celsius");
      setWindUnit("kmh");
      setPrecipUnit("mm");
    } else {
      setTemperatureUnit("fahrenheit");
      setWindUnit("mph");
      setPrecipUnit("inch");
    }
  }
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

  const hourlyDataForSelectedDay = forecast
    ? forecast.hourly.time
        .map((time, index) => ({
          time: new Date(time),
          temp: forecast.hourly.temperature_2m[index],
          weatherCode: forecast.hourly.weather_code[index],
          isDay: forecast.hourly.is_day[index],
        }))
        .filter((item) => item.time.toLocaleDateString("sv") === selectedDay)
    : [];
  let displayableHourlyData = hourlyDataForSelectedDay;
  if (forecast) {
    const todayString = new Date().toLocaleDateString("sv");
    if (selectedDay === todayString) {
      const now = new Date();
      displayableHourlyData = hourlyDataForSelectedDay.filter(
        (item) => item.time >= now
      );
    }
  }

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Weather Now Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-white">Weather Now</h1>
          </div>
          {forecast && !isLoading && !error && (
            <UnitSettings
              system={system}
              onSwitchSystem={switchSystem}
              onTemperatureChange={handleTemperatureChange}
              onWindChange={handleWindChange}
              onPrecipChange={handlePrecipChange}
              temperatureUnit={temperatureUnit}
              windUnit={windUnit}
              precipUnit={precipUnit}
            />
          )}
        </header>

        {/* Conditionally render error state for the whole app if a major fetch fails */}
        {error && selectedLocation && (
          <ErrorState message={error} onRetry={retryFetch} />
        )}

        {!error && (
          <>
            <div className="text-center my-6 md:my-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                How's the sky looking today?
              </h2>
              <div className="relative max-w-md mx-auto">
                <SearchBar
                  onSearch={handleSearch}
                  searchTerm={searchTerm}
                  onSearchTermChange={setSearchTerm}
                />
                {(cityData?.results ?? []).length > 0 && (
                  <LocationList
                    locations={cityData.results}
                    onSelectLocation={handleSelectLocation}
                  />
                )}
                {noResults && <NoResultsMessage />}
              </div>
            </div>

            {/* Main Content: Loading, Initial, or Weather Data */}
            {isLoading && <LoadingState />}
            {!isLoading && !forecast && !selectedLocation && (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-white">
                  Welcome to Weather Now
                </h2>
                <p className="text-slate-400">
                  Search for a city to get started
                </p>
              </div>
            )}
            {forecast && (
              <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 flex flex-col gap-8">
                  <CurrentWeather
                    forecast={forecast}
                    locationName={selectedLocation.name}
                  />
                  <DailyForecast forecast={forecast} />
                </div>
                <div className="md:col-span-1">
                  <HourlyForecast
                    forecast={forecast}
                    selectedDay={selectedDay}
                    onSelectDay={setSelectedDay}
                    displayableHourlyData={displayableHourlyData}
                  />
                </div>
              </main>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
