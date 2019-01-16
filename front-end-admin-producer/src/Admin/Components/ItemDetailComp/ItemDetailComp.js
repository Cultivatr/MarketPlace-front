import React, { Component } from 'react';
import Class from "./itemDetailComp.module.css";
import "./itemDetailComp.css"

class ItemDetailComp extends Component {
    render() {
        return (
            <div id="itemOverlay">
                <div className={Class.itemDetailContainer}>
                    <div className={Class.tableHeader}>
                        <h4 className="ui horizontal divider header">{this.props.itemDetails.farm} | Order #<i>{this.props.itemDetails.id}</i></h4>
                    </div>
                    <div className={Class.itemTable}>
                        <table className="ui definition table">
                        <tbody>
                            <tr>
                                <td className="two wide column">Type</td>
                                <td>{this.props.itemDetails.product}</td>
                            </tr>
                            <tr>
                                <td>Breed</td>
                                <td>Angus</td>
                            </tr>
                            <tr>
                                <td>Birthdate</td>
                                <td>Sept 20, 2017</td>
                            </tr>
                            <tr>
                                <td>Registration Number</td>
                                <td>12345</td>
                            </tr>
                            <tr>
                                <td>RFID Tag</td>
                                <td>12345</td>
                            </tr>
                            <tr>
                                <td>Est. Starting Weight</td>
                                <td>500lbs</td>
                            </tr>
                            <tr>
                                <td>Date on Feed</td>
                                <td>Sept 20, 2017</td>
                            </tr>
                            <tr>
                                <td>Feed Method</td>
                                <td>Grass and Grain Finished</td>
                            </tr>
                            <tr>
                                <td>Type of Pasture</td>
                                <td>---</td>
                            </tr>
                            <tr>
                                <td>Type of Feed</td>
                                <td>Grain</td>
                            </tr>
                            <tr>
                                <td>Est. Completion Date</td>
                                <td>Dec 20, 2018</td>
                            </tr>
                            <tr>
                                <td>Est. Finished Date</td>
                                <td>Jan 15, 2019</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{this.props.itemDetails.status}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{this.props.itemDetails.status}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{this.props.itemDetails.status}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{this.props.itemDetails.status}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{this.props.itemDetails.status}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{this.props.itemDetails.status}</td>
                            </tr>
                            
                        </tbody>
                        </table>
                    </div>
                    <div className={Class.itemButtonsContainer}>
                        <button className={Class.itemButtonsAccept} onClick={this.props.removeOverlay}>Accept</button>
                        <button className={Class.itemButtonsModify} onClick={this.props.removeOverlay}>Modify</button>
                        <button className={Class.itemButtonsDeny} onClick={this.props.removeOverlay}>Deny</button>
                        <button className={Class.itemButtonsCancel} onClick={this.props.removeOverlay}>Cancel</button>
                    </div> 
                </div>
            </div> 
        )
    }
}

export default ItemDetailComp;
