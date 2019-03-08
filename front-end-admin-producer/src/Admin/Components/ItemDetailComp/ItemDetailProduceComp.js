import React, { Component } from 'react';
import Class from "./itemDetailComp.module.css";
import "./itemDetailComp.css"

class ItemDetailProduceComp extends Component {
    render() {
        console.log(this.props.itemProduceDetails)
        const { id, type, packageType, datePlanted, seedType, modifiedSeed, heirloom, fertilizerTypeUsed,
            pesticideTypeUsed, deliveredDate, comments, estQuantityPlanted, gmo, estFinishedQty, estPrice,
            qtyAcceptedForListing, qtyAcceptedAtDelivery, chargebacks, finalPricePaid, deliveredTo, status } = this.props.itemProduceDetails;
        return (
            <div id="itemProduceOverlay">
                <div className={Class.itemDetailContainer}>
                    <div className={Class.tableHeader}>
                        <h4 className="ui horizontal divider header">{type} | Item # <i>{id}</i></h4>
                    </div>
                    <div className={Class.userTable}>
                        <table className="ui definition table">
                            <tbody>
                                <tr>
                                    <td>Status</td>
                                    <td>{status}</td>
                                </tr>
                                <tr>
                                    <td className="two wide column">Package Type</td>
                                    <td>{packageType}</td>
                                </tr>
                                <tr>
                                    <td className="two wide column">Date Planted</td>
                                    <td>{datePlanted}</td>
                                </tr>
                                <tr>
                                    <td>Seed Type</td>
                                    <td>{seedType}</td>
                                </tr>
                                <tr>
                                    <td>Modified Seed</td>
                                    <td>{modifiedSeed}</td>
                                </tr>
                                <tr>
                                    <td>Heirloom</td>
                                    <td>{heirloom}</td>
                                </tr>
                                <tr>
                                    <td>Fertilizer Type</td>
                                    <td>{fertilizerTypeUsed}</td>
                                </tr>
                                <tr>
                                    <td>Pesticide Type</td>
                                    <td>{pesticideTypeUsed}</td>
                                </tr>
                                <tr>
                                    <td>Est. Quantity Planted</td>
                                    <td>{estQuantityPlanted}</td>
                                </tr>
                                <tr>
                                    <td>GMO</td>
                                    <td>{gmo}</td>
                                </tr>
                                <tr>
                                    <td>Est. Finished Qty</td>
                                    <td>{estFinishedQty}</td>
                                </tr>
                                <tr>
                                    <td>Est. Price</td>
                                    <td>{estPrice}</td>
                                </tr>
                                <tr>
                                    <td>Qty Accepted For Listing</td>
                                    <td>{qtyAcceptedForListing}</td>
                                </tr>
                                <tr>
                                    <td>Qty Accepted At Delivery</td>
                                    <td>{qtyAcceptedAtDelivery}</td>
                                </tr>
                                <tr>
                                    <td>Final Price Paid</td>
                                    <td>{finalPricePaid}</td>
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
                                    <td>Chargebacks</td>
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

export default ItemDetailProduceComp;
