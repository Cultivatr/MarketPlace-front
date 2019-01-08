import React, { Component } from 'react';
import './admin.css';
import ContainerDashboard from './Components/ContainerDashboard/ContainerDashboard';
import { filterData, getItemDetails } from '../AppUtils';
import ItemDetailComp from './Components/ItemDetailComp/ItemDetailComp';

class Admin extends Component {
  constructor() {
    super();
    this.pending = [];
    this.accepted = [];
    this.sold = [];
    this.delivered = [];
    this.notAccepted = [];
    this.state = {
      dataToShow: '',
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
        "status": "not accepted"
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

  componentWillMount(){
    filterData(this.state.data, this.pending, this.accepted, this.sold, this.delivered, this.notAccepted)
  }

  removeOverlay = (event) => {
    document.getElementById("item-overlay").style.display = "none";
    }

  getItemObj = (e) => {
    this.setState({ itemDetails: getItemDetails(parseInt(e.target.id), this.state.data) });
    document.getElementById("item-overlay").style.display = "block";
  }

  OnClickAccept = () => {
    this.setState({ dataToShow: 'toBeAccepted' })
  }

  OnClickConditional = () => {
    this.setState({ dataToShow: 'acceptedConditional' });
  }

  OnClickSold = () => {
    this.setState({ dataToShow: 'soldToBeDelivered' });
  }

  OnClickDelivered = () => {
    this.setState({ dataToShow: 'delivered' });
  }

  OnClickNotAccepted = () => {
    this.setState({ dataToShow: 'notAccepted' });
  }

  render() {
    let toShow;
    if (this.state.dataToShow === 'toBeAccepted') {
      toShow = 
      <div className="container-2">
        <div className="container-title">
          <h4>Items To Be Accepted Conditionally</h4>
        </div>
        <ContainerDashboard data={this.pending} itemObj={this.getItemObj}/>
      </div>
    }
    else if (this.state.dataToShow === 'acceptedConditional') {
      toShow = 
      <div className="container-2">
        <div className="container-title">
          <h4>Items Accepted Conditionally</h4>
        </div>
        <ContainerDashboard data={this.accepted} itemObj={this.getItemObj}/>
      </div>
    }
    else if (this.state.dataToShow === 'soldToBeDelivered') {
      toShow = 
      <div className="container-2">
        <div className="container-title">
          <h4>Items Sold To Be Delivered</h4>
        </div>
        <ContainerDashboard data={this.sold} itemObj={this.getItemObj}/>
      </div>
    }
    else if (this.state.dataToShow === 'delivered') {
      toShow = 
      <div className="container-2">
        <div className="container-title">
          <h4>Items Delivered</h4>
        </div>
        <ContainerDashboard data={this.delivered} itemObj={this.getItemObj}/>
      </div>
    }
    else if (this.state.dataToShow === 'notAccepted') {
      toShow = 
      <div className="container-2">
        <div className="container-title">
          <h4>Items Not Accepted</h4>
        </div>
        <ContainerDashboard data={this.notAccepted} itemObj={this.getItemObj}/>
      </div>
    }
    return (
      <div className="App">
        <header>
          <h1>Welcome Dan!</h1>
        </header>
        <main>
          <ItemDetailComp itemDetails={this.state.itemDetails} removeOverlay={this.removeOverlay}/>
          <div className="container">
            <div className="box-container">
              <div className='left-nav'>
                <button className="button-admin" onClick={this.OnClickAccept}>Items To Accept</button>
                <button className="button-admin" onClick={this.OnClickConditional}>Accepted Conditionally</button>
                <button className="button-admin"onClick={this.OnClickSold}>Sold To Be Delivered</button>
                <button className="button-admin" onClick={this.OnClickDelivered}>Delivered</button>
                <button className="button-admin" onClick={this.OnClickNotAccepted}>Items Not Accepted</button>
              </div>
              <div className="container-1">
                {toShow}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Admin;

