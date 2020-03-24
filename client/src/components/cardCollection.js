import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import img_default from '../assets/card_default.jpeg'


class CardCollection extends Component {



    render() {
        return (
            <Card style={{ width: '18rem' , height: '25rem', marginRight: '5px'}}>
                <Card.Img variant="top" src={img_default} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        About About About About About About About About About About About About About About About
                </Card.Text>
                    <Button variant="secondary">Go somewhere</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default CardCollection;