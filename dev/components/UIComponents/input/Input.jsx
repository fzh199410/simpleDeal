import React, { Component } from 'react';
import './input.scss';
import PropTypes from 'prop-types';

const defaultProps = {
    size: 'normal', // large 大,normal 正常,small 小,xsmall 超小
    type: 'text',
    prefix: null, // 前面的图标
    suffix: null, // 后面的图标
    onPressEnter: null, // 回车按钮回调
    validateInfo: null, // 表单验证提示
};

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    componentDidMount() {
        let {onPressEnter, value} = this.props;
        if(onPressEnter && typeof onPressEnter === 'function') {
            document.addEventListener('keydown', onPressEnter(this.state.value));
        }
        if(value) {
            this.setState({
               value
            });
        }
    }

    componentWillUnmount() {
        let {onPressEnter} = this.props;
        let {value} = this.state;
        if(onPressEnter && typeof onPressEnter === 'function') {
            document.removeEventListener('keydown', onPressEnter(value));
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.value !== this.props.value) {
            this.setState({
               value: nextProps.value
            });
        }
    }

    handleChange(e) {
        let {onChange} = this.props;
        if(onChange && typeof onChange === 'function') {
            onChange(e);
        }
        if(this.props.defaultValue) {
            this.setState({
               value: e.target.value
            });
        }
    }

    render() {
        const {size, prefix, suffix, style, type, onPressEnter, className, validateInfo, onChange, defaultValue, value, disabled, ...other} = this.props;
        let cName = ['T-input'];
        if(className) {
            cName.push(className);
        }
        if(size) {
            cName.push('T-input-' + (size ? size : 'normal'));
        }
        if(prefix) {
            cName.push('T-input-prefix-out');
        }
        if(suffix) {
            cName.push('T-input-suffix-out');
        }
        if(disabled) {
            cName.push('T-input-disabled');
        }

        let obj = {};
        if(value) {
            obj.value = value;
        }
        if(defaultValue) {
            obj.defaultValue = defaultValue;
        }

        return (
            <span className={cName.join(' ')} style={style}>
                {prefix ? <span className="T-input-prefix">{prefix}</span> : null}
                {type === 'textarea' ? <textarea disabled={disabled} {...obj} {...other} onChange={this.handleChange.bind(this)}></textarea> :
                    <input type={type} disabled={disabled} {...obj} {...other} onChange={this.handleChange.bind(this)} />}
                {suffix ? <span className="T-input-suffix">{suffix}</span> : null}
            </span>
        );
    }
}