import React, { Component } from 'react';
import './App.css';
import ContainerDashboard from './Components/ContainerDashboard/ContainerDashboard';

class App extends Component {
  constructor() {
    super();
    this.pending = [];
    this.accepted = [];
    this.sold = [];
    this.delivered = [];
    this.state = {
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

  filterData = () => {
    this.state.data.forEach(element => {
      if (element.status === 'pending') {
        this.pending.push(element);
      } else if (element.status === 'accepted') {
        this.accepted.push(element);
      } else if (element.status === 'sold') {
        this.sold.push(element);
      } else if (element.status === 'delivered') {
        this.delivered.push(element)
      }
    })}

  populateOverlay = () => {
    
  }

  render() {
    this.filterData()
    return (
      <div className="App">
        <header>
          <h1>Welcome Dan!</h1>
        </header>
        <main>
          <div className="container">
            <div className="box-container">
              <div className="container-1">
                <div className="container-title">
                  <h4>Items To Be Accepted Conditionally</h4>
                </div>
                <div className="container-items">
                  <div id="item-overlay" onClick={this.removeOverlay}>
                      <div id="items">
                          <h3 className="items-title">Item Details</h3>
                          <table className="center">
                            <tbody>
                                <tr>
                                    <th>Farm</th>
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th>Date</th>
                                    <th>More Data</th>
                                </tr>
                                    {
                                  
                                    this.pending.map((pending, i) => {
                                        return <tr key={pending.id}>
                                                <td key={pending.farm}>{pending.farm}</td>
                                                <td>{pending.product}</td>
                                                <td>{pending.qty}</td>
                                                <td>{pending.date}</td>
                                                <td>{pending.status}</td>
                                                </tr>
                                    })
                                    }
                            </tbody>
                        </table> 
                      </div>
                  </div>
                </div>
                <ContainerDashboard data={this.pending}/>
              </div>
              <div className="container-1">
                <div className="conatiner-title">
                  <h4>Items Accepted Conditionally</h4>
                </div>
                <div className="container-items">
                  <div id="item-overlay" onClick={this.removeOverlay}>
                      <div id="items">
                          <h3 className="items-title">Item Details</h3>
                          <table className="center">
                            <tbody>
                                <tr>
                                    <th>Farm</th>
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th>Date</th>
                                    <th>More Data</th>
                                </tr>
                                    {
                                    this.accepted.map((accepted, i) => {
                                        return <tr key={accepted.id}>
                                                <td key={accepted.farm}>{accepted.farm}</td>
                                                <td>{accepted.product}</td>
                                                <td>{accepted.qty}</td>
                                                <td>{accepted.date}</td>
                                                <td>{accepted.status}</td>
                                                </tr>
                                    })
                                    }
                            </tbody>
                        </table> 
                      </div>
                  </div>
                </div>
                <ContainerDashboard data={this.accepted}/>
              </div>
              <div className="container-1">
                <h4>Items Sold To Be Delivered</h4>
                <div className="container-items">
                  <div id="item-overlay" onClick={this.removeOverlay}>
                      <div id="items">
                          <h3 className="items-title">Item Details</h3>
                      </div>
                  </div>
                </div>
                <ContainerDashboard data={this.sold}/>
              </div>
              <div className="container-1">
                <h4>Items Delivered</h4>
                <div className="container-items">
                  <div id="item-overlay" onClick={this.removeOverlay}>
                      <div id="items">
                          <h3 className="items-title">Item Details</h3>
                      </div>
                  </div>
                </div>
                <ContainerDashboard data={this.delivered}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
