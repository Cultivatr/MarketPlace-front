import React, { Component } from 'react';
import './User.css'

class UserForm extends Component {
    render() {
        return (
            <div className='userContainer'>
                <div className='userH1'>
                    <h1 className='ui header h1-header'>Welcome </h1>
                    <a className='contactUs' href="#">Contact Us</a>
                </div>
                <div className='deliveryStatus'>
                    <div className='userHeader'>
                        <button className='ui button'>Add</button>
                        <p>Farm Id: 12345</p>
                    </div>

                    <table class="ui celled table">
                        <thead>
                            <tr><th>Type</th>
                            <th>Quantity</th>
                            <th>Est. Finished</th>
                            <th>Est. Delivered</th>
                            <th>Order Status</th>
                            <th></th>
                            <th></th>
                        </tr></thead>
                        <tbody>
                            <tr>
                            <td data-label="Name">Cabbage</td>
                            <td data-label="Age">24</td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td><button className='ui primary button'>More Details</button></td>
                            <td><button className='ui yellow button'>Edit</button></td>
                            </tr>
                            <tr>
                            <td data-label="Name">Potatoes</td>
                            <td data-label="Age">26</td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td><button className='ui primary button'>More Details</button></td>
                            <td><button className='ui yellow button'>Edit</button></td>
                            </tr>
                            <tr>
                            <td data-label="Name"></td>
                            <td data-label="Age">24</td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td><button className='ui primary button'>More Details</button></td>
                            <td><button className='ui yellow button'>Edit</button></td>
                            </tr>
                            <tr>
                            <td data-label="Name"></td>
                            <td data-label="Age">24</td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td><button className='ui primary button'>More Details</button></td>
                            <td><button className='ui yellow button'>Edit</button></td>
                            </tr>
                            <tr>
                            <td data-label="Name"></td>
                            <td data-label="Age">24</td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td><button className='ui primary button'>More Details</button></td>
                            <td><button className='ui yellow button'>Edit</button></td>
                            </tr>
                            <tr>
                            <td data-label="Name"></td>
                            <td data-label="Age">24</td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td><button className='ui primary button'>More Details</button></td>
                            <td><button className='ui yellow button'>Edit</button></td>
                            </tr>
                            <tr>
                            <td data-label="Name"></td>
                            <td data-label="Age">24</td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td><button className='ui primary button'>More Details</button></td>
                            <td><button className='ui yellow button'>Edit</button></td>
                            </tr>
                            <tr>
                            <td data-label="Name"></td>
                            <td data-label="Age">24</td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td><button className='ui primary button'>More Details</button></td>
                            <td><button className='ui yellow button'>Edit</button></td>
                            </tr>
                            <tr>
                            <td data-label="Name"></td>
                            <td data-label="Age">24</td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td><button className='ui primary button'>More Details</button></td>
                            <td><button className='ui yellow button'>Edit</button></td>
                            </tr>
                            <tr>
                            <td data-label="Name"></td>
                            <td data-label="Age">24</td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td><button className='ui primary button'>More Details</button></td>
                            <td><button className='ui yellow button'>Edit</button></td>
                            </tr>
                            <tr>
                            <td data-label="Name"></td>
                            <td data-label="Age">24</td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td data-label="Job"></td>
                            <td><button className='ui primary button'>More Details</button></td>
                            <td><button className='ui yellow button'>Edit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }

}

export default UserForm;
