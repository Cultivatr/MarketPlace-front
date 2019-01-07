import React, {Component} from 'react';
import SignIn from './SignIn';
import User from './UserForm';
import ContactUs from './ContactUs';
import ProducerForm from './ProducerForm';
import ProductDetail from './ProductDetail';
import './App.css';
import logo from '../img/logo.jpg';
import { Route, Link, BrowserRouter } from 'react-router-dom';

class App extends Component {
    render() {
        return ( 
            <div className='ui container'>
                <header>
                    <img src={logo} alt="logo" className='logo'/>
                </header>
                {/* <BrowserRouter>
                    <Route path='/' component={SignIn} />
                    <Route path='/producer-form' exact component={ProducerForm} />
                    <Route path='/producer-form' exact component={ProducerForm} />
                </BrowserRouter> */}
                <SignIn/>
                <User/>
                <ContactUs/>
                <ProducerForm/>
                <ProductDetail/>
            </div>
        )
    }
}

export default App;