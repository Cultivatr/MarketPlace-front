import React, { Component } from "react";
import Class from "./admin.module.css";
import ContainerDashboard from "./Components/ContainerDashboard/ContainerDashboard";
import DisplayAllDashboard from "./Components/ContainerDashboard/DisplayAllDashboard";
import { filterData, getItemDetails } from "../AppUtils";
import AddNewProdComp from "./Components/AddNewProdComp/AddNewProdComp";
import UsersComp from "./Components/UsersComp/UsersComp";
import ItemLiveStockDetail from "./Components/ItemDetailComp/ItemLivestockDetail";
import ItemProduceDetail from "./Components/ItemDetailComp/ItemProduceDetail";
import ErrorModal from "../SharedComponents/ErrorModal";

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
    this.archive = [];
    this.state = {
      logInData: "",
      dataToShow: "toBeAccepted",
      data: {},
      items_produce: [],
      items_livestock: [],
      itemProduceDetails: {},
      itemLivestockDetails: {},
      users: [],
      pending: [],
      accepted: [],
      sold: [],
      delivered: [],
      notAccepted: [],
      pushThroughBtnText: "",
      errorModalIsOpen: false,
      modalErrorMessage: ""
    };
  }

  componentDidMount = async () => {
    if (JSON.parse(sessionStorage.getItem("authData"))) {
      this.setState({
        logInData: await JSON.parse(sessionStorage.getItem("authData"))
      });
    }
    try {
      await this.loadUserData();
      await this.loadProduceData();
      await this.loadLivestockData();
    } catch (error) {
      console.log("Admin Error", error);
    }

    await this.createData();

    console.log("USERS:", this.state.users);
    console.log("PRODUCE:", this.state.items_produce);
    console.log("LIVESTOCK:", this.state.items_livestock);
  };

  loadUserData = async () => {
    const response3 = await fetch(`http://localhost:5000/admin/users/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const json3 = await response3.json();
    this.setState({ users: json3 });
  };
  loadProduceData = async () => {
    const response = await fetch(`http://localhost:5000/produce/all/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const json = await response.json();
    this.setState({ items_produce: json });
  };
  loadLivestockData = async () => {
    const response2 = await fetch(`http://localhost:5000/livestock/all/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const json2 = await response2.json();
    this.setState({ items_livestock: json2 });
  };

  createData = async () => {
    this.data.length = 0;
    if (this.state.items_produce || this.state.items_livestock) {
      if (
        this.state.items_produce.length > 0 ||
        this.state.items_livestock.length > 0
      ) {
        for (let i = 0; i < this.state.items_produce.length; i++) {
          this.data.push(this.state.items_produce[i]);
        }
        for (let i = 0; i < this.state.items_livestock.length; i++) {
          this.data.push(this.state.items_livestock[i]);
        }

        for (let i = 0; i < this.data.length; i++) {
          const temp = this.state.users.users.filter(
            user => user.id === this.data[i].userId
          );
          this.data[i].farm = temp[0].farmName;
        }
      } else {
        this.setState({ data: this.data });
      }
      await this.setState({ data: this.data });
      const dataToPass = this.data;
      await this.helperFilterFunction(dataToPass);
    }
  };

  refreshLiveStock = data => {
    this.setState({ itemLivestockDetails: data });
  };
  refreshProduce = data => {
    this.setState({ itemProduceDetails: data });
  };

  pushThroughText = status => {
    return status;
  };

  helperFilterFunction = async dataToPass => {
    await filterData(
      dataToPass,
      this.pending,
      this.accepted,
      this.sold,
      this.delivered,
      this.notAccepted,
      this.archive
    );
    await this.setState({
      pending: this.pending,
      accepted: this.accepted,
      sold: this.sold,
      delivered: this.delivered,
      notAccepted: this.notAccepted,
      archive: this.archive
    });
  };

  nextStatus = status => {
    if (status === "Pending Approval") return "accepted";
    if (status === "accepted") return "sold";
    if (status === "sold") return "delivered";
    if (status === "delivered") return "archive";
    if (status === "not accepted") return "not accepted";
  };
  rejectLivestock = id => {
    this.pushThroughLivestock(id, "not accepted");
  };
  rejectProduce = id => {
    this.pushThroughProduce(id, "not accepted");
  };

  pushThroughBtnTextHelper = currentStatus => {
    if (currentStatus === "Pending Approval") return "Accept";
    if (currentStatus === "accepted") return "Mark As Sold";
    if (currentStatus === "sold") return "Mark As Delivered";
    if (currentStatus === "delivered") return "Send To Archives";
    if (currentStatus === "not accepted") return "Accept";
  };

  pushThroughLivestock = async (id, status) => {
    const nextStatus = this.nextStatus(status);
    const subId = id.substr(2);
    await fetch("http://localhost:5000/livestock/incrementStatus/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: subId,
        nextStatus: nextStatus
      })
    }).catch(error => console.log(error));
    await this.loadLivestockData();
    await this.createData();
    await this.removeOverlay();
  };
  pushThroughProduce = async (id, status) => {
    const nextStatus = this.nextStatus(status);
    const subId = id.substr(2);
    await fetch("http://localhost:5000/produce/incrementStatus/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: subId,
        nextStatus: nextStatus
      })
    }).catch(error => console.log(error));
    await this.loadProduceData();
    await this.createData();
    await this.removeOverlay();
  };
  removeOverlay = event => {
    document.getElementById("itemProduceOverlay").style.display = "none";
    document.getElementById("itemLivestockOverlay").style.display = "none";
  };

  getItemObj = async e => {
    let i;
    this.produceItems.length = 0;
    this.livestockItems.length = 0;
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
      await this.setState({
        pushThroughBtnText: this.pushThroughBtnTextHelper(
          this.state.itemProduceDetails.status
        )
      });
      this.showOverlayProduce();
    } else if (e.target.id.search("L") === 0) {
      await this.setState({
        itemLivestockDetails: getItemDetails(e.target.id, this.livestockItems)
      });
      await this.setState({
        pushThroughBtnText: this.pushThroughBtnTextHelper(
          this.state.itemLivestockDetails.status
        )
      });
      this.showOverlayLivestock();
    }
  };

  getUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/admin/users/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      await this.setState({ users: json });
    } catch (error) {
      console.log(error);
    }
  };
  refreshUsers = data => {
    this.setState({ users: data });
    console.log("called refresh users");
  };

  showOverlayProduce = () => {
    document.getElementById("itemProduceOverlay").style.display = "block";
  };

  showOverlayLivestock = () => {
    document.getElementById("itemLivestockOverlay").style.display = "block";
  };
  OnClickAllItems = () => {
    this.setState({ dataToShow: "allItems" });
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

  OnClickArchive = () => {
    this.setState({ dataToShow: "archive" });
  };

  OnClickListUsers = async () => {
    await this.getUsers();
    await this.setState({ dataToShow: "toBeAccepted" });
    await this.setState({ dataToShow: "listUsers" });
  };

  OnClickAddUser = () => {
    this.setState({ dataToShow: "addNewProd" });
  };
  errorHandler = input => {
    console.log("error handler was called");
    this.setState({
      errorModalIsOpen: true,
      modalErrorMessage: input
    });
  };
  closeErrorModal = () => {
    console.log("Closing error Modal");
    this.setState({ errorModalIsOpen: false });
  };

  render() {
    let toShow;
    if (this.state.dataToShow === "allItems") {
      toShow = (
        <div className={Class.container2}>
          <div className={Class.containerTitle}>
            <h4>List of All items</h4>
          </div>
          <DisplayAllDashboard
            data={this.state.data}
            itemObj={this.getItemObj}
          />
          {console.log("data tobeaccepted", this.state.pending)}
        </div>
      );
    } else if (this.state.dataToShow === "toBeAccepted") {
      toShow = (
        <div className={Class.container2}>
          <div className={Class.containerTitle}>
            <h4>Items To Be Accepted Conditionally</h4>
          </div>
          <ContainerDashboard
            data={this.state.pending}
            itemObj={this.getItemObj}
          />
        </div>
      );
    } else if (this.state.dataToShow === "acceptedConditional") {
      toShow = (
        <div className={Class.container2}>
          <div className={Class.containerTitle}>
            <h4>Items Accepted Conditionally</h4>
          </div>
          <ContainerDashboard
            data={this.state.accepted}
            itemObj={this.getItemObj}
          />
        </div>
      );
    } else if (this.state.dataToShow === "soldToBeDelivered") {
      toShow = (
        <div className={Class.container2}>
          <div className={Class.containerTitle}>
            <h4>Items Sold To Be Delivered</h4>
          </div>
          <ContainerDashboard
            data={this.state.sold}
            itemObj={this.getItemObj}
          />
        </div>
      );
    } else if (this.state.dataToShow === "delivered") {
      toShow = (
        <div className={Class.container2}>
          <div className={Class.containerTitle}>
            <h4>Items Delivered</h4>
          </div>
          <ContainerDashboard
            data={this.state.delivered}
            itemObj={this.getItemObj}
          />
        </div>
      );
    } else if (this.state.dataToShow === "notAccepted") {
      toShow = (
        <div className={Class.container2}>
          <div className={Class.containerTitle}>
            <h4>Items Not Accepted</h4>
          </div>
          <ContainerDashboard
            data={this.state.notAccepted}
            itemObj={this.getItemObj}
          />
        </div>
      );
    } else if (this.state.dataToShow === "listUsers") {
      toShow = (
        <div className={Class.container2}>
          <UsersComp
            OnClickListUsers={this.OnClickListUsers}
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
          <AddNewProdComp
            OnClickListUsers={this.OnClickListUsers}
            refreshUsers={this.refreshUsers}
            errorHandler={this.errorHandler}
          />
        </div>
      );
    } else if (this.state.dataToShow === "archive") {
      toShow = (
        <div className={Class.container2}>
          <div className={Class.containerTitle}>
            <h4>Archives</h4>
          </div>
          <ContainerDashboard
            data={this.state.archive}
            itemObj={this.getItemObj}
          />
        </div>
      );
    }
    return (
      <div className="App">
        <h1 className={Class.heading}>Welcome Dan!</h1>
        <main>
          <ErrorModal
            errorModalIsOpen={this.state.errorModalIsOpen}
            closeErrorModal={this.closeErrorModal}
            modalErrorMessage={this.state.modalErrorMessage}
          />
          <ItemProduceDetail
            itemProduceDetails={this.state.itemProduceDetails}
            removeOverlay={this.removeOverlay}
            pushThroughProduce={this.pushThroughProduce}
            rejectProduce={this.rejectProduce}
            refreshProduce={this.refreshProduce}
            pushThroughBtnText={this.state.pushThroughBtnText}
          />
          <ItemLiveStockDetail
            itemLivestockDetails={this.state.itemLivestockDetails}
            removeOverlay={this.removeOverlay}
            pushThroughLivestock={this.pushThroughLivestock}
            rejectLivestock={this.rejectLivestock}
            refreshLiveStock={this.refreshLiveStock}
            pushThroughBtnText={this.state.pushThroughBtnText}
          />
          <div className={Class.container}>
            <div className={Class.boxContainer}>
              <div className={Class.leftNav}>
                <button
                  id="button-allItems"
                  className={Class.buttonAdmin}
                  onClick={this.OnClickAllItems}
                >
                  All Items
                </button>
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
                  id="archive"
                  className={Class.buttonAdmin}
                  onClick={this.OnClickArchive}
                >
                  Archive
                </button>
                <button
                  id="button-listUsers"
                  className={Class.buttonAdmin}
                  onClick={this.OnClickListUsers}
                >
                  List Users
                </button>
                <button
                  className={Class.buttonAdmin}
                  onClick={this.OnClickAddUser}
                >
                  Add User
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
