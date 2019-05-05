import React, { Component, Fragment } from "react";
import styles from "./AddMeatForm.module.css";
import Button from "../../../../SharedComponents/UI/Button";
import Toolbar from "../../../../SharedComponents/Navigation/Toolbar/Toolbar";
import DatePicker from "react-datepicker";
import "../../../../SharedComponents/UI/react-datepicker.css";

const domainLink = "https://hidden-escarpment-75213.herokuapp.com/";

class LivestockForm extends Component {
  // There are items in this class that are not being used. Removing them will cause DB errors. Attention Byron!!!!!!!!!!!!!!
  state = {
    data: {
      userId: 1,
      type: "",
      breed: "",
      singleBrand: false,
      regNumber: 0,
      rfid: 0,
      estStartingWeight: 0,
      hangingWeight: 0,
      chargebacks: 0,
      feedMethod: "",
      typeOfPasture: "",
      typeOfFeed: "",
      estFinishedWeight: 0,
      estFinalPrice: 0,
      finalPrice: 0,
      deliveredDate: "0001-01-01",
      deliveredTo: "",
      comments: "",
      quantity: 0,
      status: "Pending Admin"
    },
    addedThisSession: 0
    // birthdate: "0001-01-01",
    // dateOnFeed: "0001-01-01",
    // estCompletionDate: "0001-01-01"
  };

  // camelCaseString = (string, type) => {
  //   if (type === "comments" || type === "feedMethod") return string;
  //   const text = string
  //     .toLowerCase()
  //     .split(" ")
  //     .map(s => s.charAt(0).toUpperCase() + s.substring(1))
  //     .join(" ");
  //   return text;
  // };

  onChange = e => {
    let data = this.state.data;
    // const newValue = this.camelCaseString(e.target.value, e.target.name);
    let newdata = { ...data, [e.target.name]: e.target.value };
    this.setState({ data: newdata });
    console.log("Data", newdata);
  };
  onCompDateChange = date => {
    this.setState({ estCompletionDate: date });
  };
  onBirthDateChange = date => {
    this.setState({ birthdate: date });
  };
  onDateOnFeedChange = date => {
    this.setState({ dateOnFeed: date });
  };

  onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const {
      type,
      breed,
      singleBrand,
      regNumber,
      rfid,
      estStartingWeight,
      hangingWeight,
      chargebacks,
      feedMethod,
      typeOfPasture,
      typeOfFeed,
      estFinishedWeight,
      estFinalPrice,
      finalPrice,
      deliveredDate,
      deliveredTo,
      comments,
      status,
      quantity
    } = this.state.data;
    const dateOnFeed = this.state.dateOnFeed;
    const estCompletionDate = this.state.estCompletionDate;
    const birthdate = this.state.birthdate;
    document.getElementById("submitBtn").className += " loading";
    fetch(domainLink + "livestock/", {
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
    this.setState({ addedThisSession: this.state.addedThisSession + 1 });
  };

  render() {
    return (
      <Fragment>
        <Toolbar />
        <h2>Add Livestock</h2>
        <div className={styles.wrapper}>
          <content
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
          </content>
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
                  <label>Est Date of Birth</label>
                  <div
                    className="dpicker"
                    style={{ border: "3px solid #1ECE88", width: "150px" }}
                  >
                    <DatePicker
                      name="birthdate"
                      onChange={this.onBirthDateChange}
                      dateFormat="YYYY-MM-dd"
                      selected={this.state.birthdate}
                    />
                  </div>
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
                  <label>Est. Starting Weight in Pounds</label>
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
                  <div
                    className="dpicker"
                    style={{ border: "3px solid #1ECE88", width: "150px" }}
                  >
                    <DatePicker
                      name="dateOnFeed"
                      onChange={this.onDateOnFeedChange}
                      dateFormat="YYYY-MM-dd"
                      selected={this.state.dateOnFeed}
                    />
                  </div>
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
                  <div
                    className="dpicker"
                    style={{ border: "3px solid #1ECE88", width: "150px" }}
                  >
                    <DatePicker
                      name="estCompletionDate"
                      onChange={this.onCompDateChange}
                      dateFormat="YYYY-MM-dd"
                      selected={this.state.estCompletionDate}
                    />
                  </div>
                </div>
                <div className="field">
                  <label>Est. Finished Weight in Pounds</label>
                  <input
                    onChange={this.onChange}
                    type="number"
                    name="estFinishedWeight"
                  />
                </div>

                <input type="hidden" id="userId" name="userId" value="1" />
              </div>
              <Button>Add</Button>
            </form>
            <strong>
              {" "}
              # of Livestock Items Added: {this.state.addedThisSession}
            </strong>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LivestockForm;
