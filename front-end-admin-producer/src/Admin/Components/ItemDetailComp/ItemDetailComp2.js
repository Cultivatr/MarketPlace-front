import React from "react";
import "./itemDetailComp.css";

class ItemDetailComp2 extends React.Component {

    render() {
        return (
            <div className="container-items">
                <div id="item-overlay">
                <div className="item-detail-container">
                    <div className="item-title-container">
                    <h4 className="items-title">{this.props.itemDetails.farm} | ORDER #<i>{this.props.itemDetails.id}</i></h4>
                    </div>
                    <div className="item-container">
                    <div className="farm-detail">
                        <p>Farm: <i>{this.props.itemDetails.farm}</i></p>
                        <p>Producer Name: <i>{}</i></p>
                        <p>Phone Number: </p>
                        <p>Email: </p>
                    </div>
                    <div className="item-detail">
                        <p>Type: </p>
                        <p>Item: <i>{this.props.itemDetails.product}</i></p>
                        <p>Weight: </p>
                        <p>Qty: <i>{this.props.itemDetails.qty}</i></p>
                        <p>Date Submitted: <i>{this.props.itemDetails.date}</i></p>
                        <p>Status: <i>{this.props.itemDetails.status}</i></p>
                    </div>
                    </div>
                    <div className="item-buttons-container">
                    <button className="item-buttons-accept" onClick={this.props.removeOverlay}>Accept</button>
                    <button className="item-buttons-modify" onClick={this.props.removeOverlay}>Modify</button>
                    <button className="item-buttons-deny" onClick={this.props.removeOverlay}>Deny</button>
                    <button className="item-buttons-cancel" onClick={this.props.removeOverlay}>Cancel</button>
                    </div>
                </div>  
                </div>  
            </div>
        );
    }
}

export default ItemDetailComp2;
