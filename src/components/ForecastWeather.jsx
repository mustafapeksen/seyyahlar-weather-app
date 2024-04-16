import React from "react";

/**
 * ForecastWeather component renders forecasted weather information.
 * @param {Object} props - Component props.
 * @param {string} props.date - Date of the forecast.
 * @param {string} props.icon - URL of the weather icon.
 * @param {number} props.temp - Temperature of the forecast.
 * @param {string} props.description - Description of the forecasted weather.
 * @returns {JSX.Element} ForecastWeather component.
 */
function ForecastWeather(props) {
  return (
    <div className="card">
      {/* Display the date of the forecast */}
      <h5 className="time">{props.date}</h5>
      {/* Display the weather icon */}
      <img className="weather-icon" src={props.icon} alt="weather icon" />
      {/* Display the temperature of the forecast */}
      <h6 className="temperature">{Math.floor(props.temp - 273.15)}°C</h6>
      {/* Display the description of the forecasted weather */}
      <p className="description">{props.description}</p>
    </div>
  );
}

export default ForecastWeather;
