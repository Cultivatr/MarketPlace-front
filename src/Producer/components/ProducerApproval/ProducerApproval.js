import React, { Component } from "react";
import { getItemDetails } from "../../../AppUtils";
import ProducerSlideMenu from "../../../SharedComponents/Navigation/SlideMenu/ProducerSlideMenu"
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
      localId: "",
      screenWidth: 0
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

  rejectItemProduce = async id => {
    const subId = id.substr(2);
    await incrementProduceQuery(subId, "Pending Admin")
    await this.loadProduceData();
    await this.createData();
    await this.removeOverlay();
  };

  rejectItemLivestock = async id => {
    const subId = id.substr(2);
    await incrementLivestockQuery(subId, "Pending Admin")
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

  componentWillMount = () => {
    this.setState({ screenWidth: window.screen.width })
    window.addEventListener("resize", () => {
      this.setState({ screenWidth: window.screen.width })
    });

  }

  getId = () => {
    const tempId = JSON.parse(sessionStorage.getItem("authData")).id;
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
      <div>
        <h2 className="mobile-header-title">Items to be Approved</h2>
        <ProducerSlideMenu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
        <div className="ui container">
          <div className={Class.table}>
            <div className={Class.prodTableHeader} style={{backgroundColor:"black", color:"#ffffff",}}>
              <p id="approval-main-p">Items That Need Your Approval </p>
            </div>

            <ProducerApprovalTable
              screenWidth={this.state.screenWidth}
              data={this.data}
              getItemObj={this.getItemObj}
            />
            <ProductProduceDetail
              displayApprove={true}
              approveItem={this.approveItemProduce}
              rejectItem={this.rejectItemProduce}
              itemProduceDetails={this.state.itemProduceDetails}
              removeOverlay={this.removeOverlay}
              refreshProduce={this.refreshProduce}
            />
            <ProductLivestockDetail
              displayApprove={true}
              approveItem={this.approveItemLivestock}
              rejectItem={this.rejectItemLivestock}
              itemLivestockDetails={this.state.itemLivestockDetails}
              removeOverlay={this.removeOverlay}
              refreshLiveStock={this.refreshLiveStock}
            />
          </div>
        </div>
        <footer className="copyright">
          © 2019 CultivatR | ALL RIGHTS RESERVED 
        </footer> 
      </div>
    );
  }
}

export default ProducerApproval;
