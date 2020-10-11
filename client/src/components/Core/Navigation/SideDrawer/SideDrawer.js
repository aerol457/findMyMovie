import React from "react";

import "./SideDrawer.css";

import NavigationItems from "../NavigationItems/NavigationItems";

import * as navigationLists from "../../../utils/Data/navigationItems";

const sideDrawer = () => {
  return (
    <div className="side-drawer">
      <div className="logo">
        <a href="/">NETFLIX</a>
      </div>
      <div className="side-drawer-navigation">
        <NavigationItems listHeaders={navigationLists.FIRST_LIST} />
        <NavigationItems listHeaders={navigationLists.SECOND_LIST} />
      </div>
      <input placeholder="Search for a title..." />
    </div>
  );
};

export default sideDrawer;
