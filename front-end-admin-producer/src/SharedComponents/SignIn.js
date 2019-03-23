import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./SignIn.css";
// import GoogleAuth from '../GoogleAuth';
import GoogleLogin from "react-google-login";

class SignIn extends Component {
  constructor() {
    super();
    this.count = 0;
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      userID: "",
      name: "",
      redirect: false,
      admin: ""
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/admin/users`, {
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
    const logInData = {
      name: res.w3.ofa,
      email: res.w3.U3,
      admin: ""
    };
    let currentUser = this.state.userList.users.filter(
      user => user.email === logInData.email
    );
    logInData.admin = currentUser[0].isAdmin;
    if (currentUser) {
      sessionStorage.setItem("authData", JSON.stringify(logInData));
      this.setState({ admin: logInData.admin });
      this.setState({ redirect: true });
    }
    if (!currentUser) {
      console.log("user not in database");
      this.setState({ redirect: true });
    }
  }

  render() {
    if (!sessionStorage.getItem("authData") && this.state.redirect) {
      return <Redirect to={"/"} />;
    }
    if (
      sessionStorage.getItem("authData") &&
      this.state.redirect &&
      this.state.admin
    ) {
      return <Redirect to={"/admin"} />;
    }
    if (sessionStorage.getItem("authData") && this.state.redirect) {
      return <Redirect to={"/producer"} />;
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
            <form className="ui form" onSubmit={this.onSubmit}>
              <div className="field" />
              <div className="rememberMeAndLoginBox">
                <Link to="/producer" className="ui button" type="submit">
                  Producer
                </Link>
                <Link to="/admin" className="ui button" type="submit">
                  Admin
                </Link>
                {/* <GoogleAuth/> */}
                <GoogleLogin
                  clientId="225894951024-d2b5jugscfmfsp8fr6vd5mqhfl5si3uq.apps.googleusercontent.com"
                  buttonText="Sign in with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                />
              </div>
              <div className="forgotPasswordAndRegisterBox">
                {/* <a href="#">Forgot Password</a>
                                <a href="#">Register Now</a> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
