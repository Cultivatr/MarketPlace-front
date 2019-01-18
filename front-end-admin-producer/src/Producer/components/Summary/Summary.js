import React, { Component } from 'react';
import matchSorter from 'match-sorter'
import ReactTable from "react-table";
import './Summary.css'

class Summary extends Component {
    state = {
        data: 
        [{
            name: 'John'
        }]
    }

    render() {
        return (
          <div className="table">
            <ReactTable
              data={this.state.data}
              noDataText="No items from producers!"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
              columns={[
                {
                  Header: "Click on headers to sort or type to filter",
                  columns: [
                    {
                      Header: "Type",
                      accessor: "id",
                      width: 100,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["id"] }),
                      filterAll: true,
                      style: {
                        textAlign: "center"
                      }
                    },
                    {
                      Header: "Est. Finished",
                      accessor: "farm",
                      width: 350,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["farm"] }),
                      filterAll: true,
                      style: {
                        textAlign: "center"
                      }
                    },
                    {
                      Header: "Est. Delivered",
                      id: "product",
                      width: 400,
                      accessor: d => d.product,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["product"] }),
                      filterAll: true,
                      style: {
                        textAlign: "center"
                      }
                    },
                    {
                        Header: "Order Status",
                        id: "qty",
                        width: 200,
                        accessor: d => d.qty,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, { keys: ["qty"] }),
                        filterAll: true,
                        style: {
                          textAlign: "center"
                        }
                    },
                    {
                        Header: "",
                        id: "name",
                        width: 200,
                        accessor: d => <button className='detail-button' id={d.id} onClick={this.props.itemObj}>More</button>,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, { keys: ["qty"] }),
                        filterAll: true,
                        style: {
                          textAlign: "center"
                        }
                    },
                    {
                        Header: "",
                        id: "name",
                        width: 200,
                        accessor: d => <button className='detail-button' id={d.id} onClick={this.props.itemObj}>Edit</button>,
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
