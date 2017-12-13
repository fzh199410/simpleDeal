/**
 * 卖家创建后  买家输入订单号进行购买
 */
import React, {Component} from 'react';
import Steps, { Step } from 'rc-steps';
import {LoadingBox} from 'mtui/index';
import {Input, Tip, Modal, ToolTip} from 'ui/index';
import {connect} from 'react-redux';
import Trade from 'service/trade';
import {browserHistory} from 'react-router';
import {setTradeInfo} from 'store/simpleDeal';

class ToBuy extends Component {
    constructor(props) {
        super(props);
        this.tobeChargeTimer = null;
        this.tobeShipedTimer = null;
        this.counter = 0;
        this.state = {
            order: {},
            currentStep: 0,
            totalFee: '',
            sincereFee: '',
            tradeDetail: '',
            tradeNumber: '',
            tobeShiped: true,
            copied: false,
            showModal: 'none'
        };
    }

    setStep() {
        let {currentStep} = this.state;
        let {trade} = this.props;
        if(!trade) {
            return false;
        }

        switch(trade.status) {
            case 2: //2已接受交易
                currentStep = 0;break;
            case 3: //3已确认交易（卖家支付诚意金或买家支付出价）
                currentStep = 1;break;
            case 4: //4卖家已发货
                currentStep = 2;break;
        }
        this.setState({
            currentStep,
            order: trade
        }, () => {
            if(this.state.currentStep === 3) {
                this.startTimeout();
            }
        });
    }

    judgePayed() {
        Trade.findOrderByOrderNO({
            orderNO: this.props.trade.orderNO
        }).then((data) => {
            if(data.content.status === 3) {
                return true;
            }else if(data.content.status === 1 || data.content.status === 2){
                return false;
            }
        })
    }

    startTimeout() {
        this.tobeShipedTimer = setTimeout(() => {
            // 请求某个成功之后 set  tobePayed:false;
            if(this.judgePayed()) { // 对方已经付款
                this.setState({
                    tobeShiped: false,
                    currentStep: 2
                });
                clearTimeout(this.tobeShipedTimer);
            }
        }, 10e3);
    }

    componentDidMount() {
        let {trade} = this.props;
        if(trade.status === 1) {
            Trade.receiveOrder({
                orderNO: trade.orderNO
            }).then(() => {
                trade.status = 2;
                this.props.setTradeInfo(trade);
                Tip.success('接受订单成功');
                setTimeout(() => {
                    this.setStep();
                }, 0)
            });
        }else {
            this.setStep();
        }

    }

    toStepOne() {
        Trade.payOrderGoodsAmountAfterReceive({
            orderNO: this.props.trade.orderNO
        }).then((data) => {
            this.setState({
                currentStep: 1
            });
            this.startTimeout();
        })

    }

    cancelTrade() {
        this.setState({
            showModal: 'block'
        });
    }

    hideModal() {
        this.setState({
            showModal: 'none'
        });
    }

    sureCancel() {
        Trade.updateOrderStatusApplyRevoke({
            orderNO: this.props.trade.orderNO
        }).then(() => {
            Tip.success('取消成功');
            browserHistory.push('/tradePlatform');
        });
    }

    backToPlatform() {
        Trade.updateOrderConfirmReceived({
            orderNO: this.props.trade.orderNO
        }).then((data) => {
            if(data.code === 200) {
                Tip.success('交易完成');
                browserHistory.push('/tradePlatform');
            }
        });
    }


    render() {
        let {currentStep, tobeShiped, showModal} = this.state;
        let {user, trade} = this.props;
        return (
            <div className="seller-create-fast">
                <h3>商品购买交易进行中 - 快捷性</h3>
                <Steps current={currentStep}>
                    <Step title="第一步" />
                    <Step title="第二步" />
                    <Step title="第三步" />
                </Steps>
                <div className="content-box">
                    {
                        user.balance < trade.goodsAmount ?
                            <div className="step step-0" style={{visibility: currentStep === 0 ? 'visible' : 'hidden'}}>
                                <span>账户余额不足支付货款{trade.goodsAmount}元 ,请扫描支付宝充值</span>
                                <img src={require('assets/images/支付宝付款码.png')}/>
                            </div> :
                            <div className="step step-1" style={{visibility: currentStep === 0 ? 'visible' : 'hidden'}}>
                                <span>卖家已支付{trade.depositAmount}元诚意金</span>
                                <span>点击下一步从账户余额扣除{trade.goodsAmount}元货款到平台</span>
                                <div className="btn-box"><button onClick={this.toStepOne.bind(this)}>下一步</button></div>
                            </div>
                    }
                    {
                        <div className="step step-1" style={{visibility: currentStep === 1 ? 'visible' : 'hidden'}}>
                            <span>系统已经通知卖家发货,请等待</span>
                            <div className="btn-box" style={{marginTop: '8em'}}>
                                {
                                    tobeShiped ?
                                        <LoadingBox style={{top: '100%'}} info='等待卖家发货' type="loading2"/> : null
                                }
                            </div>
                            <div className="btn-box" style={{marginTop: '1em'}}><button onClick={this.cancelTrade.bind(this)}>取消交易</button></div>
                            <span>卖家提供商品前可取消交易</span>
                        </div>
                    }
                    {
                        <div className="step step-2" style={{visibility: currentStep === 2 ? 'visible' : 'hidden'}}>
                            <span>卖家已提供商品,请确认无误后点击"完成交易"按钮</span>
                            <div className="btn-box"><button onClick={this.backToPlatform.bind(this)}>完成交易</button></div>
                        </div>
                    }
                    {
                        <Modal modalShow={showModal} title="取消确认" sure={this.sureCancel.bind(this)} cancel={this.hideModal.bind(this)}>
                            <p>您是否确认取消交易？</p>
                        </Modal>
                    }
                </div>
            </div>
        );
    }
}

export default connect(function(state) {
    return {
        trade: state.simpleDeal.trade,
        user: state.simpleDeal.user
    };
}, {setTradeInfo})(ToBuy);