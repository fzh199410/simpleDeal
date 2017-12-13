import React, { Component } from 'react';
import './autoComplete.scss';
import PropTypes from 'prop-types';
import Input from '../input/Input';

const propTypes = {
    onChangeCb: PropTypes.func.isRequired,
    onSelectCb: PropTypes.func.isRequired,
    onBlurCb: PropTypes.func,
    onFocusCb: PropTypes.func,
    placeholder: PropTypes.string,
    delay: PropTypes.number,
    noResultText: PropTypes.string,
    supportFresh: PropTypes.bool
};

const defaultProps = {
    placeholder: '请输入搜索内容',
    noResultText: '暂无搜索结果',
    supportFresh: false,
    delay: 1000
};

export default class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            showDisplay: false, // 是否展示查询内容
            searchWords: '', // 输入的内容
            lastSearchWords: '', // 上次输入的内容
            result: [] // 查询出来的结果
        };
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
    }
    componentDidMount() {
        document.addEventListener('click', this.hide);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.hide);
    }

    show() {
        this.setState({showDisplay: true});
    }

    hide() {
        this.setState({showDisplay: false});
    }

    handleChange(e) {
        let inputWords = e.target.value.trim();
        if(!inputWords || inputWords === this.state.lastSearchWords){
            return false;
        }
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.props.onChangeCb(inputWords).then((data) => {
                if(data.length) {
                    this.setState({
                        result: data
                    }, () => {
                        this.show();
                    })
                }
            })
        }, this.props.delay);
    }

    handleSelect(value) {
        this.props.onSelectCb(value);
        this.hide();
    }

    handleBlur() {
        typeof this.props.onBlurCb === 'function' && this.props.onBlurCb(this.state.searchWords);
    }

    handleFocus() {
        if(this.props.supportFresh) {
            this.props.onChangeCb(this.state.searchWords);
        }else {
            this.show();
        }
    }

    render() {
        let {result} = this.state;
        return (
            <div className="auto-complete" style={this.props.style}  onClick={(e)=>{e.nativeEvent.stopImmediatePropagation();}}>
                <Input type="text"
                       placeholder={this.props.placeholder}
                       value={this.state.searchWords}
                       onChange={this.handleChange.bind(this)}
                       onBlur={this.handleBlur.bind(this)}
                       onFocus={this.handleFocus.bind(this)}
                />
                <div className="auto-complete-list" style={{display: this.state.showDisplay ? 'block' : 'none'}}>
                    <ul className="auto-complete-ul">
                        {
                            result.length ?
                                result.map((item, index) => {
                                    return <li className="auto-complete-li" onClick={this.handleSelect.bind(this, item)} key={index}>{item.text}</li>
                                }) :
                                <li className="auto-complete-li">{this.props.noResultText}</li>
                        }
                    </ul>
                </div>
            </div>
        );
    }
};

AutoComplete.propTypes = propTypes;
AutoComplete.defaultProps = defaultProps;