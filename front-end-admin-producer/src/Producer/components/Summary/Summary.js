import React, { Component } from 'react';
import matchSorter from 'match-sorter'
import ReactTable from "react-table";
import { Link } from 'react-router-dom';

class Summary extends Component {
  constructor() {
    super();
    this.data = [];
    this.state = {
        data: {},
        items_produce: [], 
        items_livestock: []
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    }
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
                        accessor: d => <Link to='/item-details' className='detailBtn' id={d.id}>&#9673;</Link>,
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
          </div>
        );
    }
}

export default Summary;
