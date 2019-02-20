import React, { Component, Fragment } from 'react';
import styles from './AddMeatForm.module.css';
import Button from '../../../../SharedComponents/UI/Button';
import Toolbar from '../../../../SharedComponents/Navigation/Toolbar/Toolbar';

class LivestockForm extends Component {  
    state = {
        data: {
                type: '',
                breed: '',
                singleBrand: '',
                birthdate: '',
                regNumber: '',
                rfid: '',
                estStartingWeight: '',
                hangingWeight: '',
                chargebacks: '',
                dateOnFeed: '',
                feedMethod: '',
                typeOfPasture: '',
                typeOfFeed: '',
                estCompletionDate: '',
                estFinishedWeight: '',
                estFinalPrice: ''
            }
    }

    onChange = (e) => {
        let data = this.state.data;
        let newdata = { ...data, [e.target.name]: e.target.value }
        this.setState({ data: newdata })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.getFormData(this.state.data);
    }

    render() {
        return (
            <Fragment>
                <Toolbar/>
                <h2>Add Livestock</h2>
                <div className={styles.wrapper}>
                    <div className='ui grid container'>
                        <form onSubmit={this.onSubmit} className='ui row form'>
                            <div className='eight wide column'>
                                <div className='field'>
                                    <label>Type</label>
                                    <select onChange={this.onChange} name="type" multiple="" className="ui fluid dropdown">
                                        <option value="">Please choose an option</option>
                                        <option value="pork">Pork</option>
                                        <option value="chicken">Chicken</option>
                                        <option value="lamb">Lamb</option>
                                        <option value="goat">Goat</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                </div>
                                <div className='field'>
                                    <label>Breed</label>
                                    <select onChange={this.onChange} name="breed" multiple="" className="ui fluid dropdown">
                                        <option value="">Please choose an option</option>
                                        <option value="angus">Angus</option>
                                        <option value="birkshire">Birkshire</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                </div>
                                <div className='field'>
                                    <label>Single Brand</label>
                                    <select onChange={this.onChange} name="singleBrand" multiple="" className="ui fluid dropdown">
                                        <option value="">Please choose an option</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Birthdate</label>
                                    <input onChange={this.onChange} type="date" name="birthdate"/>
                                </div>
                                <div className="field">
                                    <label>Registration Number</label>
                                    <input onChange={this.onChange} type="text" name="regNumber"/>
                                </div>
                                <div className="field">
                                    <label>RFID Tag</label>
                                    <input onChange={this.onChange} type="text" name="rfid"/>
                                </div>
                                <div className="field">
                                    <label>Est. Starting Weight</label>
                                    <input onChange={this.onChange} type="text" name="estStartingWeight"/>
                                </div>
                                <div className="field">
                                    <label>Hanging Weight</label>
                                    <input onChange={this.onChange} type="text" name="hangingWeight"/>
                                </div>
                                <div className="field">
                                    <label>Chargebacks</label>
                                    <input onChange={this.onChange} type="text" name="chargebacks"/>
                                </div>
                            </div>
                            <div className='eight wide column'>
                                <div className="field">
                                    <label>Date on Feed</label>
                                    <input onChange={this.onChange} type="date" name="dateOnFeed"/>
                                </div>
                                <div className='field'>
                                    <label>Feed Method</label>
                                    <select onChange={this.onChange} name="feedMethod" multiple="" className="ui fluid dropdown">
                                        <option value="">Please choose an option</option>
                                        <option value="grass">Grass</option>
                                        <option value="grassBarley">Grass and Barley Finished</option>
                                        <option value="grassGrain">Grass and Grain Finished</option>
                                        <option value="freeRange">Free Range</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                </div>
                                <div className='field'>
                                    <label>Type of Pasture</label>
                                    <select onChange={this.onChange} name="typeOfPasture" multiple="" className="ui fluid dropdown">
                                        <option value="">Please choose an option</option>
                                        <option value="test1">test</option>
                                        <option value="test2">test</option>
                                        <option value="test3">test</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                </div>
                                <div className='field'>
                                    <label>Type of Feed</label>
                                    <select onChange={this.onChange} name="typeOfFeed" multiple="" className="ui fluid dropdown">
                                        <option value="">Please choose an option</option>
                                        <option value="grain">Grain</option>
                                        <option value="barley">Barley</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Est. Completion Date</label>
                                    <input onChange={this.onChange} type="date" name="estCompletionDate"/>
                                </div>
                                <div className="field">
                                    <label>Est. Finished Weight</label>
                                    <input onChange={this.onChange} type="text" name="estFinishedWeight"/>
                                </div>
                                <div className="field">
                                    <label>Est. Final Price to be Paid</label>
                                    <input onChange={this.onChange} type="number" name="estFinalPrice"/>
                                </div>
                                <div className="field">
                                    <label>Quantity</label>
                                    <input onChange={this.onChange} type="text" name="quantity"/>
                                </div>
                                <input type="hidden" id="userId" name="userId" value="1"/>
                            </div>
                            <Button>Add</Button>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default LivestockForm;