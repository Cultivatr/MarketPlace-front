import React, { Component } from 'react';
import Class from "./userDetailComp.module.css";
import "./userDetailComp.css"

class UserDetailComp extends Component {

    getAreaValue = () => {
        const element = document.getElementById("area");
        switch (this.props.userDetails.area) {
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
    }

    getFarmTypeValue = () => {
        const element = document.getElementById("farmType");
        switch (this.props.userDetails.f_type) {
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
    }

    getRatingValue = () => {
        const element = document.getElementById("rating");
        switch (this.props.userDetails.rating) {
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
    }

    render() {
        const { id, first_name, last_name, p_number, s_number, email, f_name, f_location,
                is_producer, is_admin, is_other, member_since, rating,
                m_street, m_city, m_province, m_country, m_postal_code,
                b_street, b_city, b_province, b_country, b_postal_code, comments } = this.props.userDetails;
        return (
            <div id="userOverlay">
                <div className={Class.itemDetailContainer}>
                    <div className={Class.tableHeader}>
                        <h4 className="ui horizontal divider header">{first_name} {last_name} | User #<i>{id}</i></h4>
                    </div>
                    <div className={Class.userTable}>
                        <table className="ui definition table">
                        <tbody>
                            <tr>
                                <td className="two wide column">Primary Number</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={p_number} /></td>
                            </tr>
                            <tr>
                                <td>Second Number</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={s_number} /></td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={email} /></td>
                            </tr>
                            <tr>
                                <td>Member Since</td>
                                <td className={Class.noInput}>{member_since}</td>
                            </tr>
                            <tr>
                                <td>Farm Name</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={f_name} /></td>
                            </tr>
                            <tr>
                                <td>Area</td>
                                <td className={Class.row}>
                                    <select onChange={this.onChange} id="area" name="area" multiple="" className="ui fluid dropdown">
                                        <option value="Southern AB">Southern AB</option>
                                        <option value="Central AB">Central AB</option>
                                        <option value="Northern AB">Northern AB</option>
                                    </select>
                                    {this.getAreaValue()}
                                </td>
                            </tr>
                            <tr>
                                <td>Farm Location</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={f_location} /></td>
                            </tr>
                            <tr>
                                <td>Farm Type</td>
                                <td className={Class.row}>
                                    <select onChange={this.onChange} id="farmType" name="farmMethod" multiple="" className="ui fluid dropdown">
                                        <option value="LiveStock">Live Stock</option>
                                        <option value="Produce">Produce</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {this.getFarmTypeValue()}
                                </td>
                            </tr>
                            <tr>
                                <td>Mailing Address</td>
                                <td className={Class.noInput}><b>Street:</b><input className={Class.tableRow} type="text" placeholder={m_street} /> 
                                                            <b>City:</b><input className={Class.tableRow} type="text" placeholder={m_city} />
                                                            <b>Province:</b><select onChange={this.onChange} name="mailingAddressProvince" multiple="" className="ui fluid dropdown">
                                                                                <option value="Alberta">Alberta</option>
                                                                            </select> 
                                                            <b>Postal Code:</b><input className={Class.tableRow} type="text" placeholder={m_postal_code} />
                                                            <b>Country:</b><select onChange={this.onChange} name="mailingAddressCountry" multiple="" className="ui fluid dropdown">
                                                                                <option value="Canada">Canada</option>
                                                                            </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Billing Address</td>
                                <td className={Class.noInput}><b>Street:</b><input className={Class.tableRow} type="text" placeholder={b_street} /> 
                                                            <b>City:</b><input className={Class.tableRow} type="text" placeholder={b_city} /> 
                                                            <b>Province:</b><select onChange={this.onChange} name="billingAddressProvince" multiple="" className="ui fluid dropdown">
                                                                                <option value="Alberta">Alberta</option>
                                                                            </select>
                                                            <b>Postal Code:</b><input className={Class.tableRow} type="text" placeholder={b_postal_code} /> 
                                                            <b>Country:</b><select onChange={this.onChange} name="billingAddressCountry" multiple="" className="ui fluid dropdown">
                                                                                <option value="Canada">Canada</option>
                                                                            </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Rating</td>
                                <td className={Class.row}>
                                    <select onChange={this.onChange} id="rating" name="rating" multiple="" className="ui fluid dropdown">
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
                                <td className={Class.row}><b>Administrator:</b> {is_admin} <b>Producer:</b> {is_producer} <b>Both:</b> {is_other}</td>
                            </tr>
                            <tr>
                                <td>Comments</td>
                                <td className={Class.row}><input className={Class.tableRow} type="text" placeholder={comments} /></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div className={Class.itemButtonsContainer}>
                        <button className={Class.itemButtonsModify} onClick={this.props.removeOverlay}>Modify</button>
                        <button className={Class.itemButtonsCancel} onClick={this.props.removeOverlay}>Cancel</button>
                    </div> 
                </div>
            </div> 
        )
    }
}

export default UserDetailComp;