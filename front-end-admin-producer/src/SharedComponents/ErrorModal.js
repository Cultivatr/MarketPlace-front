import React, { Component } from "react";
import Modal from "react-modal";
import "./ErrorModal.css";

class ErrorModal extends Component {
  render() {
    const subText = "(Click Anywhere to Continue)";
    const headText = "Could not be submitted for the following reason:";
    return (
      <Modal
        className="errorModalDisplay-window"
        isOpen={this.props.errorModalIsOpen}
        contentLabel="Error Message"
        onRequestClose={this.props.closeErrorModal}
        style={{
          overlay: {
            display: 0
          }
        }}
      >
        <div className="errorModal-contents">
          <div className="headTxt">{headText}</div>
          {this.props.modalErrorMessage}
          <div onClick={() => this.props.closeErrorModal()}>
            <div className="subTxt">{subText}</div>{" "}
          </div>
        </div>
      </Modal>
    );
  }
}

export default ErrorModal;
