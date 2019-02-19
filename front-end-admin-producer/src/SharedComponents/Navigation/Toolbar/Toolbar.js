import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Toolbar.module.css';
import Logo from '../../UI/Logo/Logo';

const toolbar = (props) => (
   <header className={styles.header}>
      <nav className={styles.nav}>
         {/* <Logo/> */}
         <NavigationItems/>
      </nav>
   </header>
)

export default toolbar;