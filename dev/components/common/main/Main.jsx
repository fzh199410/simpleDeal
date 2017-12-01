import React, { Component } from 'react';
import { Link } from 'react-router';
import './main.scss';
import Header from '../header/Header';
import Footer from '../footer/Footer';
export default class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
        // 
    }
    render() {
        return (
            <div className="main">
                <Header {...this.props} />
                <div className="main-content">{this.props.children}</div>
                <Footer />
            </div>
        );
    }
}