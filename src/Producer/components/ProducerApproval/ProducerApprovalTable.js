import React, { Component } from "react";
import ReactTable from "react-table";
import matchSorter from "match-sorter";

export default class ProducerApprovalTable extends Component {
  render() {
    return (
      <ReactTable
        data={this.props.data}
        noDataText="No items to accept"
        filterable
        defaultFilterMethod={(filter, row) =>
          String(row[filter.id]) === filter.value
        }
        columns={[
          {
            Header: "Click on Headers Below to Sort, or Type In Boxes Below to Filter Content",
            columns:
              this.props.screenWidth > 650 ?
                [
                  {
                    Header: "Item #",
                    id: "id",
                    width: 75,
                    accessor: d => d.id,
                    sortMethod: (a, b) => {
                      return (Number(a.substring(2)) > Number(b.substring(2))) ? 1 : -1
                    },
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
                    width: 300,
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
                    width: 150,
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
                    Header: "Est. Completion Date",
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
                    Header: "Price",
                    id: "estPrice",
                    width: 250,
                    accessor: d => d.estPrice,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["estPrice"] }),
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
                          borderRadius: 25,
                          padding: "5px",
                          margin: "3px 0px",
                          textAlign: "center",
                          userSelect: "none"
                        }}
                        id={d.id}
                        onClick={this.props.getItemObj}
                      >
                        {"Details"}
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
                ] :
                ///
                [
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
                    Header: "Qty",
                    id: "estFinishedQty",
                    width: 75,
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
                    Header: "Price",
                    id: "estPrice",
                    width: 100,
                    accessor: d => d.estPrice,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["estPrice"] }),
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
                          borderRadius: "100%",
                          padding: "5px 5px",
                          margin: "3px 0px 3px 0px",
                          textAlign: "center",
                          userSelect: "none"
                        }}
                        id={d.id}
                        onClick={this.props.getItemObj}
                      >
                        {"<>"}
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



            ///




          }
        ]}
        defaultPageSize={20}
        className="-striped -highlight"
      // style={{
      //   height: "85vh"
      // }}
      />
    );
  }
}
