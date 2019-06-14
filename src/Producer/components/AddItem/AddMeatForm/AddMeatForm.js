import React, { Component } from "react";
import styles from "./AddMeatForm.module.css";
import Button from "../../../../SharedComponents/UI/Button";
import Toolbar from "../../../../SharedComponents/Navigation/Toolbar/Toolbar";
import ProducerSlideMenu from "../../../../SharedComponents/Navigation/SlideMenu/ProducerSlideMenu"
import OtherInput from "../../../../SharedComponents/OtherInput"
import DatePicker from "react-datepicker";
import "../../../../SharedComponents/UI/react-datepicker.css";
import { refreshLivestockItems, addLivestockQuery, getBreedsWithId } from "../../../../SharedComponents/LocalServer/LocalServer"
import AddItemPopUp from "../AddItemPopup";


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
    showItemPopup: false
    // birthdate: "0001-01-01",
    // dateOnFeed: "0001-01-01",
    // estCompletionDate: "0001-01-01"
  };


  onChange = e => {
    if (e.target.name === "type") {
      const currentTypeObject = this.state.livestockItems.filter(item => {
        if (Object.values(item)[0] === e.target.value) {
          return true
        }
        return false
      })[0]
      const currentType = Number(Object.keys(currentTypeObject))
      console.log("TCL: LivestockForm -> currentType", currentType)
      getBreedsWithId(currentType)
        .then(response => response.json())
        .then(breeds => {
          this.setState({ selectedBreeds: Object.values(breeds)[0] }, () => { console.log(this.state.selectedBreeds) })
        })
    }
    let data = this.state.data;
    let newdata = { ...data, [e.target.name]: e.target.value };
    this.setState({ data: newdata });
  };

  componentWillMount = async () => {
    window.addEventListener("resize", () => {
      this.setState({ screenWidth: window.screen.width })
    });
    const responseLivestockItems = await refreshLivestockItems()
    const livestock = await responseLivestockItems.json();
    if (livestock) {
      this.setState({ livestockItems: livestock.livestock_items })
      let pList = document.getElementById("livestockItems1");
      await livestock.livestock_items.forEach(item => {
        let indiv = Object.values(item)
        let element = document.createElement("option");
        element.textContent = indiv;
        element.value = indiv;
        pList.appendChild(element);
      });
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }
  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.hideItemPopup()
    }
  }
  clearForm = () => {
    this.setState({ showItemPopup: false })
    this.form.reset()
  }

  // onChangeOther = e => {
  //   let data = this.state.data;
  //   let newdata = { ...data, [e.target.name]: `Other - ${e.target.value}` };
  //   this.setState({ data: newdata });
  // }

  onCompDateChange = date => {
    this.setState({ estCompletionDate: date });
  };
  onBirthDateChange = date => {
    this.setState({ birthdate: date });
  };
  onDateOnFeedChange = date => {
    this.setState({ dateOnFeed: date });
  };
  hideItemPopup = () => {
    this.setState({ showItemPopup: false })
  }

  onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    document.getElementById("submitBtn").className += " loading";
    addLivestockQuery(this.state.data, this.state.dateOnFeed, this.state.estCompletionDate, this.state.birthdate)
      .then(form.reset(),
        this.setState({
          addedThisSession: this.state.addedThisSession + 1,
          showItemPopup: true
        }))
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
          <span
            className="required-header"
          >
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
                    id="livestockItems1"
                    className="ui fluid dropdown"
                    style={{ border: "3px solid #F92E2E" }}
                  >
                    <option value="">Please choose an option</option>
                  </select>
                </div>

                {/* <OtherInput value={this.state.data.breed} labelItem={"breed"} title={"Breed"} options={["Angus", "Birkshire", "Other"]} onChange={this.onChange} onChangeOther={this.onChangeOther} /> */}
                <div className="field">
                  <label>Breed</label>
                  <select
                    onChange={this.onChange}
                    // onChangeOther={this.onChangeOther}
                    name="breed"
                    multiple=""
                    // id="livestockItems1"
                    className="ui fluid dropdown"
                    style={{ border: "3px solid #1ECE88" }}
                  >
                    <option>Please choose an option</option>
                    {this.state.selectedBreeds && this.state.selectedBreeds.map(breed => {
                      return (<option value={breed}>{breed}</option>)
                    }
                    )}

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
                    style={{ border: "3px solid #F92E2E", width: "150px" }}
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
                    style={{ border: "3px solid #F92E2E", width: "150px" }}
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
                    style={{ border: "3px solid #F92E2E", width: "150px" }}
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
              <Button className="form-column-8">Add</Button>
            </form>
            <strong>
              {" "}
              # of Livestock Items Added: {this.state.addedThisSession}
            </strong>
          </div>
        </div>
        {this.state.showItemPopup && <AddItemPopUp hideItemPopup={this.hideItemPopup} clearForm={this.clearForm} />}
      </div>
    );
  }
}

export default LivestockForm;
