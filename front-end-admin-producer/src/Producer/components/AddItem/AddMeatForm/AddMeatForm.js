import React, { Component, Fragment } from "react";
import styles from "./AddMeatForm.module.css";
import Button from "../../../../SharedComponents/UI/Button";
import Toolbar from "../../../../SharedComponents/Navigation/Toolbar/Toolbar";

class LivestockForm extends Component {
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

  onChange = e => {
    let data = this.state.data;
    let newdata = { ...data, [e.target.name]: e.target.value };
    this.setState({ data: newdata });
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
    fetch("http://localhost:5000/livestock/", {
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
                    type="text"
                    name="regNumber"
                  />
                </div>
                <div className="field">
                  <label>RFID Tag</label>
                  <input onChange={this.onChange} type="text" name="rfid" />
                </div>
                <div className="field">
                  <label>Est. Starting Weight</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    name="estStartingWeight"
                  />
                </div>
                <div className="field">
                  <label>Hanging Weight</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    name="hangingWeight"
                  />
                </div>
                <div className="field">
                  <label>Chargebacks</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    name="chargebacks"
                  />
                </div>
                <div className="field">
                  <label>Delivered To</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    name="deliveredTo"
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
                  />
                </div>
                <div className="field">
                  <label>Est. Finished Weight</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    name="estFinishedWeight"
                  />
                </div>
                <div className="field">
                  <label>Est. Final Price to be Paid</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    name="estFinalPrice"
                  />
                </div>
                <div className="field">
                  <label>Quantity</label>
                  <input onChange={this.onChange} type="text" name="quantity" />
                </div>
                <div className="field">
                  <label>Final Price</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    name="finalPrice"
                  />
                </div>
                <div className="field">
                  <label>Delivered Date</label>
                  <input
                    onChange={this.onChange}
                    type="date"
                    name="deliveredDate"
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
