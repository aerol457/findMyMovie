import React from "react";

import "./NavigationItems.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  const headersList = props.listHeaders.map((header, i) => {
    return (
      <NavigationItem key={i} active={header.active} link={header.link}>
        {header.title}
      </NavigationItem>
    );
  });

  return <ul className="navigation-items">{headersList}</ul>;
};

export default navigationItems;
