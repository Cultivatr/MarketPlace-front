import React, { Component, Fragment } from "react";
import "./AdminSettings.css";
// const domainLink = "https://hidden-escarpment-75213.herokuapp.com/";
const domainLink = "https://mysterious-cove-46763.herokuapp.com/";

//const domainLink = "http://localhost:5000/";
export default class AdminSettings extends Component {
  state = {
    newItem: "",
    produceSelection: "",
    refresh: "",
    status: "No Changes",
    lastAction: "",
    lastItem: ""
  };
  produceSelection = [];
  errorMessage = "No Items in Database";

  populateItems = () => {
    if (this.state.produceSelection) {
      this.produceSelection = this.state.produceSelection.produce_items
        .map(value => {
          return value.newItem;
        })
        .sort()
        .map((value, index) => {
          return (
            <ProduceChartItem
              key={index}
              name={value}
              deleteProduceItemClick={this.deleteProduceItemClick}
            />
          );
        });
    }
  };

  refreshItems = async () => {
    try {
      const responseProduceItems = await fetch(
        domainLink + `produceItems/all/`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const json = await responseProduceItems.json();
      this.setState({ produceSelection: json });
    } catch (error) {
      console.log(error);
    }
  };
  deleteItem = async itemToDelete => {
    await fetch(domainLink + "produceItems/delete/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        itemToDelete: itemToDelete
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
      })
      .catch(error => console.log(error));
  };
  componentDidMount = async () => {
    await this.refreshItems();
    await this.populateItems();
    await this.setState({ refresh: "" });
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value
    }));
  };
  deleteProduceItemClick = async props => {
    const item = props.name;
    await this.deleteItem(item);
    await this.refreshItems();
    await this.populateItems();
    await this.setState({
      status: `${item} successfully removed from system`,
      lastItem: item,
      lastAction: "delete"
    });
  };
  undoAction = async () => {
    console.log("undo called");
    if (this.state.lastAction === "delete") {
      // We need to call add item, set this.state.data.newItem = lastItem
      await this.setState({ newItem: this.state.lastItem });
      await this.addItem();
      await this.refreshItems();
      await this.populateItems();
      await this.setState({
        status: `Undo successful. ${this.state.newItem} re-added`,
        lastItem: this.state.newItem,
        lastAction: "add",
        newItem: ""
      });
    } else if (this.state.lastAction === "add") {
      await this.deleteItem(this.state.lastItem);
      await this.refreshItems();
      await this.populateItems();
      await this.setState({
        status: `Undo successful. ${this.state.lastItem} removed from system`,
        lastAction: "delete",
        newItem: ""
      });
    } else this.setState({ status: "Error" });
  };

  addItem = async () => {
    const { newItem } = this.state;
    console.log("item: ", newItem);
    await fetch(domainLink + "produceItems/add/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        newItem: newItem
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
      })
      .catch(error => console.log(error));
  };

  addClick = async e => {
    console.log("button clicked");
    const { newItem } = this.state;
    if (this.state.newItem) {
      await this.addItem();
      await this.refreshItems();
      await this.populateItems();
      await this.setState({
        status: `${newItem} successfully added`,
        lastAction: "add",
        lastItem: this.state.newItem,
        newItem: ""
      });
    } else this.setState({ status: "No item to add" });
  };
  render() {
    return (
      <Fragment>
        <div className="ui row form">
          <div className="field">
            <h4>Manage Available Produce Types</h4>
            <div className="undo-container">
              <div>Status: {this.state.status}</div>
              {this.state.status !== "No Changes" &&
                this.state.status !== "No item to add" ? (
                <div className="admin-btn undo-btn" onClick={this.undoAction}>
                  Undo
                </div>
                ) : (
                  ""
              )}
            </div>
            <div className="input-container">
              <input
                className="newProduceTypeInput"
                onChange={this.onChange}
                placeholder="Add New Produce Type to Dropdown"
                name="newItem"
                type="text"
                value={this.state.newItem}
              />

              <div onClick={this.addClick} className="admin-btn">
                Add
              </div>
            </div>
          </div>
        </div>
        <div className="produce-item-container">
          <strong>Current produce items available from dropdown:</strong>
          <table className="produce-item-list">
              <tbody>
            {this.produceSelection !== false
              ? this.produceSelection
              : this.errorMessage}
              </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

const ProduceChartItem = props => {
  return (
      

        <tr className="produce-select-item">
          <td>{props.name}</td>
          <td
            onClick={() => props.deleteProduceItemClick(props)}
            className="produce-delete-btn"
            >{`X`}
          </td>
        </tr>
      
  );
};
