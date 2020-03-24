import React, { Component } from 'react';
import { Button, Form, Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import getStore from '../store/configureStore';


export default class Home extends Component {
    constructor(props) {
        super(props);

        const store = getStore();
        console.log("Store redux home:  ", store.getState());
    }

    render() {
        return (
            <>
                <div>
                    Page Home
                </div>
            </>
        )
    }
}