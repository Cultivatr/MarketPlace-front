import React, { Component } from "react";
import Class from "./ItemDetail.module.css";
import "./ItemDetail.css";

class ProductLivestockDetail extends Component {
  componentDidMount = () => {
    console.log("Livestock Rendered");
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
                  <td className={Class.noInput}>{status}</td>
                </tr>
                <tr>
                  <td>Breed</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="breed"
                      name="breed"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Angus">Angus</option>
                      <option value="Birkshire">Birkshire</option>
                      <option value="Other">Other</option>
                    </select>
                    {this.getBreedValue()}
                  </td>
                </tr>
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
                  <td>Estimated Birthdate</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={birthdate}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Registration Number</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={regNumber}
                    />
                  </td>
                </tr>
                <tr>
                  <td>RFID Tag</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={rfid}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Date On Feed</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={dateOnFeed}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Feed Method</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="feedMethod"
                      name="feedMethod"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Grass">Grass</option>
                      <option value="GrassBarley">
                        Grass and Barley Finished
                      </option>
                      <option value="GrassGrain">
                        Grass and Grain Finished
                      </option>
                      <option value="FreeRange">Free Range</option>
                      <option value="Other">Other</option>
                    </select>
                    {this.getFeedMethodValue()}
                  </td>
                </tr>
                <tr>
                  <td>Type Of Pasture</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="typeOfPasture"
                      name="typeOfPasture"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Timothy">Timothy</option>
                      <option value="Alfa">Alfa</option>
                      <option value="Other">Other</option>
                    </select>
                    {this.getTypeOfPastureValue()}
                  </td>
                </tr>
                <tr>
                  <td>Type Of Feed</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="typeOfFeed"
                      name="typeOfFeed"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Grain">Grain</option>
                      <option value="Barley">Barley</option>
                      <option value="Other">Other</option>
                    </select>
                    {this.getTypeOfFeedValue()}
                  </td>
                </tr>
                <tr>
                  <td>Est Starting Weight</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={estStartingWeight}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={quantity}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Est Completion Date</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={estCompletionDate}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Est Finished Weight</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={estFinishedWeight}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Est Final Price</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={estFinalPrice}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Hanging Weight</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={hangingWeight}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Final Price</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={finalPrice}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Delivered Date</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={deliveredDate}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Delivered To</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={deliveredTo}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Charge Backs</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={chargebacks}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Comments</td>
                  <td className={Class.row}>
                    <input
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
              onClick={() =>
                this.props.pushThroughLivestock(
                  this.props.itemLivestockDetails.id,
                  this.props.itemLivestockDetails.status
                )
              }
            >
              Push Through
            </button>
            <button
              className={Class.itemButtonsCancel}
              onClick={this.props.removeOverlay}
            >
              Cancel
            </button>
            <button
              className={Class.itemButtonsCancel}
              onClick={() =>
                this.props.rejectLivestock(this.props.itemLivestockDetails.id)
              }
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductLivestockDetail;
