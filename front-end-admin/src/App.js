import React, { Component } from 'react';
import './App.css';
import ContainerDashboard from './Components/ContainerDashboard/ContainerDashboard';
import { filterData, getItemDetails } from './AppUtils';
import ItemDetailComp from './Components/ItemDetailComp/ItemDetailComp';

class App extends Component {
  constructor() {
    super();
    this.pending = [];
    this.accepted = [];
    this.sold = [];
    this.delivered = [];
    this.state = {
      itemDetails: {},
      data: [{
        "farm": "jk farms",
        "product": "steak",
        "qty": 1,
        "date": "2018-12-18",
        "id": 1,
        "status": "accepted"
      },
      {
        "farm": "ct farms",
        "product": "carrots",
        "qty": 100,
        "date": "2018-12-10",
        "id": 2,
        "status": "pending"
      },
      {
        "farm": "lm farms",
        "product": "cabbage",
        "qty": 50,
        "date": "2018-12-12",
        "id": 3,
        "status": "delivered"
      },
      {
        "farm": "ras farms",
        "product": "steak",
        "qty": 5,
        "date": "2018-12-11",
        "id": 4,
        "status": "sold"
      },
      {
        "farm": "evolveU farms",
        "product": "apples",
        "qty": 25,
        "date": "2018-12-24",
        "id": 5,
        "status": "pending"
      },
      {
        "farm": "Calgary farms",
        "product": "oranges",
        "qty": 1000,
        "date": "2018-12-24",
        "id": 6,
        "status": "pending"
      },
      {
        "farm": "Edmonton farms",
        "product": "corn",
        "qty": 600,
        "date": "2018-12-24",
        "id": 7,
        "status": "sold"
      },
      {
        "farm": "Red Deer farms",
        "product": "peanuts",
        "qty": 10000,
        "date": "2018-12-24",
        "id": 8,
        "status": "pending"
      },
      {
        "farm": "Lethbridge farms",
        "product": "wheat",
        "qty": 500,
        "date": "2018-12-24",
        "id": 9,
        "status": "accepted"
      },
      {
        "farm": "Medicine Hat farms",
        "product": "chicken",
        "qty": 125,
        "date": "2018-12-24",
        "id": 10,
        "status": "pending"
      },
      {
        "farm": "Blackfalds farms",
        "product": "buffalo",
        "qty": 2,
        "date": "2018-12-24",
        "id": 11,
        "status": "delivered"
      }
      ],
    }
  }

  removeOverlay = (event) => {
    document.getElementById("item-overlay").style.display = "none";
    }

    getItemObj = (e) => {
      this.setState({ itemDetails: getItemDetails(parseInt(e.target.id), this.state.data) });
      document.getElementById("item-overlay").style.display = "block";
    }

  render() {
    filterData(this.state.data, this.pending, this.accepted, this.sold, this.delivered)
    return (
      <div className="App">
        <header>
          <h1>Welcome Dan!</h1>
        </header>
        <main>
          <ItemDetailComp itemDetails={this.state.itemDetails} removeOverlay={this.removeOverlay}/>
          <div className="container">
            <div className="box-container">
              <div className="container-1">
                <div className="container-title">
                  <h4>Items To Be Accepted Conditionally</h4>
                </div>
                <ContainerDashboard data={this.pending} itemObj={this.getItemObj}/>
              </div>
              <div className="container-1">
                <div className="container-title">
                  <h4>Items Accepted Conditionally</h4>
                </div>
                <ContainerDashboard data={this.accepted} itemObj={this.getItemObj}/>
              </div>
              <div className="container-1">
                <div className="container-title">
                  <h4>Items Sold To Be Delivered</h4>
                </div>
                <ContainerDashboard data={this.sold} itemObj={this.getItemObj}/>
              </div>
              <div className="container-1">
                <div className="container-title">
                  <h4>Items Delivered</h4>
                </div>
                <ContainerDashboard data={this.delivered} itemObj={this.getItemObj}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

