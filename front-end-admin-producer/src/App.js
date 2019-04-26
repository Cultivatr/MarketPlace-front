import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Admin from "./Admin/Admin";
import Producer from "./Producer/Producer";
import SignIn from "./SharedComponents/SignIn";
// import SignOut from "./SharedComponents/SignOut";
import PrivateRoute from "./SharedComponents/PrivateRoute";
import AdminRoute from "./SharedComponents/AdminRoute";
import ProducerApproval from "./Producer/components/ProducerApproval/ProducerApproval";
import AddMeatForm from "./Producer/components/AddItem/AddMeatForm/AddMeatForm";
import AddProduceForm from "./Producer/components/AddItem/AddProduceForm/AddProduceForm";
import ContactUs from "./Producer/components/ContactUs/ContactUs";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };
  }

  logIn = arg => {
    if (arg) {
      sessionStorage.setItem("loggedIn", true);
      this.setState({ loggedIn: true });
    }
  };

  redirectToProducer = () => {
    this.setState({ redirect: "/producer" });
  };

  redirectToAdmin = () => {
    this.setState({ redirect: "/admin" });
  };

  onClick = () => {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("authData");
    sessionStorage.removeItem("adminAuth");
    this.setState({ isLoggedIn: false });
  };

  redirect = () => {
    if (this.state.redirect === "/producer") {
      return <Redirect to="/producer" />;
    } else if (this.state.redirect === "/admin") {
      return <Redirect to="/admin" />;
    }
    return;
  };
  render() {
    let loggedIn = JSON.parse(sessionStorage.getItem("loggedIn"));
    let adminAuth = JSON.parse(sessionStorage.getItem("adminAuth"));

    return (
      <div>
        <div className="displayEnd">
          {adminAuth ? (
            <div className="magicbox">
              <p className="link" onClick={this.redirectToAdmin}>
                Admin
              </p>{" "}
              <p className="link" onClick={this.redirectToProducer}>
                Producer
              </p>
            </div>
          ) : null}

          {loggedIn ? (
            <a href="/sign-out" className="link" onClick={this.onClick}>
              Sign Out
            </a>
          ) : null}
        </div>
        <Router>
          <div>
            {this.redirect()}
            <div>
              <Route
                path="/"
                render={routeProps => <SignIn logInToken={this.logIn} />}
              />
              <AdminRoute path="/admin" component={Admin} exact />
              <PrivateRoute path="/producer" component={Producer} exact />
              <PrivateRoute
                path="/awaiting-approval"
                component={ProducerApproval}
                exact
              />
              <PrivateRoute
                path="/add-livestock"
                component={AddMeatForm}
                exact
              />
              <PrivateRoute
                path="/add-produce"
                component={AddProduceForm}
                exact
              />
              <Route path="/contact-us" exact component={ContactUs} />
              {/* <Route path="/sign-out" component={SignOut} /> */}
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
