import React, { Component, Fragment } from "react";
import { refreshLivestockItems, deleteLivestockItem, addLiveStockItem } from "../../../../SharedComponents/LocalServer/LocalServer"


export default class EditLivestockTypes extends Component {
    state = {
        newItem: "",
        livestockSelection: "",
        refresh: "",
        status: "No Changes",
        lastAction: "",
        lastItem: "",
    };
    livestockSelection = [];
    errorMessage = "No Items in Database";

    populateItems = () => {
        this.props.onNewLiveStock()
        if (this.state.livestockSelection) {
            this.livestockSelection = this.state.livestockSelection.livestock_items
                .map(value => {
                    return Object.values(value)[0]
                })
                .sort()
                .map((value, index) => {
                    return (
                        <LivestockChartItem
                            key={index}
                            name={value}
                            deleteLivestockItemClick={this.deleteLivestockItemClick}
                        />
                    )
                })
        }
    };

    refreshItems = async () => {
        const responseLivestockItems = await refreshLivestockItems();
        const json = await responseLivestockItems.json();
        await this.setState({ livestockSelection: json });
    }

    deleteItem = async itemToDelete => {
        await deleteLivestockItem(itemToDelete)
            .catch(error => console.log(error));
        await this.refreshItems()
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

    deleteLivestockItemClick = async props => {
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
        if (this.state.lastAction === "delete") {
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
        await addLiveStockItem(newItem)
            .catch(error => console.log(error));
    };


    addClick = async e => {
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
                        <h4>Manage Available Livestock Types</h4>
                        <div className="undo-container">
                            <div>Status: {this.state.status}</div>
                            {this.state.status !== "No Changes" &&
                                this.state.status !== "No item to add" && (
                                    <div className="admin-btn undo-btn"
                                        onClick={this.undoAction}>
                                        Undo</div>)} </div>
                        <div className="input-container">
                            <input
                                className="newProduceTypeInput"
                                onChange={this.onChange}
                                placeholder="Add New Livestock Type"
                                name="newItem"
                                type="text"
                                value={this.state.newItem} />
                            <div onClick={this.addClick}
                                className="admin-btn">
                                Add </div>
                        </div>
                    </div>

                </div>
                <div className="produce-item-container">
                    <strong>Current livestock items available from dropdown:</strong>
                    <div className="produce-item-list">
                        <ul>
                            {this.livestockSelection !== false
                                ? this.livestockSelection
                                : this.errorMessage}
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const LivestockChartItem = props => {
    return (
        <li className="produce-select-item">
            <div>{props.name}</div>
            <div
                onClick={() => props.deleteLivestockItemClick(props)}
                className="produce-delete-btn"
            >{`X`}
            </div>
        </li>

    );
};