import React, { Component } from 'react';
import { Form, Container } from 'react-bootstrap';



class InputFieldsCollection extends Component {
    constructor(props){
        super(props);
        //console.log(props);
    }

    render() {
        return (
            <Container>
                <Form.Group >
                    <Form.Group >
                        <Form.Control type="text"  name="one" defaultValue={this.props.value.one}/>
                    </Form.Group>
                    <Form.Group >
                        <Form.Control type="text"  name="two" defaultValue={this.props.value.two}/>
                    </Form.Group>
                    <Form.Group >
                        <Form.Control type="text"  name="three" defaultValue={this.props.value.three}/>
                    </Form.Group>
                </Form.Group>
            </Container>
        )
    }
}

export default InputFieldsCollection;