import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Admin from "./Admin/Admin";
import Producer from "./Producer/Producer";
import SignIn from "./SharedComponents/SignIn";
import AddMeatForm from "./Producer/components/AddItem/AddMeatForm/AddMeatForm";
import AddProduceForm from "./Producer/components/AddItem/AddProduceForm/AddProduceForm";
import ContactUs from "./Producer/components/ContactUs/ContactUs";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAdmin: "",
      isLoggedIn: ""
    };
  }
  componentDidMount() {
    //  let data = JSON.parse(sessionStorage.getItem("authData"));
    //  console.log("DATA", data);
    //  this.setState({ isAdmin: true });
    //  console.log("state", this.state, "data.name", data.name);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path="/" exact component={SignIn} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/producer" exact component={Producer} />
            {/* <Route path='/item-details' exact component={ProductDetail}/> */}
            <Route path="/contact-us" exact component={ContactUs} />
            <Route path="/add-livestock" exact component={AddMeatForm} />
            <Route path="/add-produce" exact component={AddProduceForm} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
