import React from "react";

import "./NavigationItem.css";

const navbarItem = (props) => {
  return (
    <li className="navigation-item">
      <a href={props.link}>{props.children}</a>
    </li>
  );
};

export default navbarItem;
