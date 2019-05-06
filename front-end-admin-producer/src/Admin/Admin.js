import React, { Component } from "react";
import Class from "./admin.module.css";
import AdminNav from "../SharedComponents/AdminNav";
import DisplayAllDashboard from "./Components/ContainerDashboard/DisplayAllDashboard";
import { filterData, getItemDetails } from "../AppUtils";
import AddNewProdComp from "./Components/AddNewProdComp/AddNewProdComp";
import UsersComp from "./Components/UsersComp/UsersComp";
import ItemLiveStockDetail from "./Components/ItemDetailComp/ItemLivestockDetail";
import ItemProduceDetail from "./Components/ItemDetailComp/ItemProduceDetail";
import ErrorModal from "../SharedComponents/ErrorModal";
import AdminSettings from "./Components/AdminSettings/AdminSettings";
import AdminHelper from "./AdminHelper";

// const domainLink = "http://localhost:5000";
const domainLink = "https://hidden-escarpment-75213.herokuapp.com";
// const domainLink2 = "http://localhost:5000";

class Admin extends Component {
  constructor() {
    super();
    this.geti=0;
    this.produceItems = [];
    this.livestockItems = [];
    this.data = [];
    this.pendingAdmin = [];
    this.pendingProducer = [];
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
      await this.createData();
    } catch (error) {
      console.log("Admin Error", error);
    }
  };

  loadUserData = async () => {
    const response3 = await fetch(domainLink + "/admin/users/", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const json3 = await response3.json();
    this.setState({ users: json3 });
  };
  loadProduceData = async () => {
    const response = await fetch(domainLink + "/produce/all/", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const json = await response.json();
    this.setState({ items_produce: json });
  };
  loadLivestockData = async () => {
    const response2 = await fetch(domainLink + "/livestock/all/", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const json2 = await response2.json();
    this.setState({ items_livestock: json2 });
  };

  createData = async () => {
    this.data.length = 0;
    if (this.state.items_produce.produce) {
      this.state.items_produce.produce.forEach(item => {
        this.data.push(item);
      });
    }

    if (this.state.items_livestock.livestock) {
      this.state.items_livestock.livestock.forEach(item => {
        this.data.push(item);
      });
    }
    if (this.data) {
      this.data.forEach(item => {
        const temp = this.state.users.users.filter(
          user => user.id === item.userId
        );
        item.farm = temp[0].farmName;
        item.email = temp[0].email;
      });
    }
    await this.setState({ data: this.data });
    const dataToPass = this.data;
    await this.helperFilterFunction(dataToPass);
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
      this.pendingAdmin,
      this.pendingProducer,
      this.accepted,
      this.sold,
      this.delivered,
      this.notAccepted,
      this.archive
    );
    await this.setState({
      pendingAdmin: this.pendingAdmin,
      pendingProducer: this.pendingProducer,
      accepted: this.accepted,
      sold: this.sold,
      delivered: this.delivered,
      notAccepted: this.notAccepted,
      archive: this.archive
    });
  };

  nextStatus = status => {
    if (status === "Pending Admin") return "Pending Producer";
    if (status === "Accepted") return "Sold";
    if (status === "Sold") return "Delivered";
    if (status === "Delivered") return "Archive";
    if (status === "Not Accepted") return "Not Accepted";
  };
  rejectLivestock = id => {
    this.pushThroughLivestock(id, "Not Accepted");
  };
  rejectProduce = id => {
    this.pushThroughProduce(id, "Not Accepted");
  };
  sendEmail = (farm, email) => {
    fetch(domainLink + "/email/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        farmName: farm,
        email: email
      })
    });
  };

  pushThroughBtnTextHelper = currentStatus => {
    if (currentStatus === "Pending Admin") return "Accept";
    if (currentStatus === "Accepted") return "Mark As Sold";
    if (currentStatus === "Sold") return "Mark As Delivered";
    if (currentStatus === "Delivered") return "Send To Archives";
    if (currentStatus === "Not Accepted") return "Accept";
  };

  pushThroughLivestock = async (id, status, farm, email) => {
    const nextStatus = this.nextStatus(status);
    const subId = id.substr(2);
    // this.sendEmail(farm, email);
    await fetch(domainLink + "/livestock/incrementStatus/", {
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
  pushThroughProduce = async (id, status, farm, email) => {
    const nextStatus = this.nextStatus(status);
    const subId = id.substr(2);
    // this.sendEmail(farm, email);
    await fetch(domainLink + "/produce/incrementStatus/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: subId,
        nextStatus: nextStatus
      })
    }).catch(error => console.log("????", error));
    await this.loadProduceData();
    await this.createData();
    await this.removeOverlay();
  };
  removeOverlay = () => {
    document.getElementById("itemProduceOverlay").style.display = "none";
    document.getElementById("itemLivestockOverlay").style.display = "none";
  };

  getItemObj = async e => {
    this.produceItems.length = 0;
    this.livestockItems.length = 0;
    this.state.data.forEach(item => {
      if (item.id[0] === "P") {
        this.produceItems.push(item);
      } else if (item.id[0] === "L") {
        this.livestockItems.push(item);
      }
    });
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

      
      this.geti ++;
      console.log('Admin.js getusers called line 256 and count is ', this.geti); // GF added this
      const response = await fetch(domainLink + "/admin/users/", {
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
  OnClickAwaitingProd = () => {
    this.setState({ dataToShow: "awaitingProducer" });
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
    console.log('Admin.js - after modify clicked ') // added by GF
    await this.getUsers();
    await this.setState({ dataToShow: "allItems" }); // added as a hack to re-render listUsers to force update of state
    await this.setState({ dataToShow: "listUsers" });
  };

  OnClickAddUser = () => {
    this.setState({ dataToShow: "addNewProd" });
  };
  OnClickAdminSettings = () => {
    this.setState({ dataToShow: "adminSettings" });
  };
  errorHandler = input => {
    this.setState({
      errorModalIsOpen: true,
      modalErrorMessage: input
    });
  };
  closeErrorModal = () => {
    this.setState({ errorModalIsOpen: false });
  };

  render() {
    return (
      <div className="App">
        <AdminNav />
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
                  onClick={this.OnClickAwaitingProd}
                >
                  Awaiting Producer
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
                <button
                  className={Class.buttonAdmin}
                  onClick={this.OnClickAdminSettings}
                >
                  Admin Settings
                </button>
              </div>
              <div className={Class.container1}>
                {this.state.dataToShow === "listUsers" && (
                  <div className={Class.container2}>
                    <UsersComp
                      OnClickListUsers={this.OnClickListUsers}
                      data={this.state.users}
                      showUsers={this.OnClickListUsers} // here
                    />
                  </div>
                )}
                {this.state.dataToShow === "addNewProd" && (
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
                )}
                {this.state.dataToShow === "allItems" && (
                  <div className={Class.container2}>
                    <div className={Class.containerTitle}>
                      <h4>List of All items</h4>
                    </div>
                    <DisplayAllDashboard
                      data={this.state.data}
                      itemObj={this.getItemObj}
                    />
                  </div>
                )}
                {this.state.dataToShow === "adminSettings" && (
                  <div className={Class.container2}>
                    <div className={Class.containerTitle}>
                      <h2>Admin Settings</h2>
                    </div>
                    <AdminSettings />
                  </div>
                )}
                {this.state.dataToShow === "toBeAccepted" && (
                  <AdminHelper
                    title="Items To Be Accepted Conditionally"
                    data={this.state.pendingAdmin}
                    itemObj={this.getItemObj}
                  />
                )}
                {this.state.dataToShow === "awaitingProducer" && (
                  <AdminHelper
                    title="Items Awaiting Producer Acceptance"
                    data={this.state.pendingProducer}
                    itemObj={this.getItemObj}
                  />
                )}
                {this.state.dataToShow === "acceptedConditional" && (
                  <AdminHelper
                    title="Items Accepted Conditionally"
                    data={this.state.accepted}
                    itemObj={this.getItemObj}
                  />
                )}
                {this.state.dataToShow === "soldToBeDelivered" && (
                  <AdminHelper
                    title="Items Sold To Be Delivered"
                    data={this.state.sold}
                    itemObj={this.getItemObj}
                  />
                )}
                {this.state.dataToShow === "delivered" && (
                  <AdminHelper
                    title="Items Delivered"
                    data={this.state.delivered}
                    itemObj={this.getItemObj}
                  />
                )}
                {this.state.dataToShow === "notAccepted" && (
                  <AdminHelper
                    title="Items Not Accepted"
                    data={this.state.notAccepted}
                    itemObj={this.getItemObj}
                  />
                )}
                {this.state.dataToShow === "archive" && (
                  <AdminHelper
                    title="Archives"
                    data={this.state.archive}
                    itemObj={this.getItemObj}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Admin;
