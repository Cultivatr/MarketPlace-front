import React, { Component } from 'react';
import Class from "./itemDetailComp.module.css";
import "./itemDetailComp.css"

class ItemDetailLivestockComp extends Component {
    render() {
        console.log(this.props.itemLivestockDetails)
        const { id, type, breed, singleBrand, birthdate, regNumber, rfid, estStartingWeight, hangingWeight,
            chargebacks, comments, deliveredTo, deliveredDate, dateOnFeed, feedMethod, typeOfPasture,
            typeOfFeed, estCompletionDate, estFinishedWeight, estFinalPrice, quantity, finalPrice, status } = this.props.itemLivestockDetails;
        return (
            <div id="itemLivestockOverlay">
                <div className={Class.itemDetailContainer}>
                    <div className={Class.tableHeader}>
                        <h4 className="ui horizontal divider header">{type} | Item # <i>{id}</i></h4>
                    </div>
                    <div className={Class.itemTable}>
                        <table className="ui definition table">
                            <tbody>
                                <tr>
                                    <td>Status</td>
                                    <td>{status}</td>
                                </tr>
                                <tr>
                                    <td className="two wide column">Breed</td>
                                    <td>{breed}</td>
                                </tr>
                                <tr>
                                    <td>Single Brand</td>
                                    <td>{singleBrand}</td>
                                </tr>
                                <tr>
                                    <td>Estimated Birthdate</td>
                                    <td>{birthdate}</td>
                                </tr>
                                <tr>
                                    <td>Registration Number</td>
                                    <td>{regNumber}</td>
                                </tr>
                                <tr>
                                    <td>RFID Tag</td>
                                    <td>{rfid}</td>
                                </tr>
                                <tr>
                                    <td>Date On Feed</td>
                                    <td>{dateOnFeed}</td>
                                </tr>
                                <tr>
                                    <td>Feed Method</td>
                                    <td>{feedMethod}</td>
                                </tr>
                                <tr>
                                    <td>Type Of Pasture</td>
                                    <td>{typeOfPasture}</td>
                                </tr>
                                <tr>
                                    <td>Type Of Feed</td>
                                    <td>{typeOfFeed}</td>
                                </tr>
                                <tr>
                                    <td>Est Starting Weight</td>
                                    <td>{estStartingWeight}</td>
                                </tr>
                                <tr>
                                    <td>Quantity</td>
                                    <td>{quantity}</td>
                                </tr>
                                <tr>
                                    <td>Est Completion Date</td>
                                    <td>{estCompletionDate}</td>
                                </tr>
                                <tr>
                                    <td>Est Finished Weight</td>
                                    <td>{estFinishedWeight}</td>
                                </tr>
                                <tr>
                                    <td>Est Final Price</td>
                                    <td>{estFinalPrice}</td>
                                </tr>
                                <tr>
                                    <td>Hanging Weight</td>
                                    <td>{hangingWeight}</td>
                                </tr>
                                <tr>
                                    <td>Final Price</td>
                                    <td>{finalPrice}</td>
                                </tr>
                                <tr>
                                    <td>Delivered Date</td>
                                    <td>{deliveredDate}</td>
                                </tr>
                                <tr>
                                    <td>Delivered To</td>
                                    <td>{deliveredTo}</td>
                                </tr>
                                <tr>
                                    <td>Charge Backs</td>
                                    <td>{chargebacks}</td>
                                </tr>
                                <tr>
                                    <td>Comments</td>
                                    <td>{comments}</td>
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

export default ItemDetailLivestockComp;
