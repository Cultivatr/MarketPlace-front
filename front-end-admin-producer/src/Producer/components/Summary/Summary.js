import React, { Component } from 'react';
import matchSorter from 'match-sorter'
import ReactTable from "react-table";
// import { Link } from 'react-router-dom';
import { getItemProduceDetails, getItemLivestockDetails } from '../../../AppUtils';
import ProductProduceDetail from '../ProductDetail/ProductProduceDetail';
import ProductLivestockDetail from '../ProductDetail/ProductLivestockDetail';
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
        itemLivestockDetails: {}
    }
  }

  getItemObj = async (e) => {
    let i;
    for (i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].datePlanted) {
        this.produceItems.push(this.state.data[i]);
        this.setState({ itemProduceDetails: getItemProduceDetails(parseInt(e.target.id), this.produceItems) });
      } else if (this.state.data[i].breed) {
        this.livestockItems.push(this.state.data[i]);
        this.setState({ itemLivestockDetails: getItemLivestockDetails(parseInt(e.target.id), this.livestockItems) });
      }
    }
    await this.showOverlay();
  }

  showOverlay = () => {
    console.log("in show overlay");
    console.log(this.state.itemLivestockDetails);
    console.log(this.state.itemProduceDetails);
    // if (this.state.itemProduceDetails.datePlanted) {
    //   document.getElementById("produceOverlay").style.display = "block";
    // } else if (this.state.itemProduceDetails.breed) {
    //   document.getElementById("livestockOverlay").style.display = "block";
    // }
  }
    
    componentDidMount = async () => {
      try {
        const response = await fetch(`http://localhost:5000/items_produce`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json'}
        })
        const json = await response.json();
        this.setState({ items_produce: json });
        const response2 = await fetch(`http://localhost:5000/items_livestock`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json'}
        })
        const json2 = await response2.json();
        this.setState({ items_livestock: json2 });
      } catch (error) {
        console.log(error);
      }
      await this.createData();
    }

    createData = () => {
      let i;
      if (this.state.items_produce.items_produce.length > 0 || this.state.items_livestock.items_livestock.length > 0) {
        for (i = 0; i < this.state.items_produce.items_produce.length; i++) {
          this.data.push(this.state.items_produce.items_produce[i]);
        }
        for (i = 0; i < this.state.items_livestock.items_livestock.length; i++) {
          this.data.push(this.state.items_livestock.items_livestock[i]);
        }
      }
      this.setState({data: this.data})
    }

    removeOverlay = (event) => {
      document.getElementById("produceOverlay").style.display = "none";
      document.getElementById("livestockOverlay").style.display = "none";
    }
    
    render() {
      const data = this.data;
        return (
          <div className="table">
            <br/>
            <ReactTable
              data={data}
              noDataText="No items from producers!"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
              columns={[
                {
                  // Header: "Click on headers to sort or type to filter",
                  columns: [
                    {
                      Header: "Item #",
                      id: "Id",
                      width: 75,
                      accessor: d => d.produce_id || d.livestock_id,
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
                      accessor: d => d.estFinishedQty,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["estFinishedQty"] }),
                      filterAll: true,
                      style: {
                        textAlign: "center"
                      }
                    },
                    {
                      Header: "Est. Delivered Date",
                      id: "product",
                      width: 250,
                      accessor: d => d.estDeliveredDate,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["estDeliveredDate"] }),
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
                        Header: "Details",
                        id: "MoreDetails",
                        width: 75,
                        accessor: d => <span className={Class.detailButton} id={d.produce_id || d.livestock_id} onClick={this.getItemObj}>&#9673;</span>,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, { keys: ["qty"] }),
                        filterAll: true,
                        style: {
                          textAlign: "center"
                        }
                    }
                  ]}
                ]}
              defaultPageSize={20}
              className="-striped -highlight"
              style={{
                height: "85vh"
              }}
            />
            <ProductProduceDetail itemProduceDetails={this.state.itemProduceDetails} removeOverlay={this.removeOverlay}/>
            <ProductLivestockDetail itemLivestockDetails={this.state.itemLivestockDetails} removeOverlay={this.removeOverlay}/>
          </div>
        );
    }
}

export default Summary;
