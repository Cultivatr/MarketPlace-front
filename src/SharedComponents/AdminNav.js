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
    sessionStorage.removeItem("PendingItems");
    this.setState({ isLoggedIn: false, adminAuth: "" });
  };

  render() {
    return (
      <div id="desktop-menu" onClick={this.props.updateApp}>
        <div style={{backgroundColor:"black"}} className="displayEnd ">
          {/* {this.redirectHandler()} */}

          {JSON.parse(sessionStorage.getItem("adminAuth")) ? (
            <div className="magicbox" style={{borderBottom:"1px solid white"}}>
              <Link style={{backgroundColor:"black"}} className="link" to={"/Admin"}>
                Admin
            </Link>
              <Link style={{backgroundColor:"black"}} className="link" to={"/Producer/home"}>
                Producer
            </Link>
            </div>
          ) : null}

          {JSON.parse(sessionStorage.getItem("loggedIn")) ? (
            <a style={{backgroundColor:"black", borderBottom:"1px solid white"}} href="/" className="link" onClick={this.SignOutClick}>
              Sign Out
          </a>
          ) : null}
        </div>
      </div>
    );
  }
}
