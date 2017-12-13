import './modal.scss';
import React, { Component } from 'react';

export default class Modal extends Component {
    static defaultProps = {
        modalShow: 'none'
    }

    constructor(props) {
        super(props);
        this.state = {
            modalShow: props.modalShow
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modalShow !== this.state.modalShow) {
            this.setState({
                modalShow: nextProps.modalShow
            });
        }
    }

    // 取消
    cancel(e) {
        if(this.props.cancel) {
            this.props.cancel();
        }
    }

    //  确认
    sure(e) {
        if(this.props.sure){
            this.props.sure();
        }
    }
    render() {
        return (
            <div style={{ display: this.state.modalShow }} className="T-modal-bg">
                <div className="T-modal-content">
                    <div className="title">
                        {this.props.title || '提示确认'}
                    </div>
                    <div className="bodys">
                        {
                            this.props.children
                        }
                    </div>
                    <div className="button-box">
                        <button onClick={e => this.sure(e)} className="soure">{this.props.sureText || '确认'}</button>
                        <button onClick={e => this.cancel(e)} className="cancel">{this.props.cancelText || '取消'}</button>
                    </div>
                </div>
            </div>
        );
    }
}