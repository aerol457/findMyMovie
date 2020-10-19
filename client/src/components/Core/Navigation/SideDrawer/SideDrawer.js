import React from "react";

import "./SideDrawer.css";

import NavigationItems from "../NavigationItems/NavigationItems";
import Input from '../../Input/Input';
import Backdrop from '../../Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachmentClasses = ["side-drawer", "side-drawer-close"];
  if(props.sideDrawerIsOpen){
    attachmentClasses = ["side-drawer", "side-drawer-open"];
  }
  
  return (
    <React.Fragment>
      <Backdrop show={props.sideDrawerIsOpen} clicked={props.clicked}/>

      <div className={attachmentClasses.join(' ')}>

        <div className="logo">
            <a href="/">NETFLIX</a>
        </div>

        <div className="side-drawer-navigation">
          <NavigationItems clicked={props.clicked} isAuth={props.isAuth} position='first'/>
          <NavigationItems onLogout={props.onLogout} clicked={props.clicked} isAuth={props.isAuth} position='second'/>
        </div>

        <Input inputType='input-red' placeHolder="Search for a title..." />

      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
