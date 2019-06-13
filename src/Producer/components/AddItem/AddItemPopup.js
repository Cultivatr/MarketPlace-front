import React from 'react';
import "./AddItemPopUp.css";
import { Link } from 'react-router-dom';

const AddItemPopUp = ({ hideItemPopup, clearForm, type }) => (
    <div onClick={hideItemPopup} className="add-item-pop-up-wrapper">
        <div className='add-item-pop-up'>
            <div className="pop-up-title">{type}<br /> Successfully Added!!!</div>
            <div className="pop-up-btns"><div className="pop-up-btns-inner"> <Link to={"/producer"} className="pop-up-btn" >Homepage</Link>
                <button onClick={hideItemPopup}>Add Another </button></div>
                <button onClick={clearForm}>Clear Form and Add Another</button></div>
        </div>
    </div>
);
export default AddItemPopUp;




