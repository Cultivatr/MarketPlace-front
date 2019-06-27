import React, { Component } from "react";
import "./AddProduceForm.module.css";
import "../../../../SharedComponents/UI/react-datepicker.css";
import Button from "../../../../SharedComponents/UI/Button";
import styles from "./AddProduceForm.module.css";
import DatePicker from "react-datepicker";
import "../../../../SharedComponents/miscStyles.css";
import ProducerSlideMenu from "../../../../SharedComponents/Navigation/SlideMenu/ProducerSlideMenu"
import { refreshProduceItems, addProduceQuery, sendEmailQueryNewItem } from "../../../../SharedComponents/LocalServer/LocalServer"
import AddItemPopUp from "../AddItemPopup";
import i from '../../../../img/i-icon.png'
import Tooltip from '../../../../SharedComponents/UI/Tooltip'
import "../../../../SharedComponents/UI/Tooltip.scss"


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
      .then(res => {
        if (res.Success) {
          setTimeout(() => {
            sendEmailQueryNewItem();
            document.getElementById("submitBtn").className = "ui button";
            this.setState((prevstate) => ({
              addedThisSession: prevstate.addedThisSession + 1,
              showItemPopup: true
            }))
          }, 500)
        } else document.getElementById("submitBtn").className = "ui button";
      })
      .catch(error => console.log(error));

  };

  render() {
    return (
      <div>
        <ProducerSlideMenu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
        <h2 className="mobile-header-title">Add Produce</h2>
        <div className={styles.wrapper}>
          <span
            className="required-header"
            style={{fontWeight:"bolder"}}
          >
            * All Fields Must Be Filled In
          </span>
          <div className="ui grid container">
            <form onSubmit={this.onSubmit} className="ui row form">
              <div className="form-column-8">
                <div className="field">
                  <div><label style={{fontWeight:"bolder"}}>Type </label><Tooltip message={'Hello This Is Type'} position={'top'}><img alt="Tooltip" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></div>
                  <select
                    onChange={this.onChange}
                    type="text"
                    name="type"
                    id="produceItems1"
                    required={true}
                  >
                    <option>Select Produce Item</option>
                  </select>
                </div>
                <div className="field">
                  <div><label style={{fontWeight:"bolder"}}>Package Type </label><Tooltip message={'Hello This Is Package Type'} position={'top'}><img alt="Tooltip" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></div>
                  <select
                    onChange={this.onChange}
                    name="packageType"
                    multiple=""
                    className="ui fluid dropdown"
                    required={true}
                  >
                    <option value="">Please choose an option</option>
                    <option value="Bunch">Bunch</option>
                    <option value="Head">Head</option>
                    <option value="Bag">Bag</option>
                  </select>
                </div>
                <div className="field size-container">
                  <div><label style={{fontWeight:"bolder"}}>Package Size </label><Tooltip message={'Hello This Is Package Size'} position={'top'}><img alt="Tooltip" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></div>
                  <div className="qty-container">
                    <input
                      onChange={this.onChange}
                      type="text"
                      name="packageSize"
                      className="qty-form"
                      required={true}
                    />
                    <select
                      onChange={this.onChange}
                      name="packageSizeUnit"
                      multiple=""
                      className="ui fluid dropdown qty-dropdown"
                      required={true}
                    >
                      <option value="Pounds">Pounds</option>
                      <option value="Grams">Grams</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <div><label style={{fontWeight:"bolder"}}>Est Completion Date </label><Tooltip message={'Hello This Is Est Completion Date'} position={'top'}><img alt="Tooltip" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></div>
                  <div
                    className="dpicker"
                    style={{ width: "150px" }}
                  >
                    <DatePicker
                      name="estCompletionDate"
                      onChange={this.onCompDateChange}
                      dateFormat="yyyy-MM-dd"
                      selected={this.state.estCompletionDate}
                      autocomplete="off"
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <div><label style={{fontWeight:"bolder"}}>Seed Type </label><Tooltip message={'Hello This Is Seed Type'} position={'top'}><img alt="Tooltip" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></div>
                  <input onChange={this.onChange} type="text" name="seedType" required={true}/>
                </div>
                <div className="field">
                  <div><label style={{fontWeight:"bolder"}}>Modified Seed </label><Tooltip message={'Hello This Is Modified Seed'} position={'top'}><img alt="Tooltip" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></div>
                  <select
                    onChange={this.onChange}
                    name="modifiedSeed"
                    multiple=""
                    className="ui fluid dropdown"
                    required={true}
                  >
                    <option value="">Please choose an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="field">
                  <div><label style={{fontWeight:"bolder"}}>Heirloom </label><Tooltip message={'Hello This Is Heirloom'} position={'top'}><img alt="Tooltip" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></div>
                  <select
                    onChange={this.onChange}
                    name="heirloom"
                    multiple=""
                    className="ui fluid dropdown"
                    required={true}
                  >
                    <option value="">Please choose an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="field">
                  <label style={{fontWeight:"bolder"}}>Comments </label>
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
                  <div><label style={{fontWeight:"bolder"}}>Estimated Quantity Planted </label><Tooltip message={'Hello This Is Est Quanity Planted'} position={'top'}><img alt="Tooltip" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></div>
                  <input
                    onChange={this.onChange}
                    type="number"
                    name="estQuantityPlanted"
                    required={true}
                  />
                </div>
                <div className="field">
                  <div><label style={{fontWeight:"bolder"}}>Certified Organic </label><Tooltip message={'Hello This Is Cert. Organic'} position={'top'}><img alt="Tooltip" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></div>
                  <select
                    onChange={this.onChange}
                    name="certifiedOrganic"
                    multiple=""
                    className="ui fluid dropdown"
                    required={true}
                  >
                    <option value="">Please choose an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="field">
                  <div><label style={{fontWeight:"bolder"}}>Estimated Finished Qty </label><Tooltip message={'Hello This Is Est Finished Quanity'} position={'top'}><img alt="Tooltip" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></div>
                  <input
                    onChange={this.onChange}
                    type="number"
                    name="estFinishedQty"
                    required={true}
                  />
                </div>
                <div className="field">
                  <div><label style={{fontWeight:"bolder"}}>Fertilizer Type Used </label><Tooltip message={'Hello This Is Fertilizer Type Used'} position={'top'}><img alt="Tooltip" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></div>
                  <input
                    onChange={this.onChange}
                    type="text"
                    name="fertilizerTypeUsed"
                    required={true}
                  />
                </div>
                <div className="field">
                  <div><label style={{fontWeight:"bolder"}}>Pesticide Type Used </label><Tooltip message={'Hello This Is Pesticide Type Used'} position={'top'}><img alt="Tooltip" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></div>
                  <input
                    onChange={this.onChange}
                    type="text"
                    name="pesticideTypeUsed"
                    required={true}
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
        <footer className="copyright">
          © 2019 CultivatR | ALL RIGHTS RESERVED 
        </footer> 
      </div>
    );
  }
}

export default ProduceForm;
