import React, { Component } from 'react';
import AddMeatForm from '../addMeatForm/AddMeatForm';

class AddItem extends Component {

   getFormData = (data) => {
      console.log(data);
   }

   render() {
      return (
         <div className="form-box">
            <div className='headerbox'>
               <h1 className='ui center aligned header'>Amadou Barry</h1>
               <AddMeatForm getFormData={this.getFormData}/>
            </div>
         </div>
      )
   }
}

export default AddItem;