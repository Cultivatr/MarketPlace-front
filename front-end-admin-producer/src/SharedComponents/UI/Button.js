import React from 'react';
import styles from './Button.module.css'

const Button = (props) => (
   <button
      type="submit"
      onClick={props.clicked}
      className={styles.button}>
      {props.children}
   </button>
)


export default Button;
