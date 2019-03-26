import React, { Component } from "react";
import Class from "./admin.module.css";
import ContainerDashboard from "./Components/ContainerDashboard/ContainerDashboard";
import { filterData, getItemDetails } from "../AppUtils";
import AddNewProdComp from "./Components/AddNewProdComp/AddNewProdComp";
import UsersComp from "./Components/UsersComp/UsersComp";
import ItemLiveStockDetail from "./Components/ItemDetailComp/ItemLivestockDetail";
import ItemProduceDetail from "./Components/ItemDetailComp/ItemProduceDetail";

class Admin extends Component {
  constructor() {
    super();
    this.produceItems = [];
    this.livestockItems = [];
    this.data = [];
    this.pending = [];
    this.accepted = [];
    this.sold = [];
    this.delivered = [];
    this.notAccepted = [];
    this.state = {
      logInData: "",
      dataToShow: "",
      data: {},
      items_produce: [],
      items_livestock: [],
      itemProduceDetails: {},
      itemLivestockDetails: {},
      users: []
    };
  }

  componentDidMount = async () => {
    if (JSON.parse(sessionStorage.getItem("authData"))) {
      this.setState({
        logInData: await JSON.parse(sessionStorage.getItem("authData"))
      });
    }
    try {
      const response3 = await fetch(`http://localhost:5000/admin/users/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json3 = await response3.json();
      this.setState({ users: json3 });
      console.log("USERS", json3);
      //
      const response = await fetch(`http://localhost:5000/livestock/all/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      this.setState({ items_livestock: json });
      //
      const response2 = await fetch(`http://localhost:5000/produce/all/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json2 = await response2.json();
      this.setState({ items_produce: json2 });
      //
    } catch (error) {
      console.log("Admin Error", error);
    }
    await this.createData();
  };

  createData = () => {
    let i;
    if (
      this.state.items_produce.items_produce ||
      this.state.items_livestock.items_livestock
    ) {
      if (
        this.state.items_produce.items_produce.length > 0 ||
        this.state.items_livestock.items_livestock.length > 0
      ) {
        for (i = 0; i < this.state.items_produce.items_produce.length; i++) {
          this.data.push(this.state.items_produce.items_produce[i]);
        }
        for (
          i = 0;
          i < this.state.items_livestock.items_livestock.length;
          i++
        ) {
          this.data.push(this.state.items_livestock.items_livestock[i]);
        }
      } else {
        this.setState({ data: this.data });
      }
      this.setState({ data: this.data });
      this.helperFilterFunction();
    }
  };
  helperFilterFunction = () => {
    filterData(
      this.state.data,
      this.pending,
      this.accepted,
      this.sold,
      this.delivered,
      this.notAccepted
    );
  };

  nextStatus = status => {
    if (status === "Pending Approval") {
      return "accepted";
    }
    if (status === "accepted") {
      return "sold";
    }
    if (status === "sold") {
      return "delivered";
    }
    if (status === "delivered") {
      return "Pending Approval";
    }
    if (status === "not accepted") {
      return "not accepted";
    }
  };
  rejectLivestock = id => {
    this.pushThroughLivestock(id, "not accepted");
  };
  rejectProduce = id => {
    this.pushThroughProduce(id, "not accepted");
  };

  pushThroughLivestock = (id, status) => {
    const nextStatus = this.nextStatus(status);
    const subId = id.substr(2);
    fetch("http://localhost:5000/livestock/incrementStatus/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: subId,
        nextStatus: nextStatus
      })
    }).catch(error => console.log(error));
    this.helperFilterFunction();
    this.removeOverlay();
  };
  pushThroughProduce = (id, status) => {
    const nextStatus = this.nextStatus(status);
    const subId = id.substr(2);
    fetch("http://localhost:5000/produce/incrementStatus/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: subId,
        nextStatus: nextStatus
      })
    }).catch(error => console.log(error));
    this.helperFilterFunction();
    this.removeOverlay();
  };
  removeOverlay = event => {
    document.getElementById("itemProduceOverlay").style.display = "none";
    document.getElementById("itemLivestockOverlay").style.display = "none";
  };

  getItemObj = async e => {
    let i;
    for (i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].datePlanted) {
        this.produceItems.push(this.state.data[i]);
      } else if (this.state.data[i].breed) {
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

  getUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/admin/users`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      await this.setState({ users: json });
    } catch (error) {
      console.log(error);
    }
  };

  showOverlayProduce = () => {
    document.getElementById("itemProduceOverlay").style.display = "block";
  };

  showOverlayLivestock = () => {
    document.getElementById("itemLivestockOverlay").style.display = "block";
  };

  OnClickAccept = () => {
    this.setState({ dataToShow: "toBeAccepted" });
  };

  OnClickConditional = () => {
    this.setState({ dataToShow: "acceptedConditional" });
  };

  OnClickSold = () => {
    this.setState({ dataToShow: "soldToBeDelivered" });
  };

  OnClickDelivered = () => {
    this.setState({ dataToShow: "delivered" });
  };

  OnClickNotAccepted = () => {
    this.setState({ dataToShow: "notAccepted" });
  };

  OnClickListUsers = async () => {
    await this.getUsers();
    await this.setState({ dataToShow: "toBeAccepted" });
    await this.setState({ dataToShow: "listUsers" });
  };

  OnClickAddUser = () => {
    this.setState({ dataToShow: "addNewProd" });
  };

  render() {
    let toShow;
    if (this.state.dataToShow === "toBeAccepted") {
      toShow = (
        <div className={Class.container2}>
          <div className={Class.containerTitle}>
            <h4>Items To Be Accepted Conditionally</h4>
          </div>
          <ContainerDashboard data={this.pending} itemObj={this.getItemObj} />
        </div>
      );
    } else if (this.state.dataToShow === "acceptedConditional") {
      toShow = (
        <div className={Class.container2}>
          <div className={Class.containerTitle}>
            <h4>Items Accepted Conditionally</h4>
          </div>
          <ContainerDashboard data={this.accepted} itemObj={this.getItemObj} />
        </div>
      );
    } else if (this.state.dataToShow === "soldToBeDelivered") {
      toShow = (
        <div className={Class.container2}>
          <div className={Class.containerTitle}>
            <h4>Items Sold To Be Delivered</h4>
          </div>
          <ContainerDashboard data={this.sold} itemObj={this.getItemObj} />
        </div>
      );
    } else if (this.state.dataToShow === "delivered") {
      toShow = (
        <div className={Class.container2}>
          <div className={Class.containerTitle}>
            <h4>Items Delivered</h4>
          </div>
          <ContainerDashboard data={this.delivered} itemObj={this.getItemObj} />
        </div>
      );
    } else if (this.state.dataToShow === "notAccepted") {
      toShow = (
        <div className={Class.container2}>
          <div className={Class.containerTitle}>
            <h4>Items Not Accepted</h4>
          </div>
          <ContainerDashboard
            data={this.notAccepted}
            itemObj={this.getItemObj}
          />
        </div>
      );
    } else if (this.state.dataToShow === "listUsers") {
      toShow = (
        <div className={Class.container2}>
          <div className={Class.containerTitle}>
            <button
              className={Class.buttonAddUser}
              onClick={this.OnClickAddUser}
            >
              Add User
            </button>
          </div>
          <UsersComp
            data={this.state.users}
            showUsers={this.OnClickListUsers}
          />
        </div>
      );
    } else if (this.state.dataToShow === "addNewProd") {
      toShow = (
        <div className={Class.container3}>
          <div className={Class.containerTitle}>
            <h4>
              <u>Add New Users</u>
            </h4>
          </div>
          <AddNewProdComp />
        </div>
      );
    }
    return (
      <div className="App">
        <h1 className={Class.heading}>Welcome Dan!</h1>
        <main>
          <ItemProduceDetail
            itemProduceDetails={this.state.itemProduceDetails}
            removeOverlay={this.removeOverlay}
            pushThroughProduce={this.pushThroughProduce}
            rejectProduce={this.rejectProduce}
          />
          <ItemLiveStockDetail
            itemLivestockDetails={this.state.itemLivestockDetails}
            removeOverlay={this.removeOverlay}
            pushThroughLivestock={this.pushThroughLivestock}
            rejectLivestock={this.rejectLivestock}
          />
          <div className={Class.container}>
            <div className={Class.boxContainer}>
              <div className={Class.leftNav}>
                <button
                  id="button-accept"
                  className={Class.buttonAdmin}
                  onClick={this.OnClickAccept}
                >
                  Items To Accept
                </button>
                <button
                  id="button-conditional"
                  className={Class.buttonAdmin}
                  onClick={this.OnClickConditional}
                >
                  Accepted Conditionally
                </button>
                <button
                  id="button-sold"
                  className={Class.buttonAdmin}
                  onClick={this.OnClickSold}
                >
                  Sold To Be Delivered
                </button>
                <button
                  id="button-delivered"
                  className={Class.buttonAdmin}
                  onClick={this.OnClickDelivered}
                >
                  Delivered
                </button>
                <button
                  id="button-notAccepted"
                  className={Class.buttonAdmin}
                  onClick={this.OnClickNotAccepted}
                >
                  Items Not Accepted
                </button>
                <button
                  id="button-listUsers"
                  className={Class.buttonAdmin}
                  onClick={this.OnClickListUsers}
                >
                  List Users
                </button>
              </div>
              <div className={Class.container1}>{toShow}</div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Admin;
