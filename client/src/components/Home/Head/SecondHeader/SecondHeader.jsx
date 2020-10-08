import React from "react";

import "./SecondHeader.css";

import NavigationItems from "../../../Core/NavigationItems/NavigationItems";

const secondHeader = () => {
  return (
    <div className="second-header">
      <div className="logo">NETFLIX</div>
      <div>
        <NavigationItems />
      </div>
      <div>
        <input placeholder="Search for a title..." />
      </div>
    </div>
  );
};

export default secondHeader;
