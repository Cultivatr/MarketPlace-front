import React, { Component } from "react";
import { Link } from "react-router-dom";
import signout from '../../src/img/exit-icon.png' ;
import admin from '../../src/img/admin-icon.png' ;
import producer from '../../src/img/producer-icon.png' ;
import Tooltip from '../../src/SharedComponents/UI/Tooltip' ;
import './miscStyles.css'
export default class AdminNav extends Component {
  constructor() {
    super();
    this.state = {
      redirect: "",
      isAdmin: "",
      screenSize: 0,
    };
  }
  componentWillMount(){
    this.setState({
      isAdmin: this.props.isAdmin,
    })
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
      <div id="magic-div">
        <div id="desktop-menu" onClick={this.props.updateApp}>
          <div style={this.state.isAdmin==="true"? {backgroundColor:"1ECE88",position:"absolute",top:"85%",left:"1%",borderRadius:"20%",} : {backgroundColor:"black",position:"absolute",top:"8.5%",left:"87.5%"}} className="displayEnd ">
            {/* {this.redirectHandler()} */}

            {JSON.parse(sessionStorage.getItem("adminAuth")) ? (
              <div id="magic-box" className="magicbox">
                <Link style={this.state.isAdmin==="true" ? {backgroundColor:"1ECE88",padding:"10px 10px",borderRadius:"20%"} : {backgroundColor:"black"}} className="link" to={"/Admin"}>
                <Tooltip message={'Switch to Admin'} position={'bottom'}><img alt="Admin Mode" style={{width:"40px",height:"40px",}} src={admin}></img></Tooltip>
              </Link>
                <Link style={this.state.isAdmin==="true" ? {backgroundColor:"1ECE88",padding:"10px 10px",borderRadius:"20%"} : {backgroundColor:"black"}} className="link" to={"/Producer/home"}>
                <Tooltip message={'Switch to Producer'} position={'bottom'}><img alt="Producer Mode" style={{width:"40px",height:"40px",}} src={producer}></img></Tooltip>
              </Link>
              </div>
            ) : null}

            {JSON.parse(sessionStorage.getItem("loggedIn")) ? (
              <a style={this.state.isAdmin==="true" ? {backgroundColor:"1ECE88",padding:"10px 0px",marginRight:"0px",borderRadius:"20%"} : {backgroundColor:"black"}} href="/" className="link" onClick={this.SignOutClick}>
                <Tooltip  message={'Sign Out'} position={'bottom'}><img alt="Sign Out" style={{width:"40px",height:"40px",}} src={signout}></img></Tooltip>
            </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}