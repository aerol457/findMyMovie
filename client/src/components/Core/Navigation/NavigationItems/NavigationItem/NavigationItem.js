import React from "react";
import { NavLink } from 'react-router-dom';

import "./NavigationItem.css";

const navbarItem = (props) => {
  return (
    <li className="navigation-item" onClick={props.clicked}>
      <NavLink exact to={props.link} activeClassName="active">
        {props.children}
      </NavLink>
    </li>
  );
};

export default navbarItem;
