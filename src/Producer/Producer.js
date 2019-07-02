import React, { Component } from "react";
import Summary from "./components/Summary/Summary";
import ProducerSlideMenu from "../SharedComponents/Navigation/SlideMenu/ProducerSlideMenu";
// import Layout from '../Producer/containers/Layout/Layout';
import './Producer.module.css'

class Producer extends Component {
  render() {
    return (
      <div>
      <div id="producer-art">
        <h2 className="mobile-header-title">Producer Items</h2>
        <ProducerSlideMenu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
        <div className="ui container" id="page-wrap">
          <Summary />
        </div>
      <footer className="copyright">
     © 2019 CultivatR | ALL RIGHTS RESERVED 
      </footer>  
      </div>
      
      </div>
    );
  }
}

export default Producer;
