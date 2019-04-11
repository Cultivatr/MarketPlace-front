import React, { Component } from "react";
import Class from "./ProductDetail.module.css";
import "./ProductDetail.css";
import { modifyItemProduce } from "../../../AppUtils";

class ProductProduceDetail extends Component {
  constructor() {
    super();
    this.state = {
      itemProduceDetails: ""
    };
  }

  modifyItem = async () => {
    modifyItemProduce(this.state.itemProduceDetails);
    this.props.removeOverlay();
    this.props.refreshProduce(this.state.itemProduceDetails);
  };

  onChange = e => {
    let itemProduceDetails = this.props.itemProduceDetails;
    itemProduceDetails[e.target.name] = e.target.value;
    this.setState({ itemProduceDetails: itemProduceDetails });
    console.log("Produce details:", this.state.itemProduceDetails);
  };

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

  getGmoValue = () => {
    const propGmo = this.props.itemProduceDetails.gmo;
    const element = document.getElementById("gmo");
    if (propGmo === true) {
      element.value = "Yes";
    } else if (propGmo === false) {
      element.value = "No";
    }
  };

  render() {
    const {
      id,
      type,
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
      finalPricePaid,
      deliveredTo,
      status
    } = this.props.itemProduceDetails;
    return (
      <div id="produceOverlay">
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
                  <td className={Class.noInput}>{status}</td>
                </tr>
                <tr>
                  <td>Package Type</td>
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
                  {/* The variable change from datePlanted -> estCompletionDate
                  Has not been changed throughout the code for now */}
                  <td className="two wide column">Est Completion Date</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={estCompletionDate}
                    />
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
                      placeholder={seedType}
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
                      placeholder={fertilizerTypeUsed}
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
                      placeholder={pesticideTypeUsed}
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
                      type="text"
                      placeholder={estQuantityPlanted}
                    />
                  </td>
                </tr>
                <tr>
                  <td>GMO</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="gmo"
                      name="gmo"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {this.getGmoValue()}
                  </td>
                </tr>
                <tr>
                  <td>Est. Finished Qty</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="estFinishedQty"
                      className={Class.tableRow}
                      type="text"
                      placeholder={estFinishedQty}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Est. Price</td>
                  <td className={Class.noInput}>{estPrice}</td>
                </tr>
                <tr>
                  <td>Qty Accepted For Listing</td>
                  <td className={Class.noInput}>{qtyAcceptedForListing}</td>
                </tr>
                <tr>
                  <td>Qty Accepted At Delivery</td>
                  <td className={Class.noInput}>{qtyAcceptedAtDelivery}</td>
                </tr>
                <tr>
                  <td>Final Price Paid</td>
                  <td className={Class.noInput}>{finalPricePaid}</td>
                </tr>
                <tr>
                  <td>Delivered Date</td>
                  <td className={Class.noInput}>{deliveredDate}</td>
                </tr>
                <tr>
                  <td>Delivered To</td>
                  <td className={Class.noInput}>{deliveredTo}</td>
                </tr>
                <tr>
                  <td>Comments</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="comments"
                      className={Class.tableRow}
                      type="text"
                      placeholder={comments}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={Class.itemButtonsContainer}>
            <button
              className={Class.itemButtonsModify}
              onClick={() => this.modifyItem()}
            >
              Modify
            </button>
            <button
              className={Class.itemButtonsCancel}
              onClick={this.props.removeOverlay}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductProduceDetail;
