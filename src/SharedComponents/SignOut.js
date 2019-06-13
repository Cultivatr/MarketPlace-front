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
                  clientId="441538396161-eujcfeek91eu5r0okb7od4v9k428t0rf.apps.googleusercontent.com">
      </GoogleLogout>
      </div>
    )
    :(
      <Redirect to={"/"}/>
      )
  }
}

export default SignOut;