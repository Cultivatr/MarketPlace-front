import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./SignIn.css";
// import GoogleAuth from '../GoogleAuth';
import GoogleLogin from "react-google-login";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      isAdmin: false
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      const response = await fetch(`https://mysterious-cove-46763.herokuapp.com/admin/users/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      await this.setState({ userList: json });
    } catch (error) {
      console.log(error);
    }
  };

  logIn(res) {
    //console.log("USER LIST", this.state.userList.users);
    //console.log("CurrentUser", currentUser);
    // const logInData = Object.assign({}, res.w3.profileObj);
    const logInData = {
      name: res.w3.ofa,
      email: res.w3.U3,
      id: "",
      admin: "",
      fullName: ""
    };
    //console.log("LOG IN DATA", logInData);
    let currentUser = this.state.userList.users.filter(
      user => user.email === logInData.email
    );
    logInData.admin = currentUser[0].isAdmin;
    let adminAuth = logInData.admin;
    console.log("logindata",logInData.admin )
    logInData.id = currentUser[0].id;
    logInData.fullName =
      currentUser[0].firstName + " " + currentUser[0].lastName;
    console.log(logInData);
    if (currentUser) {
      sessionStorage.setItem("authData", JSON.stringify(logInData));
      sessionStorage.setItem("loggedIn", true);
      sessionStorage.setItem("adminAuth", JSON.stringify(adminAuth));
      this.setState({ isLoggedIn: true, admin: logInData.admin });
      this.props.logInToken(true);
    }
  }

  render() {
    let loggedIn = JSON.parse(sessionStorage.getItem("loggedIn"));
    if (this.state.isLoggedIn || loggedIn) {
      return this.state.admin ? (
        <Redirect to={"/admin"} />
      ) : (
        <Redirect to={"/producer"} />
      );
    }

    const responseGoogle = response => {
      this.logIn(response);
    };
    return (
      <div>
        <div className="loginBox">
          <div className="h1-header">
            <h1 className="ui header">Welcome to Cultivatr</h1>
          </div>
          <div>
            <form className="ui form">
              <div className="field" />
              <div className="rememberMeAndLoginBox centeredDisplay">
                <GoogleLogin
                  clientId="441538396161-eujcfeek91eu5r0okb7od4v9k428t0rf.apps.googleusercontent.com"
                  buttonText="Sign in with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                />
              </div>
              <div className="forgotPasswordAndRegisterBox" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
