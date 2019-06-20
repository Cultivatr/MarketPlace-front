import React, { Component } from "react";
import Class from "./ItemDetail.module.css";
import "./ItemDetail.css";
import { modifyItemProduceQuery } from "../../../SharedComponents/LocalServer/LocalServer"

class ProductProduceDetail extends Component {
  constructor() {
    super();
    this.state = {
      itemProduceDetails: "",
      pushThroughText: "Accept"
    };
    this.priorCompletionDate = "";
    this.priorDeliveredDate = "";
    this.rejectshow = false;
  }

  componentDidMount(){
    switch (this.props.itemProduceDetails.status) {
      case "Sold":
        this.rejectshow = false;
        break;
      case "Delivered":
        this.rejectshow = false;
        break;
      case "Archive":
        this.rejectshow = false;
        break;
      case "Not Accepted":
        this.rejectshow = true;
        break;
      case "Accepted":
        this.rejectshow = true;
        break;
    }
    return this.rejectshow
  }


  getPackageTypeValue = () => {
    const element = document.getElementById("packageType");
    switch (this.props.itemProduceDetails.packageType) {
      case "Bunch":
        element.value = "Bunch";
        break;
      case "Head":
        element.value = "Head";
        break;
      case "Bag":
        element.value = "Bag";
        break;
      default:
        break;
    }
  };

  getEstCompletionDate = () => {
    const propCompletionDate = this.props.itemProduceDetails.estCompletionDate;
    if (propCompletionDate) {
      if (propCompletionDate === "Mon, 01 Jan 1 00:00:00 GMT") {
        this.priorCompletionDate = "No value entered";
      } else {
        this.priorCompletionDate = propCompletionDate;
      }
    }
  };
  getDeliveredDate = () => {
    const propDeliveredDate = this.props.itemProduceDetails.deliveredDate;
    if (propDeliveredDate === "Mon, 01 Jan 1 00:00:00 GMT") {
      this.priorDeliveredDate = "No value entered";
    } else {
      this.priorDeliveredDate = propDeliveredDate;
    }
  };

  onChange = e => {
    let itemProduceDetails = this.props.itemProduceDetails;
    itemProduceDetails[e.target.name] = e.target.value;
    this.setState({ itemProduceDetails: itemProduceDetails });
  };

  getModifiedSeedValue = () => {
    const propModifiedSeed = this.props.itemProduceDetails.modifiedSeed;
    const element = document.getElementById("modifiedSeed");
    if (propModifiedSeed === true) {
      element.value = "Yes";
    } else if (propModifiedSeed === false) {
      element.value = "No";
    }
  };

  getHeirloomValue = () => {
    const propHeirloom = this.props.itemProduceDetails.heirloom;
    const element = document.getElementById("heirloom");
    if (propHeirloom === true) {
      element.value = "Yes";
    } else if (propHeirloom === false) {
      element.value = "No";
    }
  };

  getCOValue = () => {
    const propCO = this.props.itemProduceDetails.certifiedOrganic;
    const element = document.getElementById("certifiedOrganic");
    if (propCO === true) {
      element.value = "Yes";
    } else if (propCO === false) {
      element.value = "No";
    }
  };

  modifyItem = async (removeO = true) => {
    if (this.state.itemProduceDetails !== "") {
      await modifyItemProduceQuery(this.state.itemProduceDetails);
      await this.props.refreshProduce(this.state.itemProduceDetails);
    };
    removeO && this.props.removeOverlay();

  };

  render() {
    const {
      id,
      type,
      packageSize,
      packageSizeUnit,
      estCompletionDate,
      seedType,
      fertilizerTypeUsed,
      pesticideTypeUsed,
      deliveredDate,
      comments,
      estQuantityPlanted,
      estFinishedQty,
      estPrice,
      qtyAcceptedForListing,
      qtyAcceptedAtDelivery,
      chargebacks,
      finalPricePaid,
      deliveredTo,
      status
    } = this.props.itemProduceDetails;
    return (
      <div id="itemProduceOverlay">
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
                <tr>
                  <td className="three wide column">Package Type</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="packageType"
                      name="packageType"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Bunch">Bunch</option>
                      <option value="Head">Head</option>
                      <option value="Bag">Bag</option>
                    </select>
                    {this.getPackageTypeValue()}
                  </td>
                </tr>
                <tr>
                  <td>Package Size</td>
                  <td className={Class.row}>
                    <div className="qty-container">
                      <input
                        onChange={this.onChange}
                        type="text"
                        name="packageSize"
                        className="qty-form"
                        value={packageSize}
                      />
                      <select
                        onChange={this.onChange}
                        name="packageSizeUnit"
                        multiple=""
                        value={packageSizeUnit}
                        className="ui fluid dropdown qty-dropdown"
                      >
                        <option value="Pounds">Pounds</option>
                        <option value="Grams">Grams</option>
                      </select>
                    </div>
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
                        placeholder={estCompletionDate}
                      />
                      <div className="tableRowDate2">
                        {this.getEstCompletionDate()}
                        Current: {this.priorCompletionDate}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Seed Type</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="seedType"
                      className={Class.tableRow}
                      type="text"
                      value={seedType}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Modified Seed</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="modifiedSeed"
                      name="modifiedSeed"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {this.getModifiedSeedValue()}
                  </td>
                </tr>
                <tr>
                  <td>Heirloom</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="heirloom"
                      name="heirloom"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {this.getHeirloomValue()}
                  </td>
                </tr>
                <tr>
                  <td>Fertilizer Type</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="fertilizerTypeUsed"
                      className={Class.tableRow}
                      type="text"
                      value={fertilizerTypeUsed}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Pesticide Type</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="pesticideTypeUsed"
                      className={Class.tableRow}
                      type="text"
                      value={pesticideTypeUsed}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Est. Quantity Planted</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="estQuantityPlanted"
                      className={Class.tableRow}
                      type="number"
                      value={estQuantityPlanted}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Certified Organic</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="certifiedOrganic"
                      name="certifiedOrganic"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {this.getCOValue()}
                  </td>
                </tr>
                <tr>
                  <td>Est. Finished Qty</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="estFinishedQty"
                      className={Class.tableRow}
                      type="number"
                      value={estFinishedQty}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Est. Price</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="estPrice"
                      className={Class.tableRow}
                      type="number"
                      value={estPrice}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Qty Accepted For Listing</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="qtyAcceptedForListing"
                      className={Class.tableRow}
                      type="number"
                      value={qtyAcceptedForListing}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Qty Accepted At Delivery</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="qtyAcceptedAtDelivery"
                      className={Class.tableRow}
                      type="number"
                      value={qtyAcceptedAtDelivery}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Final Price Paid</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="finalPricePaid"
                      className={Class.tableRow}
                      type="number"
                      value={finalPricePaid}
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
                        placeholder={estCompletionDate}
                      />
                      <div className="tableRowDate2">
                        {this.getDeliveredDate()}
                        Current: {this.priorDeliveredDate}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Delivered To</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      onChange={this.onChange}
                      name="deliveredTo"
                      type="text"
                      value={deliveredTo}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Chargebacks</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="chargebacks"
                      className={Class.tableRow}
                      type="number"
                      value={chargebacks}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Comments</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="comments"
                      className={Class.tableRow}
                      type="text"
                      value={comments}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={Class.itemButtonsContainer}>
            {this.props.itemProduceDetails.status === "Pending Producer" ? (
              ""
            ) : (
                <button
                  className={Class.itemButtonsModify}
                  onClick={() => {
                    this.modifyItem(false)
                    this.props.openPushThroughPopUp(
                      this.props.itemProduceDetails.status,
                      "produce",
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
            
            {this.showReject === true ?
              <button
              className={Class.itemButtonsCancel}
              onClick={() =>
                this.props.rejectProduce(this.props.itemProduceDetails.id)
              }>Reject
              </button> 
            : console.log()}
                  
            
          </div>
        </div>
      </div>
    );
  }
}

export default ProductProduceDetail;
