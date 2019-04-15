import React, { Component, Fragment } from "react";
import styles from "./AddMeatForm.module.css";
import Button from "../../../../SharedComponents/UI/Button";
import Toolbar from "../../../../SharedComponents/Navigation/Toolbar/Toolbar";

class LivestockForm extends Component {
  // There are items in this class that are not being used. Removing them will cause DB errors. Attention Byron!!!!!!!!!!!!!!
  state = {
    data: {
      userId: 1,
      type: "",
      breed: "",
      singleBrand: false,
      birthdate: "0001-01-01",
      regNumber: 0,
      rfid: 0,
      estStartingWeight: 0,
      hangingWeight: 0,
      chargebacks: 0,
      dateOnFeed: "0001-01-01",
      feedMethod: "",
      typeOfPasture: "",
      typeOfFeed: "",
      estCompletionDate: "0001-01-01",
      estFinishedWeight: 0,
      estFinalPrice: 0,
      finalPrice: 0,
      deliveredDate: "0001-01-01",
      deliveredTo: "",
      comments: "",
      quantity: 0,
      status: "Pending Approval"
    }
  };

  camelCaseString = (string, type) => {
    if (type === "comments" || type === "feedMethod") return string;
    const text = string
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    return text;
  };

  onChange = e => {
    let data = this.state.data;
    const newValue = this.camelCaseString(e.target.value, e.target.name);
    let newdata = { ...data, [e.target.name]: newValue };
    this.setState({ data: newdata });
    console.log("Data", newdata);
  };

  onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const {
      type,
      breed,
      singleBrand,
      birthdate,
      regNumber,
      rfid,
      estStartingWeight,
      hangingWeight,
      chargebacks,
      dateOnFeed,
      feedMethod,
      typeOfPasture,
      typeOfFeed,
      estCompletionDate,
      estFinishedWeight,
      estFinalPrice,
      finalPrice,
      deliveredDate,
      deliveredTo,
      comments,
      status,
      quantity
    } = this.state.data;

    document.getElementById("submitBtn").className += " loading";
    fetch("https://mysterious-cove-46763.herokuapp.com/livestock/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userId: JSON.parse(sessionStorage.getItem("authData")).id,
        type: type,
        breed: breed,
        singleBrand: singleBrand,
        birthdate: birthdate,
        regNumber: regNumber,
        rfid: rfid,
        estStartingWeight: estStartingWeight,
        hangingWeight: hangingWeight,
        chargebacks: chargebacks,
        dateOnFeed: dateOnFeed,
        feedMethod: feedMethod,
        typeOfPasture: typeOfPasture,
        typeOfFeed: typeOfFeed,
        estCompletionDate: estCompletionDate,
        estFinishedWeight: estFinishedWeight,
        estFinalPrice: estFinalPrice,
        finalPrice: finalPrice,
        deliveredDate: deliveredDate,
        deliveredTo: deliveredTo,
        comments: comments,
        status: status,
        quantity: quantity
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
        }, 2000)
      )
      .catch(error => console.log(error));
  };

  render() {
    return (
      <Fragment>
        <Toolbar />
        <h2>Add Livestock</h2>
        <div className={styles.wrapper}>
          <view
            style={{
              width: 15,
              height: 15,
              borderRadius: 150 / 2,
              backgroundColor: "#1ECE88",
              position: "relative",
              top: "0px",
              left: "100px"
            }}
          >
            Coloured Border Indicates Required Field
          </view>
          <div className="ui grid container">
            <form onSubmit={this.onSubmit} className="ui row form">
              <div className="eight wide column">
                <div className="field">
                  <label>Type</label>
                  <select
                    onChange={this.onChange}
                    name="type"
                    multiple=""
                    className="ui fluid dropdown"
                    style={{ border: "3px solid #1ECE88" }}
                  >
                    <option value="">Please choose an option</option>
                    <option value="Pork">Pork</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Lamb">Lamb</option>
                    <option value="Goat">Goat</option>
                    <option value="Beef">Beef</option>
                  </select>
                </div>
                <div className="field">
                  <label>Breed</label>
                  <select
                    onChange={this.onChange}
                    name="breed"
                    multiple=""
                    className="ui fluid dropdown"
                  >
                    <option value="">Please choose an option</option>
                    <option value="Angus">Angus</option>
                    <option value="Birkshire">Birkshire</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="field">
                  <label>Single Brand</label>
                  <select
                    onChange={this.onChange}
                    name="singleBrand"
                    multiple=""
                    className="ui fluid dropdown"
                  >
                    <option value="">Please choose an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="field">
                  <label>Birthdate</label>
                  <input
                    onChange={this.onChange}
                    type="date"
                    name="birthdate"
                  />
                </div>
                <div className="field">
                  <label>Registration Number</label>
                  <input
                    onChange={this.onChange}
                    type="number"
                    name="regNumber"
                  />
                </div>
                <div className="field">
                  <label>RFID Tag</label>
                  <input onChange={this.onChange} type="number" name="rfid" />
                </div>
                <div className="field">
                  <label>Est. Starting Weight in Kilograms</label>
                  <input
                    onChange={this.onChange}
                    type="number"
                    name="estStartingWeight"
                  />
                </div>
                <div className="field">
                  <label>Comments</label>
                  <textarea
                    onChange={this.onChange}
                    placeholder="Tell us more"
                    rows="3"
                    name="comments"
                  />
                </div>
              </div>
              <div className="eight wide column">
                <div className="field">
                  <label>Date on Feed</label>
                  <input
                    onChange={this.onChange}
                    type="date"
                    name="dateOnFeed"
                  />
                </div>
                <div className="field">
                  <label>Feed Method</label>
                  <select
                    onChange={this.onChange}
                    name="feedMethod"
                    multiple=""
                    className="ui fluid dropdown"
                  >
                    <option value="">Please choose an option</option>
                    <option value="Grass">Grass</option>
                    <option value="GrassBarley">
                      Grass and Barley Finished
                    </option>
                    <option value="GrassGrain">Grass and Grain Finished</option>
                    <option value="FreeRange">Free Range</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="field">
                  <label>Type of Pasture</label>
                  <select
                    onChange={this.onChange}
                    name="typeOfPasture"
                    multiple=""
                    className="ui fluid dropdown"
                  >
                    <option value="">Please choose an option</option>
                    <option value="Timothy">Timothy</option>
                    <option value="Alfa">Alfa</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="field">
                  <label>Type of Feed</label>
                  <select
                    onChange={this.onChange}
                    name="typeOfFeed"
                    multiple=""
                    className="ui fluid dropdown"
                  >
                    <option value="">Please choose an option</option>
                    <option value="Grain">Grain</option>
                    <option value="Barley">Barley</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="field">
                  <label>Est. Completion Date</label>
                  <input
                    onChange={this.onChange}
                    type="date"
                    name="estCompletionDate"
                    style={{ border: "3px solid #1ECE88" }}
                  />
                </div>
                <div className="field">
                  <label>Est. Finished Weight in Kilograms</label>
                  <input
                    onChange={this.onChange}
                    type="number"
                    name="estFinishedWeight"
                  />
                </div>
                <div className="field">
                  <label>Hanging Weight in Kilograms</label>
                  <input
                    onChange={this.onChange}
                    type="number"
                    name="hangingWeight"
                  />
                </div>

                <div className="field">
                  <label>Quantity</label>
                  <input
                    onChange={this.onChange}
                    type="number"
                    name="quantity"
                    style={{ border: "3px solid #1ECE88" }}
                  />
                </div>
                <input type="hidden" id="userId" name="userId" value="1" />
              </div>
              <Button>Add</Button>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LivestockForm;
