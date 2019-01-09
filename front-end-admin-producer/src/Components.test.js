import { shallow } from 'enzyme';
import React from 'react';
import ContainerDashboard from './Admin/Components/ContainerDashboard/ContainerDashboard';
// import ContainerDashboardUtil from './Admin/Cowmponents/ContainerDashboard/ContainerDashboardUtil';
import Admin from './Admin/Admin';
import ItemDetailComp from './Admin/Components/ItemDetailComp/ItemDetailComp';
import Producer from './Producer/Producer';
import AddItemForm from './Producer/Components/addItemForm/AddItemForm';
import ContactUs from './Producer/Components/contactUs/ContactUs';
import ProductDetail from './Producer/Components/productDetail/ProductDetail';
import Summary from './Producer/Components/summary/Summary';
import SignIn from './SharedComponents/SignIn';
import App from './App';

describe('Renders of Components', () => {

    it('expect to render App component', () => {
        expect(shallow(<App />).length).toEqual(1);
        expect(shallow(<App />)).toMatchSnapshot();
    })

    it('expect to render ContainerDashboard component', () => {
        const mockData = [
            {
                "farm": "jk farms",
                "product": "steak",
                "qty": 1,
                "date": "2018-12-18",
                "id": 1,
                "status": "pending"
              },
              {
                "farm": "ct farms",
                "product": "carrots",
                "qty": 100,
                "date": "2018-12-10",
                "id": 2,
                "status": "pending"
              }
        ]
        expect(shallow(<ContainerDashboard data={mockData}/>)).toMatchSnapshot();
    })

    // it('expect to render ContainerDashboardUtils component', () => {
    //     expect(shallow(<ContainerDashboardUtil />)).toMatchSnapshot();
    // })

    it('expect to render Admin component', () => {
        expect(shallow(<Admin />).length).toEqual(1);
    })

    it('expect to render ItemDetailComp component', () => {
        const mockItemDetails = {
            "farm": "jk farms",
            "product": "steak",
            "qty": 1,
            "date": "2018-12-18",
            "id": 1,
            "status": "accepted"
        }
        expect(shallow(<ItemDetailComp itemDetails={mockItemDetails}/>)).toMatchSnapshot();
    })

    it('expect to render Producer component', () => {
        expect(shallow(<Producer />).length).toEqual(1);
    })

    it('expect to render AddItemForm component', () => {
        expect(shallow(<AddItemForm />).length).toEqual(1);
    })

    it('expect to render ContactUs component', () => {
        expect(shallow(<ContactUs />).length).toEqual(1);
    })

    it('expect to render ProductDetail component', () => {
        expect(shallow(<ProductDetail />).length).toEqual(1);
    })

    it('expect to render Summary component', () => {
        expect(shallow(<Summary />).length).toEqual(1);
    })

    it('expect to render SignIn component', () => {
        expect(shallow(<SignIn />).length).toEqual(1);
    })
})

