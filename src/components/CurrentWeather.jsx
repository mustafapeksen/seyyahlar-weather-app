import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * CurrentWeather component displays the current weather information.
 * @param {Object} props - Component props.
 * @param {Object} props.data - Weather data for the current location.
 * @param {string} props.api - API key for fetching weather data.
 * @returns {JSX.Element} CurrentWeather component.
 */
function CurrentWeather(props) {
  const [weather, setWeather] = useState(null);
  const [iconUrl, setIconUrl] = useState("");

  /**
   * Converts wind degree to compass direction.
   * @param {number} num - Wind degree.
   * @returns {string} Compass direction.
   */
  function degToCompass(num) {
    // Ensure the degree value is within the range [0, 360)
    num = (num + 360) % 360;

    // Define the compass directions and their degree ranges
    const directionsForTurkish = [
      "Kuzey",
      "Kuzey Kuzey Doğu",
      "Kuzey Doğu",
      "Doğu Kuzey Doğu",
      "Doğu",
      "Doğu Güney Doğu",
      "Güney Doğu",
      "Güney Güney Doğu",
      "Güney",
      "Güney Güney Batı",
      "Güney Batı",
      "Batı Güney Batı",
      "Batı",
      "Batı Kuzey Batı",
      "Kuzey Batı",
      "Kuzey Kuzey Batı",
    ];
    const degreeStep = 22.5;

    // Calculate the index of the direction array based on the degree value
    const index = Math.floor(num / degreeStep + 0.5) % 16;

    // Return the corresponding compass direction
    return directionsForTurkish[index];
  }

  useEffect(() => {
    if (props.data) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${props.data.lat}&lon=${props.data.lon}&appid=${props.api}&lang=tr`
          );
          const result = response.data;
          setWeather(result);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [props.data, props.api]);

  useEffect(() => {
    if (weather) {
      const iconCode = weather.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      setIconUrl(iconUrl);
    }
  }, [weather]);

  if (!props.data || weather === null) {
    return <div>Loading...</div>; // Display "Loading..." message if data is not yet available
  } else {
    // Capitalize the first letter of the weather description
    const description =
      weather.weather[0].description[0].toUpperCase() +
      weather.weather[0].description.slice(1);

    // Calculate temperature, feels like temperature, humidity, wind speed, and wind direction
    const feelsLike = Math.floor(weather.main.feels_like - 273.15);
    const temp = Math.floor(weather.main.temp - 273.15);
    const humidity = weather.main.humidity;
    const windDegree = weather.wind.deg;
    const windSpeed = Math.floor(weather.wind.speed * 3.6);
    const windDirection = degToCompass(windDegree);

    // Convert UNIX timestamp to human-readable date
    const dateDataTaken = weather.dt;
    const date = new Date(dateDataTaken * 1000).toUTCString();

    return (
      <div
        className="box"
        style={{
          backgroundImage: `url(${iconUrl})`,
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="content">
          <h2 id="cityName">{weather.name}</h2>
          {iconUrl && <img id="weather-img" src={iconUrl} alt="icon" />}
          <h3 id="temp">{temp}°C</h3>
          <p id="desc">{description}</p>
          <p id="feels-like"> Hissedilen {feelsLike}°C</p>
          <p id="humidity">Nem: {humidity}%</p>
          <p id="wind">
            Rüzgar {windDirection} ({windDegree}°) yönünde {windSpeed} km/h
            hızla esiyor.
          </p>
          <p id="date">Tarih: {date}</p>
        </div>
      </div>
    );
  }
}

export default CurrentWeather;
