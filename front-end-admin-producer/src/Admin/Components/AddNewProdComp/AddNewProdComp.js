import React, { Component } from 'react';
import Class from './AddNewProdComp.module.css';
import Style from '../../admin.module.css'


class AddNewProdComp extends Component {
    state = {
        // data: {
        //         type: '',
        //         breed: '',
        //         birthdate: '',
        //         regNumber: '',
        //         rfid: '',
        //         estStartingWeight: '',
        //         hangingWeight: '',
        //         chargebacks: '',
        //         dateOnFeed: '',
        //         feedMethod: '',
        //         typeOfPasture: '',
        //         typeOfFeed: '',
        //         estCompletionDate: '',
        //         estFinishedWeight: '',
        //         estFinalPrice: ''
        //     }
    }

    // onChange = (e) => {
    //     let data = this.state.data;
    //     let newdata = { ...data, [e.target.name]: e.target.value }
    //     this.setState({ data: newdata })
    // }

    // onSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.getFormData(this.state.data);
    // }
    
    render() {
        return (
            <div className='ui grid'>
            <form onSubmit={this.onSubmit} className='ui row form'>
                <div className='four wide column'>
                    <div className='field'>
                        <label>First Name</label>
                        <input onChange={this.onChange} type="text" name="firstName"/>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className='field'>
                        <label>Last Name</label>
                        <input onChange={this.onChange} type="text" name="lastName"/>
                    </div>
                </div>
                <div className='eight wide column'>
                    <div className="field">
                        <label>* Billing Address - Street</label>
                        <input onChange={this.onChange} type="text" name="billingAddressStreet"/>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className='field'>
                        <label>Primary Number</label>
                        <input onChange={this.onChange} type="text" name="primaryNumber"/>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className='field'>
                        <label>Secondary Number</label>
                        <input onChange={this.onChange} type="text" name="secondaryNumber"/>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className='field'>
                        <label>City</label>
                        <input onChange={this.onChange} type="text" name="billingAddressCity"/>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className='field'>
                        <label>Province</label>
                            <select onChange={this.onChange} name="billingAddressProvince" multiple="" className="ui fluid dropdown">
                                <option value="">Please choose an option</option>
                                <option value="alberta">Alberta</option>
                            </select>
                    </div>
                </div>
                <div className='eight wide column'>
                    <div className="field">
                        <label>Email</label>
                        <input onChange={this.onChange} type="email" name="email"/>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className="field">
                        <label>Country</label>
                        <select onChange={this.onChange} name="billingAddressCountry" multiple="" className="ui fluid dropdown">
                            <option value="">Please choose an option</option>
                            <option value="canada">Canada</option>
                        </select>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className="field">
                        <label>Postal Code</label>
                        <input onChange={this.onChange} type="text" name="billingAddressPostalCode"/>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className="field">
                        <label>Farm Name</label>
                        <input onChange={this.onChange} type="text" name="farmName"/>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className="field">
                        <label>Farm Location</label>
                        <input onChange={this.onChange} type="text" name="farmLocation"/>
                    </div>
                </div>
                <div className='eight wide column'>
                    <div className="field">
                        <label>* Mailing Address - Street</label>
                        <input onChange={this.onChange} type="text" name="mailingAddressStreet"/>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className='field'>
                        <label>Farm Type</label>
                        <select onChange={this.onChange} name="feedMethod" multiple="" className="ui fluid dropdown">
                            <option value="">Please choose an option</option>
                            <option value="liveStock">Live Stock</option>
                            <option value="produce">Produce</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className='field'>
                        <label>Area</label>
                        <select onChange={this.onChange} name="area" multiple="" className="ui fluid dropdown">
                            <option value="">Please choose an option</option>
                            <option value="test1">Southern AB</option>
                            <option value="test2">Central AB</option>
                            <option value="test3">Northern AB</option>
                        </select>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className='field'>
                        <label>City</label>
                        <input onChange={this.onChange} type="text" name="mailingAddressCity"/>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className='field'>
                        <label>Province</label>
                            <select onChange={this.onChange} name="mailingAddressProvince" multiple="" className="ui fluid dropdown">
                                <option value="">Please choose an option</option>
                                <option value="alberta">Alberta</option>
                            </select>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className='field'>
                        <label>Rating</label>
                        <select onChange={this.onChange} name="rating" multiple="" className="ui fluid dropdown">
                            <option value="">Please choose an option</option>
                            <option value="test1">5</option>
                            <option value="test2">4</option>
                            <option value="test3">3</option>
                            <option value="test3">2</option>
                            <option value="test3">1</option>
                        </select>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className='field'>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className="field">
                        <label>Country</label>
                        <select onChange={this.onChange} name="mailingAddressCountry" multiple="" className="ui fluid dropdown">
                            <option value="">Please choose an option</option>
                            <option value="canada">Canada</option>
                        </select>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className="field">
                        <label>Postal Code</label>
                        <input onChange={this.onChange} type="text" name="mailingAddressPostalCode"/>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className="grouped fields">
                        <label>Authorization Type</label>
                        <div className="field">
                            <label><input type="checkbox"/> Administration</label>
                            <label><input type="checkbox"/> Producer</label>
                            <label><input type="checkbox"/> Other</label>
                        </div>
                    </div>
                </div>
                <div className="twelve wide column">
                    <div className="field">
                        <label>Comments</label>
                        <textarea placeholder="Tell us more" rows="3"></textarea>
                    </div>
                </div>
                <div className={Class.buttonContainer}>
                    <div className={Class.addNewProdButton}>
                        <button type="submit" className="ui button">Add</button>
                    </div>
                    <div className={Class.addNewProdButton}>
                        <button type="cancel" className="ui button">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )}
}

export default AddNewProdComp;





