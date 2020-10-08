import React, { Component } from "react";

import FirstHeader from "./Head/FirstHeader/FirstHeader";
import SecondHeader from "./Head/SecondHeader/SecondHeader";
import MainMovie from "./Body/MainMovie/MainMovie";

class Home extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <FirstHeader />
          <SecondHeader />
          <MainMovie />
        </header>
      </div>
    );
  }
}

export default Home;
