import React from "react";

function ForecastWeather(props) {
  return (
    <div className="card">
      <h5 className="time">{props.date}</h5>
      <img className="weather-icon" src={props.icon} alt="weather icon" />
      <h6 className="temperature">{Math.floor(props.temp - 273.15)}°C</h6>
      <p className="description">{props.description}</p>
    </div>
  );
}

export default ForecastWeather;
