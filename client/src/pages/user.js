import React, { Component, useState } from 'react';
import { Button, Form, Navbar, Container, Nav, CardDeck, Image, Card, CardGroup } from 'react-bootstrap';
import user_img from '../assets/userDefault.png';
import pen_img from '../assets/pen.png';
import queryString from 'query-string';
import getStore from '../store/configureStore';
import { loggedIn, toggleTheme, toggleLanguage } from '../action/index';
import { LinkContainer } from 'react-router-bootstrap'
import AddCardCollection from '../components/addCardCollection'
import CardCollection from '../components/cardCollection'
import Wrapper from '../utils/wrapperAxios';
import NewCollectionModal from '../components/newCollectionModal';
import plus1_img from '../assets/plus1.png';

let collection = {};

export default class User extends Component {
    constructor(props) {
        super(props);
        const params = queryString.parse(this.props.location.search);

        if (Object.keys(params).length != 0) {
            localStorage.setItem("token", params.token);
            localStorage.setItem("username", params.username);
            localStorage.setItem("id", params.id);
            localStorage.setItem("avatar", params.avatar);

            const store = getStore();
            store.dispatch(loggedIn({ username: params.username, role: params.role, isLoggedInStatus: true }));
            //console.log("Store redux user:  ", store.getState());
        }

        this.state = {
            username: localStorage.getItem("username"),
            collections: [],
            update: false,
            show: false,
            headerModal: '',
            typeModal: '',
            avatar: localStorage.getItem("avatar")
        }
    }

    clearCollectionModel() {
        collection = {
            title: '',
            description: '',
            topic: 'Books',
            fields: [],
            /*checkbox: { 'one': '', 'two': '', 'three': '' },
            number: { 'one': '', 'two': '', 'three': '' },
            string: { 'one': '', 'two': '', 'three': '' },
            text: { 'one': '', 'two': '', 'three': '' },
            date: { 'one': '', 'two': '', 'three': '' },*/
            cover: 'https://res.cloudinary.com/dvfmqld3v/image/upload/w_300,h_200/logoDefault_chafgb',
            id: ''
        };
    }

    changeStateUpdate() {
        //console.log("change State Update ");
        this.setState({ update: !this.state.update })
    }

    handleShow() {
        //console.log('handle show')
        this.setState({
            show: !this.state.show
        });
        this.changeStateUpdate();
    }

    handleShowNewCol() {
        this.setState({
            show: !this.state.show,
            headerModal: 'New Collection',
            typeModal: 'new'
        });
        this.changeStateUpdate();
        this.clearCollectionModel();
    }


    deleteCollection(id) {
        const wrapp = new Wrapper();
        wrapp.delete(`api/collections/${id}`, id)
            .then(res => {
                this.changeStateUpdate();
            })
            .catch(err => {
                console.log(err);
            });
    }

    editCollection(_id) {
        //console.log("id ", _id)
        const wrapp = new Wrapper();
        wrapp.get(`api/collections/${_id}`, _id)
            .then(res => {
                collection.title = res.data.title;
                collection.description = res.data.description;
                collection.topic = res.data.topic;
                collection.cover = res.data.cover;
                collection.fields = res.data.fields;
               /* collection.number = res.data.fieldsImage.number || {};
                collection.string = res.data.fieldsImage.string || {};
                collection.text = res.data.fieldsImage.text || {};
                collection.date = res.data.fieldsImage.date || {};*/
                collection.id = _id;
                //console.log("collection ", collection)
                this.setState({
                    show: !this.state.show,
                    headerModal: 'Edit Collection',
                    typeModal: 'edit'
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    showCollections() {
        const wrapp = new Wrapper();
        wrapp.get(`api/collections/author/${localStorage.getItem('id')}`)
            .then(res => {
                //console.log("response ", res.data);
                this.setState({ collections: res.data })
            })
            .catch(err => {
                console.log("err ", err);
            })
    }

    componentDidMount() {
        this.showCollections();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.update !== prevState.update) {
            this.showCollections();
        }
    }


    render() {
        console.log("avatar render ", localStorage.getItem('avatar'));
        const settingLink = `/user/${localStorage.getItem('id')}/settings/`
        return (
            <>
                <div className="divSetting">
                    <Container>
                        <div className="row divSettingTool">
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 divSettingTool" >
                                <img className="roundImg" src={localStorage.getItem('avatar')} alt="Avatar User" height="100" vspace="10" />
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 divSettingTool" >
                                <h1 style={{ marginLeft: 30 + 'px', marginRight: 30 + 'px' }}>{this.state.username}</h1>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 divSettingTool" >
                                <LinkContainer to={settingLink}>
                                    <Button variant="dark" type="button" size="sm" block >
                                        <img src={pen_img} alt="icon_pen" height="15" style={{ marginRight: 5 + 'px' }} />
                                        Complete Your Profile
                                    </Button>
                                </LinkContainer>
                            </div>
                        </div>
                    </Container>

                    <h4 style={{ marginTop: 100 + 'px' }}>Collections</h4>
                    <Container>
                        <div className="row">
                            
                                <div className="card-deck col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 d-flex flex-column align-items-center justify-content-center" style={{ marginTop: 3 + '%' }}>
                                    <Card > 
                                        <Card.Body className="d-flex flex-column align-items-center justify-content-center ">
                                            <h3>Add new collection</h3>
                                            <Container className="d-flex justify-content-center ">
                                                <Button variant="link" onClick={this.handleShowNewCol.bind(this)} >
                                                    <Image src={plus1_img} height="120" />
                                                </Button>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                    <NewCollectionModal
                                        show={this.state.show}
                                        handleShow={this.handleShow.bind(this)}
                                        changeStateUpdate={this.changeStateUpdate.bind(this)}
                                        header={this.state.headerModal}
                                        type={this.state.typeModal}
                                        collection={collection}
                                    />
                                </div>
                                {
                                    this.state.collections.map(item => {
                                        return <div className=" card-deck col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-4" style={{ marginTop: 3 + '%' }} key={item._id}>
                                            <CardCollection
                                                item={item}
                                                deleteCollection={this.deleteCollection.bind(this)}
                                                editCollection={this.editCollection.bind(this)}
                                            />
                                        </div>
                                    })
                                }
                            
                        </div>
                    </Container>

                </div>
            </>
        )
    }
}




