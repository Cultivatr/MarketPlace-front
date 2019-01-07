import React, { Component } from 'react';

class ContactUs extends Component {
    render() {
        return (
                <div>
                <div className='loginBox'>
                    <div className='h1-header'>
                        <h1 className='ui header'>Contact Us</h1>
                    </div>
                    <div>
                        <form class="ui form">
                        <div class="field">
                                <label>Name</label>
                                <input type="text" name="email" placeholder="Name "/>
                            </div>
                            <div class="field">
                                <label>Email</label>
                                <input type="text" name="email" placeholder="Email "/>
                            </div>
                            <div class="field">
                                <label>Message</label>
                                <textarea></textarea>
                            </div>
                           <button className='ui button'>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactUs;