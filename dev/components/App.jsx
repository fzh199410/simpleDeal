'use strict';
import React, { Component } from 'react';
import { Link } from 'react-router';
import 'mtui/style.scss';
import './public.scss';
import {browserHistory} from 'react-router';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        if(window.location.pathname === '/') {
            browserHistory.push('/main');
        }
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
