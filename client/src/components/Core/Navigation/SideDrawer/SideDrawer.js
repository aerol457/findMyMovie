import React from "react";

import "./SideDrawer.css";

import NavigationItems from "../NavigationItems/NavigationItems";
import * as navigationLists from "../../../utils/Data/navigationItems";
import Input from '../../Input/Input';
import Backdrop from '../../Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachmentCLasses = ["side-drawer", "side-drawer-close"];
  if(props.sideDrawerIsOpen){
    attachmentCLasses = ["side-drawer", "side-drawer-open"];
  }
  return (
    <React.Fragment>
    <Backdrop />
    <div className={attachmentCLasses.join(' ')} onClick={props.clicked}>
    <div className="logo">
        <a href="/">NETFLIX</a>
        </div>
      <div className="side-drawer-navigation">
      <NavigationItems listHeaders={navigationLists.FIRST_LIST} />
        <NavigationItems listHeaders={navigationLists.SECOND_LIST} />
        </div>
        <Input inputType='input-search' placeHolder="Search for a title..." />
        </div>
        </React.Fragment>
  );
};

export default sideDrawer;
