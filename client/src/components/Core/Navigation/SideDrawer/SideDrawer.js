import React from "react";

import "./SideDrawer.css";

import NavigationItems from "../NavigationItems/NavigationItems";
import * as navigationLists from "../../../utils/Data/navigationItems";
import Input from '../../Input/Input';

const sideDrawer = (props) => {
  return (
    <div className="side-drawer" onClick={props.clicked}>
      <div className="logo">
        <a href="/">NETFLIX</a>
      </div>
      <div className="side-drawer-navigation">
        <NavigationItems listHeaders={navigationLists.FIRST_LIST} />
        <NavigationItems listHeaders={navigationLists.SECOND_LIST} />
      </div>
      <Input inputType='input-search' placeHolder="Search for a title..." />
    </div>
  );
};

export default sideDrawer;
