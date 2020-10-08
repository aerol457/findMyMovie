import React, { Component } from "react";

import "./MainMovie.css";

import Button from "../../../Core/Button/Button";

class MainMovie extends Component {
  render() {
    return (
      <div className="main-movie">
        <img
          src="http://www.returndates.com/backgrounds/narcos.logo.png"
          alt="main-movie-image"
        />
        <h2>Seasion 2 now available</h2>
        <h4>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
          id quam sapiente unde voluptatum alias vero debitis, magnam quis quod.
        </h4>
        <Button btnType="outline-red">Watch Now</Button>
        <Button btnType="outline-white">+My list</Button>
      </div>
    );
  }
}

export default MainMovie;
