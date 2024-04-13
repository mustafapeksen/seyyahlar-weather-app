import React from "react";
import SearchIcon from '@mui/icons-material/Search';

function Header(props) {
  return (
    <div className="heading">
      <img id="logo" src="/image/SeyyahlarLogo.jpg" alt="logo" />
      <h1 id="title">Seyyahlar Weather App</h1>
      <form id="search" onSubmit={props.cityName}>
        <input type="text" name="city" id="city" />
         {/* Görünmez buton */}
         <button id="submit" type="submit" style={{ display: "none" }}></button>
        {/* Arama simgesi */}
        <label htmlFor="submit" style={{ cursor: "pointer" }}>
          <SearchIcon fontSize="large" />
        </label>
      </form>
    </div>
  );
}

export default Header;
