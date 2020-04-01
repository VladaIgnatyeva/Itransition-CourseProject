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
        //console.log("item ", this.state.item)
    }

    deleteItem() {
        this.props.deleteItem(this.state.item._id);
    }

    editItem() {
        this.props.editItem(this.state.item._id);
    }

    getCardBody() {
        const linkImage = `/collection/${this.state.item._id}`
        return <div className="media-body">
            <Card.Body>
                <Card.Title>{this.state.item.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.state.item.topic}</Card.Subtitle>
                <div>
                    <ReactMarkdown source={this.state.item.description} escapeHtml={false} />{' '}
                    {this.state.item.fields.map(data => {
                        if (data.type === 'Checkbox') {
                            let b = 'false';
                            if (data.value) {
                                b = 'true'
                            }
                            return (
                                <div key={data.id + new Date().getMilliseconds()} className="d-flex flex-row">
                                    <p className="cardItemFields">
                                        <b>{data.name}:</b>  {b}
                                    </p>
                                </div>
                            )
                        } else {
                            return (
                                <div key={data.id + new Date().getMilliseconds()} className="d-flex flex-row">
                                    <p className="cardItemFields">
                                        <b>{data.name}:</b>
                                    </p>
                                    <ReactMarkdown source={data.value} escapeHtml={false} />
                                </div>
                            )
                        }
                    })
                    }
                </div>
                <LinkContainer to={linkImage}>
                    <a className="stretched-link"> </a>
                </LinkContainer>
            </Card.Body>
            <Card.Footer>
                {
                    this.state.item.tags.map(tag => {
                        return <div className="tagFooter" key={tag[0]._id + new Date().getMilliseconds()}>
                            <small className="text-muted "> {tag[0].text} </small>
                        </div>
                    })
                }
            </Card.Footer>
        </div>
    }

    showCardTool() {

        if (this.state.item.authorId === localStorage.getItem('id') || localStorage.getItem('role') === 'admin') {
            return <div className='media position-relative'>
                {this.getCardBody()}
            </div>
        }
        else return <div className='media '>
            {this.getCardBody()}
        </div>
    }

    render() {

        return (
            <Card >
                <div className="cardImg ">
                    <div className="cardTool">
                        <button type="button" className="btn btn-outline-light " id="btnEdit" onClick={this.editItem.bind(this)}>
                            <span className="oi oi-pencil" title="icon pencil" aria-hidden="true"></span>
                        </button>
                        <button type="button" className="btn btn-outline-light" id="btnDelete" onClick={this.deleteItem.bind(this)}>
                            <span className="oi oi-trash " title="icon trash" aria-hidden="true"> </span>
                        </button>
                    </div>
                    <Card.Img variant="top" src={this.state.item.img} className="cardImg" />
                </div>

                {this.showCardTool()}

            </Card >
        )
    }
}

export default CardItem;