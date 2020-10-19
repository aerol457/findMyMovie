import React from "react";

import "./NavigationItems.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  let headersList;
  if(props.position === 'first'){
    if(!props.isAuth){
      headersList = (
        <React.Fragment>
          <NavigationItem clicked={props.clicked} title='Home' active link='/'/>
          <NavigationItem clicked={props.clicked} title='Top Picks'  link='/top-picks'/>
        </React.Fragment>)
    }else{
      headersList = (
        <React.Fragment>
          <NavigationItem clicked={props.clicked} title='Home'  link='/'/>
          <NavigationItem clicked={props.clicked} title='Top Picks'  link='/top-picks'/>
          <NavigationItem clicked={props.clicked} title='My List'  link='/my-list'/>
          <NavigationItem clicked={props.clicked} title='Recent'  link='/recent'/>
          </React.Fragment>
          );
    }
  }else{
    if(!props.isAuth){
      headersList = (
        <React.Fragment>
          <NavigationItem clicked={props.clicked} title='Sign Up' active link='/sign-up'/>
          <NavigationItem clicked={props.clicked} title='Login' link='/login'/>
        </React.Fragment>)
    }else{
      headersList = (
        <React.Fragment>
          <NavigationItem clicked={props.onLogout} title='Logout'  link='/login'/>
          </React.Fragment>
          );
    }
  }

  return <ul className="navigation-items">{headersList}</ul>;
};

export default navigationItems;
