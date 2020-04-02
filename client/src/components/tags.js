import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import Wrapper from '../utils/wrapperAxios';


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
        console.log("tags", this.state.tags);
        console.log("tag", tag);
        this.setState({ tags:[...state.tags, tag]});
        //this.setState(state => ({ tags: [...state.tags, tag] }));
        console.log("tags after", this.state.tags);
        //console.log("tag", tag)
        
        if (this.state.suggestions.findIndex(item => item.id === tag.id) === -1) {
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
                    suggestions: res.data,
                    tags : this.props.defaultTags[0]

                });
                //console.log("tags ", this.props.defaultTags[0])
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
