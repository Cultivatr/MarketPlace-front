import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./SignIn.css";
// import GoogleAuth from '../GoogleAuth';
import { GoogleLogout } from 'react-google-login';

class SignOut extends Component {
     constructor(){
      super();
      this.state = {
        isLoggedIn: true
      }
     }


  logOut = () => {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("authData");
    sessionStorage.removeItem("adminAuth");
    this.setState({ isLoggedIn: false });

}

  render() {
    
    return this.state.isLoggedIn 
    ?(
      <div className = "centeredDisplay">
      <GoogleLogout 
                  buttonText="Logout" 
                  onLogoutSuccess={this.logOut}
                  clientId="312661703049-alt9cfiqbef9oljaag08q98t8k8q0jci.apps.googleusercontent.com">
      </GoogleLogout>
      </div>
    )
    :(
      <Redirect to={"/"}/>
      )
  }
}

export default SignOut;