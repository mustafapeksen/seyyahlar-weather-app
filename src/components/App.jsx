import React, { useEffect, useState } from "react";
import Header from "./Header"; // Importing the Header component
import Footer from "./Footer"; // Importing the Footer component
import axios from "axios"; // Importing axios for making HTTP requests
import CurrentWeather from "./CurrentWeather"; // Importing the CurrentWeather component
import ForecastWeather from "./ForecastWeather"; // Importing the ForecastWeather component

const apiKey = "/"; // API key for accessing OpenWeatherMap API

function App() {
  const [cityName, setCityName] = useState("Ankara"); // State to store the name of the city
  const [geoData, setGeoData] = useState({}); // State to store the geographical data of the selected city
  const [forecasts, setForecasts] = useState([]); // State to store the weather forecasts
  const [iconUrls, setIconUrls] = useState([]); // State to store the URLs of weather icons

  // Function to handle city input change
  function cityHandle(event) {
    setCityName(event.target[0].value);
    event.target.city.value = "";
    event.preventDefault();
  }

  // Effect to fetch geographical data when city name changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
        );
        const result = response.data;
        setGeoData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [cityName]);

  // Effect to fetch weather forecasts when geographical data changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (geoData.length > 0) {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&lang=tr&appid=${apiKey}`
          );
          const result = response.data;
          setForecasts(result.list);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (geoData.length > 0) {
      fetchData();
    }
  }, [geoData]);

  // Effect to generate URLs for weather icons when forecasts change
  useEffect(() => {
    if (forecasts) {
      const urls = forecasts.map((forecast) => {
        const iconCode = forecast.weather[0].icon;
        return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      });
      setIconUrls(urls);
    }
  }, [forecasts]);

  // Function to capitalize the first letter of a string
  function toCapitalize(text) {
    const description = text[0].toUpperCase() + text.slice(1);
    return description;
  }

  return (
    <div className="container">
      <Header cityName={cityHandle} /> {/* Header component for displaying city input */}
      <CurrentWeather api={apiKey} data={geoData[0]} /> {/* CurrentWeather component */}
      <div className="band">
        <div className="wrapper">
          {forecasts.map((forecast, index) => (
            <ForecastWeather
              key={index}
              description={toCapitalize(forecast.weather[0].description)}
              temp={forecast.main.temp}
              date={forecast.dt_txt}
              icon={iconUrls[index]}
            />
          ))}
          {forecasts.map((forecast, index) => (
            <ForecastWeather
              key={index}
              description={toCapitalize(forecast.weather[0].description)}
              temp={forecast.main.temp}
              date={forecast.dt_txt}
              icon={iconUrls[index]}
            />
          ))}
        </div>
      </div>
      <Footer /> {/* Footer component */}
    </div>
  );
}

export default App;
