import React, { Component } from "react";
import Class from "./ProductDetail.module.css";
import "./ProductDetail.css";
import { modifyItemLivestock } from "../../../AppUtils";

class ProductLivestockDetail extends Component {
  constructor() {
    super();
    this.state = {
      itemLivestockDetails: ""
    };
    this.priorCompletionDate = 0;
  }

  onChange = e => {
    let itemLivestockDetails = this.props.itemLivestockDetails;
    itemLivestockDetails[e.target.name] = e.target.value;
    this.setState({ itemLivestockDetails: itemLivestockDetails });
    console.log("Livestock details:", this.state.itemLivestockDetails);
  };

  modifyItem = async () => {
    modifyItemLivestock(this.state.itemLivestockDetails);
    this.props.removeOverlay();
    this.props.refreshLiveStock(this.state.itemLivestockDetails);
  };

  getBrandValue = () => {
    const value = this.props.itemLivestockDetails.singleBrand;
    if (value === true) {
      let brandValue = value.toString();
      return brandValue;
    } else if (value === false) {
      let brandValue = value.toString();
      return brandValue;
    }
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

  render() {
    const {
      id,
      type,
      breed,
      feedMethod,
      typeOfPasture,
      typeOfFeed,
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
    return (
      <div id="livestockOverlay">
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
                  <td>Breed</td>
                  <td className={Class.noInput}>{breed}</td>
                </tr>
                <tr>
                  <td>Single Brand</td>
                  <td className={Class.noInput}>
                    {this.props.itemLivestockDetails.singleBrand}
                  </td>
                </tr>
                <tr>
                  <td>Est Date of Birth</td>
                  <td className={Class.noInput}>
                    {birthdate === "Mon, 01 Jan 1 00:00:00 GMT"
                      ? ""
                      : birthdate}
                  </td>
                </tr>
                <tr>
                  <td>Registration Number</td>
                  <td className={Class.noInput}>{regNumber}</td>
                </tr>
                <tr>
                  <td>RFID Tag</td>
                  <td className={Class.noInput}>{rfid}</td>
                </tr>
                <tr>
                  <td>Date On Feed</td>
                  <td className={Class.noInput}>
                    {dateOnFeed === "Mon, 01 Jan 1 00:00:00 GMT"
                      ? ""
                      : dateOnFeed}
                  </td>
                </tr>
                <tr>
                  <td>Feed Method</td>
                  <td className={Class.noInput}>{feedMethod}</td>
                </tr>
                <tr>
                  <td>Type Of Pasture</td>
                  <td className={Class.noInput}>{typeOfPasture}</td>
                </tr>
                <tr>
                  <td>Type Of Feed</td>
                  <td className={Class.noInput}>{typeOfFeed}</td>
                </tr>
                <tr>
                  <td>Est Starting Weight in Pounds</td>
                  <td className={Class.noInput}>{estStartingWeight}</td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="number"
                      placeholder={quantity}
                      onChange={this.onChange}
                      name="quantity"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Est Completion Date</td>
                  <td className={Class.row}>
                    <div className={Class.tableRowDateParent}>
                      <input
                        className={Class.tableRowDate1}
                        type="date"
                        id="estCompletionDate"
                        onChange={this.onChange}
                        name="estCompletionDate"
                        value={estCompletionDate}
                        placeholder={estCompletionDate}
                      />
                      <div className={Class.tableRowDate2}>
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
                      className={Class.tableRow}
                      type="number"
                      placeholder={estFinishedWeight}
                      onChange={this.onChange}
                      name="estFinishedWeight"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Est Final Price</td>
                  <td className={Class.noInput}>
                    {estFinalPrice === 0 ? "" : estFinalPrice}
                  </td>
                </tr>
                <tr>
                  <td>Hanging Weight in Pounds</td>
                  <td className={Class.noInput}>
                    {hangingWeight === 0 ? "" : hangingWeight}
                  </td>
                </tr>
                <tr>
                  <td>Final Price</td>
                  <td className={Class.noInput}>
                    {finalPrice === 0 ? "" : finalPrice}
                  </td>
                </tr>
                <tr>
                  <td>Delivered Date</td>
                  <td className={Class.noInput}>
                    {deliveredDate === "Mon, 01 Jan 1 00:00:00 GMT"
                      ? ""
                      : deliveredDate}
                  </td>
                </tr>
                <tr>
                  <td>Delivered To</td>
                  <td className={Class.noInput}>{deliveredTo}</td>
                </tr>
                <tr>
                  <td>Charge Backs</td>
                  <td className={Class.noInput}>
                    {chargebacks === 0 ? "" : chargebacks}
                  </td>
                </tr>
                <tr>
                  <td>Comments</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={comments}
                      onChange={this.onChange}
                      name="comments"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={Class.itemButtonsContainer}>
            <button
              className={Class.itemButtonsModify}
              onClick={this.modifyItem}
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

export default ProductLivestockDetail;
