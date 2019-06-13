import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';
import "./ProducerSlideMenu.css"
import React from "react";


class ProducerSlideMenu extends React.Component {

    SignOutClick = () => {
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("authData");
        sessionStorage.removeItem("adminAuth");
        sessionStorage.removeItem("PendingItems");
        this.setState({ isLoggedIn: false, adminAuth: "" });
    };

    render() {
        return (
            <div className="mobile-top-menu">
                <Menu>
                    <Link to={"/producer"} className="menu-item" >Producer</Link>
                    <Link to={"/awaiting-approval"} className="menu-item" >Awaiting Approval</Link>
                    <Link to={"/add-livestock"} className="menu-item" >Add Livestock</Link>
                    <Link to={"/add-produce"} className="menu-item" >Add Produce</Link>
                    <Link to={"/contact-us"} className="menu-item" >Contact Us</Link>
                    {JSON.parse(sessionStorage.getItem("adminAuth")) && <>
                        <Link to={"/Admin"} className="menu-item bm-item bm-admin-link" >Admin</Link>
                        <Link to={"/Producer"} className="menu-item bm-item bm-admin-link"> Producer </Link></>}
                    <Link to={"/"} className="menu-item bm-item bm-signout" onClick={this.SignOutClick}>Sign Out</Link>
                </Menu>
            </div>
        );
    }
}

export default ProducerSlideMenu;