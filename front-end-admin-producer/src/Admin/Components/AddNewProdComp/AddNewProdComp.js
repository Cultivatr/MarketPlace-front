import React, { Component } from "react";
import Class from "./AddNewProdComp.module.css";
import Button from "../../../SharedComponents/UI/Button";

class AddNewProdComp extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      billingAddressStreet: "",
      primaryNumber: "",
      secondaryNumber: "",
      billingAddressCity: "",
      billingAddressProvince: "Alberta",
      email: "",
      billingAddressCountry: "Canada",
      billingAddressPostalCode: "",
      farmName: "",
      farmLocation: "",
      farmType: "",
      mailingAddressStreet: "",
      area: "",
      mailingAddressCity: "",
      mailingAddressProvince: "Alberta",
      rating: 0,
      mailingAddressCountry: "Canada",
      mailingAddressPostalCode: "",
      comments: "",
      isAdmin: false,
      //Byron will delete the following two variables once he has time
      // to trace them all the way through the code
      isProducer: false,
      isOther: false
    }
  };

  camelCaseString = string => {
    if (string.name === "area" || string.name === "farmType") {
      return string.value;
    }
    const text = string.value
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    return text;
  };

  onChange = e => {
    let data = this.state.data;
    data.isAdmin = document.getElementById("isAdmin").checked;
    const newValue = this.camelCaseString(e.target);
    let newdata = { ...data, [e.target.name]: newValue };
    this.setState({ data: newdata });
    console.log("Data", newdata);
  };

  onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const {
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
    document.getElementById("submitBtn").className += " loading";
    fetch("https://mysterious-cove-46763.herokuapp.com/admin/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
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
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .then(form.reset())
      .catch(error => console.log(error));
    setTimeout(() => this.props.OnClickListUsers(), 1000);
  };

  render() {
    return (
      <div className="ui grid">
        <br />
        <div>
          <view
            style={{
              width: 15,
              height: 15,
              borderRadius: 150 / 2,
              backgroundColor: "#1ECE88",
              position: "relative",
              top: "20px"
            }}
          >
            Coloured Border Indicates Required Field
          </view>
        </div>
        <form onSubmit={this.onSubmit} className="ui row form">
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>First Name</label>
                <input
                  onChange={this.onChange}
                  type="text"
                  name="firstName"
                  style={{ border: "3px solid #1ECE88" }}
                />
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Last Name</label>
                <input
                  onChange={this.onChange}
                  type="text"
                  name="lastName"
                  style={{ border: "3px solid #1ECE88" }}
                />
              </div>
            </div>
          </div>
          <div className="eight wide column">
            <div className={Class.field}>
              <div className="field">
                <label>* Billing Address - Street</label>
                <input
                  onChange={this.onChange}
                  type="text"
                  name="billingAddressStreet"
                />
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Primary Number</label>
                <input
                  onChange={this.onChange}
                  type="text"
                  name="primaryNumber"
                  placeholder="xxx-xxx-xxxx"
                  style={{ border: "3px solid #1ECE88" }}
                />
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Secondary Number</label>
                <input
                  onChange={this.onChange}
                  type="text"
                  name="secondaryNumber"
                  placeholder="xxx-xxx-xxxx"
                />
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>City</label>
                <input
                  onChange={this.onChange}
                  type="text"
                  name="billingAddressCity"
                />
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Province</label>
                <select
                  onChange={this.onChange}
                  name="billingAddressProvince"
                  multiple=""
                  className="ui fluid dropdown"
                >
                  <option value="Alberta">Alberta</option>
                </select>
              </div>
            </div>
          </div>
          <div className="eight wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Email</label>
                <input
                  onChange={this.onChange}
                  type="email"
                  name="email"
                  placeholder="must contain @ symbol"
                  style={{ border: "3px solid #1ECE88" }}
                />
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Country</label>
                <select
                  onChange={this.onChange}
                  name="billingAddressCountry"
                  multiple=""
                  className="ui fluid dropdown"
                >
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Postal Code</label>
                <input
                  onChange={this.onChange}
                  type="text"
                  name="billingAddressPostalCode"
                  placeholder="xxxxxx"
                />
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Farm Name</label>
                <input onChange={this.onChange} type="text" name="farmName" />
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Farm Location</label>
                <input
                  onChange={this.onChange}
                  type="text"
                  name="farmLocation"
                />
              </div>
            </div>
          </div>
          <div className="eight wide column">
            <div className={Class.field}>
              <div className="field">
                <label>* Mailing Address - Street</label>
                <input
                  onChange={this.onChange}
                  type="text"
                  name="mailingAddressStreet"
                />
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Farm Type</label>
                <select
                  onChange={this.onChange}
                  name="farmType"
                  multiple=""
                  className="ui fluid dropdown"
                >
                  <option value="Livestock">Live Stock</option>
                  <option value="Produce">Produce</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Area</label>
                <select
                  onChange={this.onChange}
                  name="area"
                  multiple=""
                  className="ui fluid dropdown"
                >
                  <option value="Southern AB">Southern AB</option>
                  <option value="Central AB">Central AB</option>
                  <option value="Northern AB">Northern AB</option>
                </select>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>City</label>
                <input
                  onChange={this.onChange}
                  type="text"
                  name="mailingAddressCity"
                />
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Province</label>
                <select
                  onChange={this.onChange}
                  name="mailingAddressProvince"
                  multiple=""
                  className="ui fluid dropdown"
                >
                  <option value="Alberta">Alberta</option>
                </select>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Rating</label>
                <select
                  onChange={this.onChange}
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
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field" />
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Country</label>
                <select
                  onChange={this.onChange}
                  name="mailingAddressCountry"
                  multiple=""
                  className="ui fluid dropdown"
                >
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Postal Code</label>
                <input
                  onChange={this.onChange}
                  type="text"
                  name="mailingAddressPostalCode"
                  placeholder="xxxxxx"
                />
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className={Class.field}>
              <div className="grouped fields">
                <label>Authorization:</label>
                <div className="field">
                  <label>
                    <input
                      type="checkbox"
                      id="isAdmin"
                      onChange={this.onChange}
                    />{" "}
                    Administration
                  </label>
                  {/* The following is no longer required
                  <label>
                    <input
                      type="checkbox"
                      id="isProd"
                      onChange={this.onChange}
                    />{" "}
                    Producer
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      id="isOther"
                      onChange={this.onChange}
                    />{" "}
                    Other
                  </label> */}
                </div>
              </div>
            </div>
          </div>
          <div className="twelve wide column">
            <div className={Class.field}>
              <div className="field">
                <label>Comments</label>
                <textarea
                  onChange={this.onChange}
                  placeholder="Tell us more"
                  rows="3"
                  name="comments"
                />
              </div>
            </div>
          </div>

          <div className={Class.buttonContainer}>
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewProdComp;
