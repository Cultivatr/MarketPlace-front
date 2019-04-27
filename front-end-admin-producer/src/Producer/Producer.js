import React, { Component, Fragment } from "react";
import Summary from "./components/Summary/Summary";
import Toolbar from "../SharedComponents/Navigation/Toolbar/Toolbar";
// import Layout from '../Producer/containers/Layout/Layout';

class Producer extends Component {
  render() {
    return (
      <Fragment>
        <Toolbar />
        <div className="ui container">
          <Summary />
        </div>
      </Fragment>
    );
  }
}

export default Producer;
