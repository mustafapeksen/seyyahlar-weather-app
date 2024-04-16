import React from "react";
import SearchIcon from "@mui/icons-material/Search";

/**
 * Header component renders the header section of the weather app.
 * @param {Object} props - Component props.
 * @param {Function} props.cityName - Function to handle city name input.
 * @returns {JSX.Element} Header component.
 */
function Header(props) {
  return (
    <div className="heading">
      <img id="logo" src="/image/SeyyahlarLogo.jpg" alt="logo" />
      <h1 id="title">Seyyahlar Weather App</h1>
      <form id="search" onSubmit={props.cityName}>
        <input type="text" name="city" id="city" placeholder="Şehir" />
        <button id="submit" type="submit" style={{ display: "none" }}></button>
        <label htmlFor="submit" style={{ cursor: "pointer" }}>
          <SearchIcon fontSize="large" />
        </label>
      </form>
    </div>
  );
}

export default Header;
