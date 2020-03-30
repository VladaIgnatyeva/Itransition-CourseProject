import React, { Component } from "react";
import { Modal, Button, Card, Container, Image, Form, Tab, Nav, Col, Row } from "react-bootstrap";
import InputFieldsCollection from '../components/inputFieldsCollection';
import DndFile from './dndFile';
import Wrapper from '../utils/wrapperAxios';
import Tags from '../components/tags';

const ModalItem = (props) => {
    const { show, handleShow, header, type, item, changeStateUpdate, collectionId, fields } = props;

    let parametrs = item;

    const saveItem = (type) => {
        let someElement = document.getElementById("textErrorModalItem");

        if (type === "new") {
            if (parametrs.title === '') {
                someElement.innerHTML = 'Fill in all the fields with *';
            } else {
                const newItem = {
                    _idCollection: collectionId,
                    title: parametrs.title,
                    author: localStorage.getItem('username'),
                    authorId: localStorage.getItem('id'),
                    tags: parametrs.tags,
                    fieldsItem: {
                        checkbox: parametrs.checkbox,
                        number: parametrs.number,
                        string: parametrs.string,
                        text: parametrs.text,
                        date: parametrs.date
                    },
                    topic: parametrs.topic,
                    img: parametrs.img
                }

                const wrapp = new Wrapper();
                wrapp.post(`api/collections/collection/${collectionId}/item`, newItem)
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
            const updateItem = {
                _id: parametrs.id,
                title: parametrs.title,
                tags: parametrs.tags,
                fieldsItem: {
                    checkbox: parametrs.checkbox,
                    number: parametrs.number,
                    string: parametrs.string,
                    text: parametrs.text,
                    date: parametrs.date
                },
                img: parametrs.img
            }

            const wrapp = new Wrapper();
            wrapp.put(`api/collections/items/${updateItem._id}`, updateItem)
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
        //console.log(parametrs);
    }

    function setImg(file) {
        parametrs.img = file;
    }

    function numberFields() {
        if (fields.number) {

            console.log('hhe', fields.number)
            const values = Object.values(fields.number).filter(item => item != "");

            let result = values.map(value => {
                return <Form.Group as={Row} key={value}>
                    <Form.Label column sm="2">{value}</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="number"
                        />
                    </Col>
                </Form.Group>
            })
            return result;
        }
    }

    function checkboxFields() {
        if (fields.checkbox) {
            const values = Object.values(fields.checkbox).filter(item => item != "");

            let result = values.map(value => {
                return <Form.Group  key={value}>
                    <Form.Check type="checkbox" label={value} />
                </Form.Group >
            })
            return result;
        }
    }

    function stringFields() {
        if (fields.string) {
            const values = Object.values(fields.string).filter(item => item != "");

            let result = values.map(value => {
                return <Form.Group as={Row} key={value}>
                    <Form.Label column sm="2">{value}</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                        />
                    </Col>
                </Form.Group>
            })
            return result;
        }
    }

    function textFields() {
        if (fields.text) {
            const values = Object.values(fields.text).filter(item => item != "");

            let result = values.map(value => {
                return <Form.Group as={Row} key={value}>
                    <Form.Label column sm="2">{value}</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            as="textarea"
                            rows="2"
                        />
                    </Col>
                </Form.Group>
            })
            return result;
        }
    }

    function dateFields() {
        if (fields.date) {
            const values = Object.values(fields.date).filter(item => item != "");

            let result = values.map(value => {
                return <Form.Group as={Row} key={value}>
                    <Form.Label column sm="2">{value}</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="date"
                            rows="3"
                        //defaultValue={parametrs.description}
                        />
                    </Col>
                </Form.Group>
            })
            return result;
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleShow} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title >{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Text id="textErrorModalItem" > </Form.Text>
                    <Container>
                        <Form.Group >
                            <Form.Label>Image: </Form.Label>
                            <DndFile setImg={setImg} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Item title:*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                name="title"
                                onChange={(e) => handleChange(e)}
                                defaultValue={parametrs.title}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Tags:*</Form.Label>
                            <Tags />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Item fields (Optionals)</Form.Label>
                            {checkboxFields()}
                            {numberFields()}
                            {stringFields()}
                            {textFields()}
                            {dateFields()}
                        </Form.Group>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => saveItem(type)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
};

export default ModalItem;