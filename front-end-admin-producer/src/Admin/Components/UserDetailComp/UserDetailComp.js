import React, { Component } from 'react';
import Class from "./userDetailComp.module.css";
import "./userDetailComp.css"

class UserDetailComp extends Component {
    render() {
        const { id, first_name, last_name, p_number, s_number, email, f_name, f_location,
                area, is_producer, is_admin, is_other, member_since, f_type, rating,
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
                                <td>{p_number}</td>
                            </tr>
                            <tr>
                                <td>Second Number</td>
                                <td>{s_number}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <td>Member Since</td>
                                <td>{member_since}</td>
                            </tr>
                            <tr>
                                <td>Farm Name</td>
                                <td>{f_name}</td>
                            </tr>
                            <tr>
                                <td>Area</td>
                                <td>{area}</td>
                            </tr>
                            <tr>
                                <td>Farm Location</td>
                                <td>{f_location}</td>
                            </tr>
                            <tr>
                                <td>Farm Type</td>
                                <td>{f_type}</td>
                            </tr>
                            <tr>
                                <td>Mailing Address</td>
                                <td><b>Street:</b> {m_street} <b>City:</b> {m_city} <b>Province:</b> {m_province} <b>Postal Code:</b> {m_postal_code} <b>Country:</b> {m_country}</td>
                            </tr>
                            <tr>
                                <td>Billing Address</td>
                                <td><b>Street:</b> {b_street} <b>City:</b> {b_city} <b>Province:</b> {b_province} <b>Postal Code:</b> {b_postal_code} <b>Country:</b> {b_country}</td>
                            </tr>
                            <tr>
                                <td>Rating</td>
                                <td>{rating}</td>
                            </tr>
                            <tr>
                                <td>Authorization</td>
                                <td><b>Administrator:</b> {is_admin} <b>Producer:</b> {is_producer} <b>Both:</b> {is_other}</td>
                            </tr>
                            <tr>
                                <td>Comments</td>
                                <td>{comments}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div className={Class.itemButtonsContainer}>
                        <button className={Class.itemButtonsAccept} onClick={this.props.removeOverlay}>Accept</button>
                        <button className={Class.itemButtonsModify} onClick={this.props.removeOverlay}>Modify</button>
                        <button className={Class.itemButtonsDeny} onClick={this.props.removeOverlay}>Deny</button>
                        <button className={Class.itemButtonsCancel} onClick={this.props.removeOverlay}>Cancel</button>
                    </div> 
                </div>
            </div> 
        )
    }
}

export default UserDetailComp;