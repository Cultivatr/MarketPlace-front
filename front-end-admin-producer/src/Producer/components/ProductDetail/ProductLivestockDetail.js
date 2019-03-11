import React, { Component } from 'react';
import Class from "./ProductLivestockDetail.module.css";
import "./ProductLivestockDetail.css"

class ProductLivestockDetail extends Component {

    getBreedValue = () => {
        if (this.props.itemLivestockDetails.breed === "Angus" || this.props.itemLivestockDetails.breed === "angus") {
            document.getElementById("breed").value = "Angus";
        } else if (this.props.itemLivestockDetails.breed === "Birkshire" || this.props.itemLivestockDetails.breed === "birkshire") {
            document.getElementById("breed").value = "Birkshire";
        } else if (this.props.itemLivestockDetails.breed === "Other" || this.props.itemLivestockDetails.breed === "other") {
            document.getElementById("breed").value = "Other";
        }
    }

    getSingleBrandValue = () => {
        if (this.props.itemLivestockDetails.singleBrand === true ) {
            document.getElementById("singleBrand").value = "Yes";
        } else if (this.props.itemLivestockDetails.singleBrand === false) {
            document.getElementById("singleBrand").value = "No";
        }
    }
    
    render() {
        const { id, type, birthdate, regNumber, rfid, estStartingWeight, hangingWeight, 
                chargebacks, comments, deliveredTo, deliveredDate, dateOnFeed, feedMethod, typeOfPasture,
                typeOfFeed, estCompletionDate, estFinishedWeight, estFinalPrice, quantity, finalPrice, status} = this.props.itemLivestockDetails;
        return (
            <div id="livestockOverlay">
                <div className={Class.itemDetailContainer}>
                    <div className={Class.tableHeader}>
                        <h4 className="ui horizontal divider header">{type} | Item # <i>{id}</i></h4>
                    </div>
                    <div className={Class.userTable}>
                        <table className="ui definition table">
                        <tbody>
                            <tr>
                                <td className="three wide column">Status</td>
                                <td className={Class.row}>{status}</td>
                            </tr>
                            <tr>
                                <td>Breed</td>
                                <td className={Class.row}>
                                    <select onChange={this.onChange} id="breed" name="breed" multiple="" className="ui fluid dropdown">
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
                                    <select onChange={this.onChange} id="singleBrand" name="singleBrand" multiple="" className="ui fluid dropdown">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                    {this.getSingleBrandValue()}
                                </td>
                            </tr>
                            <tr>
                                <td>Estimated Birthdate</td>
                                <td className={Class.row}><input className={Class.tableRow} type="date" value={birthdate} /></td>
                            </tr>
                            <tr>
                                <td>Registration Number</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={regNumber} /></td>
                            </tr>
                            <tr>
                                <td>RFID Tag</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={rfid} /></td>
                            </tr>
                            <tr>
                                <td>Date On Feed</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={dateOnFeed} /></td>
                            </tr>
                            <tr>
                                <td>Feed Method</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={feedMethod} /></td>
                            </tr>
                            <tr>
                                <td>Type Of Pasture</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={typeOfPasture} /></td>
                            </tr>
                            <tr>
                                <td>Type Of Feed</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={typeOfFeed} /></td>
                            </tr>
                            <tr>
                                <td>Est Starting Weight</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={estStartingWeight} /></td>
                            </tr>
                            <tr>
                                <td>Quantity</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={quantity} /></td>
                            </tr>
                            <tr>
                                <td>Est Completion Date</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={estCompletionDate} /></td>
                            </tr>
                            <tr>
                                <td>Est Finished Weight</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={estFinishedWeight} /></td>
                            </tr>
                            <tr>
                                <td>Est Final Price</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={estFinalPrice} /></td>
                            </tr>
                            <tr>
                                <td>Hanging Weight</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={hangingWeight} /></td>
                            </tr>
                            <tr>
                                <td>Final Price</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={finalPrice} /></td>
                            </tr>
                            <tr>
                                <td>Delivered Date</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={deliveredDate} /></td>
                            </tr>
                            <tr>
                                <td>Delivered To</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={deliveredTo} /></td>
                            </tr>
                            <tr>
                                <td>Charge Backs</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={chargebacks} /></td>
                            </tr>
                            <tr>
                                <td>Comments</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={comments} /></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div className={Class.itemButtonsContainer}>
                        <button className={Class.itemButtonsModify} onClick={this.props.removeOverlay}>Modify</button>
                        <button className={Class.itemButtonsCancel} onClick={this.props.removeOverlay}>Cancel</button>
                    </div> 
                </div>
            </div> 
        )
    }
}

export default ProductLivestockDetail;