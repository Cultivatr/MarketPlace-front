import React from "react";
import matchSorter from 'match-sorter'
import ReactTable from "react-table";
import "react-table/react-table.css";

class ContainerDashboard extends React.Component {
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
            String(row[filter.id]) === filter.value}
          columns={[
            {
              Header: "click on headers to sort or type to filter",
              columns: [
                {
                  Header: "Order #",
                  accessor: "id",
                  width: 70,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["id"] }),
                  filterAll: true
                },
                {
                  Header: "Farm",
                  accessor: "farm",
                  width: 200,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["farm"] }),
                  filterAll: true
                },
                {
                  Header: "Product",
                  id: "product",
                  width: 175,
                  accessor: d => d.product,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["product"] }),
                  filterAll: true
                },
                {
                    Header: "Qty",
                    id: "qty",
                    width: 75,
                    accessor: d => d.qty,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["qty"] }),
                    filterAll: true
                },
                {
                    Header: "Est.Date",
                    id: "date",
                    width: 150,
                    accessor: d => d.date,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["date"] }),
                    filterAll: true
                },
                {
                  Header: "",
                  id: "details",
                  width: 35,
                  accessor: d => <span id={d.id} onClick={this.props.itemObj}>&#x2295;</span>,
                  style: {
                    cursor: "pointer",
                    fontSize: 25,
                    padding: "0",
                    textAlign: "center",
                    userSelect: "none"
                  },
                }
              ]}
              ]}
          defaultPageSize={20}
          className="-striped -highlight"
          style={{
            height: "100%"
          }}
        />
      </div>
    );
  }
}

export default ContainerDashboard;