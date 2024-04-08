import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";

const apiKey = "26ce2cf4d5242da8d86c6d1dda8008d9";

function App() {
  const [cityName, setCityName] = useState("Anamur");
  const [geoData, setGeoData] = useState({});
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

  return (
    <div className="container">
      <Header cityName={cityHandle} />
      <CurrentWeather api={apiKey} data={geoData[0]} />
      <Footer />
    </div>
  );
}

export default App;
