import React, { Component } from "react";

import ToolBar from "../Core/Navigation/ToolBar/ToolBar";
import SideDrawer from "../Core/Navigation/SideDrawer/SideDrawer";
import MainMovie from "../Pages/Body/MainMovie/MainMovie";

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
        {this.state.sideDrawerPosition ? <SideDrawer sideDrawerIsOpen={this.state.sideDrawerPosition} clicked={this.sideDrawerToggleHandler} /> : null}
        <MainMovie />
      </div>
    );
  }
}

export default Home;
