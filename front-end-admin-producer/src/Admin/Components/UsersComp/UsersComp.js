import React, { Component } from "react";
import matchSorter from 'match-sorter'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getUserDetails } from '../../../AppUtils';
import UserDetailComp from '../UserDetailComp/UserDetailComp';

class UsersComp extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      data: this.props,
      userDetails: {}
    }
  }

  getProducerObj = (e) => {
    this.setState({ userDetails: getUserDetails(parseInt(e.target.id), this.state.data.data.users) });
    document.getElementById("userOverlay").style.display = "block";
  }

  removeOverlay = (event) => {
    document.getElementById("userOverlay").style.display = "none";
  }

  // getUpdatedUsers = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/admin/users`, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' }
  //     })
  //     const data = await response.json();
  //     const data1 = await { data }
  //     await this.setState({ data: data1 })
  //     console.log(this.state.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  render() {
    const data = this.state.data.data;
    return (
      <div className="table">
        <ReactTable
          data={data.users}
          noDataText="No Users!"
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
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
                  width: 250,
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
                  width: 250,
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
                    width: 250,
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
                    width: 500,
                    accessor: d => d.email,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["email"] }),
                    filterAll: true,
                    style: {
                      textAlign: "center"
                    }
                },
                {
                  Header: "Details",
                  id: "details",
                  width: 75,
                  accessor: d => <span className='detailButton' id={d.id} onClick={this.getProducerObj}>&#9673;</span>,
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
        <UserDetailComp userDetails={this.state.userDetails} removeOverlay={this.removeOverlay} getUsers={this.props.getUsers}/>
      </div>
    );
  }
}

export default UsersComp;