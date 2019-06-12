import React, { Component } from "react";
import "./AddProduceForm.module.css";
import "../../../../SharedComponents/UI/react-datepicker.css";
import Button from "../../../../SharedComponents/UI/Button";
import styles from "./AddProduceForm.module.css";
import Toolbar from "../../../../SharedComponents/Navigation/Toolbar/Toolbar";
import DatePicker from "react-datepicker";
import "../../../../SharedComponents/miscStyles.css";
import ProducerSlideMenu from "../../../../SharedComponents/Navigation/SlideMenu/ProducerSlideMenu"
import { refreshProduceItems, addProduceQuery } from "../../../../SharedComponents/LocalServer/LocalServer"
import AddItemPopUp from "../AddItemPopup";



class ProduceForm extends Component {
  // There are items in this class that are not being used. Removing them will cause DB errors. Attention Byron!!!!!!!!!!!!!!
  state = {
    data: {
      type: "",
      packageType: "",
      packageSize: 0,
      packageSizeUnit: "",
      estCompletionDate: "0001-01-01",
      seedType: "",
      modifiedSeed: false,
      heirloom: false,
      fertilizerTypeUsed: "",
      pesticideTypeUsed: "",
      estQuantityPlanted: 0,
      certifiedOrganic: false,
      estFinishedQty: 0,
      estPrice: 0,
      qtyAcceptedForListing: 0,
      qtyAcceptedAtDelivery: 0,
      chargebacks: 0,
      finalPricePaid: 0,
      deliveredTo: "",
      deliveredDate: "0001-01-01",
      comments: "",
      status: "Pending Admin"
    },
    produceListItems: [],
    addedThisSession: 0,
    showItemPopup: false
  };
  form = undefined

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
  componentWillMount = async () => {
    const responseProduceItems = await refreshProduceItems()
    const json = await responseProduceItems.json();
    const pItems = json;
    if (pItems) {
      let pList = document.getElementById("produceItems1");
      await pItems.produce_items.forEach(item => {
        let indiv = item.newItem;
        let element = document.createElement("option");
        element.textContent = indiv;
        element.value = indiv;
        pList.appendChild(element);
      });
    }
  };

  onChange = e => {
    let data = this.state.data;
    let newdata = { ...data, [e.target.name]: e.target.value };
    this.setState({ data: newdata });
  };
  onCompDateChange = date => {
    this.setState({ estCompletionDate: date });
    console.log('new date is', this.state.estCompletionDate);
  };
  hideItemPopup = () => {
    this.setState({ showItemPopup: false })
  }
  clearForm = () => {
    this.setState({ showItemPopup: false })
    this.form.reset()
  }

  onSubmit = e => {
    e.preventDefault();
    this.form = e.target;
    document.getElementById("submitBtn").className += " loading";
    addProduceQuery(this.state.data, this.state.estCompletionDate)
      .then(data => {
        // console.log(data);
      })
      .then(
        setTimeout(function () {
          document.getElementById("submitBtn").className = "ui button";
        }, 1000)
      ).then(this.setState({
        addedThisSession: this.state.addedThisSession + 1,
        showItemPopup: true
      }))
      .catch(error => console.log(error));

  };

  render() {
    return (
      <div>
        <Toolbar />
        <ProducerSlideMenu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
        <h2 className="mobile-header-title">Add Produce</h2>
        <div className={styles.wrapper}>
          <span className="required-header">
            Coloured Border Indicates Required Field
          </span>
          <div className="ui grid container">
            <form onSubmit={this.onSubmit} className="ui row form">
              <div className="form-column-8">
                <div className="field">
                  <label>Type</label>
                  <select
                    onChange={this.onChange}
                    type="text"
                    name="type"
                    id="produceItems1"
                    style={{ border: "3px solid #1ECE88" }}
                  >
                    <option>Select Produce Item</option>
                  </select>
                </div>
                <div className="field">
                  <label>Package Type</label>
                  <select
                    onChange={this.onChange}
                    name="packageType"
                    multiple=""
                    className="ui fluid dropdown"
                    style={{ border: "3px solid #1ECE88" }}
                  >
                    <option value="">Please choose an option</option>
                    <option value="Bunch">Bunch</option>
                    <option value="Head">Head</option>
                    <option value="Bag">Bag</option>
                  </select>
                </div>
                <div className="field size-container">
                  <label>Package Size</label>
                  <div className="qty-container">
                    <input
                      onChange={this.onChange}
                      type="text"
                      name="packageSize"
                      className="qty-form"
                    />
                    <select
                      onChange={this.onChange}
                      name="packageSizeUnit"
                      multiple=""
                      className="ui fluid dropdown qty-dropdown"
                    >
                      <option value="Pounds">Pounds</option>
                      <option value="Grams">Grams</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label>Est Completion Date</label>
                  <div
                    className="dpicker"
                    style={{ border: "3px solid #1ECE88", width: "150px" }}
                  >
                    <DatePicker
                      name="estCompletionDate"
                      onChange={this.onCompDateChange}
                      dateFormat="yyyy-MM-dd"
                      selected={this.state.estCompletionDate}
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div className="field">
                  <label>Seed Type</label>
                  <input onChange={this.onChange} type="text" name="seedType" />
                </div>
                <div className="field">
                  <label>Modified Seed</label>
                  <select
                    onChange={this.onChange}
                    name="modifiedSeed"
                    multiple=""
                    className="ui fluid dropdown"
                  >
                    <option value="">Please choose an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="field">
                  <label>Heirloom</label>
                  <select
                    onChange={this.onChange}
                    name="heirloom"
                    multiple=""
                    className="ui fluid dropdown"
                  >
                    <option value="">Please choose an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
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
                  <label>Estimated Quantity Planted</label>
                  <input
                    onChange={this.onChange}
                    type="number"
                    name="estQuantityPlanted"
                  />
                </div>
                <div className="field">
                  <label>Certified Organic</label>
                  <select
                    onChange={this.onChange}
                    name="certifiedOrganic"
                    multiple=""
                    className="ui fluid dropdown"
                  >
                    <option value="">Please choose an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="field">
                  <label>Estimated Finished Qty</label>
                  <input
                    onChange={this.onChange}
                    type="number"
                    name="estFinishedQty"
                    style={{ border: "3px solid #1ECE88" }}
                  />
                </div>
                <div className="field">
                  <label>Fertilizer Type Used</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    name="fertilizerTypeUsed"
                  />
                </div>
                <div className="field">
                  <label>Pesticide Type Used</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    name="pesticideTypeUsed"
                  />
                </div>
                <input
                  onChange={this.onChange}
                  type="hidden"
                  id="userId"
                  name="userId"
                  value="1"
                />
              </div>
              <Button>Add</Button>
            </form>
            <strong>
              {" "}
              # of Produce Items Added: {this.state.addedThisSession}
            </strong>
          </div>
        </div>
        {this.state.showItemPopup && <AddItemPopUp hideItemPopup={this.hideItemPopup} type={this.state.data.type} clearForm={this.clearForm} />}
      </div>
    );
  }
}

export default ProduceForm;
