import React from "react";
import { Modal, Button, Card, Container,  Form, } from "react-bootstrap";
import DndFile from './dndFile';
import Wrapper from '../utils/wrapperAxios';
import AddingFields from './addingFields'

const NewCollectionModal = (props) => {
    const { show, handleShow, header, type, collection, changeStateUpdate } = props;

    let parametrs = collection;


    const saveCollection = (type) => {
        let someElement = document.getElementById("textErrorModal");

        if (type === "new") {
            if (parametrs.title === '' || parametrs.description === '') {
                someElement.innerHTML = 'Fill in all the fields with *';
            } else {
                //console.log("paramentrs ", parametrs);
                const newCollection = {
                    title: parametrs.title,
                    author: localStorage.getItem('username'),
                    authorId: localStorage.getItem('id'),
                    description: parametrs.description,
                    fields: parametrs.fields,
                    topic: parametrs.topic,
                    cover: parametrs.cover
                }
                console.log("newCollection ", newCollection);
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
                fields: parametrs.fields,
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

    function updateFields(fields) {
        console.log('field add', fields)
        parametrs.fields = fields;
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

                        <AddingFields updateFields={updateFields} fields={parametrs.fields}/>
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



/*<Tab.Container id="left-tabs-example" defaultActiveKey="numberFields">
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

                */