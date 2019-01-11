import React, {Component} from 'react';
import SignIn from '../SharedComponents/SignIn';
import Summary from './Components/summary/Summary';
import ContactUs from './Components/contactUs/ContactUs';
import AddItem from './Components/addItem/AddItem';
import ProductDetail from './Components/productDetail/ProductDetail';

// import { Route, Link, BrowserRouter } from 'react-router-dom';

class Producer extends Component {
    render() {
        return (
            <div className='ui container'>
                {/* <BrowserRouter>
                    <Route path='/' component={SignIn} />
                    <Route path='/producer-form' exact component={AddItemForm} />
                    <Route path='/producer-form' exact component={AddItemForm} />
                </BrowserRouter> */}
                <SignIn/>
                <Summary/>
                <ContactUs/>
                <AddItem/>
                <ProductDetail/>
            </div>
        )
    }
}

export default Producer;