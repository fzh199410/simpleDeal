import React from 'react';
import default_Touxiang from 'assets/images/default_touxiang.jpg';
export default class Image extends React.Component {
    static defaultProps = {
        src: '',
        onError: function(evt){return false;},
        onLoad: function(evt){return false;},
        alt: '',
        title: ''
    }

    constructor(props) {
        super(props);
    }

    onError(evt) {
        evt.nativeEvent.target.src = default_Touxiang;
        this.props.onError(evt);
    }

    render() {
        return <img 
        src={this.props.src} 
        title={this.props.title} 
        alt={this.props.alt} 
        onError={this.onError.bind(this)} 
        onLoad={this.props.onLoad} 
        className={this.props.className} 
        style={this.props.style} />;
    }
}