import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class AdminNav extends Component {
  constructor() {
    super();
    this.state = {
      redirect: ""
    };
  }

  SignOutClick = () => {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("authData");
    sessionStorage.removeItem("adminAuth");
    this.setState({ isLoggedIn: false, adminAuth: "" });
  };

  render() {
    return (
      <div className="displayEnd">
        {/* {this.redirectHandler()} */}

        {JSON.parse(sessionStorage.getItem("adminAuth")) ? (
          <div className="magicbox">
            <Link className="link" to={"/Admin"}>
              Admin
            </Link>
            <Link className="link" to={"/Producer"}>
              Producer
            </Link>
          </div>
        ) : null}

        {JSON.parse(sessionStorage.getItem("loggedIn")) ? (
          <a href="/" className="link" onClick={this.SignOutClick}>
            Sign Out
          </a>
        ) : null}
      </div>
    );
  }
}
