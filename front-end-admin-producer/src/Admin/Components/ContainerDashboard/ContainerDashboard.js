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
                  width: 100,
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
                  width: 350,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["farm"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Product",
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
                    Header: "Qty",
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
                    Header: "Est.Date",
                    id: "date",
                    width: 340,
                    accessor: d => d.date,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["date"] }),
                    filterAll: true,
                    style: {
                      textAlign: "center"
                    }
                },
                {
                  Header: "",
                  id: "details",
                  width: 50,
                  accessor: d => <span className='detail-button' id={d.id} onClick={this.props.itemObj}>&#9673;</span>,
                  style: {
                    cursor: "pointer",
                    fontSize: 25,
                    padding: "5px 5px",
                    textAlign: "center",
                    userSelect: "none"
                  },
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

export default ContainerDashboard;