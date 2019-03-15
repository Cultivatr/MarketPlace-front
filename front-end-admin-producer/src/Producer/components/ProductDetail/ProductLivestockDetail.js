import React, { Component } from 'react';
import Class from "./ProductDetail.module.css";
import "./ProductDetail.css"

class ProductLivestockDetail extends Component {

    getBrandValue = () => {
        const value = this.props.itemLivestockDetails.singleBrand;
        if (value === true) {
            let brandValue = value.toString();  
            return brandValue;
        } else if (value === false) {
            let brandValue = value.toString();
            return brandValue;
        }
    }
    
    render() {
        const { id, type, breed, feedMethod, typeOfPasture, typeOfFeed, birthdate, regNumber, rfid,
                estStartingWeight, hangingWeight, chargebacks, comments, deliveredTo, deliveredDate, 
                dateOnFeed, estCompletionDate, estFinishedWeight, estFinalPrice, quantity, finalPrice,
                status} = this.props.itemLivestockDetails;
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
                                <td className={Class.noInput}>{status}</td>
                            </tr>
                            <tr>
                                <td>Breed</td>
                                <td className={Class.noInput}>{breed}</td>
                            </tr>
                            <tr>
                                <td>Single Brand</td>
                                <td className={Class.noInput}>{this.getBrandValue()}</td>
                                
                            </tr>
                            <tr>
                                <td>Estimated Birthdate</td>
                                <td className={Class.noInput}>{birthdate}</td>
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
                                <td className={Class.noInput}>{dateOnFeed}</td>
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
                                <td>Est Starting Weight</td>
                                <td className={Class.noInput}>{estStartingWeight}</td>
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
                                <td className={Class.noInput}>{estFinalPrice}</td>
                            </tr>
                            <tr>
                                <td>Hanging Weight</td>
                                <td className={Class.noInput}>{hangingWeight}</td>
                            </tr>
                            <tr>
                                <td>Final Price</td>
                                <td className={Class.noInput}>{finalPrice}</td>
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
                                <td>Charge Backs</td>
                                <td className={Class.noInput}>{chargebacks}</td>
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