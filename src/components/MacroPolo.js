import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import AppViews from "./AppViews";
import "./MacroPolo.css";

class MacroPolo extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <AppViews />
      </React.Fragment>
    );
  }
}

export default MacroPolo;
