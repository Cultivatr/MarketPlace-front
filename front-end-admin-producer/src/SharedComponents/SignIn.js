import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./SignIn.css";
// import GoogleAuth from '../GoogleAuth';
import GoogleLogin from "react-google-login";

const domainLink = "https://hidden-escarpment-75213.herokuapp.com";
// const domainLink = "http://localhost:5000";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      isAdmin: false
    };
  }

  componentDidMount() {
    this.setState({ test: "test" });
  }
  // redirectButton = () => {
  //   console.log("redirect button clicked");
  //   let logInData = [];
  //   fetch(domainLink + "/login/", {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({
  //       email: "byrondaniels@gmail.com"
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       logInData = {
  //         name: data.user.firstName,
  //         email: data.user.email,
  //         id: data.user.id,
  //         admin: data.user.isAdmin,
  //         fullName: `${data.user.firstName} ${data.user.lastName}`
  //       };
  //       sessionStorage.setItem("authData", JSON.stringify(logInData));
  //       sessionStorage.setItem("loggedIn", true);
  //       sessionStorage.setItem("adminAuth", logInData.admin);
  //       setTimeout(
  //         this.setState({ isLoggedIn: true, admin: logInData.admin }),
  //         1000
  //       );
  //     })
  //     .catch(error => console.log("ERROR:", error));
  // };

  logIn(res) {
    let logInData = [];
    fetch(domainLink + "/login/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: res.w3.U3
      })
    })
      .then(response => response.json())
      .then(data => {
        logInData = {
          name: data.user.firstName,
          email: data.user.email,
          id: data.user.id,
          admin: data.user.isAdmin,
          fullName: `${data.user.firstName} ${data.user.lastName}`
        };
        sessionStorage.setItem("authData", JSON.stringify(logInData));
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("adminAuth", logInData.admin);
        setTimeout(
          this.setState({ isLoggedIn: true, admin: logInData.admin }),
          1000
        );
      })
      .catch(error => console.log("ERROR:", error));
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
            <h1 className="ui header">Welcome to CultivatR</h1>
          </div>
          <div>
            <form className="ui form">
              <div className="field" />
              <div className="rememberMeAndLoginBox centeredDisplay">
                <GoogleLogin
                  clientId="441538396161-n36t34tefa1n3vpd0rfrigm8688d3uat.apps.googleusercontent.com"
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
