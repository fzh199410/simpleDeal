import React, {Component} from 'react';

export default class TypeField extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="type-field">
                <div className="title">{this.props.title}</div>
                {this.props.children}
            </div>
        );
    }
}