import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const navigationItem = (props) => (
   <li className={styles.li}>
      <Link to={props.link}>{props.children}</Link>
   </li>
)

export default navigationItem;