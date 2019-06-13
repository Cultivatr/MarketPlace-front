import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
      loggedIn: false,
      redirect: "",
      temp: ""
    };
    this.adminAuth = 0;
    this.loggedIn = 0;
  }

  logIn = arg => {
    if (arg) {
      sessionStorage.setItem("loggedIn", true);
      this.setState({ loggedIn: true });
    }
  };

  render() {
    return (
      <div id="outer-container">
        <Router>
          <Switch>
            <Route path="/" component={SignIn} exact />
            <AdminRoute path="/admin" component={Admin} exact />
            <PrivateRoute path="/producer" component={Producer} exact />
            <PrivateRoute
              path="/awaiting-approval"
              component={ProducerApproval}
              exact
            />
            <PrivateRoute path="/add-livestock" component={AddMeatForm} exact />
            <PrivateRoute
              path="/add-produce"
              component={AddProduceForm}
              exact
            />
            <Route path="/contact-us" exact component={ContactUs} />
            {/* <Route path="/sign-out" component={SignOut} /> */}
            <Route component={SignIn} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
