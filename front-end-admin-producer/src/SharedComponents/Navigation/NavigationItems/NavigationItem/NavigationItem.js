import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const navigationItem = (props) => (
   <Link to={props.link} className={styles.link}>{props.children}</Link>
)

export default navigationItem;