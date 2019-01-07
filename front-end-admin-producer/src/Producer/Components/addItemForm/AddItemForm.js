import React, { Component } from 'react';
import './AddItemForm.css';

class ProducerForm extends Component {
    render() {
        return (
            <div className='form-box'>
                <div className='headerbox'>
                    <h1 className='ui center aligned header'>Amadou Barry</h1>
                </div>
                <div className='ui grid'>
                    <form action="" className='ui row form'>
                        <div className='eight wide column'>
                            <div className='field'>
                                <label>Type</label>
                                <select name="skills" multiple="" class="ui fluid dropdown">
                                    <option value="pork">Pork</option>
                                    <option value="chicken">Chicken</option>
                                    <option value="lamb">Lamb</option>
                                    <option value="goat">Goat</option>
                                    <option value="">Custom</option>
                                </select>
                            </div>
                            <div className='field'>
                                <label>Breed</label>
                                <select name="skills" multiple="" class="ui fluid dropdown">
                                    <option value="angus">Angus</option>
                                    <option value="birkshire">Birkshire</option>
                                    <option value="">Custom</option>
                                </select>
                            </div>
                            <div class="field">
                                <label>Birthdate</label>
                                <input type="text"/>
                            </div>
                            <div class="field">
                                <label>Registration Number</label>
                                <input type="text"/>
                            </div>
                            <div class="field">
                                <label>RFID Tag</label>
                                <input type="text"/>
                            </div>
                            <div class="field">
                                <label>Est. Starting Weight</label>
                                <input type="text"/>
                            </div>
                        </div>
                        <div className='eight wide column'>
                            <div class="field">
                                <label>Date on Feed</label>
                                <input type="text"/>
                            </div>
                            <div className='field'>
                                <label>Feed Method</label>
                                <select name="" multiple="" class="ui fluid dropdown">
                                    <option value="grass">Grass</option>
                                    <option value="grassBarley">Grass and Barley Finished</option>
                                    <option value="grassGrain">Grass and Grain Finished</option>
                                    <option value="freeRange">Free Range</option>
                                    <option value="freeRange">Free Range</option>
                                    <option value="">Custom</option>
                                </select>
                            </div>
                            <div className='field'>
                                <label>Type of Pasture</label>
                                <select name="" multiple="" class="ui fluid dropdown">
                                    <option value="">test</option>
                                    <option value="">test</option>
                                    <option value="">test</option>
                                    <option value="">Custom</option>
                                </select>
                            </div>
                            <div className='field'>
                                <label>Type of Feed</label>
                                <select name="" multiple="" class="ui fluid dropdown">
                                    <option value="grain">Grain</option>
                                    <option value="barley">Barley</option>
                                    <option value="">Custom</option>
                                </select>
                            </div>
                            <div class="field">
                                <label>Est. Completion Date</label>
                                <input type="text"/>
                            </div>
                            <div class="field">
                                <label>Est. Finished Weight</label>
                                <input type="text"/>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ui hidden divider"></div>
                <button className='ui button'>Add</button>
            </div>
        )
    }
}

export default ProducerForm;