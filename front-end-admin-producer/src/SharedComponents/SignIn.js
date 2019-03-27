import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./SignIn.css";
// import GoogleAuth from '../GoogleAuth';
import GoogleLogin from "react-google-login";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
     isLoggedIn: false,
     isAdmin: false
    }
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
    const logInData = Object.assign({},res.w3.profileObj);
    let currentUser = this.state.userList.users.filter(
      user => user.email === logInData.email
    );
    logInData.admin = true;
    if (currentUser) {
      sessionStorage.setItem("authData", JSON.stringify(logInData));
      sessionStorage.setItem("loggedIn", true);
      this.setState({ isLoggedIn: true,
                           admin: logInData.admin 
                         });
      this.props.logInToken(true); 
    }
  }

  render() {
    if (this.state.isLoggedIn){
      
      {return this.state.admin ? <Redirect to={"/admin"}/> : <Redirect to={"/producer"}/>;}
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
              <div className="rememberMeAndLoginBox">
                <Link to="/producer" className="ui button" type="submit">
                  Producer
                </Link>
                <GoogleLogin
                  clientId="225894951024-d2b5jugscfmfsp8fr6vd5mqhfl5si3uq.apps.googleusercontent.com"
                  buttonText="Sign in with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                />
              </div>
              <div className="forgotPasswordAndRegisterBox">
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
