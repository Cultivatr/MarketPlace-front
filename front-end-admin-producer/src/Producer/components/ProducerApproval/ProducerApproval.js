import React, { Component, Fragment } from "react";
import { getItemDetails } from "../../../AppUtils";
import Toolbar from "../../../SharedComponents/Navigation/Toolbar/Toolbar";
import ProductProduceDetail from "../ProductDetail/ProductProduceDetail";
import ProductLivestockDetail from "../ProductDetail/ProductLivestockDetail";
import Class from "./ProducerApproval.module.css";
import ProducerApprovalTable from "./ProducerApprovalTable";
import { incrementProduceQuery, incrementLivestockQuery, loadUserSpecificLivestockQuery, loadUserSpecificProduceQuery } from "../../../SharedComponents/LocalServer/LocalServer"

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
    await incrementProduceQuery(subId, "Accepted")
    await this.loadProduceData();
    await this.createData();
    await this.removeOverlay();
  };

  approveItemLivestock = async id => {
    const subId = id.substr(2);
    await incrementLivestockQuery(subId, "Accepted")
    await this.loadLivestockData();
    await this.createData();
    await this.removeOverlay();
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

  loadLivestockData = async () => {
    const user1 = this.state.localId;
    const response2 = await loadUserSpecificLivestockQuery(user1)
    const json2 = await response2.json();
    this.setState({ items_livestock: json2 });
  };

  loadProduceData = async () => {
    const user1 = this.state.localId;
    const response = await loadUserSpecificProduceQuery(user1)
    const json = await response.json();
    this.setState({ items_produce: json });
  };

  componentDidMount = async () => {
    await this.getId();
    try {
      await this.loadLivestockData();
      await this.loadProduceData();
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
    this.data.length = 0;
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
            <div className={Class.prodTableHeader}>

              <h4>Items Accepted By Admin and Awaiting Your Approval</h4>

            </div>

            <ProducerApprovalTable
              data={this.data}
              getItemObj={this.getItemObj}
            />
            <ProductProduceDetail
              displayApprove={true}
              approveItem={this.approveItemProduce}
              itemProduceDetails={this.state.itemProduceDetails}
              removeOverlay={this.removeOverlay}
              refreshProduce={this.refreshProduce}
            />
            <ProductLivestockDetail
              displayApprove={true}
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
