import React, { Component, Fragment } from 'react';
import './AddProduceForm.module.css';
import Button from '../../../../SharedComponents/UI/Button';
import styles from './AddProduceForm.module.css';
import Toolbar from '../../../../SharedComponents/Navigation/Toolbar/Toolbar';

class ProduceForm extends Component {
    state = {
        data: {
            type: '',
            packageType: '',
            datePlanted: '',
            seedType: '',
            modifiedSeed: '',
            heirloom: '',
            fertilizerTypeUsed: '',
            pesticideTypeUsed: '',
            estimatedQuantityPlanted: '',
            gmo: '',
            estimatedFinishedQty: '',
            estPrice: '',
            qtyAcceptedForListing: '',
            qtyAcceptedAtDelivery: '',
            chargebacks: '',
            finalPricePaid: '',
            deliveredTo: '',
            deliveredDate: '',
            comments:'',
            status: 'Pending Approval'
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
            <h2>Add Produce</h2>
                <div className={styles.wrapper}>
                    <div className='ui grid container'>
                        <form onSubmit={this.onSubmit} className='ui row form'>
                            <div className='eight wide column'>
                                <div className="field">
                                    <label>Type</label>
                                    <input onChange={this.onChange} type="text" name="type"/>
                                </div>
                                <div className='field'>
                                    <label>Package Type</label>
                                    <select onChange={this.onChange} name="packageType" multiple="" className="ui fluid dropdown">
                                        <option value="">Please choose an option</option>
                                        <option value="bunch">Bunch</option>
                                        <option value="head">Head</option>
                                        <option value="bag">Bag</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Date Planted</label>
                                    <input onChange={this.onChange} type="date" name="datePlanted"/>
                                </div>
                                <div className="field">
                                    <label>Seed Type</label>
                                    <input onChange={this.onChange} type="text" name="seedType"/>
                                </div>
                                <div className='field'>
                                    <label>Modified Seed</label>
                                    <select onChange={this.onChange} name="modifiedSeed" multiple="" className="ui fluid dropdown">
                                        <option value="">Please choose an option</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div className='field'>
                                    <label>Heirloom</label>
                                    <select onChange={this.onChange} name="heirloom" multiple="" className="ui fluid dropdown">
                                        <option value="">Please choose an option</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Fertilizer Type Used</label>
                                    <input onChange={this.onChange} type="text" name="fertilizerTypeUsed"/>
                                </div>
                                <div className="field">
                                    <label>Pesticide Type Used</label>
                                    <input onChange={this.onChange} type="text" name="pesticideTypeUsed"/>
                                </div>
                                <div className="field">
                                    <label>Delivered Date</label>
                                    <input onChange={this.onChange} type="text" name="deliveredDate"/>
                                </div>
                                <div className="field">
                                    <label>Comments</label>
                                    <textarea onChange={this.onChange} placeholder="Tell us more" rows="3" name="comments"></textarea>
                                </div>
                            </div>
                            <div className='eight wide column'>
                                <div className="field">
                                    <label>Estimated Quantity Planted</label>
                                    <input onChange={this.onChange} type="text" name="estQuantityPlanted"/>
                                </div>
                                <div className='field'>
                                    <label>GMO</label>
                                    <select onChange={this.onChange} name="gmo" multiple="" className="ui fluid dropdown">
                                        <option value="">Please choose an option</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Estimated Finished Qty</label>
                                    <input onChange={this.onChange} type="text" name="estFinishedQty"/>
                                </div>
                                <div className="field">
                                    <label>Est Price</label>
                                    <input onChange={this.onChange} type="text" name="estPrice"/>
                                </div>
                                <div className="field">
                                    <label>Qty Accepted for Listing</label>
                                    <input onChange={this.onChange} type="text" name="qtyAcceptedForListing"/>
                                </div>
                                <div className="field">
                                    <label>Qty Accepted at Delivery</label>
                                    <input onChange={this.onChange} type="text" name="qtyAcceptedAtDelivery"/>
                                </div>
                                <div className="field">
                                    <label>Chargebacks</label>
                                    <input onChange={this.onChange} type="text" name="chargebacks"/>
                                </div>
                                <div className="field">
                                    <label>Final Price Paid</label>
                                    <input onChange={this.onChange} type="number" name="finalPricePaid"/>
                                </div>
                                <div className="field">
                                    <label>Delivered To</label>
                                    <input onChange={this.onChange} type="text" name="deliveredTo"/>
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

export default ProduceForm;
