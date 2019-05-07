import React, { Component } from "react";
import matchSorter from "match-sorter";
import ReactTable from "react-table";
import { getItemDetails, filterForPending } from "../../../AppUtils";
import ProductProduceDetail from "../ProductDetail/ProductProduceDetail";
import ProductLivestockDetail from "../ProductDetail/ProductLivestockDetail";
import Class from "./Summary.module.css";
import "./Summary.css";

const domainLink = "https://hidden-escarpment-75213.herokuapp.com/";
// const domainLink = "http://localhost:5000/";
class Summary extends Component {
  constructor() {
    super();
    this.produceItems = [];
    this.livestockItems = [];
    this.pendingProducer = [];
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

  getItemObj = async e => {
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
      this.showOverlayProduce();
    } else if (e.target.id.search("L") === 0) {
      await this.setState({
        itemLivestockDetails: getItemDetails(e.target.id, this.livestockItems)
      });
      this.showOverlayLivestock();
    }
  };

  filterForPendingProducer = async dataToPass => {
    await filterForPending(dataToPass, this.pendingProducer);
    await console.log("Pending items found", this.pendingProducer.length);
    sessionStorage.setItem(
      "PendingItems",
      JSON.stringify(this.pendingProducer.length)
    );
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
      this.setState({ items_produce: json });
      const response2 = await fetch(domainLink + `livestock/${user1}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json2 = await response2.json();
      this.setState({ items_livestock: json2 });
      const response3 = await fetch(domainLink + `produceItems/all/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json3 = await response3.json();
      this.setState({ produce_type: json3 });
    } catch (error) {
      console.log(error);
    }
    await this.createData();
  };

  getId = () => {
    const tempId = JSON.parse(sessionStorage.getItem("authData")).id;
    this.setState({
      localId: tempId,
      userFullName: JSON.parse(sessionStorage.getItem("authData")).fullName
    });
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
    await this.setState({ data: this.data });
    const dataToPass = this.data;
    await this.filterForPendingProducer(dataToPass);
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
    const data = this.data;

    return (
      <div className={Class.table}>
        <div className={Class.prodTableHeader}>
          <h4>Dashboard Table for: {this.state.userFullName}</h4>{" "}
        </div>

        <ReactTable
          data={data}
          noDataText="No items from producers!"
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={[
            {
              // Header: "Click on headers to sort or type to filter",
              columns: [
                {
                  Header: "Item #",
                  id: "Id",
                  width: 75,
                  accessor: d => d.id,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["id"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Type",
                  id: "type",
                  width: 200,
                  accessor: d => d.type,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["type"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Est. Finished Qty",
                  id: "estFinishedQty",
                  width: 250,
                  accessor: d => d.estFinishedQty || d.quantity,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {
                      keys: ["estFinishedQty"]
                    }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Est Completion Date",
                  id: "estCompletionDate",
                  width: 250,
                  accessor: d => d.estCompletionDate,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {
                      keys: ["estCompletionDate"]
                    }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Order Status",
                  id: "status",
                  width: 250,
                  accessor: d => d.status,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["status"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "",
                  id: "MoreDetails",
                  width: 75,
                  accessor: d => (
                    <span
                      className="detail-button"
                      style={{
                        cursor: "pointer",
                        fontSize: 10,
                        border: "1px solid black",
                        borderRadius: "25px",
                        padding: "5px 5px",
                        margin: "3px 0px 3px 0px",
                        textAlign: "center",
                        userSelect: "none"
                      }}
                      id={d.id}
                      onClick={this.getItemObj}
                    >
                      Details
                    </span>
                  ),
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["qty"] }),
                  filterAll: true,
                  style: {
                    cursor: "pointer",
                    fontSize: 15,
                    padding: "5px 5px",
                    userSelect: "none",
                    textAlign: "center"
                  }
                }
              ]
            }
          ]}
          defaultPageSize={20}
          className="-striped -highlight"
          // style={{
          //   height: "85vh"
          // }}
        />
        <ProductProduceDetail
          itemProduceDetails={this.state.itemProduceDetails}
          removeOverlay={this.removeOverlay}
          refreshProduce={this.refreshProduce}
        />
        <ProductLivestockDetail
          itemLivestockDetails={this.state.itemLivestockDetails}
          removeOverlay={this.removeOverlay}
          refreshLiveStock={this.refreshLiveStock}
        />
      </div>
    );
  }
}

export default Summary;
