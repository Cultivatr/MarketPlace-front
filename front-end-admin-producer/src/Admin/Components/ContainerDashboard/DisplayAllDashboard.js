import React from "react";
import matchSorter from "match-sorter";
import ReactTable from "react-table";
import "react-table/react-table.css";

class DisplayAllDashboard extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    const { data } = this.props;
    return (
      <div className="table">
        <ReactTable
          data={data}
          noDataText="No items from producers!"
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={[
            {
              Header: "click on headers to sort or type to filter",
              columns: [
                {
                  Header: "Order #",
                  accessor: "id",
                  width: 80,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["id"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Farm",
                  accessor: "farm",
                  // width: 200,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["farm"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Product",
                  id: "type",
                  // width: 80%,
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
                  id: "quantity",
                  // width: 200,
                  accessor: d => d.quantity || d.estFinishedQty,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["quantity"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Status",
                  id: "status",
                  // width: 340,
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
                  id: "details",
                  width: 100,
                  accessor: d => (
                    <span
                      className="detail-button"
                      id={d.id}
                      onClick={this.props.itemObj}
                    >
                      Details
                    </span>
                  ),
                  style: {
                    cursor: "pointer",
                    fontSize: 15,
                    padding: "5px 5px",
                    textAlign: "center",
                    userSelect: "none"
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
      </div>
    );
  }
}

export default DisplayAllDashboard;