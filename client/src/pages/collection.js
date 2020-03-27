import React, { Component } from 'react';
import { Button, Form, Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import getStore from '../store/configureStore';
import Wrapper from '../utils/wrapperAxios';
import { LinkContainer } from 'react-router-bootstrap';

export default class Collection extends Component {
    constructor(props) {
        super(props);

        // const idCollection = this.props.match.params.idCollection;
        const store = getStore();

        this.state = {
            items: [],
            title: '',
            description: '',
            topic: '',
            fieldsImage: {},
            author: '',
            authorId: '',
            idCollection: this.props.match.params.idCollection
        }
        //console.log("Store redux home:  ", store.getState());
    }


    componentDidMount() {
        const wrapp = new Wrapper();
        wrapp.get(`api/collections/${this.state.idCollection}`)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    topic: res.data.topic,
                    fieldsImage: res.data.fieldsImage,
                    author: res.data.author,
                    authorId: res.data.authorId,
                    items: res.data.items || []
                });
                // console.log("collection ", res.data)
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const linkAuthor = `/user/${this.state.authorId}`;
        return (
            <div>
                <div className="divSetting">
                    <Container>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <h1>{this.state.title}</h1>
                            <p className="text-muted">{this.state.items.length} photos collected by
                                    <LinkContainer to={linkAuthor}>
                                    <a> {this.state.author}</a>
                                </LinkContainer>
                            </p>
                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <h6>Description: </h6>
                                <h4>{this.state.description}</h4>
                            </div>

                        </div>
                    </Container>

                    <Container>
                        <div className="collectionContainer">
                            Toolbar
                        </div>

                    </Container>

                    <Container>
                        <div className="collectionContainer">
                            Images
                        </div>
                    </Container>

                </div>
            </div>
        )
    }
}