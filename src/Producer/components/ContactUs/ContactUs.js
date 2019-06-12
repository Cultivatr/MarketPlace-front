import React, { Component } from "react";
import Toolbar from "../../../SharedComponents/Navigation/Toolbar/Toolbar";
import ProducerSlideMenu from "../../../SharedComponents/Navigation/SlideMenu/ProducerSlideMenu"
import styles from "./ContactUs.module.css";

class ContactUs extends Component {
  state = {
    name: "",
    email: "",
    message: ""
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onMessageChange = e => {
    this.setState({ message: e.target.value });
  };

  onSubmit = () => { };

  render() {
    return (
      <div >
        <Toolbar />
        <h2 className="mobile-header-title">Contact Us</h2>
        <ProducerSlideMenu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
        <div className={styles.loginBox}>
          <div>
            <h2>
              For General Inquires Email Me At <i>dmbzan@gmail.com</i>
            </h2>

            {/* <div className="ui form">
                            <div className="field">
                                <label>Name</label>
                                <input value={this.state.name} onChange={this.onNameChange} type="text" name="email" placeholder="Name"/>
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <input value={this.state.email} onChange={this.onEmailChange} type="text" name="email" placeholder="Email"/>
                            </div>
                            <div className="field">
                                <label>Message</label>
                                <textarea value={this.state.message} onChange={this.onMessageChange}></textarea>
                            </div>
                            <button className='ui button'>Send</button> 
                        </div>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
