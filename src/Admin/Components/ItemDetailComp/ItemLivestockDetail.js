import React, { Component } from "react";
import Class from "./ItemDetail.module.css";
import "./ItemDetail.css";
import { modifyItemLivestockQuery } from "../../../SharedComponents/LocalServer/LocalServer"
import OtherInputAdmin from "../../../SharedComponents/OtherInputAdmin"


class ProductLivestockDetail extends Component {
  constructor() {
    super();
    this.state = {
      itemLivestockDetails: "",
      showRejectBtn: false,
    };
    this.priorCompletionDate = "";
    this.priorDeliveredDate = "";
    this.priorBirthDate = "";
    this.priorOnFeedDate = "";
  }

  componentWillReceiveProps() {
    switch (this.props.itemLivestockDetails.status) {
      case "Pending Admin":
        this.setState({
          showRejectBtn: true
        })
        break;
      case "Pending Producer":
        this.setState({
          showRejectBtn: true
        })
        break;
      case "Accepted":
        this.setState({
          showRejectBtn: true
        })
        break;
      case "Sold":
        this.setState({
          showRejectBtn: false
        })
        break;
      case "Not Accepted":
        this.setState({
          showRejectBtn: false
        })
        break;
      case "Delivered":
        this.setState({
          showRejectBtn: false
        })
        break;
      case "Archive":
        this.setState({
          showRejectBtn: false
        })
        break;
      default:
        break;

    }
  }
  onChange = e => {
    let itemLivestockDetails = this.props.itemLivestockDetails;
    itemLivestockDetails[e.target.name] = e.target.value;
    this.setState({ itemLivestockDetails: itemLivestockDetails });
    console.log("Livestock details:", this.state.itemLivestockDetails);
    console.log(this.state.itemLivestockDetails.status)
  };

  onChangeOther = e => {
    let itemLivestockDetails = this.props.itemLivestockDetails;
    itemLivestockDetails[e.target.name] = `Other - ${e.target.value}`;
    this.setState({ itemLivestockDetails: itemLivestockDetails });
    console.log("Livestock details:", this.state.itemLivestockDetails);
  };

  getEstCompletionDate = () => {
    const propCompletionDate = this.props.itemLivestockDetails
      .estCompletionDate;
    if (propCompletionDate) {
      if (propCompletionDate === "Mon, 01 Jan 1 00:00:00 GMT") {
        this.priorCompletionDate = "No value entered";
      } else {
        this.priorCompletionDate = propCompletionDate;
      }
    }
  };
  getDeliveredDate = () => {
    const propDeliveredDate = this.props.itemLivestockDetails.deliveredDate;
    if (propDeliveredDate) {
      if (propDeliveredDate === "Mon, 01 Jan 1 00:00:00 GMT") {
        this.priorDeliveredDate = "No value entered";
      } else {
        this.priorDeliveredDate = propDeliveredDate;
      }
    }
  };
  getBirthDate = () => {
    const propBirthDate = this.props.itemLivestockDetails.birthdate;
    if (propBirthDate) {
      if (propBirthDate === "Mon, 01 Jan 1 00:00:00 GMT") {
        this.priorBirthDate = "No value entered";
      } else {
        this.priorBirthDate = propBirthDate;
      }
    }
  };
  getOnFeedDate = () => {
    const propOnFeedDate = this.props.itemLivestockDetails.dateOnFeed;
    if (propOnFeedDate) {
      if (propOnFeedDate === "Mon, 01 Jan 1 00:00:00 GMT") {
        this.priorOnFeedDate = "No value entered";
      } else {
        this.priorOnFeedDate = propOnFeedDate;
      }
    }
  };

  getBreedValue = () => {
    const element = document.getElementById("breed");
    switch (this.props.itemLivestockDetails.breed) {
      case "Angus":
        element.value = "Angus";
        break;
      case "Birkshire":
        element.value = "Birkshire";
        break;
      case "Other":
        element.value = "Other";
        break;
      default:
        break;
    }
  };

  getSingleBrandValue = () => {
    const propSingleBrand = this.props.itemLivestockDetails.singleBrand;
    const element = document.getElementById("singleBrand");
    if (propSingleBrand === true) {
      element.value = "Yes";
    } else if (propSingleBrand === false) {
      element.value = "No";
    }
  };

  getFeedMethodValue = () => {
    const element = document.getElementById("feedMethod");
    switch (this.props.itemLivestockDetails.feedMethod) {
      case "Grass":
        element.value = "Grass";
        break;
      case "GrassBarley":
        element.value = "GrassBarley";
        break;
      case "GrassGrain":
        element.value = "GrassGrain";
        break;
      case "FreeRange":
        element.value = "FreeRange";
        break;
      case "Other":
        element.value = "Other";
        break;
      default:
        break;
    }
  };

  getTypeOfPastureValue = () => {
    const element = document.getElementById("typeOfPasture");
    switch (this.props.itemLivestockDetails.typeOfPasture) {
      case "Timothy":
        element.value = "Timothy";
        break;
      case "Alfa":
        element.value = "Alfa";
        break;
      case "Other":
        element.value = "Other";
        break;
      default:
        break;
    }
  };

  getTypeOfFeedValue = () => {
    const element = document.getElementById("typeOfFeed");
    switch (this.props.itemLivestockDetails.typeOfFeed) {
      case "Grain":
        element.value = "Grain";
        break;
      case "Barley":
        element.value = "Barley";
        break;
      case "Other":
        element.value = "Other";
        break;
      default:
        break;
    }
  };

  modifyItem = async (removeO = true) => {
    if (this.state.itemLivestockDetails !== "") {
      await modifyItemLivestockQuery(this.state.itemLivestockDetails);
      await this.props.refreshLiveStock(this.state.itemLivestockDetails);
    };
    removeO && this.props.removeOverlay();
  };

  render() {
    const {
      id,
      type,
      birthdate,
      regNumber,
      rfid,
      estStartingWeight,
      hangingWeight,
      chargebacks,
      comments,
      deliveredTo,
      deliveredDate,
      dateOnFeed,
      estCompletionDate,
      estFinishedWeight,
      estFinalPrice,
      quantity,
      finalPrice,
      status
    } = this.props.itemLivestockDetails;

    let rejectBtn =
      <button
        className={Class.itemButtonsCancel}
        onClick={() =>
          this.props.rejectLivestock(this.props.itemLivestockDetails.id)
        }>Reject</button>
    return (
      <div id="itemLivestockOverlay">
        <div className={Class.itemDetailContainer}>
          <div className={Class.tableHeader}>
            <h4 className="ui horizontal divider header">
              {type} | Item # <i>{id}</i>
            </h4>
          </div>
          <div className={Class.userTable}>
            <table className="ui definition table">
              <tbody>
                <tr>
                  <td className="three wide column">Status</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="status"
                      name="status"
                      value={status}
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Pending Admin">Pending Admin</option>
                      <option value="Pending Producer">Pending Producer</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Sold">Sold</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Not Accepted">Not Accepted</option>
                    </select></td>
                </tr>
                <OtherInputAdmin value={this.props.itemLivestockDetails.breed} labelItem={"breed"} title={"Breed"} options={["Angus", "Birkshire", "Other"]} onChange={this.onChange} onChangeOther={this.onChangeOther} />
                <tr>
                  <td>Single Brand</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="singleBrand"
                      name="singleBrand"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {this.getSingleBrandValue()}
                  </td>
                </tr>
                <tr>
                  <td>Est Date of Birth</td>
                  <td className={Class.row}>
                    <div className="tableRowDateParent">
                      <input
                        className="tableRowDate1"
                        type="date"
                        id="birthdate"
                        onChange={this.onChange}
                        name="birthdate"
                        value={birthdate}
                      />
                      <div className="tableRowDate2">
                        {this.getBirthDate()}
                        Current: {this.priorBirthDate}
                      </div>
                    </div>
                  </td>

                  {/* <td>Estimated Birthdate</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      className={Class.tableRow}
                      type="text"
                      placeholder={birthdate}
                      name="birthdate"
                    />
                  </td> */}
                </tr>
                <tr>
                  <td>Registration Number</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      className={Class.tableRow}
                      type="number"
                      value={regNumber}
                      name="regNumber"
                    />
                  </td>
                </tr>
                <tr>
                  <td>RFID Tag</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      className={Class.tableRow}
                      type="number"
                      value={rfid}
                      name="rfid"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Date On Feed</td>
                  <td className={Class.row}>
                    <div className="tableRowDateParent">
                      <input
                        className="tableRowDate1"
                        type="date"
                        id="dateOnFeed"
                        onChange={this.onChange}
                        name="dateOnFeed"
                        value={dateOnFeed}
                      />
                      <div className="tableRowDate2">
                        {this.getOnFeedDate()}
                        Current: {this.priorOnFeedDate}
                      </div>
                    </div>
                  </td>
                </tr>
                <OtherInputAdmin value={this.props.itemLivestockDetails.feedMethod} labelItem={"feedMethod"} title={"Feed Method"} options={["Grass", "GrassBarley", "GrassGrain", "FreeRange", "Other"]} onChange={this.onChange} onChangeOther={this.onChangeOther} />
                <OtherInputAdmin value={this.props.itemLivestockDetails.typeOfPasture} labelItem={"typeOfPasture"} title={"Type Of Pasture"} options={["Timothy", "Alfa", "Other"]} onChange={this.onChange} onChangeOther={this.onChangeOther} />
                <OtherInputAdmin value={this.props.itemLivestockDetails.typeOfFeed} labelItem={"typeOfFeed"} title={"Type Of Feed"} options={["Grain", "Barley", "Other"]} onChange={this.onChange} onChangeOther={this.onChangeOther} />
                <tr>
                  <td>Est Starting Weight in Pounds</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      className={Class.tableRow}
                      type="number"
                      value={estStartingWeight}
                      name="estStartingWeight"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      className={Class.tableRow}
                      type="number"
                      value={quantity}
                      name="quantity"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Est Completion Date</td>
                  <td className={Class.row}>
                    <div className="tableRowDateParent">
                      <input
                        className="tableRowDate1"
                        type="date"
                        id="estCompletionDate"
                        onChange={this.onChange}
                        name="estCompletionDate"
                        value={estCompletionDate}
                      />
                      <div className="tableRowDate2">
                        {this.getEstCompletionDate()}
                        Current: {this.priorCompletionDate}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Est Finished Weight in Pounds</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      className={Class.tableRow}
                      type="number"
                      value={estFinishedWeight}
                      name="estFinishedWeight"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Est Final Price</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      className={Class.tableRow}
                      type="number"
                      value={estFinalPrice}
                      name="estFinalPrice"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Hanging Weight in Pounds</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      className={Class.tableRow}
                      type="number"
                      value={hangingWeight}
                      name="hangingWeight"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Final Price</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      className={Class.tableRow}
                      type="number"
                      value={finalPrice}
                      name="finalPrice"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Delivered Date</td>
                  <td className={Class.row}>
                    <div className="tableRowDateParent">
                      <input
                        className="tableRowDate1"
                        type="date"
                        id="deliveredDate"
                        onChange={this.onChange}
                        name="deliveredDate"
                        value={deliveredDate}
                      />
                      <div className="tableRowDate2">
                        {this.getDeliveredDate()}
                        Current: {this.priorDeliveredDate}
                      </div>
                    </div>
                  </td>
                  {/* <td>Delivered Date</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      className={Class.tableRow}
                      type="text"
                      placeholder={deliveredDate}
                      name="deliveredDate"
                    />
                  </td> */}
                </tr>
                <tr>
                  <td>Delivered To</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      className={Class.tableRow}
                      type="text"
                      value={deliveredTo}
                      name="deliveredTo"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Charge Backs</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      className={Class.tableRow}
                      type="number"
                      value={chargebacks}
                      name="chargebacks"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Comments</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      className={Class.tableRow}
                      type="text"
                      value={comments}
                      name="comments"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={Class.itemButtonsContainer}>
            {this.props.itemLivestockDetails.status ===
              "Pending Producer" ? null : (
                <button
                  className={Class.itemButtonsModify}
                  onClick={() => {
                    this.modifyItem(false)
                    this.props.openPushThroughPopUp(
                      this.props.itemLivestockDetails.status,
                      "livestock",
                    )
                  }}
                >
                  {this.props.pushThroughBtnText}
                </button>
              )}

            <button
              className={Class.itemButtonsCancel}
              onClick={this.props.removeOverlay}
            >
              Cancel
            </button>
            <button
              className={Class.itemButtonsCancel}
              onClick={this.modifyItem}
            >
              Modify
            </button>

            {this.state.showRejectBtn === false ? console.log() : rejectBtn}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductLivestockDetail;
