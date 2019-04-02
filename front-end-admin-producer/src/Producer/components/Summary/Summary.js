import React, { Component } from "react";
import matchSorter from "match-sorter";
import ReactTable from "react-table";
import { getItemDetails } from "../../../AppUtils";
import ProductProduceDetail from "../ProductDetail/ProductProduceDetail";
import ProductLivestockDetail from "../ProductDetail/ProductLivestockDetail";
import Class from "./Summary.module.css";

class Summary extends Component {
  constructor() {
    super();
    this.produceItems = [];
    this.livestockItems = [];
    this.data = [];
    this.state = {
      data: {},
      items_produce: [],
      items_livestock: [],
      itemProduceDetails: {},
      itemLivestockDetails: {},
      localId: ""
    };
  }

  getItemObj = async e => {
    let i;
    for (i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].datePlanted) {
        this.produceItems.push(this.state.data[i]);
      } else if (this.state.data[i].birthdate) {
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
      const response = await fetch(`http://localhost:5000/produce/${user1}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      console.log("Produce items:", json);
      this.setState({ items_produce: json });
      const response2 = await fetch(
        `http://localhost:5000/livestock/${user1}/`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const json2 = await response2.json();
      this.setState({ items_livestock: json2 });
    } catch (error) {
      console.log(error);
    }
    await this.createData();
  };

  getId = () => {
    const tempId = JSON.parse(sessionStorage.getItem("authData")).id;
    this.setState({ localId: tempId });
  };

  createData = () => {
    let i;
    if (this.state.items_produce || this.state.items_livestock) {
      if (
        this.state.items_produce.length > 0 ||
        this.state.items_livestock.length > 0
      ) {
        for (i = 0; i < this.state.items_produce.length; i++) {
          this.data.push(this.state.items_produce[i]);
        }
        for (i = 0; i < this.state.items_livestock.length; i++) {
          this.data.push(this.state.items_livestock[i]);
        }
      } else {
        this.setState({ data: this.data });
      }
      this.setState({ data: this.data });
    }
  };

  removeOverlay = event => {
    document.getElementById("produceOverlay").style.display = "none";
    document.getElementById("livestockOverlay").style.display = "none";
  };

  refreshLiveStock = (data) => {
    this.setState({ items_livestock: data });
}

 refreshProduce = data => {
    this.setState({ itemProduceDetails: data });
  };

  render() {
    const data = this.data;

    return (
      <div className={Class.table}>
        <br />
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
                  Header: "Delivered Date",
                  id: "product",
                  width: 250,
                  accessor: d => d.deliveredDate,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {
                      keys: ["DeliveredDate"]
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
                      className={Class.detailButton}
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
          style={{
            height: "85vh"
          }}
        />
        <ProductProduceDetail
          itemProduceDetails={this.state.itemProduceDetails}
          removeOverlay={this.removeOverlay}
          refreshProduce={this.refreshProduce}
        />
        <ProductLivestockDetail
          itemLivestockDetails={this.state.itemLivestockDetails}
          removeOverlay={this.removeOverlay}
          refreshLiveStock = {this.refreshLiveStock}
        />
      </div>
    );
  }
}

export default Summary;
