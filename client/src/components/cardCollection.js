import React, { Component } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import img_default from '../assets/card_default.jpeg'
import ReactMarkdown from 'react-markdown';


class CardCollection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: props.item,
        }
    }

    editCollection() {
        this.props.editCollection(this.state.item._id);
    }

    deleteCollection() {
        this.props.deleteCollection(this.state.item._id);
    }

    render() {
        return (
            <Card >
                <div className="cardImg ">
                    <div className="cardTool">
                        <button type="button" className="btn btn-outline-light " id="btnEdit" onClick={this.editCollection.bind(this)}>
                            <span className="oi oi-pencil" title="icon pencil" aria-hidden="true"></span>
                        </button>
                        <button type="button" className="btn btn-outline-light" id="btnDelete" onClick={this.deleteCollection.bind(this)}>
                            <span className="oi oi-trash " title="icon trash" aria-hidden="true"> </span>
                        </button>
                    </div>
                    <Card.Img variant="top" src={this.state.item.cover} className="cardImg" />
                </div>

                <div className="media position-relative">
                    <div className="media-body">
                        <Card.Body>
                            <Card.Title>{this.state.item.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{this.state.item.topic}</Card.Subtitle>
                            <div>
                                <ReactMarkdown source={this.state.item.description} escapeHtml={false} />{' '}
                            </div>
                            <a href="#" className="btn btn-secondary stretched-link">Go </a>
                        </Card.Body>
                    </div>
                </div>
            </Card >
        )
    }
}

export default CardCollection;