import React, { Component } from "react";
import Class from "./ProductDetail.module.css";
import "./ProductDetail.css";
import { modifyItemProduceQuery } from "../../../SharedComponents/LocalServer/LocalServer"


class ProductProduceDetail extends Component {
  constructor() {
    super();
    this.state = {
      itemProduceDetails: ''
    };
    this.priorCompletionDate = 0;
    this.modifiedSeed = "";
  }

  modifyItem = async () => {
    if (this.state.itemProduceDetails !== "") {
      await modifyItemProduceQuery(this.state.itemProduceDetails);
      await this.props.refreshProduce(this.state.itemProduceDetails);
    };
    
    this.props.removeOverlay();
    
  };

  onChange = e => {
    let itemProduceDetails = this.props.itemProduceDetails;
    itemProduceDetails[e.target.name] = e.target.value;
    this.setState({ itemProduceDetails: itemProduceDetails });
    console.log("Produce details:", itemProduceDetails);
    console.log("est completion date", this.props.itemProduceDetails[e.target.name]);

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

    console.log('props from summary', this.props.itemProduceDetails);
    // why can I access props here but not in constructor?

    // conditional render of Approve button only if on ItemsWaitingApproval view
    const btnApprove = (this.props.itemProduceDetails.status === "Pending Producer" && this.props.displayApprove) ? (
      <button
        className={Class.itemButtonsCancel}
        onClick={() =>
          this.props.approveItem(
            this.props.itemProduceDetails.id,
            this.props.itemProduceDetails.status
          )
        }
      >
        Approve
      </button>
    ) : null
    ;

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
                  <td className={Class.noInput}>
                    {this.props.itemProduceDetails.packageType}
                  </td>
                </tr>
                <tr>
                  <td>Package Size</td>
                  <td className={Class.noInput}>
                    {this.props.itemProduceDetails.packageSize}{" "}
                    {this.props.itemProduceDetails.packageSizeUnit}
                  </td>
                </tr>
                <tr>
                  <td>Est Completion Date</td>
                  <td className={Class.row}>
                    <div className={Class.tableRowDateParent}>
                      <input
                        className={Class.tableRow}
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
                  <td>Seed Type</td>
                  <td className={Class.noInput}>{seedType}</td>
                </tr>
                <tr>
                  <td>Modified Seed</td>
                  <td className={Class.noInput}>
                    {this.props.itemProduceDetails.modifiedSeed ? "Yes" : "No"}
                  </td>
                </tr>
                <tr>
                  <td>Heirloom</td>
                  <td className={Class.noInput}>
                    {this.props.itemProduceDetails.heirloom ? "Yes" : "No"}
                  </td>
                </tr>
                <tr>
                  <td>Fertilizer Type</td>
                  <td className={Class.noInput}>{fertilizerTypeUsed}</td>
                </tr>
                <tr>
                  <td>Pesticide Type</td>
                  <td className={Class.noInput}>{pesticideTypeUsed}</td>
                </tr>
                <tr>
                  <td>Est. Quantity Planted</td>
                  <td className={Class.noInput}>
                    {estQuantityPlanted === 0 ? "" : estQuantityPlanted}
                  </td>
                </tr>
                <tr>
                  <td>Certified Organic</td>
                  <td className={Class.noInput}>
                    {this.props.itemProduceDetails.certifiedOrganic
                      ? "Yes"
                      : "No"}
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
                      placeholder={estFinishedQty}
                      value={estFinishedQty}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Est. Price</td>
                  <td className={Class.noInput}>
                    {estPrice === 0 ? "" : estPrice}
                  </td>
                </tr>
                <tr>
                  <td>Qty Accepted For Listing</td>
                  <td className={Class.noInput}>
                    {qtyAcceptedForListing === 0 ? "" : qtyAcceptedForListing}
                  </td>
                </tr>
                <tr>
                  <td>Qty Accepted At Delivery</td>
                  <td className={Class.noInput}>
                    {qtyAcceptedAtDelivery === 0 ? "" : qtyAcceptedAtDelivery}
                  </td>
                </tr>
                <tr>
                  <td>Final Price Paid</td>
                  <td className={Class.noInput}>
                    {finalPricePaid === 0 ? "" : finalPricePaid}
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
                  <td>Comments</td>
                  <td className={Class.row}>
                    <input
                      onChange={this.onChange}
                      name="comments"
                      className={Class.tableRow}
                      type="text"
                      placeholder={comments}
                      value={comments}
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

            {btnApprove}

          </div>
        </div>
      </div>
    );
  }
}

export default ProductProduceDetail;
