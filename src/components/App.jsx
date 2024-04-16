import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";

const apiKey = "26ce2cf4d5242da8d86c6d1dda8008d9";

function App() {
  const [cityName, setCityName] = useState("Anamur");
  const [geoData, setGeoData] = useState({});
  const [forecasts, setForecasts] = useState([]);
  const [iconUrls, setIconUrls] = useState([]);

  function cityHandle(event) {
    setCityName(event.target[0].value);
    event.target.city.value = "";
    event.preventDefault();
  }

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

  useEffect(() => {
    if (forecasts) {
      const urls = forecasts.map((forecast) => {
        const iconCode = forecast.weather[0].icon;
        return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      });
      setIconUrls(urls);
    }
  }, [forecasts]);

  function toCapitalize(text) {
    const description = text[0].toUpperCase() + text.slice(1);
    return description;
  }

  return (
    <div className="container">
      <Header cityName={cityHandle} />
      <CurrentWeather api={apiKey} data={geoData[0]} />
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
      <Footer />
    </div>
  );
}

export default App;
