import React from "react";

function ForecastWeather(props) {
  return (
    <div className="card">
      <h5>{props.date}</h5>
      <img src={props.icon} alt="weather icon" />
      <h6>{Math.floor(props.temp - 273.15)}</h6>
      <p>{props.description}</p>
    </div>
  );
}

export default ForecastWeather;
