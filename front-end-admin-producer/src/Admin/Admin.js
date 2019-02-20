import React, { Component } from 'react';
import Class from './admin.module.css';
import ContainerDashboard from './Components/ContainerDashboard/ContainerDashboard';
import { filterData, getItemDetails } from '../AppUtils';
import ItemDetailComp from './Components/ItemDetailComp/ItemDetailComp';
import AddNewProdComp from './Components/AddNewProdComp/AddNewProdComp';

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
        "status": "pending"
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
    document.getElementById("itemOverlay").style.display = "none";
    }

  getItemObj = (e) => {
    this.setState({ itemDetails: getItemDetails(parseInt(e.target.id), this.state.data) });
    document.getElementById("itemOverlay").style.display = "block";
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

  OnClickNewProd = () => {
    this.setState({ dataToShow: 'addNewProd' });
  }

  render() {
    let toShow;
    if (this.state.dataToShow === 'toBeAccepted') {
      toShow = 
      <div className={Class.container2}>
        <div className={Class.containerTitle}>
          <h4>Items To Be Accepted Conditionally</h4>
        </div>
        <ContainerDashboard data={this.pending} itemObj={this.getItemObj}/>
      </div>
    }
    else if (this.state.dataToShow === 'acceptedConditional') {
      toShow = 
      <div className={Class.container2}>
        <div className={Class.containerTitle}>
          <h4>Items Accepted Conditionally</h4>
        </div>
        <ContainerDashboard data={this.accepted} itemObj={this.getItemObj}/>
      </div>
    }
    else if (this.state.dataToShow === 'soldToBeDelivered') {
      toShow = 
      <div className={Class.container2}>
        <div className={Class.containerTitle}>
          <h4>Items Sold To Be Delivered</h4>
        </div>
        <ContainerDashboard data={this.sold} itemObj={this.getItemObj}/>
      </div>
    }
    else if (this.state.dataToShow === 'delivered') {
      toShow = 
      <div className={Class.container2}>
        <div className={Class.containerTitle}>
          <h4>Items Delivered</h4>
        </div>
        <ContainerDashboard data={this.delivered} itemObj={this.getItemObj}/>
      </div>
    }
    else if (this.state.dataToShow === 'notAccepted') {
      toShow = 
      <div className={Class.container2}>
        <div className={Class.containerTitle}>
          <h4>Items Not Accepted</h4>
        </div>
        <ContainerDashboard data={this.notAccepted} itemObj={this.getItemObj}/>
      </div>
    }
    else if (this.state.dataToShow === 'addNewProd') {
      toShow = 
      <div className={Class.container3}>
        <div className={Class.containerTitle}>
          <h4><u>Add New User</u></h4>
        </div>
        <AddNewProdComp />
      </div>
    }
    return (
      <div className="App">
        <h1 className={Class.heading}>Welcome Dan!</h1>
        <main>
          <ItemDetailComp itemDetails={this.state.itemDetails} removeOverlay={this.removeOverlay}/>
          <div className={Class.container}>
            <div className={Class.boxContainer}>
              <div className={Class.leftNav}>
                <button id="button-accept" className={Class.buttonAdmin} onClick={this.OnClickAccept}>Items To Accept</button>
                <button id="button-conditional" className={Class.buttonAdmin} onClick={this.OnClickConditional}>Accepted Conditionally</button>
                <button id="button-sold" className={Class.buttonAdmin}onClick={this.OnClickSold}>Sold To Be Delivered</button>
                <button id="button-delivered" className={Class.buttonAdmin} onClick={this.OnClickDelivered}>Delivered</button>
                <button id="button-notAccepted" className={Class.buttonAdmin} onClick={this.OnClickNotAccepted}>Items Not Accepted</button>
                <button id="button-newProducer" className={Class.buttonAdmin} onClick={this.OnClickNewProd}>Add New Producer</button>
              </div>
              <div className={Class.container1}>
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

