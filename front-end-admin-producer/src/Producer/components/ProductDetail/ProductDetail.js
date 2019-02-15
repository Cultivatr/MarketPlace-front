import React, { Component } from 'react';
//import styles from './ProductDetail.module.css';

class ProductDetail extends Component {
    render() {
        return (
            <div className='productDetails'>
                <h4 className="ui horizontal divider header">
                    Details
                </h4>
                <table className="ui definition table">
                <tbody>
                    <tr>
                        <td className="two wide column">Type</td>
                        <td>Beef</td>
                    </tr>
                    <tr>
                        <td>Breed</td>
                        <td>Angus</td>
                    </tr>
                    <tr>
                        <td>Birthdate</td>
                        <td>Sept 20, 2017</td>
                    </tr>
                    <tr>
                        <td>Registration Number</td>
                        <td>12345</td>
                    </tr>
                    <tr>
                        <td>RFID Tag</td>
                        <td>12345</td>
                    </tr>
                    <tr>
                        <td>Est. Starting Weight</td>
                        <td>500lbs</td>
                    </tr>
                    <tr>
                        <td>Date on Feed</td>
                        <td>Sept 20, 2017</td>
                    </tr>
                    <tr>
                        <td>Feed Method</td>
                        <td>Grass and Grain Finished</td>
                    </tr>
                    <tr>
                        <td>Type of Pasture</td>
                        <td>---</td>
                    </tr>
                    <tr>
                        <td>Type of Feed</td>
                        <td>Grain</td>
                    </tr>
                    <tr>
                        <td>Est. Completion Date</td>
                        <td>Dec 20, 2018</td>
                    </tr>
                    <tr>
                        <td>Est. Finished Date</td>
                        <td>Jan 15, 2019</td>
                    </tr>
                    <tr>
                        <td>Final Price</td>
                        <td></td>
                    </tr>
                </tbody>
                </table> 
            </div>
        )
    }
}

export default ProductDetail;
