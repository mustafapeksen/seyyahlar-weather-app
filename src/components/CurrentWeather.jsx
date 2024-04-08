import React, { useEffect, useState } from "react";
import axios from "axios";

function CurrentWeather(props) {
  const [weather, setWeather] = useState(null);
  const [iconUrl, setIconUrl] = useState("");

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
          console.log(result);
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

  if (!props.data) {
    return <div>Loading...</div>; // Eğer props.data henüz gelmediyse "Loading..." mesajı göster
  }

  if (weather === null) {
    return <div>Loading...</div>;
  } else {
    const description =
      weather.weather[0].description[0].toUpperCase() +
      weather.weather[0].description.slice(1);

    const feelsLike = Math.floor(weather.main.feels_like - 273.15);
    const humidity = weather.main.humidity;

    const windDegree = weather.wind.deg;
    const windSpeed = Math.floor(weather.wind.speed * 3.6);
    const windDirection = degToCompass(windDegree);
    const dateDataTaken = weather.dt;
    const date = new Date(dateDataTaken * 1000).toUTCString();
    return (
      <div className="box">
        <h2 id="cityName">{weather.name}</h2>
        {iconUrl && <img src={iconUrl} alt="icon" />}
        <p>{description + " Hissedilen " + feelsLike + " °C"}</p>
        <p>Nem:{humidity}</p>
        <p>
          Rüzgar {windDirection} ({windDegree}°)  yönünde {windSpeed} km/h hızla esiyor.
        </p>
        <p>Tarih: {date}</p>
      </div>
    );
  }
}

export default CurrentWeather;
