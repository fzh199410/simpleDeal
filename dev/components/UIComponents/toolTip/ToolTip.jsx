import React, { Component } from 'react';
import './toolTip.scss';

const defaultProps = {
    direction: 'bottom'
};
export default class ToolTip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTip: 'none'
        };
    }

    handleOver() {
        this.setState({
            showTip: 'block'
        });
    }

    handleOut() {
        this.setState({
            showTip: 'none'
        });
    }

    render() {
        let {direction} = this.props;
        return (
           <div onMouseEnter={this.handleOver.bind(this)} onMouseLeave={this.handleOut.bind(this)} className={"T-toolTip "}>
               <span >{this.props.text}</span>
               <div className={"toolTip-content-box " + direction} style={{display: this.state.showTip}}>
                   {this.props.content}
               </div>
           </div>
        );
    }
}

ToolTip.defaultProps = defaultProps;