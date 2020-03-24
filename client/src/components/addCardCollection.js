import React, { Component } from 'react';
import { Button, Card, Container, Image } from 'react-bootstrap';
import plus_img from '../assets/plus.png';
import plus1_img from '../assets/plus1.png';


class AddCardCollection extends Component {

    render() {
        return (
            <Card style={{ width: '18rem', height: '25rem', marginRight: '5px' }} className="d-flex align-items-center ">
                <Card.Body>
                    <Card.Title>Add new collection</Card.Title>
                    <Container>
                        <Button variant="link" style={{  marginTop: "50%" }} >
                            <Image src={plus1_img} roundedCircle height="90" vspace="5" />
                           
                        </Button>
                    </Container>

                </Card.Body>
            </Card>
        )
    }
}

export default AddCardCollection;