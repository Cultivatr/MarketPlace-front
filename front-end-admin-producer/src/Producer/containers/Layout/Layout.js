import React, {Fragment} from 'react';
import SignIn from '../../../SharedComponents/SignIn';
import Summary from '../../components/Summary/Summary';
import ContactUs from '../../components/ContactUs/ContactUs';
import AddItem from '../../components/AddItem/AddItem';
import ProductDetail from '../../components/ProductDetail/ProductDetail';

const layout = () => {
   return (
   <Fragment>
      <SignIn/>
      <Summary/>
      <ContactUs/>
      <AddItem/>
      <ProductDetail/>
   </Fragment>
   )
}

export default layout