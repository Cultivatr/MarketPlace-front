import React, {Component} from 'react';
import SignIn from '../SharedComponents/SignIn';
import User from './ProducerComponents/UserForm';
import ContactUs from './ProducerComponents/ContactUs';
import ProducerForm from './ProducerComponents/ProducerForm';
import ProductDetail from './ProducerComponents/ProductDetail';
import './ProducerComponents/Producer.css';
// import { Route, Link, BrowserRouter } from 'react-router-dom';

class Producer extends Component {
    render() {
        return (
            <div className='ui container'>
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

export default Producer;