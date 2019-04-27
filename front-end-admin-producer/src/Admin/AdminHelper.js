import React, { Component } from "react";
import Class from "./admin.module.css";
import ContainerDashboard from "./Components/ContainerDashboard/ContainerDashboard";

export default class AdminHelper extends Component {
  render() {
    return (
      <div className={Class.container2}>
        <div className={Class.containerTitle}>
          <h4>{this.props.title}</h4>
        </div>
        <ContainerDashboard
          data={this.props.data}
          itemObj={this.props.getItemObj}
        />
      </div>
    );
  }
}
