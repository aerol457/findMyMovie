import React from "react";

import "./ToolBar.css";

import NavigationItems from "../NavigationItems/NavigationItems";
import * as navigationLists from "../../../utils/Data/navigationItems";
import Input from '../../Input/Input';
import ToggleBurger from '../../ToggleBurger/ToggleBurger';

const toolBar = (props) => {
  return (
    <div className="second-header">
      <ToggleBurger clicked={props.toggleClicked} />
      <div className="second-header-navigation">
        <div className="logo">
          <a href="/">NETFLIX</a>
        </div>
        <NavigationItems listHeaders={navigationLists.FIRST_LIST} />
        <Input inputType='input-search' placeHolder="Search for a title..." />
      </div>

      <div className="second-header-auth">
        <NavigationItems listHeaders={navigationLists.SECOND_LIST} />
      </div>
    </div>
  );
};

export default toolBar;
