import React, { Component, Fragment } from "react";
import "./EditBreedTypes.css";
import { getBreedsWithId, deleteBreed, addNewBreed, refreshLivestockItems } from "../../../../SharedComponents/LocalServer/LocalServer"

export default class EditBreedTypes extends Component {
    state = {
        newItem: "",
        breedSelection: "",
        refresh: "",
        status: "No Changes",
        lastAction: "",
        lastItem: "",
        livestockItems: "",
        selectedLivestock: ""
    };
    errorMessage = "No Items in Database";

    refreshItems = async () => {
        const responseBreed = await getBreedsWithId(this.state.selectedLivestock);
        const json = await responseBreed.json();
        const breedArray = Object.values(json).sort()[0]
        this.setState({ breedSelection: breedArray });
    }

    deleteItem = async (name) => {
        await deleteBreed(name, this.state.selectedLivestock)
            .catch(error => console.log(error));
        await this.refreshItems()
    };


    onChange = ({ target }) => {
        const { name, value } = target;
        this.setState(() => ({
            [name]: value
        }));
    };

    onChangeOther = (e) => {
        const { value } = e.target;
        this.setState({ selectedLivestock: Number(value) }, () => {
            this.refreshItems()
        })
    }

    deleteBreedClick = async name => {
        await this.deleteItem(name);
        await this.refreshItems();
        await this.setState({
            status: `${name} successfully removed from system`,
            lastItem: name,
            lastAction: "delete"
        });
    };
    undoAction = async () => {
        if (this.state.lastAction === "delete") {
            await this.setState({ newItem: this.state.lastItem });
            await this.addItem();
            await this.refreshItems();
            await this.setState({
                status: `Undo successful. ${this.state.newItem} re-added`,
                lastItem: this.state.newItem,
                lastAction: "add",
                newItem: ""
            });
        } else if (this.state.lastAction === "add") {
            await this.deleteItem(this.state.lastItem);
            await this.refreshItems();
            await this.setState({
                status: `Undo successful. ${this.state.lastItem} removed from system`,
                lastAction: "delete",
                newItem: ""
            });
        } else this.setState({ status: "Error" });
    };

    addItem = async () => {
        const { newItem } = this.state;
        const { selectedLivestock } = this.state
        await addNewBreed(selectedLivestock, newItem)
            .catch(error => console.log(error));
    };


    addClick = async e => {
        const { newItem } = this.state;
        if (this.state.newItem) {
            await this.addItem();
            await this.refreshItems();
            await this.setState({
                status: `${newItem} successfully added`,
                lastAction: "add",
                lastItem: this.state.newItem,
                newItem: ""
            });
        } else this.setState({ status: "No item to add" });
    };

    componentWillMount = async () => {
        const responseLivestockItems = await refreshLivestockItems()
        const livestock = await responseLivestockItems.json();
        if (livestock) {
            this.setState({ livestockItems: livestock.livestock_items })
        }
    };

    render() {
        return (
            <Fragment>
                <div className="ui row form">
                    <div className="field">
                        <h4>Manage Available Breeds</h4>
                        <div className="undo-container">
                            <div>Status: {this.state.status}</div>
                            {this.state.status !== "No Changes" &&
                                this.state.status !== "No item to add" && (
                                    <div className="admin-btn undo-btn" onClick={this.undoAction}>
                                        Undo
                                    </div>
                                )}
                        </div>

                        <div className="field">
                            <select
                                onChange={this.onChangeOther}
                                name="livestockOption"
                                id="livestockOptionDropdown"
                                className="ui fluid dropdown"
                                style={{ border: "3px solid #1ECE88" }}
                            >
                                <option>Please choose an option</option>
                                {this.props.currentLivestock && this.props.currentLivestock.map(livestock => {
                                    return (<option value={Object.keys(livestock)}>{Object.values(livestock)}</option>)
                                })
                                }
                            </select>
                        </div>

                        <div className="input-container">
                            <input
                                className="newProduceTypeInput"
                                onChange={this.onChange}
                                placeholder="Add Livestock Type"
                                name="newItem"
                                type="text"
                                value={this.state.newItem}
                            />
                            <div onClick={this.addClick}
                                className="admin-btn"> Add </div>
                        </div>
                    </div>

                </div>
                <div className="produce-item-container">
                    <strong>Current breeds available from dropdown:</strong>
                    <div className="produce-item-list">
                        <ul>
                            {this.state.breedSelection.length > 0 &&
                                this.state.breedSelection.map(name => {
                                    return (<li className="produce-select-item">
                                        <div key={name}>{name}</div>
                                        <div
                                            onClick={() => this.deleteBreedClick(name)}
                                            className="produce-delete-btn"
                                        > {`X`}
                                        </div>
                                        <br />
                                    </li>
                                    )
                                })}
                        </ul>
                    </div>
                </div>

            </Fragment>



        );
    }
}