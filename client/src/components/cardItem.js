import React, { Component } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { LinkContainer } from 'react-router-bootstrap';



class CardItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: props.item,
        }

        console.log("item ", this.state.item)
    }

    

    render() {
        const linkImage = `/collection/${this.state.item._id}`
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
                    <Card.Img variant="top" src={this.state.item.img} className="cardImg" />
                </div>
                
                <Card.Body>
                    <Card.Title>{this.state.item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.state.item.topic}</Card.Subtitle>
                    <div>
                        <ReactMarkdown source={this.state.item.description} escapeHtml={false} />{' '}
                    </div>
                    <LinkContainer to={linkImage}>
                        <a className="stretched-link">Go </a>
                    </LinkContainer>
                </Card.Body>
                <Card.Footer>
                    {
                        this.state.item.tags.map(tag => {
                            return <div className="" >
                                <small className="text-muted">{tag}</small>
                            </div>
                        })
                    }
                </Card.Footer>
            </Card >
        )
    }
}

export default CardItem;