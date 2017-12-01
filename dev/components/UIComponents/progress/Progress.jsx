import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './progress.scss';

const propTypes = {
    progress: PropTypes.number.isRequired
};

const defaultProps = {
    type: 'normal'
};

export default class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0
        };
    }
    componentDidMount() {
        let height = $('.T-progress .normal').height();
        this.setState({
            height
        });
    }
    render() {
        let {type, progress} = this.props;
        if(progress >= 100) {
            progress = 100;
        }
        return (
            <div className="T-progress">
                {
                    type === 'normal'
                        ?
                        <div className="normal" style={{lineHeight: this.state.height + 'px'}}>{progress + '%'}</div>
                        :
                        null
                }
                {
                    type === 'line'
                        ?
                        <div className="line">
                            <div className="progress">
                                <span style={{width: progress + '%'}}></span>
                            </div>
                            <em>{progress + '%'}</em>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;

