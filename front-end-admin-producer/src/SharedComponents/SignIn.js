import React, {Component} from 'react';
//import Facebook from './Facebook';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';
import './SignIn.css'
import styles from './Facebook.module.css';

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
    
    esponseFacebook = response => {
        //console.log(response);
        this.setState({
          isLoggedIn: true,
          userID: response.userID,
          name: response.name,
          email: response.email,
          //picture: response.picture.data.url
        });
      };
  
    componentClicked = () => console.log('clicked');
  

    render() {
        let fbContent;
        if(this.state.isLoggedIn) {
            fbContent = (
                <div className={styles.facebook}>
                  {/* <img src={this.state.picture} alt={this.state.name} /> */}
                  <h2>Welcome {this.state.name}</h2>
                  Email: {this.state.email}
                </div>
            );
    
        } else {
            fbContent = (
            <div id='facebookBtn' style={{
                display: 'flex',
                flexWrap: 'wrap', 
                padding: '2px',
                width: '5px',
                fontSize: '12px !important'
                }} >  
                <FacebookLogin
                  appId="367859947330605"
                  autoLoad={true}
                  cssClass={styles.btnFacebook}
                  fields="name,email,picture"
                  onClick={this.componentClicked}
                  callback={this.responseFacebook} 
                />
            </div>
            );
        }
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
                                {fbContent}
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