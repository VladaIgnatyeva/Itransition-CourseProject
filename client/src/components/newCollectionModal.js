import React, { Component } from "react";
import { Modal, Button, Card, Container, Image, Form, Tab, Nav, Col, Row } from "react-bootstrap";
import InputFieldsCollection from '../components/inputFieldsCollection';
import DndFile from './dndFile';
import Wrapper from '../utils/wrapperAxios';


const NewCollectionModal = (props) => {
    const { show, handleShow, header, type, collection , changeStateUpdate} = props;
    /*let parametrs = {
        title: '',
        description: 'ytr',
        topic: 'Books',
        checkbox: {},
        number: {},
        string: {},
        text: {},
        date: {},
        cover: 'https://res.cloudinary.com/dvfmqld3v/image/upload/w_300,h_200/logoDefault_chafgb'

    };*/
    let parametrs = collection;

    const saveCollection = (type) => {
        let someElement = document.getElementById("textErrorModal");

        if (type === "new") {
            if (parametrs.title === '' || parametrs.description === '') {
                someElement.innerHTML = 'Fill in all the fields with *';
            } else {
                const newCollection = {
                    title: parametrs.title,
                    author: localStorage.getItem('username'),
                    authorId: localStorage.getItem('id'),
                    description: parametrs.description,
                    fieldsImage: {
                        checkbox: parametrs.checkbox,
                        number: parametrs.number,
                        string: parametrs.string,
                        text: parametrs.text,
                        date: parametrs.date
                    },
                    topic: parametrs.topic,
                    cover: parametrs.cover
                }

                const wrapp = new Wrapper();
                wrapp.post('api/collections/collection', newCollection)
                    .then(res => {
                        //console.log("response ", res.data);
                        handleShow();
                    })
                    .catch(err => {
                        someElement.innerHTML = err;
                    })
            }
        } else {
            //console.log("collec ", parametrs)
            const updateCollection = {
                _id: parametrs.id,
                title: parametrs.title,
                description: parametrs.description,
                topic: parametrs.topic,
                cover: parametrs.cover,
                fieldsImage: {
                    checkbox: parametrs.checkbox,
                    number: parametrs.number,
                    string: parametrs.string,
                    text: parametrs.text,
                    date: parametrs.date
                },
            }

            const wrapp = new Wrapper();
            wrapp.put(`api/collections/${parametrs.id}`, updateCollection)
                .then(res => {
                    //console.log("response update collection", res.data);
                    handleShow();        
                })
                .catch(err => {
                    someElement.innerHTML = err;
                })
            
        }
    }

    function handleChange(event) {
        parametrs[event.target.name] = event.target.value
        //console.log(parametrs);
    }

    function handleChange2(event, data) {
        parametrs[data][event.target.name] = event.target.value
        console.log(parametrs);
    }

    function setCover(url) {
        parametrs.cover = url;
    }


    return (
        <>
            <Modal show={show} onHide={handleShow} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title >{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Text id="textErrorModal" > </Form.Text>
                    <Container>
                        <Form.Group >
                            <Form.Label>Cover: </Form.Label>
                            <DndFile setCover={setCover} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Collection title:*</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Title" 
                                name="title" 
                                onChange={(e) => handleChange(e)} 
                                defaultValue={parametrs.title} 
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description:*</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                name="description"
                                onChange={(e) => handleChange(e)}
                                defaultValue={parametrs.description}
                            />
                        </Form.Group>

                        <Form.Group controlId="сontrolSelect">
                            <Form.Label>Topic:*</Form.Label>
                            <Form.Control as="select" name="topic" onChange={(e) => handleChange(e)} defaultValue={parametrs.topic}>
                                <option value="Books" name="topic">Books</option>
                                <option value="Alcohol" name="topic">Alcohol</option>
                                <option value="Сoins" name="topic">Сoins</option>
                                <option value="Tattoos" name="topic">Tattoos</option>
                                <option value="Nature" name="topic">Nature</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Item fields (Optionals)</Form.Label>
                            <Tab.Container id="left-tabs-example" defaultActiveKey="numberFields">
                                <Row>
                                    <Col sm={4}>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link eventKey="numberFields">Number</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="stringFields" >String</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="textareaFields" >Textarea</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="checkboxFields" >Checkbox</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="dateFields" >Date</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={8}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="numberFields" onChange={(e) => handleChange2(e, 'number')} >
                                                <InputFieldsCollection value={parametrs.number} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="stringFields" onChange={(e) => handleChange2(e, 'string')}>
                                                <InputFieldsCollection value={parametrs.string} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="textareaFields" onChange={(e) => handleChange2(e, 'text')}>
                                                <InputFieldsCollection value={parametrs.text} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="checkboxFields" onChange={(e) => handleChange2(e, 'checkbox')}>
                                                <InputFieldsCollection value={parametrs.checkbox} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="dateFields" onChange={(e) => handleChange2(e, 'date')}>
                                                <InputFieldsCollection value={parametrs.date} />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Form.Group>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => saveCollection(type)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
};

export default NewCollectionModal