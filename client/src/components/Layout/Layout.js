import React, { Component } from "react";

import ToolBar from "../Core/Navigation/ToolBar/ToolBar";
import SideDrawer from "../Core/Navigation/SideDrawer/SideDrawer";
import MainMovie from "../Pages/Body/MainMovie/MainMovie";

class Home extends Component {
  render() {
    return (
      <div>
        <ToolBar />
        <SideDrawer />
        <MainMovie />
      </div>
    );
  }
}

export default Home;
