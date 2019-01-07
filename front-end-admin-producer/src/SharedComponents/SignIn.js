import React, {Component} from 'react';
import './SignIn.css'

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value, password: e.target.value })
    }

    render() {
        console.log(this.state.email)
        console.log(this.state.password)
        
        return (
            <div>
                <div className='loginBox'>
                    <div className='h1-header'>
                        <h1 className='ui header'>Welcome to Cultivatr</h1>
                    </div>
                    <div>
                        <form class="ui form">
                            <div class="field">
                                <label>Email</label>
                                <input onChange={this.onEmailChange} type="text" name="email" placeholder="Email "/>
                            </div>
                            <div class="field">
                                <label>Password</label>
                                <input onChange={this.onEmailChange} type="text" name="password" placeholder="Password"/>
                            </div>
                            <div className='rememberMeAndLoginBox'>
                                <input type="checkbox"/> <span className='rememberMe'>Remember Me</span>
                                <button class="ui button" type="submit">Login</button>
                            </div>
                            <div className='forgotPasswordAndRegisterBox'>
                                <a href="#">Forgot Password</a>
                                <a href="#">Register Now</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn;