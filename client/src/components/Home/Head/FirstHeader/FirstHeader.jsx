import React from "react";

import "./FirstHeader.css";

import LogoCube from "../../../../assets/icons/HomePage/cube3D.png";
import LogoHeart from "../../../../assets/icons/HomePage/heart.png";
import Button from "../../../Core/Button/Button";

const firstHeader = () => {
  return (
    <div className="first-header">
      <div className="first-header-left">
        <img src={LogoCube} alt="Cube logo" />
        <a>Find My Movie</a>
      </div>

      <div className="first-header-right">
        <img src={LogoHeart} alt="heart logo" />
        <Button btnType="square-green">Sign Up</Button>
        <Button btnType="square-gray">Log In</Button>
      </div>
    </div>
  );
};

export default firstHeader;
