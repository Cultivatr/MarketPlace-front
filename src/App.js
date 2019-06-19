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
import Toolbar from "./SharedComponents/Navigation/Toolbar/Toolbar"
import { loadUserSpecificProduceQuery, loadUserSpecificLivestockQuery } from "./SharedComponents/LocalServer/LocalServer"
import { filterForPending } from './AppUtils'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      redirect: "",
      temp: "",
      pendingLength: "",
      youOff: false,
    };
    this.adminAuth = 0;
    this.loggedIn = 0;
    this.pendingProducer = [];
  }

  logIn = arg => {
    if (arg) {
      sessionStorage.setItem("loggedIn", true);
      this.setState({ loggedIn: true });
    }
  };
  componentDidMount = async () => {
    await this.updateApp()
  }

  updateApp = async () => {
    this.setState({ youOff: !this.state.youOff })
    try {
      const userId = JSON.parse(sessionStorage.getItem("authData")).id;
      const response = await loadUserSpecificProduceQuery(userId)
      const json = await response.json();
      const response2 = await loadUserSpecificLivestockQuery(userId)
      const json2 = await response2.json();
      const newArray = await json.produce.concat(json2.livestock);
      await filterForPending(newArray, this.pendingProducer);
      await this.setState({ pendingLength: this.pendingProducer.length })
    } catch { }
  }

  render() {
    return (
      <div id="outer-container">
        <Router>
          <div>
            {(window.location.pathname.match(/.*Producer.*/i)) && <Toolbar pendingLength={this.state.pendingLength} updateApp={this.updateApp} />}

            <Switch>
              <Route path="/" component={SignIn} exact />
              <AdminRoute path="/admin" exact component={() => <Admin updateApp={this.updateApp} />} />
              <PrivateRoute path="/producer/home" component={Producer} exact />
              <PrivateRoute
                path="/producer/awaiting-approval"
                component={ProducerApproval}
                exact
              />
              <PrivateRoute path="/producer/add-livestock" component={AddMeatForm} exact />
              <PrivateRoute
                path="/producer/add-produce"
                component={AddProduceForm}
                exact
              />
              <Route path="/producer/contact-us" exact component={ContactUs} />
              {/* <Route path="/sign-out" component={SignOut} /> */}
              <Route component={SignIn} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
