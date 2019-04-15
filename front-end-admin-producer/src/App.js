import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Admin from './Admin/Admin';
import Producer from './Producer/Producer';
import SignIn from './SharedComponents/SignIn';
import SignOut from './SharedComponents/SignOut';
import PrivateRoute from './SharedComponents/PrivateRoute';
import AdminRoute from './SharedComponents/AdminRoute';
import AddMeatForm from './Producer/components/AddItem/AddMeatForm/AddMeatForm';
import AddProduceForm from './Producer/components/AddItem/AddProduceForm/AddProduceForm';
import ContactUs from './Producer/components/ContactUs/ContactUs';

class App extends Component {
constructor() {
     super();
     this.state = {
      loggedIn: false,
     }
   }

logIn = (arg) => {
  
  if(arg){
   sessionStorage.setItem("loggedIn", true);
   this.setState({loggedIn: true});
  }
}

redirectToProducer = () => {
  this.setState({redirect: "/producer"});
}

redirectToAdmin = () => {
  this.setState({redirect: "/admin"});
}

onClick = () => {
  sessionStorage.removeItem("loggedIn");
  this.setState({ isLoggedIn: false });
}

redirect = () => {
  if(this.state.redirect === "/producer"){
    return <Redirect to='/producer' />;
  }else if(this.state.redirect === "/admin"){
    return <Redirect to='/admin' />;
  }
  return;

}
   render() {
   
   let loggedIn = JSON.parse(sessionStorage.getItem("loggedIn"));
      return (
         <div>
           <div className = "displayEnd">
             {loggedIn ? <a href = "/sign-out" className ="link" onClick = {this.onClick}>Sign Out</a> : null}
             <h1 onClick = {this.redirectToProducer}>Producer</h1>
             <h1 onClick = {this.redirectToAdmin}>Producer</h1>
             {this.redirect()}
           </div>
            <Router>
               <div>
                    <div> 
                    <Route exact path = '/' render = {(routeProps) => ( <SignIn  logInToken = {this.logIn}/>)}/>             
                    <AdminRoute path='/admin' component = {Admin}/>
                    <PrivateRoute path='/producer'  component = {Producer}/> 
                    <PrivateRoute path='/add-livestock' component = {AddMeatForm}/>
                    <PrivateRoute path='/add-produce' component = {AddProduceForm}/>
                    <Route path='/contact-us' exact component={ContactUs}/>
                    <Route path='/sign-out' component = {SignOut}/>
                    </div>
                  
               </div>
            </Router>
         </div>
      )
   }
}

export default App;

