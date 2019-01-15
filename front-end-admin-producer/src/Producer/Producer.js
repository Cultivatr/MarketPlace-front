import React, {Component} from 'react';
import Layout from '../Producer/containers/Layout/Layout';

// import { Route, Link, BrowserRouter } from 'react-router-dom';

class Producer extends Component {
    render() {
        return (
            <div className='ui container'>
                <Layout/>
            </div>
        )
    }
}

export default Producer;