import React, { Component } from "react";
import Class from "./admin.module.css";
import AdminNav from "../SharedComponents/AdminNav";
import DisplayAllDashboard from "./Components/ContainerDashboard/DisplayAllDashboard";
import { filterData, getItemDetails } from "../AppUtils";
import AddNewProdComp from "./Components/AddNewProdComp/AddNewProdComp";
import UsersComp from "./Components/UsersComp/UsersComp";
import ItemLiveStockDetail from "./Components/ItemDetailComp/ItemLivestockDetail";
import ItemProduceDetail from "./Components/ItemDetailComp/ItemProduceDetail";
import AdminSettings from "./Components/AdminSettings/AdminSettings";
import AdminHelper from "./AdminHelper";
import AdminSlideMenu from "../SharedComponents/Navigation/SlideMenu/AdminSlideMenu"
import PushThroughPopUp from "./PushThroughPopUp"
import {
  loadUserQuery, loadProduceQuery,
  loadLivestockQuery, sendEmailQueryStatusUpdate,
  incrementLivestockQuery, incrementProduceQuery,
} from "../SharedComponents/LocalServer/LocalServer"


class Admin extends Component {
  constructor() {
    super();
    this.geti = 0;
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
      currentType: "",
      currentPrice: "",
      forSeriousCurrentType: "",
      pushThroughBtnText: "",
      popUpIsOpen: false,
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
    const response3 = await loadUserQuery()
    const json3 = await response3.json();
    this.setState({ users: json3 });
  };
  loadProduceData = async () => {
    const response = await loadProduceQuery()
    const json = await response.json();
    this.setState({ items_produce: json });
  };
  loadLivestockData = async () => {
    const response2 = await loadLivestockQuery()
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
    sendEmailQueryStatusUpdate(farm, email)
  };

  pushThroughBtnTextHelper = currentStatus => {
    if (currentStatus === "Pending Admin") return "Accept";
    if (currentStatus === "Accepted") return "Mark As Sold";
    if (currentStatus === "Sold") return "Mark As Delivered";
    if (currentStatus === "Delivered") return "Send To Archives";
    if (currentStatus === "Not Accepted") return "Accept";
    if (currentStatus === "Archive") return "Delete"
  };

  openPushThroughPopUp = (status, type) => {
    if (status === "Pending Admin" && type === "produce") this.setState({
      popUpIsOpen: true,
      forSeriousCurrentType: type,
      currentType: this.state.itemProduceDetails.type,
      currentPrice: this.state.itemProduceDetails.estPrice
    })
    else if (status === "Pending Admin" && type === "livestock") this.setState({
      popUpIsOpen: true,
      forSeriousCurrentType: type,
      currentType: this.state.itemLivestockDetails.type,
      currentPrice: this.state.itemLivestockDetails.estFinalPrice
    })
    else if (type === "produce") {
      this.pushThroughProduce(
        this.state.itemProduceDetails.id,
        this.state.itemProduceDetails.status,
        this.state.itemProduceDetails.farm,
        this.state.itemProduceDetails.email,
        this.state.itemProduceDetails.estPrice
      )

    } else if (type === "livestock") {
      this.pushThroughLivestock(
        this.state.itemLivestockDetails.id,
        this.state.itemLivestockDetails.status,
        this.state.itemLivestockDetails.farm,
        this.state.itemLivestockDetails.email,
        this.state.itemLivestockDetails.estFinalPrice)
    }
  }


  pushThroughLivestock = async (id, status, farm, email) => {
    const nextStatus = this.nextStatus(status);
    const subId = id.substr(2);
    this.sendEmail(farm, email);
    await incrementLivestockQuery(subId, nextStatus)
    await this.loadLivestockData();
    await this.createData();
    await this.removeOverlay();

  };
  pushThroughProduce = async (id, status, farm, email) => {
    const nextStatus = this.nextStatus(status);
    const subId = id.substr(2);
    this.sendEmail(farm, email);
    await incrementProduceQuery(subId, nextStatus)
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
      this.geti++;
      const response = await loadUserQuery()
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
    await this.getUsers();
    await this.setState({ dataToShow: "allItems" });
    await this.setState({ dataToShow: "listUsers" });
  };

  OnClickAddUser = () => {
    this.setState({ dataToShow: "addNewProd" });
  };
  OnClickAdminSettings = () => {
    this.setState({ dataToShow: "adminSettings" });
  };


  closePopUp = () => {
    this.setState({ popUpIsOpen: false });
  };

  render() {
    return (
      <div className="App">
        <AdminNav updateApp={this.props.updateApp} />
        {this.state.popUpIsOpen && <PushThroughPopUp closePopUp={this.closePopUp}
          price={this.state.currentPrice} type={this.state.currentType} confirm={this.openPushThroughPopUp} realType={this.state.forSeriousCurrentType} />}
        <AdminSlideMenu pageWrapId={"page-wrap"} outerContainerId={"outer-container"}
          OnClickAllItems={this.OnClickAllItems}
          OnClickAccept={this.OnClickAccept}
          OnClickAwaitingProd={this.OnClickAwaitingProd}
          OnClickConditional={this.OnClickConditional}
          OnClickSold={this.OnClickSold}
          OnClickDelivered={this.OnClickDelivered}
          OnClickNotAccepted={this.OnClickNotAccepted}
          OnClickArchive={this.OnClickArchive}
          OnClickListUsers={this.OnClickListUsers}
          OnClickAddUser={this.OnClickAddUser}
          OnClickAdminSettings={this.OnClickAdminSettings} />
        <main>
          <ItemProduceDetail
            itemProduceDetails={this.state.itemProduceDetails}
            removeOverlay={this.removeOverlay}
            openPushThroughPopUp={this.openPushThroughPopUp}
            rejectProduce={this.rejectProduce}
            refreshProduce={this.refreshProduce}
            pushThroughBtnText={this.state.pushThroughBtnText}
          />
          <ItemLiveStockDetail
            itemLivestockDetails={this.state.itemLivestockDetails}
            removeOverlay={this.removeOverlay}
            openPushThroughPopUp={this.openPushThroughPopUp}
            rejectLivestock={this.rejectLivestock}
            refreshLiveStock={this.refreshLiveStock}
            pushThroughBtnText={this.state.pushThroughBtnText}
          />
          <div className={Class.container}>
            <div className={Class.boxContainer}>
              <div id="desktop-menu" className={Class.leftNav}>
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
                  Rejected Items
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

              <div id="mobile-parent-container" className={Class.container1}>
                {this.state.dataToShow === "listUsers" && (
                  <div className={Class.container2}>
                    <div className={Class.containerTitle}>
                      <h4 className="mobile-header-title admin-mobile">
                        List of Users
                      </h4>
                    </div>
                    <UsersComp
                      OnClickListUsers={this.OnClickListUsers}
                      data={this.state.users}
                      showUsers={this.OnClickListUsers}
                      title="List of Users"
                    />
                  </div>
                )}
                {this.state.dataToShow === "addNewProd" && (
                  <div id="mobile-admin-container" className={Class.container3}>
                    <div className={Class.containerTitle}>
                      <h4 className="mobile-header-title admin-mobile">
                        Add New Users
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
                  <div className={Class.containerAdminSettings}>
                    <h4 id="all-items-title" className="mobile-header-title admin-mobile">List of All items</h4>
                    <DisplayAllDashboard
                      data={this.state.data}
                      itemObj={this.getItemObj}
                      title="List of All Items"
                    />
                  </div>
                )}
                {this.state.dataToShow === "adminSettings" && (
                  <div className={Class.containerAdminSettings}>
                    <div className={Class.containerTitle}>
                      <h4 className="mobile-header-title admin-mobile">Admin Settings</h4>
                    </div>
                    <AdminSettings />
                  </div>)}
                {this.state.dataToShow === "toBeAccepted" && (
                  <div className={Class.containerAdminSettings}>
                    <div className={Class.containerTitle}>
                      <h4 className="mobile-header-title admin-mobile ">To be Accepted Conditionally</h4>
                    </div>
                    <AdminHelper
                      data={this.state.pendingAdmin}
                      itemObj={this.getItemObj}
                      title="To be Accepted Conditionally"
                    />
                  </div>)}
                {this.state.dataToShow === "awaitingProducer" && (
                  <div className={Class.containerAdminSettings}>
                    <div className={Class.containerTitle}>
                      <h4 className="mobile-header-title admin-mobile ">Awaiting Producer Acceptance</h4>
                    </div>
                    <AdminHelper
                      data={this.state.pendingProducer}
                      itemObj={this.getItemObj}
                      title="Awaiting Producer Acceptance"
                    />
                  </div>

                )}
                {this.state.dataToShow === "acceptedConditional" && (
                  <div className={Class.containerAdminSettings}>
                    <div className={Class.containerTitle}>
                      <h4 className="mobile-header-title admin-mobile ">Items Accepted Conditionally</h4>
                    </div>
                    <AdminHelper
                      data={this.state.accepted}
                      itemObj={this.getItemObj}
                      title="Items Accepted Conditionally"
                    />
                  </div>

                )}
                {this.state.dataToShow === "soldToBeDelivered" && (
                  <div className={Class.containerAdminSettings}>
                    <div className={Class.containerTitle}>
                      <h4 className="mobile-header-title admin-mobile ">Items Sold To Be Delivered</h4>
                    </div>
                    <AdminHelper
                      data={this.state.sold}
                      itemObj={this.getItemObj}
                      title="Items To Be Delivered"
                    />
                  </div>
                )}
                {this.state.dataToShow === "delivered" && (
                  <div className={Class.containerAdminSettings}>
                    <div className={Class.containerTitle}>
                      <h4 className="mobile-header-title admin-mobile ">Items Delivered</h4>
                    </div>
                    <AdminHelper
                      data={this.state.delivered}
                      itemObj={this.getItemObj}
                      title="Items Delivered"
                    />
                  </div>
                )}
                {this.state.dataToShow === "notAccepted" && (
                  <div className={Class.containerAdminSettings}>
                    <div className={Class.containerTitle}>
                      <h4 className="mobile-header-title admin-mobile ">Items Not Accepted</h4>
                    </div>
                    <AdminHelper
                      data={this.state.notAccepted}
                      itemObj={this.getItemObj}
                      title="Items Not Accepted"
                    />
                  </div>
                )}
                {this.state.dataToShow === "archive" && (
                  <div className={Class.containerAdminSettings}>
                    <div className={Class.containerTitle}>
                      <h4 className="mobile-header-title admin-mobile ">Archive</h4>
                    </div>
                    <AdminHelper
                      data={this.state.archive}
                      itemObj={this.getItemObj}
                      title="Archive"
                    />
                  </div>
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
