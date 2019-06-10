import React, { Component } from "react";
import styles from "./AddMeatForm.module.css";
import Button from "../../../../SharedComponents/UI/Button";
import Toolbar from "../../../../SharedComponents/Navigation/Toolbar/Toolbar";
import ProducerSlideMenu from "../../../../SharedComponents/Navigation/SlideMenu/ProducerSlideMenu"
import DatePicker from "react-datepicker";
import "../../../../SharedComponents/UI/react-datepicker.css";
import { addLivestockQuery } from "../../../../SharedComponents/LocalServer/LocalServer"
import OtherInput from "../../../../SharedComponents/OtherInput"


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
      status: "Pending Admin",
    },
    addedThisSession: 0,
    // birthdate: "0001-01-01",
    // dateOnFeed: "0001-01-01",
    // estCompletionDate: "0001-01-01"
  };


  onChange = e => {
    let data = this.state.data;
    let newdata = { ...data, [e.target.name]: e.target.value };
    this.setState({ data: newdata });
  };

  componentWillMount = () => {
    window.addEventListener("resize", () => {
      this.setState({ screenWidth: window.screen.width })
    });

  }

  onChangeOther = e => {
    let data = this.state.data;
    let newdata = { ...data, [e.target.name]: `Other - ${e.target.value}` };
    this.setState({ data: newdata });
  }

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
    document.getElementById("submitBtn").className += " loading";
    addLivestockQuery(this.state.data, this.state.dateOnFeed, this.state.estCompletionDate, this.state.birthdate)
      .then(form.reset(),
        this.setState({ addedThisSession: this.state.addedThisSession + 1 }))
      .then(
        setTimeout(function () {
          document.getElementById("submitBtn").className = "ui button";
        }, 2000)
      )
      .catch(error => console.log(error));

  };

  render() {
    return (
      <div>
        <Toolbar />
        <ProducerSlideMenu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
        <h2 className="mobile-header-title">Add Livestock</h2>
        <div className={styles.wrapper}>
          <span className="required-header">
            Coloured Border Indicates Required Field
          </span>
          <div className="ui grid container">
            <form onSubmit={this.onSubmit} className="ui row form add-meat-mobile" autoComplete="off">
              <div className="form-column-8">
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

                <OtherInput value={this.state.data.breed} labelItem={"breed"} title={"Breed"} options={["Angus", "Birkshire", "Other"]} onChange={this.onChange} onChangeOther={this.onChangeOther} />

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
                      autocomplete="off"
                      name="birthdate"
                      onChange={this.onBirthDateChange}
                      dateFormat="yyyy-MM-dd"
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
              <div className="form-column-8">
                <div className="field">
                  <label>Date on Feed</label>
                  <div
                    className="dpicker"
                    style={{ border: "3px solid #1ECE88", width: "150px" }}
                  >
                    <DatePicker
                      name="dateOnFeed"
                      onChange={this.onDateOnFeedChange}
                      dateFormat="yyyy-MM-dd"
                      selected={this.state.dateOnFeed}
                    />
                  </div>
                </div>
                <OtherInput value={this.state.data.feedMethod} labelItem={"feedMethod"} title={"Feed Method"} options={["Grass", "GrassBarley", "GrassGrain", "FreeRange", "Other"]} onChange={this.onChange} onChangeOther={this.onChangeOther} />
                <OtherInput value={this.state.data.typeOfPasture} labelItem={"typeOfPasture"} title={"Type of Pasture"} options={["Timothy", "Alfa", "Other"]} onChange={this.onChange} onChangeOther={this.onChangeOther} />
                <OtherInput value={this.state.data.typeOfFeed} labelItem={"typeOfFeed"} title={"Type of Feed"} options={["Grain", "Barley", "Other"]} onChange={this.onChange} onChangeOther={this.onChangeOther} />

                <div className="field">
                  <label>Est. Completion Date</label>
                  <div
                    className="dpicker"
                    style={{ border: "3px solid #1ECE88", width: "150px" }}
                  >
                    <DatePicker
                      name="estCompletionDate"
                      onChange={this.onCompDateChange}
                      dateFormat="yyyy-MM-dd"
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
      </div>
    );
  }
}

export default LivestockForm;
