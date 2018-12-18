import React from "react";
import matchSorter from 'match-sorter'
import ReactTable from "react-table";
import "react-table/react-table.css";

class ContainerDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
    //   data: ''
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div className="table">
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              Header: "click on headers to sort or type to filter",
              columns: [
                {
                  Header: "Farm",
                  accessor: "farm",
                  width: 220,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["lastName"] }),
                  filterAll: true
                },
                {
                  Header: "Product",
                  id: "product",
                  width: 240,
                  accessor: d => d.lastName,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["lastName"] }),
                  filterAll: true
                },
                {
                    Header: "Qty",
                    id: "qty",
                    width: 75,
                    accessor: d => d.lastName,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["lastName"] }),
                    filterAll: true
                },
                {
                    Header: "Date",
                    id: "date",
                    width: 125,
                    accessor: d => d.lastName,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["lastName"] }),
                    filterAll: true
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