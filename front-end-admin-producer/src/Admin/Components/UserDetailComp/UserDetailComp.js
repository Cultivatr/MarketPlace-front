import React, { Component } from "react";
import Class from "./userDetailComp.module.css";
import "./userDetailComp.css";

const domainLink = "https://hidden-escarpment-75213.herokuapp.com/";

class UserDetailComp extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      data: this.props.userDetails
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.userDetails.id !== prevProps.userDetails.id) {
      this.setState({ data: this.props.userDetails });
    }
  }

  onChange = e => {
    let data = this.state.data;
    data.isAdmin = document.getElementById("isAdmin").checked;
    console.log("IS ADMIN", data.isAdmin);
    let newdata = { ...data, [e.target.name]: e.target.value };
    this.setState({ data: newdata });
  };

  onSubmit = async e => {
    this.props.removeOverlay();
    e.preventDefault();
    const {
      id,
      firstName,
      lastName,
      billingAddressCity,
      primaryNumber,
      secondaryNumber,
      billingAddressStreet,
      billingAddressProvince,
      email,
      billingAddressCountry,
      billingAddressPostalCode,
      farmName,
      farmLocation,
      mailingAddressCity,
      mailingAddressStreet,
      farmType,
      area,
      mailingAddressProvince,
      rating,
      mailingAddressCountry,
      mailingAddressPostalCode,
      comments,

      isAdmin,

      isProducer,
      isOther
    } = this.state.data;
    try {
      const response = await fetch(domainLink + "/admin/updateUsers/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: id,
          firstName: firstName,
          lastName: lastName,
          billingAddressStreet: billingAddressStreet,
          primaryNumber: primaryNumber,
          secondaryNumber: secondaryNumber,
          billingAddressCity: billingAddressCity,
          billingAddressProvince: billingAddressProvince,
          email: email,
          billingAddressCountry: billingAddressCountry,
          billingAddressPostalCode: billingAddressPostalCode,
          farmName: farmName,
          farmLocation: farmLocation,
          mailingAddressStreet: mailingAddressStreet,
          farmType: farmType,
          area: area,
          mailingAddressCity: mailingAddressCity,
          mailingAddressProvince: mailingAddressProvince,
          rating: rating,
          mailingAddressCountry: mailingAddressCountry,
          mailingAddressPostalCode: mailingAddressPostalCode,
          comments: comments,
          isAdmin: isAdmin,
          isProducer: isProducer,
          isOther: isOther
        })
      });
      const json = await response.json();
      console.log('JSON response is', json);
    } catch (error) {
      console.log(error);
    }
    console.log('UserDetailsComp - show users before await', this.props.showUsers());
    console.log('current data is ', this.state.data); // yes change is getting passed to state
    await this.props.showUsers();  // passed as props from admin thru UsersComp
    console.log('UserDetailsComp - show users after called', this.props.showUsers());
  };

  getAreaValue = () => {
    const element = document.getElementById("area");
    switch (this.state.data.area) {
      case "Southern AB":
        element.value = "Southern AB";
        break;
      case "Central AB":
        element.value = "Central AB";
        break;
      case "Northern AB":
        element.value = "Northern AB";
        break;
      default:
        break;
    }
  };

  getFarmTypeValue = () => {
    const element = document.getElementById("farmType");
    switch (this.state.data.farmType) {
      case "LiveStock":
        element.value = "LiveStock";
        break;
      case "Produce":
        element.value = "Produce";
        break;
      case "Other":
        element.value = "Other";
        break;
      default:
        break;
    }
  };

  getRatingValue = () => {
    const element = document.getElementById("rating");
    switch (this.state.data.rating) {
      case 5:
        element.value = "5";
        break;
      case 4:
        element.value = "4";
        break;
      case 3:
        element.value = "3";
        break;
      case 2:
        element.value = "2";
        break;
      case 1:
        element.value = "1";
        break;
      case 0:
        element.value = "0";
        break;
      default:
        break;
    }
  };

  getAuthValue = () => {
    this.checkIsAdmin();
  };

  checkIsAdmin = () => {
    if (this.state.data.isAdmin === true) {
      document.getElementById("isAdmin").checked = true;
    } else if (this.state.data.isAdmin === false) {
      document.getElementById("isAdmin").checked = false;
    }
  };

  render() {
    const {
      id,
      firstName,
      lastName,
      primaryNumber,
      secondaryNumber,
      email,
      farmName,
      farmLocation,
      member_since,
      mailingAddressStreet,
      mailingAddressCity,
      mailingAddressPostalCode,
      billingAddressStreet,
      billingAddressCity,
      billingAddressPostalCode,
      comments
    } = this.props.userDetails;
    return (
      <div id="userOverlay">
        <div className={Class.itemDetailContainer}>
          <div className={Class.tableHeader}>
            <h4 className="ui horizontal divider header">
              {firstName} {lastName} | User #<i>{id}</i>
            </h4>
          </div>
          <div className={Class.userTable}>
            <table className="ui definition table">
              <tbody>
                <tr>
                  <td className="two wide column">First Name</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={firstName}
                      onChange={this.onChange}
                      name="firstName"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={lastName}
                      onChange={this.onChange}
                      name="lastName"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Primary Number</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={primaryNumber}
                      onChange={this.onChange}
                      name="primaryNumber"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Second Number</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={secondaryNumber}
                      onChange={this.onChange}
                      name="secondaryNumber"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={email}
                      onChange={this.onChange}
                      name="email"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Member Since</td>
                  <td className={Class.noInput}>{member_since}</td>
                </tr>
                <tr>
                  <td>Farm Name</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={farmName}
                      name="farmName"
                      onChange={this.onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Area</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="area"
                      name="area"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Southern AB">Southern AB</option>
                      <option value="Central AB">Central AB</option>
                      <option value="Northern AB">Northern AB</option>
                    </select>
                    {this.getAreaValue()}
                  </td>
                </tr>
                <tr>
                  <td>Farm Location</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={farmLocation}
                      onChange={this.onChange}
                      name="farmLocation"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Farm Type</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="farmType"
                      name="farmType"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="LiveStock">Live Stock</option>
                      <option value="Produce">Produce</option>
                      <option value="Other">Other</option>
                    </select>
                    {this.getFarmTypeValue()}
                  </td>
                </tr>
                <tr>
                  <td>Mailing Address</td>
                  <td className={Class.row}>
                    <b>Street:</b>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={mailingAddressStreet}
                      onChange={this.onChange}
                      name="mailingAddressStreet"
                    />
                    <b>City:</b>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={mailingAddressCity}
                      onChange={this.onChange}
                      name="mailingAddressCity"
                    />
                    <b>Province:</b>
                    <select
                      onChange={this.onChange}
                      name="mailingAddressProvince"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Alberta">Alberta</option>
                    </select>
                    <b>Postal Code:</b>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={mailingAddressPostalCode}
                      onChange={this.onChange}
                      name="mailingAddressPostalCode"
                    />
                    <b>Country:</b>
                    <select
                      onChange={this.onChange}
                      name="mailingAddressCountry"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Canada">Canada</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Billing Address</td>
                  <td className={Class.row}>
                    <b>Street:</b>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={billingAddressStreet}
                      onChange={this.onChange}
                      name="billingAddressStreet"
                    />
                    <b>City:</b>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={billingAddressCity}
                      onChange={this.onChange}
                      name="billingAddressCity"
                    />
                    <b>Province:</b>
                    <select
                      onChange={this.onChange}
                      name="billingAddressProvince"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Alberta">Alberta</option>
                    </select>
                    <b>Postal Code:</b>
                    <input
                      className={Class.tableRow}
                      type="text"
                      placeholder={billingAddressPostalCode}
                      onChange={this.onChange}
                      name="billingAddressPostalCode"
                    />
                    <b>Country:</b>
                    <select
                      onChange={this.onChange}
                      name="billingAddressCountry"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="Canada">Canada</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td className={Class.row}>
                    <select
                      onChange={this.onChange}
                      id="rating"
                      name="rating"
                      multiple=""
                      className="ui fluid dropdown"
                    >
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                      <option value="0">0</option>
                    </select>
                    {this.getRatingValue()}
                  </td>
                </tr>
                <tr>
                  <td>Authorization</td>
                  <td className={Class.row}>
                    <b>Administrator:</b>{" "}
                    <input
                      type="checkbox"
                      id="isAdmin"
                      onChange={this.onChange}
                    />
                  </td>
                  {this.getAuthValue()}
                </tr>
                <tr>
                  <td>Comments</td>
                  <td className={Class.row}>
                    <input
                      className={Class.tableRow}
                      type="text"
                      onChange={this.onChange}
                      placeholder={comments}
                      name="comments"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={Class.itemButtonsContainer}>
            <button
              className={Class.itemButtonsModify}
              onClick={this.onSubmit}
              type="submit"
            >
              Modify
            </button>
            <button
              className={Class.itemButtonsCancel}
              onClick={this.props.removeOverlay}
            >
              Cancel
            </button>
            <button
              className={Class.itemButtonsCancel}
              onClick={() => this.props.deleteSelectedUser(this.state.data.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetailComp;
