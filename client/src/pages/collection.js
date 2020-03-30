import React, { Component } from 'react';
import { Button, Form, Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import getStore from '../store/configureStore';
import Wrapper from '../utils/wrapperAxios';
import { LinkContainer } from 'react-router-bootstrap';
import ReactMarkdown from 'react-markdown';
import DndFile from '../components/dndFile';
import ToolbarItem from '../components/toolbarItem';
import CardItem from '../components/cardItem';
import ModalItem from '../components/modalItem'

let item = {};

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
            idCollection: this.props.match.params.idCollection,

            update: false,
            show: false,
            headerModal: '',
            typeModal: '',
        }
        //console.log("Store redux home:  ", store.getState());
    }

    clearItemModel() {/*
        item = {
            title: '',
            checkbox: { 'one': '', 'two': '', 'three': '' },
            number: { 'one': '', 'two': '', 'three': '' },
            string: { 'one': '', 'two': '', 'three': '' },
            text: { 'one': '', 'two': '', 'three': '' },
            date: { 'one': '', 'two': '', 'three': '' },
            id: ''
        };*/
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

    handleShowNewItem() {
        this.setState({
            show: !this.state.show,
            headerModal: 'New Item',
            typeModal: 'new'
        });
        this.changeStateUpdate();
        this.clearItemModel();
    }


    deleteItem(id) {/*
        const wrapp = new Wrapper();
        wrapp.delete(`api/collections/${id}`, id)
            .then(res => {
                this.changeStateUpdate();
            })
            .catch(err => {
                console.log(err);
            });*/
    }

    editItem(_id) {
        //console.log("id ", _id)
        /* const wrapp = new Wrapper();
         wrapp.get(`api/collections/${_id}`, _id)
             .then(res => {
                 collection.title = res.data.title;
                 collection.description = res.data.description;
                 collection.topic = res.data.topic;
                 collection.cover = res.data.cover;
                 collection.checkbox = res.data.fieldsImage.checkbox || {};
                 collection.number = res.data.fieldsImage.number || { 'one': '', 'two': '', 'three': '' };
                 collection.string = res.data.fieldsImage.string || { 'one': '', 'two': '', 'three': '' };
                 collection.text = res.data.fieldsImage.text || { 'one': '', 'two': '', 'three': '' };
                 collection.date = res.data.fieldsImage.date || { 'one': '', 'two': '', 'three': '' };
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
             });*/
    }

    showItems() {
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

    componentDidMount() {
        this.showItems();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.update !== prevState.update) {
            this.showItems();
        }
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
                            <div className="description">
                                <Container>
                                    <h4 className="">Description</h4>
                                    <ReactMarkdown source={this.state.description} escapeHtml={false} />{' '}
                                </Container>

                            </div>

                        </div>
                    </Container>

                    <Container>
                        <div className="collectionContainer" style={{ marginTop: 20 + 'px' }}>
                            Toolbar

                            <Button variant="dark" onClick={this.handleShowNewItem.bind(this)}> Add </Button>
                        </div>
                    </Container>

                    <Container>
                        <div className="collectionContainer">
                            Images
                            {
                                this.state.items.map(item => {
                                    return <div className=" card-deck col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-4" style={{ marginTop: 3 + '%' }} key={item._id}>
                                        <CardItem
                                            item={item}
                                        />
                                    </div>
                                })
                            }

                            <ModalItem
                                show={this.state.show}
                                handleShow={this.handleShow.bind(this)}
                                changeStateUpdate={this.changeStateUpdate.bind(this)}
                                header={this.state.headerModal}
                                type={this.state.typeModal}
                                item={item}
                                fields={this.state.fieldsImage}
                            />
                        </div>

                    </Container>

                </div>
            </div>
        )
    }
}