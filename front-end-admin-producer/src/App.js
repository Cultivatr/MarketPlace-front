import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Admin from './Admin/Admin';
import Producer from './Producer/Producer';
import SignIn from './SharedComponents/SignIn';
import ProductDetail from './Producer/components/ProductDetail/ProductDetail';
import AddMeatForm from './Producer/components/AddItem/AddMeatForm/AddMeatForm';
import AddProduceForm from './Producer/components/AddItem/AddProduceForm/AddProduceForm';
import ContactUs from './Producer/components/ContactUs/ContactUs';
import Toolbar from './SharedComponents/Navigation/Toolbar/Toolbar';

class App extends Component {

   // state = {
   //    display: 'signin'
   // }

   // onAdminClick = () => {
   //    this.setState({display:'admin'})
   // }

   // onProducerClick = () => {
   //    this.setState({display:'producer'})
   // }

   render() {
      // let toShow;
      // if (this.state.display === 'producer') {
      //    toShow = <Producer/>
      // }
      // else if (this.state.display === 'admin') {
      //    toShow = <Admin/>
      // } 
      // else if (this.state.display === 'signin') {
      //    toShow = <SignIn/>
      // }

      return (
         <div>
            <h1>Hello world!</h1>
            {/* <Router>
               <div>
                  <Toolbar/>
                  <Link to='/admin'>Admin</Link>
                  <Link to='/producer'>Producer</Link>

                  <Route path='/' exact component={SignIn}/>
                  <Route path='/admin' exact component={Admin}/>
                  <Route path='/producer' exact component={Producer}/>
                  <Route path='/item-details' exact component={ProductDetail}/>
                  <Route path='/contact-us' exact component={ContactUs}/>
                  <Route path='/add-livestock' exact component={AddMeatForm}/>
                  <Route path='/add-produce' exact component={AddProduceForm}/>
               </div>
            </Router>
            <button className="ui button primary" onClick={this.onAdminClick}>Admin</button>
            <button className="ui button primary" onClick={this.onProducerClick}>Producer</button>
            <Facebook/> */}
         </div>
      )
   }
}

export default App;