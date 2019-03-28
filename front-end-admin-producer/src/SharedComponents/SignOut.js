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
    this.setState({ isLoggedIn: false });

}

  render() {
    
    return this.state.isLoggedIn 
    ?(
      <div className = "centeredDisplay">
      <GoogleLogout 
                  buttonText="Logout" 
                  onLogoutSuccess={this.logOut}
                  clientId="225894951024-d2b5jugscfmfsp8fr6vd5mqhfl5si3uq.apps.googleusercontent.com">
      </GoogleLogout>
      </div>
    )
    :(
      <Redirect to={"/"}/>
      )
  }
}

export default SignOut;