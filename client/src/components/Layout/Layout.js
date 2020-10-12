import React, { Component } from "react";

import './Layout.css';

import ToolBar from "../Core/Navigation/ToolBar/ToolBar";
import SideDrawer from "../Core/Navigation/SideDrawer/SideDrawer";

class Home extends Component {

  state = {
    sideDrawerPosition: false
  }

  sideDrawerToggleHandler = () => {
    this.setState( prevState => {return {sideDrawerPosition: !prevState.sideDrawerPosition }})
  }

  render() {
    return (
      <div>
        <ToolBar toggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer sideDrawerIsOpen={this.state.sideDrawerPosition} clicked={this.sideDrawerToggleHandler} />
        <main className='content'>{this.props.children}</main>
      </div>
    );
  }
}

export default Home;
