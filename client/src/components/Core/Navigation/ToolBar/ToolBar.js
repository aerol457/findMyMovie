import React from "react";

import "./ToolBar.css";

import NavigationItems from "../NavigationItems/NavigationItems";
import * as navigationLists from "../../../utils/Data/navigationItems";

const toolBar = () => {
  return (
    <div className="second-header">
      <div className="second-header-navigation">
        <div className="logo">
          <a href="/">NETFLIX</a>
        </div>
        <NavigationItems listHeaders={navigationLists.FIRST_LIST} />
        <input placeholder="Search for a title..." />
      </div>

      <div className="second-header-auth">
        <NavigationItems listHeaders={navigationLists.SECOND_LIST} />
      </div>
    </div>
  );
};

export default toolBar;
