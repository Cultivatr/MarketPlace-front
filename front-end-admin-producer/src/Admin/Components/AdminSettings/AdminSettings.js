import React, { Component, Fragment } from "react";
import Button from "../../../SharedComponents/UI/Button";
import "./AdminSettings.css";
const domainLink = "https://hidden-escarpment-75213.herokuapp.com/";

export default class AdminSettings extends Component {
  state = {
    data: {
      newType: ""
    }
  };
  onChange = e => {
    let data = this.state.data;
    let newdata = { ...data, [e.target.name]: e.target.value };
    this.setState({ data: newdata });
    console.log("Data", newdata);
  };
  onSubmit = e => {
    console.log("button clicked");
    e.preventDefault();
    const form = e.target;
    const { newType } = this.state.data;
    fetch(domainLink + "produceItems/add", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        newType: newType
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .then(form.reset())
      .then(
        setTimeout(function() {
          document.getElementById("submitBtn").className = "ui button";
        }, 1000)
      )
      .catch(error => console.log(error));
  };
  render() {
    return (
      <Fragment>
        Rendered Admin Settings
        <form onSubmit={this.onSubmit} className="ui row form">
          <div className="field">
            <label>Add New Produce Type to System</label>
            <input
              onChange={this.onChange}
              placeholder="New Item"
              name="newType"
            />
          </div>
          <Button>Add</Button>
        </form>
      </Fragment>
    );
  }
}
