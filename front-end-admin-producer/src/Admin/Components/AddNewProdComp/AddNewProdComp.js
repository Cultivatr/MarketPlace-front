import React, { Component } from 'react';
import Class from './AddNewProdComp.module.css';

class AddNewProdComp extends Component {
    state = {
        data: {
            firstName: '',
            lastName: '',
            billingAddressStreet: '',
            primaryNumber: '',
            secondaryNumber: '',
            billingAddressCity: '',
            billingAddressProvince: '',
            email: '',
            billingAddressCountry: '',
            billingAddressPostalCode: '',
            farmName: '',
            farmLocation: '',
            farmType: '',
            mailingAddressStreet: '',
            feedMethod: '',
            area: '',
            mailingAddressCity: '',
            mailingAddressProvince: '',
            rating: 0,
            mailingAddressCountry: '',
            mailingAddressPostalCode: '',
            comments: '',
            isAdmin: '',
            isProducer: '',
            isOther: ''
        }
    }

    onChange = (e) => {
        let data = this.state.data;
        data.isAdmin = document.getElementById("isAdmin").checked;
        data.isProducer = document.getElementById("isProd").checked;
        data.isOther = document.getElementById("isOther").checked;
        let newdata = { ...data, [e.target.name]: e.target.value };
        this.setState({ data: newdata });
    }
 
    onSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/admin', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                firstName: this.state.data.firstName,
                lastName: this.state.data.lastName,
                billingAddressStreet: this.state.data.billingAddressStreet,
                primaryNumber: this.state.data.primaryNumber,
                secondaryNumber: this.state.data.secondaryNumber,
                billingAddressCity: this.state.data.billingAddressCity,
                billingAddressProvince: this.state.data.billingAddressProvince,
                email: this.state.data.email,
                billingAddressCountry: this.state.data.billingAddressCountry,
                billingAddressPostalCode: this.state.data.billingAddressPostalCode,
                farmName: this.state.data.farmName,
                farmLocation: this.state.data.farmLocation,
                mailingAddressStreet: this.state.data.mailingAddressStreet,
                feedMethod: this.state.data.feedMethod,
                area: this.state.data.area,
                mailingAddressCity: this.state.data.mailingAddressCity,
                mailingAddressProvince: this.state.data.mailingAddressProvince,
                rating: this.state.data.rating,
                mailingAddressCountry: this.state.data.mailingAddressCountry,
                mailingAddressPostalCode: this.state.data.mailingAddressPostalCode,
                comments: this.state.data.comments,
                isAdmin: this.state.data.isAdmin,
                isProducer: this.state.data.isProducer,
                isOther: this.state.data.isOther
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => console.log(error))
    }
    
    render() {
        return (
            <div className='ui grid'>
            <form onSubmit={this.onSubmit} className='ui row form'>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className='field'>
                            <label>First Name</label>
                            <input onChange={this.onChange} type="text" name="firstName"/>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className='field'>
                            <label>Last Name</label>
                            <input onChange={this.onChange} type="text" name="lastName"/>
                        </div>
                    </div>
                </div>
                <div className='eight wide column'>
                    <div className={Class.field}>
                        <div className="field">
                            <label>* Billing Address - Street</label>
                            <input onChange={this.onChange} type="text" name="billingAddressStreet"/>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>   
                        <div className='field'>
                            <label>Primary Number</label>
                            <input onChange={this.onChange} type="text" name="primaryNumber" placeholder="xxx-xxx-xxxx"/>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className='field'>
                            <label>Secondary Number</label>
                            <input onChange={this.onChange} type="text" name="secondaryNumber" placeholder="xxx-xxx-xxxx"/>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className='field'>
                            <label>City</label>
                            <input onChange={this.onChange} type="text" name="billingAddressCity"/>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className='field'>
                            <label>Province</label>
                                <select onChange={this.onChange} name="billingAddressProvince" multiple="" className="ui fluid dropdown">
                                    <option value="">Please choose an option</option>
                                    <option value="alberta">Alberta</option>
                                </select>
                        </div>
                    </div>
                </div>
                <div className='eight wide column'>
                    <div className={Class.field}>
                        <div className="field">
                            <label>Email</label>
                            <input onChange={this.onChange} type="email" name="email" placeholder="must contain @ symbol"/>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className="field">
                            <label>Country</label>
                            <select onChange={this.onChange} name="billingAddressCountry" multiple="" className="ui fluid dropdown">
                                <option value="">Please choose an option</option>
                                <option value="canada">Canada</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className="field">
                            <label>Postal Code</label>
                            <input onChange={this.onChange} type="text" name="billingAddressPostalCode" placeholder="xxxxxx"/>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className="field">
                            <label>Farm Name</label>
                            <input onChange={this.onChange} type="text" name="farmName"/>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className="field">
                            <label>Farm Location</label>
                            <input onChange={this.onChange} type="text" name="farmLocation"/>
                        </div>
                    </div>
                </div>
                <div className='eight wide column'>
                    <div className={Class.field}>
                        <div className="field">
                            <label>* Mailing Address - Street</label>
                            <input onChange={this.onChange} type="text" name="mailingAddressStreet"/>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className='field'>
                            <label>Farm Type</label>
                            <select onChange={this.onChange} name="farmMethod" multiple="" className="ui fluid dropdown">
                                <option value="">Please choose an option</option>
                                <option value="liveStock">Live Stock</option>
                                <option value="produce">Produce</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className='field'>
                            <label>Area</label>
                            <select onChange={this.onChange} name="area" multiple="" className="ui fluid dropdown">
                                <option value="">Please choose an option</option>
                                <option value="southern AB">Southern AB</option>
                                <option value="central AB">Central AB</option>
                                <option value="northern AB">Northern AB</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className='field'>
                            <label>City</label>
                            <input onChange={this.onChange} type="text" name="mailingAddressCity"/>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className='field'>
                            <label>Province</label>
                                <select onChange={this.onChange} name="mailingAddressProvince" multiple="" className="ui fluid dropdown">
                                    <option value="">Please choose an option</option>
                                    <option value="alberta">Alberta</option>
                                </select>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className='field'>
                            <label>Rating</label>
                            <select onChange={this.onChange} name="rating" multiple="" className="ui fluid dropdown">
                                <option value="">Please choose an option</option>
                                <option value="5">5</option>
                                <option value="4">4</option>
                                <option value="3">3</option>
                                <option value="2">2</option>
                                <option value="1">1</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className='field'>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className="field">
                            <label>Country</label>
                            <select onChange={this.onChange} name="mailingAddressCountry" multiple="" className="ui fluid dropdown">
                                <option value="">Please choose an option</option>
                                <option value="canada">Canada</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className="field">
                            <label>Postal Code</label>
                            <input onChange={this.onChange} type="text" name="mailingAddressPostalCode" placeholder="xxxxxx"/>
                        </div>
                    </div>
                </div>
                <div className='four wide column'>
                    <div className={Class.field}>
                        <div className="grouped fields">
                            <label>Authorization Type</label>
                            <div className="field">
                                <label><input type="checkbox" id="isAdmin" onChange={this.onChange} /> Administration</label>
                                <label><input type="checkbox" id="isProd" onChange={this.onChange} /> Producer</label>
                                <label><input type="checkbox" id="isOther" onChange={this.onChange} /> Other</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="twelve wide column">
                    <div className={Class.field}>
                        <div className="field">
                            <label>Comments</label>
                            <textarea onChange={this.onChange} placeholder="Tell us more" rows="3" name="comments"></textarea>
                        </div>
                    </div>
                </div>
                <div className={Class.buttonContainer}>
                    <div className={Class.addNewProdButton}>
                        <button type="submit" className="ui button" >Add</button>
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





