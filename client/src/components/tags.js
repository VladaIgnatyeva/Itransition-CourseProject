import React from 'react';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import Wrapper from '../utils/wrapperAxios';

const KeyCodes = {
    comma: 188,
    enter: 13,
};


export default class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            suggestions: []
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
        //console.log("tags", this.state.tags)
        //console.log("tag", tag)
        
        if (this.state.suggestions.findIndex(item => item.id == tag.id) === -1) {
            //console.log('new tag', tag);
            const wrapp = new Wrapper();
            wrapp.post(`api/tags`, tag)
                .then(res => {
                    
                })
                .catch(err => {
                    console.log(err);
                });
            
        }
    }


    componentDidMount() {
        const wrapp = new Wrapper();
        wrapp.get(`api/tags`)
            .then(res => {
                this.setState({
                    suggestions: res.data
                });
                // console.log("collection ", res.data)
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.tags !== prevState.tags) {
            this.props.getTags(this.state.tags);
        }
    }

    render() {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    allowDragDrop={false}
                />
            </div>
        )
    }
};
