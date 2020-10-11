import React, { Component } from "react";

import ToolBar from "../Core/Navigation/ToolBar/ToolBar";
import SideDrawer from "../Core/Navigation/SideDrawer/SideDrawer";
import MainMovie from "../Pages/Body/MainMovie/MainMovie";

class Home extends Component {

  state = {
    sideDrawerPosition: false
  }

  sideDrawerToggleHandler = () => {
    this.setState( prevState => {return {sideDrawerPosition: !prevState }})
  }

  render() {
    return (
      <div>
        <ToolBar />
        {this.state.sideDrawerPosition ? <SideDrawer clicked= {this.sideDrawerToggleHandler} /> : null}
        <MainMovie />
      </div>
    );
  }
}

export default Home;
