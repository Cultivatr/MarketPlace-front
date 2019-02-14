import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
   <ul>
      <NavigationItem link={'/add-livestock'}>Add Livestock</NavigationItem>
      <NavigationItem link={'/add-produce'}>Add Produce</NavigationItem>
      <NavigationItem link={'/contact-us'}>Contact Us</NavigationItem>
   </ul>
)

export default navigationItems;