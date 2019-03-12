import React from 'react';
import './Button.module.css';

const Button = (props) => (
   <button
      type="submit"
      onClick={props.clicked}
      className="ui button"
      id="submitBtn">
      {props.children}
   </button>
)


export default Button;
