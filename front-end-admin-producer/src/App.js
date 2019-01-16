import React, { Component } from 'react';
import Admin from './Admin/Admin';
import Producer from './Producer/Producer';
import SignIn from './SharedComponents/SignIn';
import Facebook from './SharedComponents/Facebook';

class App extends Component {

   state = {
      display: 'signin'
   }

   onAdminClick = () => {
      this.setState({display:'admin'})
   }

   onProducerClick = () => {
      this.setState({display:'producer'})
   }

   render() {
      let toShow;
      if (this.state.display === 'producer') {
         toShow = <Producer/>
      }
      else if (this.state.display === 'admin') {
         toShow = <Admin/>
      } 
      else if (this.state.display === 'signin') {
         toShow = <SignIn/>
      }

      return (
         <div className="ui centered">
            <button className="ui button primary" onClick={this.onAdminClick}>Admin</button>
            <button className="ui button primary" onClick={this.onProducerClick}>Producer</button>
            {toShow}
            <Facebook/>
         </div>
      )
   }
}

export default App;