import React, { Component, Fragment } from "react";
import { getItemDetails } from "../../../AppUtils";
import Toolbar from "../../../SharedComponents/Navigation/Toolbar/Toolbar";
import ProductProduceDetail from "../ProductDetail/ProductProduceDetail";
import ProductLivestockDetail from "../ProductDetail/ProductLivestockDetail";
import Class from "./ProducerApproval.module.css";
import ProducerApprovalTable from "./ProducerApprovalTable";
const domainLink = "https://hidden-escarpment-75213.herokuapp.com/";
const domainLink2 = "http://localhost:5000";

class ProducerApproval extends Component {
  constructor() {
    super();
    this.produceItems = [];
    this.livestockItems = [];
    this.data = [];
    this.state = {
      userFullName: "",
      data: {},
      items_produce: [],
      items_livestock: [],
      itemProduceDetails: {},
      itemLivestockDetails: {},
      localId: ""
    };
  }
  approveItemProduce = async id => {
    const subId = id.substr(2);
    console.log("!!!!!", subId);
    await fetch(domainLink2 + "/produce/incrementStatus/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: subId,
        nextStatus: "Accepted"
      })
    }).catch(error => console.log(error));
  };

  approveItemLivestock = async id => {
    const subId = id.substr(2);
    await fetch(domainLink2 + "/livestock/incrementStatus/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: subId,
        nextStatus: "Accepted"
      })
    }).catch(error => console.log(error));
  };

  getItemObj = async e => {
    let i;
    for (i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id[0] === "P") {
        this.produceItems.push(this.state.data[i]);
      } else if (this.state.data[i].id[0] === "L") {
        this.livestockItems.push(this.state.data[i]);
      }
    }
    if (e.target.id.search("P") === 0) {
      await this.setState({
        itemProduceDetails: getItemDetails(e.target.id, this.produceItems)
      });
      this.showOverlayProduce();
    } else if (e.target.id.search("L") === 0) {
      await this.setState({
        itemLivestockDetails: getItemDetails(e.target.id, this.livestockItems)
      });
      this.showOverlayLivestock();
    }
  };

  showOverlayProduce = () => {
    document.getElementById("produceOverlay").style.display = "block";
  };

  showOverlayLivestock = () => {
    document.getElementById("livestockOverlay").style.display = "block";
  };

  componentDidMount = async () => {
    await this.getId();
    const user1 = this.state.localId;
    try {
      const response = await fetch(domainLink + `produce/${user1}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      console.log("produce:", json);
      this.setState({ items_produce: json });
      const response2 = await fetch(domainLink + `livestock/${user1}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json2 = await response2.json();
      this.setState({ items_livestock: json2 });
    } catch (error) {
      console.log(error);
    }
    await this.createData();
  };

  getId = () => {
    const tempId = JSON.parse(sessionStorage.getItem("authData")).id;
    console.log("ID", tempId);
    this.setState({
      localId: tempId,
      userFullName: JSON.parse(sessionStorage.getItem("authData")).fullName
    });
  };

  createData = () => {
    if (this.state.items_produce.produce) {
      this.state.items_produce.produce.forEach(item => {
        if (item.status === "Pending Producer") {
          this.data.push(item);
        }
      });
    }
    if (this.state.items_livestock.livestock) {
      this.state.items_livestock.livestock.forEach(item => {
        if (item.status === "Pending Producer") {
          this.data.push(item);
        }
      });
    }

    this.setState({ data: this.data });
  };

  removeOverlay = event => {
    document.getElementById("produceOverlay").style.display = "none";
    document.getElementById("livestockOverlay").style.display = "none";
  };

  refreshLiveStock = data => {
    this.setState({ items_livestock: data });
  };

  refreshProduce = data => {
    this.setState({ itemProduceDetails: data });
  };

  render() {
    return (
      <Fragment>
        <Toolbar />
        <div className="ui container">
          <div className={Class.table}>
            <br />
            <div>Items Accepted By Admin Awaiting Your Approval</div>
            <ProducerApprovalTable data={this.data} />
            <ProductProduceDetail
              approveItem={this.approveItemLivestock}
              itemProduceDetails={this.state.itemProduceDetails}
              removeOverlay={this.removeOverlay}
              refreshProduce={this.refreshProduce}
            />
            <ProductLivestockDetail
              approveItem={this.approveItemLivestock}
              itemLivestockDetails={this.state.itemLivestockDetails}
              removeOverlay={this.removeOverlay}
              refreshLiveStock={this.refreshLiveStock}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProducerApproval;
