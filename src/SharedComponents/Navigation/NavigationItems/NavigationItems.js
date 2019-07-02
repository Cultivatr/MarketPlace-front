import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import styles from "./NavigationItems.module.css";
import GoogleAuth from "../../../GoogleAuth";
import "./NavigationItems.css";
import Tooltip from '../../UI/Tooltip'
import i from '../../../img/i-icon-white.png' ;


export const NavigationItems = ({ pendingLength, updateApp }) => (
     <ul className ={styles.list} onClick={updateApp}>

     <div className="white-logo" style={window.screen.width >= 1000 ? {position:"absolute",left:"3%",top:"1.75%"} : {visibility:"hidden"}}><a href="https://cultivatr1.myshopify.com/"><img alt="CulivatR Logo" style={{width:"125%", height:"125%"}} src="https://cdn.shopify.com/s/files/1/0089/5929/5539/files/CultivatR_log_white_110x.png?v=1560906151"></img></a></div>

    <li style={(window.location.pathname === "/producer/home") ? {borderBottom:"3px solid white"} : {}}>
      <NavigationItem link={"/producer/home"}><p className="shop-font">HOME <Tooltip message={'This Is The Home Page'} position={'bottom'}><img alt="" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></p></NavigationItem>
    </li>
    <li style={(window.location.pathname === "/producer/awaiting-approval") ? {borderBottom:"3px solid white"} : {}}>
      <NavigationItem link={"/producer/awaiting-approval"}><p className="shop-font">
        ITEMS AWAITING APPROVAL  

            {pendingLength ? (
          <sup id="awaiting-approval">{ pendingLength}</sup>
        ) : null} <Tooltip message={'Your Items Awaiting Approval'} position={'bottom'}><img alt="" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip>
      </p></NavigationItem>
    </li>
    <li style={(window.location.pathname === "/producer/add-livestock") ? {borderBottom:"3px solid white"} : {}}>
      <NavigationItem link={"/producer/add-livestock"}><p className="shop-font">ADD LIVESTOCK <Tooltip message={'Add Livestock Form'} position={'bottom'}><img alt="" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></p></NavigationItem>
    </li>
    <li style={(window.location.pathname === "/producer/add-produce") ? {borderBottom:"3px solid white"} : {}}>
      <NavigationItem link={"/producer/add-produce"}><p className="shop-font">ADD PRODUCE <Tooltip message={'Add Produce Form'} position={'bottom'}><img alt="" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></p></NavigationItem>
    </li>
    <li style={(window.location.pathname === "/producer/contact-us") ? {borderBottom:"3px solid white"} : {}}>
      <NavigationItem link={"/producer/contact-us"}><p className="shop-font">CONTACT US <Tooltip message={'Contact Us Form'} position={'bottom'}><img alt="" style={{ width: "15px", height: "15px" }} src={i}></img></Tooltip></p></NavigationItem>

    </li>
    <GoogleAuth />
  </ul>
);

