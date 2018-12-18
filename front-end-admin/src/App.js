import React, { Component } from 'react';
import './App.css';
import ContainerDashboard from './Components/ContainerDashboard/ContainerDashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Welcome Dan!</h1>
        </header>
        <main>
          <div className="container">
            {/* <div className="nav-container">Left Container</div> */}
            <div className="box-container">
              <div className="container-1">
                <h4>Items To Be Accepted Conditionally</h4>
                <ContainerDashboard />
              </div>
              <div className="container-1">
                <h4>Items Accepted Conditionally</h4>
                <ContainerDashboard />
              </div>
              <div className="container-1">
                <h4>Items Sold To Be Delivered</h4>
                <ContainerDashboard />
              </div>
              <div className="container-1">
                <h4>Items Delivered</h4>
                <ContainerDashboard />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
