import React from 'react';
import "../Producer/components/AddItem/AddItemPopUp.css"

const PushThroughPopUp = ({ closePopUp, confirm, type, price, realType }) => (
    <div onClick={closePopUp} className="add-item-pop-up-wrapper">
        <div className='add-item-pop-up'>
            <div className="pop-up-title">{type}<br /> to be approved</div>
            <div className="pop-up-title"> Price set: ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <div className="pop-up-btns"><div className="pop-up-btns-inner">
                <button onClick={() => confirm(false, realType)}>Confirm </button></div>
                <button onClick={closePopUp}>Go Back</button></div>
        </div>
    </div>
);
export default PushThroughPopUp;




