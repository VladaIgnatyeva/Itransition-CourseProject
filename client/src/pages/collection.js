import React, { Component } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import getStore from '../store/configureStore';
import Wrapper from '../utils/wrapperAxios';
import { LinkContainer } from 'react-router-bootstrap';
import ReactMarkdown from 'react-markdown';
import CardItem from '../components/cardItem';
import ModalItem from '../components/modalItem'
import { truncate } from 'fs';

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

            checkboxFields: []
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
        const req = { _idCollection: this.state.idCollection, idItem: id };
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
                    fields: res.data.fields
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
                    items: res.data.items || [],

                    checkboxFields : res.data.fields.filter(field => field.type === 'Checkbox')
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

    showButtonAdd() {
        if (this.state.author === localStorage.getItem("username") || localStorage.getItem("role") === 'admin') {
            return <Button variant="outline-dark" onClick={this.handleShowNewItem.bind(this)}> Add </Button>
        }
    }

    sortByTitle(arr) {
        arr.sort((a, b) => a.title > b.title ? 1 : -1);
    }

    handleChange(event) {
        if (event.target.value === 'Title') {
            let sortItems = this.state.items;
            this.sortByTitle(sortItems);
            this.setState({ items: sortItems })
        }
        if (event.target.value === 'Date') {
            this.changeStateUpdate();
        }

    }

    filterByFoto(event) {
        console.log('checked ', event.target.checked)
        if (event.target.checked) {
            let filterItems = this.state.items;
            filterItems = filterItems.filter(item => item.img != 'https://res.cloudinary.com/dvfmqld3v/image/upload/w_300,h_200/fotoDedault_h4wsk8');
            this.setState({ items: filterItems })
        } else {
            this.changeStateUpdate();
        }
    }

    filterByFieldColection(event) {
        //console.log('checked ', event.target.checked);
        //console.log('checked name ', event.target.name);
        if (event.target.checked){
            let filterItems = this.state.items;
            filterItems = filterItems.filter(item => item.fields.filter(f => f.value === true && f.name === event.target.name).length !== 0)
            //console.log("filterItems ", filterItems)
            this.setState({items : filterItems})
        } else {
            this.changeStateUpdate();
        }
      
    }

    /*
    addCheckboxCollection() {
        let fields = this.state.fields.filter(field => field.type === 'Checkbox');
        console.log('check fields ', fields);
        this.setState({checkboxFields : fields})
       /* let result = fields.map(f => {
            return <div className="checkboxCollection" >
                <Form.Check type="checkbox" key={f.id + new Date().getMilliseconds()} label={f.name} id={f.id} name={f.name} onChange={e => this.filterByFieldColection(e)}
                    />
            </div>
        })

        return result;*/
//}

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
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="d-flex flex-row">
                                <h4 className="itemsTool">Items</h4>
                                {this.showButtonAdd()}
                            </div>

                            <div className="d-flex flex-row justify-content-around">
                                <Form.Check className="checkboxCollection" type="checkbox" label='With foto' onChange={e => this.filterByFoto(e)}
                                    defaultChecked={false}  id='checkFoto'/>
                                {this.state.checkboxFields.map(field => {
                                    return <div key={field.id + '11'}>
                                    <Form.Check className="checkboxCollection"  type="checkbox" label={field.name} name={field.name} onChange={e => this.filterByFieldColection(e)}
                                    defaultChecked={false} />
                                    </div>
                                })}
                            </div>


                            <div className="d-flex align-items-center ">
                                <p className="text-muted itemsTool"> Sort By: </p>
                                <div>
                                    <select className="form-control" onChange={(e) => this.handleChange(e)}>
                                        <option value="Date" name="date">Date</option>
                                        <option value="Title" name="title">Title</option>
                                    </select>
                                </div>

                            </div>
                        </div>

                        <div className="row ">
                            {
                                this.state.items.map(item => {
                                    return <div className=" card-deck col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-4" style={{ marginTop: 3 + '%' }} key={item._id}>
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