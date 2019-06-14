import React, { Component, Fragment } from "react";
import "./AdminSettings.css";
import { refreshLivestockItems } from "../../../SharedComponents/LocalServer/LocalServer";
import EditLivestockTypes from "./EditLivestockTypes/EditLivestockTypes"
import EditBreedTypes from "./EditBreedTypes/EditBreedTypes"
import EditProduceTypes from "./EditProduceTypes";

export default class AdminSettings extends Component {
  state = {
    newItem: "",
    produceSelection: "",
    refresh: "",
    status: "No Changes",
    lastAction: "",
    lastItem: "",
    currentLivestock: ""
  };
  produceSelection = [];
  errorMessage = "No Items in Database";



  onNewLiveStock = () => {
    refreshLivestockItems()
      .then(data => data.json())
      .then(response => {
        this.setState({ currentLivestock: response.livestock_items })
      })
  }
  render() {
    return (
      <Fragment>
        <div className="outer-container">
          <div className="livestock-container">
            <div className="livestock">
              <EditLivestockTypes onNewLiveStock={this.onNewLiveStock} />
            </div>

            <div className="breed-container">
              <EditProduceTypes />
            </div>
          </div>
          <EditBreedTypes currentLivestock={this.state.currentLivestock} />
        </div>
      </Fragment>
    );
  }
}

