import React, { Component } from "react";
import matchSorter from "match-sorter";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getUserDetails } from "../../../AppUtils";
import UserDetailComp from "../UserDetailComp/UserDetailComp";

class UsersComp extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      data: this.props,
      userDetails: {}
    };
  }

  getProducerObj = e => {
    this.setState({
      userDetails: getUserDetails(
        parseInt(e.target.id),
        this.state.data.data.users
      )
    });
    document.getElementById("userOverlay").style.display = "block";
  };

  removeOverlay = () => {
    document.getElementById("userOverlay").style.display = "none";
  };
  deleteSelectedUser = userId => {
    console.log("Deleted User: ", userId);
    fetch("http://localhost:5000/admin/users/delete/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: userId
      })
    }).catch(error => console.log(error));
    setTimeout(() => this.props.OnClickListUsers(), 100);
  };

  render() {
    const data = this.state.data.data;
    return (
      <div className="table">
        <ReactTable
          data={data.users}
          noDataText="No Users!"
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={[
            {
              Header: "LIST OF USERS",
              columns: [
                {
                  Header: "User ID",
                  id: "id",
                  width: 100,
                  accessor: d => d.id,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["id"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "First Name",
                  id: "first_name",
                  // width: 200,
                  accessor: d => d.firstName,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["first_name"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Last Name",
                  id: "last_name",
                  // width: 200,
                  accessor: d => d.lastName,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["last_name"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Primary Number",
                  id: "p_number",
                  width: 160,
                  accessor: d => d.primaryNumber,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["p_number"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Email",
                  id: "email",
                  // width: 400,
                  accessor: d => d.email,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["email"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "",
                  id: "details",
                  width: 75,
                  accessor: d => (
                    <span
                      className="detailButton"
                      id={d.id}
                      onClick={this.getProducerObj}
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
        <UserDetailComp
          userDetails={this.state.userDetails}
          removeOverlay={this.removeOverlay}
          showUsers={this.props.showUsers}
          deleteSelectedUser={this.deleteSelectedUser}
        />
      </div>
    );
  }
}

export default UsersComp;
