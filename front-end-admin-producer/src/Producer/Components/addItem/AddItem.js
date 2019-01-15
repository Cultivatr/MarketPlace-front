import React, { Component } from 'react';
import AddMeatForm from './AddMeatForm/AddMeatForm';
import styles from './AddItem.module.css';
import AddProduceForm from "./AddProduceForm/AddProduceForm";

class AddItem extends Component {
   state = {
      display: 'livestock'
   }

   getFormData = (data) => {
      console.log(data);
   }

   onLivestockClicked = () => {
      this.setState({display: 'livestock'})
   }

   onProduceClicked = () => {
      this.setState({display: 'produce'})
   } 

   render() {
      let toShow;
      if(this.state.display === 'livestock') {
         toShow = <AddMeatForm getFormData={this.getFormData}/>
      }
      if(this.state.display === 'produce') {
         toShow = <AddProduceForm getFormData={this.getFormData}/>
      }
      
      return (
         <div className="form-box">
            <div className='headerbox'>
               <h1 className='ui center aligned header'>Amadou Barry</h1>
               <div className={styles.buttonDiv}>
                  <button className='ui button' onClick={this.onLivestockClicked}>Livestock</button>
                  <button className='ui button' onClick={this.onProduceClicked}>Produce</button>
               </div>
               {toShow}
            </div>
         </div>
      )
   }
}

export default AddItem;