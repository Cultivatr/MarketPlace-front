import React, { Component } from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import styles from "./NavigationItems.module.css";
import GoogleAuth from "../../../GoogleAuth";
import "./NavigationItems.css";

export default class navigationItems extends Component {
  constructor() {
    super();
    this.state = {
      pendingItemsNumber: ""
    };
  }

  componentWillMount = () => {
    setTimeout(this.loadItems, 1000);
  };

  loadItems = () => {
    this.setState({
      pendingItemsNumber: JSON.parse(sessionStorage.getItem("PendingItems"))
    });
  };

  render() {
    return (
      <ul className={styles.list}>
        <li>
          <NavigationItem link={"/producer"}>Home</NavigationItem>
        </li>
        <li>
          <NavigationItem link={"/awaiting-approval"}>
            Items Awaiting Approval
            {this.state.pendingItemsNumber ? (
              <sup id="awaiting-approval">{this.state.pendingItemsNumber}</sup>
            ) : null}
          </NavigationItem>
        </li>
        <li>
          <NavigationItem link={"/add-livestock"}>Add Livestock</NavigationItem>
        </li>
        <li>
          <NavigationItem link={"/add-produce"}>Add Produce</NavigationItem>
        </li>
        <li>
          <NavigationItem link={"/contact-us"}>Contact Us</NavigationItem>
        </li>
        <GoogleAuth />
      </ul>
    );
  }
}
