import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import styles from "./NavigationItems.module.css";
import GoogleAuth from "../../../GoogleAuth";
import "./NavigationItems.css";
import Tooltip from '../../UI/Tooltip'
import i from '../../../img/i-icon-white.png' ;
import logo from '../../../img/CultivatR_logo.png'

export const NavigationItems = ({ pendingLength, updateApp }) => (
  
  
  <ul className={styles.list} onClick={updateApp}>

    <div className="white-logo" style={{position:"absolute",left:"2.5%",top:"0%"}}><a href="https://cultivatr1.myshopify.com/"><img style={{width:"130%", height:"130%"}}src={logo} onClick></img></a></div>

    <li style={(window.location.pathname === "/producer/home") ? { textDecoration:"underline white"} : {}}>
      <NavigationItem  link={"/producer/home"}>Home <Tooltip message={'This Is The Home Page'} position={'bottom'}><img alt="" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></NavigationItem>
    </li>
    <li style={(window.location.pathname === "/producer/awaiting-approval") ? { textDecoration:"underline white"} : {}}>
      <NavigationItem link={"/producer/awaiting-approval"}>
        Items Awaiting Approval 
            {pendingLength ? (
          <sup id="awaiting-approval">{pendingLength}</sup>
        ) : null} <Tooltip message={'Your Items Awaiting Approval'} position={'bottom'}><img alt="" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip>
      </NavigationItem>
    </li>
    <li style={(window.location.pathname === "/producer/add-livestock") ? {textDecoration:"underline white"} : {}}>
      <NavigationItem link={"/producer/add-livestock"}>Add Livestock <Tooltip message={'Add Livestock Form'} position={'bottom'}><img alt="" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></NavigationItem>
    </li>
    <li style={(window.location.pathname === "/producer/add-produce") ? { textDecoration:"underline white"} : {}}>
      <NavigationItem link={"/producer/add-produce"}>Add Produce <Tooltip message={'Add Produce Form'} position={'bottom'}><img alt="" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></NavigationItem>
    </li>
    <li style={(window.location.pathname === "/producer/contact-us") ? { textDecoration:"underline white"} : {}}>
      <NavigationItem link={"/producer/contact-us"}>Contact Us <Tooltip message={'Contact Us Form'} position={'bottom'}><img alt="" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></NavigationItem>
    </li>
    <GoogleAuth />
  </ul>
);

