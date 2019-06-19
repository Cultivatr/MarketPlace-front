import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import styles from "./NavigationItems.module.css";
import GoogleAuth from "../../../GoogleAuth";
import "./NavigationItems.css";

export const NavigationItems = ({ pendingLength, updateApp }) => (


  <ul className={styles.list} onClick={updateApp}>
    <li style={(window.location.pathname === "/producer/home") ? { transform: "rotate(10deg)" } : {}}>
      <NavigationItem link={"/producer/home"}>Home</NavigationItem>
    </li>
    <li style={(window.location.pathname === "/producer/awaiting-approval") ? { transform: "rotate(10deg)" } : {}}>
      <NavigationItem link={"/producer/awaiting-approval"}>
        Items Awaiting Approval
            {pendingLength ? (
          <sup id="awaiting-approval">{pendingLength}</sup>
        ) : null}
      </NavigationItem>
    </li>
    <li style={(window.location.pathname === "/producer/add-livestock") ? { transform: "rotate(10deg)" } : {}}>
      <NavigationItem link={"/producer/add-livestock"}>Add Livestock</NavigationItem>
    </li>
    <li style={(window.location.pathname === "/producer/add-produce") ? { transform: "rotate(10deg)" } : {}}>
      <NavigationItem link={"/producer/add-produce"}>Add Produce</NavigationItem>
    </li>
    <li style={(window.location.pathname === "/producer/contact-us") ? { transform: "rotate(10deg)" } : {}}>
      <NavigationItem link={"/producer/contact-us"}>Contact Us</NavigationItem>
    </li>
    <GoogleAuth />
  </ul>
);

