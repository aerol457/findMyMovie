import React from "react";

import "./NavigationItems.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => {
  return (
    <ul className="navigation-items">
      <NavigationItem link="/">Browse</NavigationItem>
      <NavigationItem link="/">My list</NavigationItem>
      <NavigationItem link="/">Top Picks</NavigationItem>
      <NavigationItem link="/">Recent</NavigationItem>
    </ul>
  );
};

export default navigationItems;
