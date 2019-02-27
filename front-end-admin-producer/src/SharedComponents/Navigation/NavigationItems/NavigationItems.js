import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';
import GoogleAuth from '../../../GoogleAuth';

const navigationItems = (props) => (
   <ul className={styles.list}>
      <li>
         <NavigationItem link={'/producer'}>Home</NavigationItem>
      </li>
      <li>
         <NavigationItem link={'/add-livestock'}>Add Livestock</NavigationItem>
      </li>
      <li>
         <NavigationItem link={'/add-produce'}>Add Produce</NavigationItem>
      </li>
      <li>
         <NavigationItem link={'/contact-us'}>Contact Us</NavigationItem>
      </li>
      <GoogleAuth/>
   </ul>
)

export default navigationItems;