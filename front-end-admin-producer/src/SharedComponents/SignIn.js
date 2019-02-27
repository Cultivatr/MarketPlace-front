import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css'
// import GoogleAuth from '../GoogleAuth';
import GoogleLogin from 'react-google-login'; 

class SignIn extends Component {
    constructor() {
        super();
        this.count = 0;
        // console.log("in SignIn constructor", this);
      }
    
    state = {
        email: '',
        password: '',
        isLoggedIn: false,
        userID: '',
        name: ''
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }
    
    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('submitted')
    }
  
    componentClicked = () => console.log('clicked');

    onGet = e => {
        // console.log("Just a onGet");
        // const token = localStorage.getItem('token');
        // console.log("Just a onGet", token);
        fetch(process.env.REACT_APP_API + "/whoami", {credentials: 'include'})
          .then(response => response.text())
          .then(text => console.log(text));
      };
    
      onSet = e => {
        this.count ++;
        // console.log("Just a onSet", this.count, this, );
        localStorage.setItem('token', "Some Real Cool Thing " + this.count);
      };
    
      onClear = e => {
        // console.log("Just a onClear");
        localStorage.removeItem('token');
      };
    

    render() {
        return (
            <div>
                <div className='loginBox'>
                    <div className='h1-header'>
                        <h1 className='ui header'>Welcome to Cultivatr</h1>
                    </div>
                    <div>
                        <form className="ui form" onSubmit={this.onSubmit}>
                            <div className="field">
                                <label>Email</label>
                                <input onChange={this.onEmailChange} type="text" name="email" placeholder="Email " value={this.state.email}/>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input onChange={this.onPasswordChange} type="text" name="password" placeholder="Password" value={this.state.password}/>
                            </div>
                            <div className='rememberMeAndLoginBox'>
                                <input type="checkbox"/> <span className='rememberMe'>Remember Me</span>
                                <Link to='/producer' className="ui button" type="submit">Login</Link>
                                {/* <GoogleAuth/> */}
                                <GoogleLogin
                                    clientId="225894951024-d2b5jugscfmfsp8fr6vd5mqhfl5si3uq.apps.googleusercontent.com"
                                    buttonText="Sign in with Google"
                                    onSuccess={this.props.onGoogleSignonSuccess}
                                    onFailure={this.props.onGoogleSignonFail}
                                    />
                            </div>
                            <div className='forgotPasswordAndRegisterBox'>
                                {/* <a href="#">Forgot Password</a>
                                <a href="#">Register Now</a> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn;