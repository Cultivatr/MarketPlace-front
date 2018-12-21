import React from "react";
import matchSorter from 'match-sorter'
import ReactTable from "react-table";
import "react-table/react-table.css";

class ContainerDashboard extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      data: this.props.data,
    };
  }

  render() {
    const { data } = this.state;
    return (
      <div className="table" onDoubleClick={this.getItemDetails}>
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
                  width: 65,
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
                    width: 65,
                    accessor: d => d.qty,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["qty"] }),
                    filterAll: true
                },
                {
                    Header: "Date",
                    id: "date",
                    width: 115,
                    accessor: d => d.date,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["date"] }),
                    filterAll: true
                },
                {
                  Header: "",
                  id: "details",
                  width: 35,
                  accessor: d => <span id={d.id} onClick={this.props.itemID}>&#x2295;</span>,
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
          defaultPageSize={5}
          className="-striped -highlight"
          style={{
            height: "325px"
          }}
        />
      </div>
    );
  }
}

export default ContainerDashboard;