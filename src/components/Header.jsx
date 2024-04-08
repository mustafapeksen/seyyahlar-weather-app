import React from "react";

function Header(props) {
  return (
    <div className="heading">
      <img src="/image/SeyyahlarLogo.jpg" alt="logo" />
      <h1 className="title">Seyyahlar Weather App</h1>
      <form onSubmit={props.cityName}>
        <input type="text" name="city" id="city" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Header;
