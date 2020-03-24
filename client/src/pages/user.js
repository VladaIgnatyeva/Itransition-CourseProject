import React, { Component } from 'react';
import { Button, Form, Navbar, Container, Nav } from 'react-bootstrap';
import user_img from '../assets/userDefault.png';
import pen_img from '../assets/pen.png';
import queryString from 'query-string';
import getStore from '../store/configureStore';
import { loggedIn, toggleTheme, toggleLanguage } from '../action/index';
import { LinkContainer } from 'react-router-bootstrap'
import AddCardCollection from '../components/addCardCollection'
import CardCollection from '../components/cardCollection'


export default class User extends Component {
    constructor(props) {
        super(props);
        const params = queryString.parse(this.props.location.search);

        

        if (Object.keys(params).length != 0) {
            localStorage.setItem("token", params.token);
            localStorage.setItem("username", params.username);
            localStorage.setItem("id", params.id);

            const store = getStore();
            store.dispatch(loggedIn({ username: params.username, role: params.role, isLoggedInStatus: true }));
            console.log("Store redux user:  ", store.getState());
        }
        
        this.state = {
            username: localStorage.getItem("username")
        }
    }


    render() {
        return (
            <>
                <div className="divSetting d-flex justify-content-center flex-column">
                    <div className="d-flex flex-row align-items-center justify-content-center " >
                        <img src={user_img} alt="userDefault" height="100" vspace="10" />
                        <h1 style={{ marginLeft: 30 + 'px' , marginRight: 30 + 'px'}}>{this.state.username}</h1>
                        <LinkContainer to="/user/settings">
                            <Button variant="dark" type="button" size="sm" block >
                                <img src={pen_img} alt="icon_pen" height="15" style={{ marginRight: 5 + 'px' }} />
                                Complete Your Profile
                            </Button>
                        </LinkContainer>
                        
                    </div>

                    <h4 style={{ marginTop: 100 + 'px' }}>Collections</h4>
                    <div className="d-flex flex-row " style={{ marginTop: 20 + 'px' }}>
                        <AddCardCollection />
                        <CardCollection />
                    </div>

                </div>
            </>
        )
    }
}




