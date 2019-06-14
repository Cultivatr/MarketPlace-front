import React from "react";
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import "./ProducerSlideMenu.css"



class AdminSlideMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false
        }
    }

    closeMenu = () => {
        this.setState({ menuOpen: false })
    }

    handleStateChange = (state) => {
        this.setState({ menuOpen: state.isOpen })
    }

    SignOutClick = () => {
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("authData");
        sessionStorage.removeItem("adminAuth");
        sessionStorage.removeItem("PendingItems");
        this.setState({ isLoggedIn: false, adminAuth: "" });
    };

    render() {
        return (
            <div onClick={this.closeMenu} className="mobile-top-menu">
                <Menu isOpen={this.state.menuOpen} onStateChange={this.handleStateChange} >
                    <div onClick={this.props.OnClickAllItems} className="menu-item">All Items</div>
                    <div onClick={this.props.OnClickAccept} className="menu-item">Items to Accept</div>
                    <div onClick={this.props.OnClickAwaitingProd} className="menu-item">Awaiting Producer</div>
                    <div onClick={this.props.OnClickConditional} className="menu-item">Accepted Conditionally</div>
                    <div onClick={this.props.OnClickSold} className="menu-item">Sold to be Delivered</div>
                    <div onClick={this.props.OnClickDelivered} className="menu-item">Delivered</div>
                    <div onClick={this.props.OnClickNotAccepted} className="menu-item">Rejected</div>
                    <div onClick={this.props.OnClickArchive} className="menu-item">Archive</div>
                    <div onClick={this.props.OnClickListUsers} className="menu-item">Users</div>
                    <div onClick={this.props.OnClickAddUser} className="menu-item">Add User</div>
                    <div onClick={this.props.OnClickAdminSettings} className="menu-item">Admin Settings</div>
                    {JSON.parse(sessionStorage.getItem("adminAuth")) && <>
                        <Link to={"/Admin"} className="menu-item bm-item bm-admin-link" >Admin</Link>
                        <Link to={"/Producer"} className="menu-item bm-item bm-admin-link"> Producer </Link></>}
                    <Link to={"/"} className="menu-item bm-item bm-signout" onClick={this.SignOutClick}>Sign Out</Link>
                </Menu>
            </div >
        );
    }
}

export default AdminSlideMenu;



