import React, { Component } from 'react';
import { Button, Container, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import getStore from '../store/configureStore';
import Wrapper from '../utils/wrapperAxios';
import { LinkContainer } from 'react-router-bootstrap';
import ReactMarkdown from 'react-markdown';
import CardItem from '../components/cardItem';
import ModalItem from '../components/modalItem'

let item = {};

export default class Collection extends Component {
    constructor(props) {
        super(props);

        const store = getStore();

        this.state = {
            items: [],
            title: '',
            description: '',
            topic: '',
            fields: [],
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

    clearItemModel() {
        item = {
            title: '',
            img: 'https://res.cloudinary.com/dvfmqld3v/image/upload/w_300,h_200/fotoDedault_h4wsk8',
            fields: this.state.fields,
            tags: [],
            author: this.state.author,
            authorId: this.state.authorId
        };
    }

    changeStateUpdate() {
        this.setState({ update: !this.state.update })
    }

    handleShow() {
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
       // console.log('state ', this.state.fields)
        this.changeStateUpdate();
        this.clearItemModel();
    }


    deleteItem(id) {
        const req = {_idCollection : this.state.idCollection, idItem : id};
        const wrapp = new Wrapper();
        wrapp.put(`api/collections/collection/${this.state.idCollection}/delete/${id}`, req)
            .then(res => {
                this.changeStateUpdate();
            })
            .catch(err => {
                console.log(err);
            });
    }

    editItem(_id) {
        const wrapp = new Wrapper();
        wrapp.get(`api/collections/${this.state.idCollection}/${_id}`)
            .then(res => {
                console.log("item ", res.data)
                item.title = res.data.title;
                item.topic = res.data.topic;
                item.img = res.data.img;
                item.fields = res.data.fields;
                item.tags = res.data.tags;
                item.id = res.data._id;
                
                this.setState({
                    show: !this.state.show,
                    headerModal: 'Edit Item',
                    typeModal: 'edit',
                    fields:  res.data.fields
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    showItems() {
        const wrapp = new Wrapper();
        wrapp.get(`api/collections/${this.state.idCollection}`)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    topic: res.data.topic,
                    fields: res.data.fields,
                    author: res.data.author,
                    authorId: res.data.authorId,
                    items: res.data.items || []
                });
                //console.log("collection ", res.data)
            })
            .catch(err => {
                console.log(err);
            });

    }

    componentDidMount() {
        this.showItems();
        this.clearItemModel();
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
                        <div className="collectionContainer d-flex flex-row justify-content-around" style={{ marginTop: 20 + 'px' }}>
                            <h4>Toolbar</h4>
                            <Button variant="dark" onClick={this.handleShowNewItem.bind(this)}> Add </Button>
                        </div>
                    </Container>

                    <Container>
                        <h4 style={{ marginTop: 50 + 'px' }}>Items</h4>
                        <div className="row ">     
                            {
                                this.state.items.map(item => {
                                    return <div className=" card-deck col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-4" style={{ marginTop: 3 + '%' }} key={item._id }>
                                        <CardItem
                                            deleteItem={this.deleteItem.bind(this)}
                                            editItem={this.editItem.bind(this)}
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
                                fields={this.state.fields}
                                topic={this.state.topic}
                                collectionId={this.state.idCollection}
                            />
                        </div>

                    </Container>

                </div>
            </div>
        )
    }
}