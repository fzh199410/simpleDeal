'use strict';
import React, { Component } from 'react';
import { Link } from 'react-router';
import 'mtui/style.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="app">
                {this.props.children}
            </div>
        );
    }
}

// APP入口
export default App;
