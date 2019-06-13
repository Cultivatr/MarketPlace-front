import React, { Component } from 'react'
import "./OtherInput.css"

export default class OtherInput extends Component {

    selectWidth = 100
    otherWidth = 0
    displayClassOther = "otherInput-1"

    componentDidMount = () => {
        if (this.props.options) {
            let pList = document.getElementById(this.props.labelItem);
            this.props.options.forEach(item => {
                let indiv = item;
                let element = document.createElement("option");
                element.textContent = indiv;
                element.value = indiv;
                pList.appendChild(element);
            });
        }
    };

    changeDisplayState = () => {
        if(this.props.value){
        if (this.props.value.includes("Other")) {
            this.selectWidth = 30
            this.otherWidth = 80
            this.displayClassOther = ""
        }
        else {
            this.selectWidth = 100
            this.otherWidth = 0
            this.displayClassOther = "otherInput-1"
        }
    }
    }
    render() {
        this.changeDisplayState();
        return (
            <div className="field ">
                <label>{this.props.title}</label>
                <div className="otherInputParent">
                    <select
                        onChange={this.props.onChange}
                        name={this.props.labelItem}
                        multiple=""
                        className={`ui fluid dropdown animateOther ${this.displayClassDropdown}`}
                        style={{ width: `${this.selectWidth}%` }}
                        id={this.props.labelItem}
                    >
                        <option value="">Please choose an option</option>
                    </select>

                    <input
                        onChange={this.props.onChangeOther}
                        className={`${this.displayClassOther} animateOther`}
                        type="text"
                        name={this.props.labelItem}
                        style={{ width: `${this.otherWidth}%` }}
                    />
                </div>

            </div>
        );
    }
}