import React, { Component } from "react";
import matchSorter from 'match-sorter'
import ReactTable from "react-table";
import "react-table/react-table.css";

class UsersComp extends Component {
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
          noDataText="No Users!"
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              Header: "click on headers to sort or type to filter",
              columns: [
                {
                  Header: "User ID",
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
                  Header: "First Name",
                  accessor: "First_name",
                  width: 250,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["First_name"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Last Name",
                  id: "Last_name",
                  width: 250,
                  accessor: d => d.product,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["Last_name"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                    Header: "Primary Number",
                    id: "P_number",
                    width: 250,
                    accessor: d => d.qty,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["P_number"] }),
                    filterAll: true,
                    style: {
                      textAlign: "center"
                    }
                },
                {
                    Header: "Email",
                    id: "Email",
                    width: 500,
                    accessor: d => d.date,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["Email"] }),
                    filterAll: true,
                    style: {
                      textAlign: "center"
                    }
                },
                {
                  Header: "Details",
                  id: "details",
                  width: 100,
                  accessor: d => <span className='detail-button' id={d.id} onClick={this.props.getProducerObj}>&#x2295;</span>,
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

export default UsersComp;