import React, {Component} from 'react';
<<<<<<< HEAD
//import Facebook from './Facebook';
//import FacebookLogin from 'react-facebook-login';
=======
>>>>>>> 66acd8a5b6b2beb89ff1e15c409b6c6c1b3491bc
import { Link } from 'react-router-dom';
import './SignIn.css'

class SignIn extends Component {

    state = {
        email: '',
        password: '',
        isLoggedIn: false,
        userID: '',
        name: ''
        //picture: ''
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
<<<<<<< HEAD
    
    // responseFacebook = response => {
    //     //console.log(response);
    //     this.setState({
    //       isLoggedIn: true,
    //       userID: response.userID,
    //       name: response.name,
    //       email: response.email,
    //       //picture: response.picture.data.url
    //     });
    //   };
  
=======

>>>>>>> 66acd8a5b6b2beb89ff1e15c409b6c6c1b3491bc
    componentClicked = () => console.log('clicked');

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