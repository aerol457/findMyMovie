import React from "react";

import "./ToolBar.css";

import NavigationItems from "../NavigationItems/NavigationItems";
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
        <NavigationItems isAuth={props.isAuth} position='first' />
        <Input inputType='input-red' placeHolder="Search for a title..." />
      </div>

      <div className="second-header-auth">
        <NavigationItems onLogout={props.onLogout} isAuth={props.isAuth} position='second'/>
      </div>
    
    </div>
  );
};

export default toolBar;
