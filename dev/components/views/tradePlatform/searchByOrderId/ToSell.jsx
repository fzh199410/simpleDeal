/**
 * 买家创建交易后 卖家通过查询 进入卖的页面
 */
import React, {Component} from 'react';
import Steps, { Step } from 'rc-steps';
import {LoadingBox} from 'mtui/index';
import {Input, Tip, Modal, ToolTip} from 'ui/index';
import {connect} from 'react-redux';
import Trade from 'service/trade';
import {browserHistory} from 'react-router';
import {setTradeInfo} from 'store/simpleDeal';

class ToSell extends Component {
    constructor(props) {
        super(props);
        console.log(props.trade);
        this.tobeChargeTimer = null;
        this.tobeSuredTimer = null;
        this.state = {
            order: {},
            currentStep: 0,
            totalFee: '',
            sincereFee: '',
            tradeDetail: '',
            tradeNumber: '',
            tobeSured: true,
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
            if(this.state.currentStep === 1) {
                this.startTimeout();
            }
        });
    }

    judgePayed() {
        Trade.findOrderByOrderNO({
            orderNO: this.props.trade.orderNO
        }).then((data) => {
            return data.content.status === 5;
        })
    }

    startTimeout() {
        this.tobeSuredTimer = setTimeout(() => {
            // 请求某个成功之后 set  tobePayed:false;
            if(this.judgePayed()) { // 对方已经付款
                this.setState({
                    tobeSured: false,
                    currentStep: 3
                });
                clearTimeout(this.tobeSuredTimer);
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
        Trade.payOrderDepositAmountAfterReceive({
            orderNO: this.props.trade.orderNO
        }).then((data) => {
            this.setState({
                currentStep: 1
            });
            this.startTimeout();
        })

    }

    toStepTwo() {
        Trade.updateOrderShiped({
            orderNO: this.props.trade.orderNO
        }).then(() => {
            this.setState({
                currentStep: 2
            });
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
        browserHistory.push('/tradePlatform');
    }


    render() {
        let {currentStep, tobeSured, showModal} = this.state;
        let {user, trade} = this.props;
        return (
            <div className="seller-create-fast">
                <h3>商品购买交易进行中 - 快捷性</h3>
                <Steps current={currentStep}>
                    <Step title="第一步" />
                    <Step title="第二步" />
                    <Step title="第三步" />
                    <Step title="第四步" />
                </Steps>
                <div className="content-box">
                    {
                        user.balance < trade.depositAmount ?
                            <div className="step step-0" style={{visibility: currentStep === 0 ? 'visible' : 'hidden'}}>
                                <span>账户余额不足支付支付诚意金{trade.depositAmount}元 ,请扫描支付宝充值</span>
                                <img src={require('assets/images/支付宝付款码.png')}/>
                            </div> :
                            <div className="step step-1" style={{visibility: currentStep === 0 ? 'visible' : 'hidden'}}>
                                <span>买家已支付{trade.goodsAmount}元诚意金</span>
                                <span>点击下一步从账户余额扣除{trade.depositAmount}元诚意金到平台</span>
                                <div className="btn-box"><button onClick={this.cancelTrade.bind(this)}>取消交易</button><button onClick={this.toStepOne.bind(this)}>下一步</button></div>
                            </div>
                    }
                    {
                        <div className="step step-1" style={{visibility: currentStep === 1 ? 'visible' : 'hidden'}}>
                            <span>您已支付诚意金{trade.depositAmount}元到平台</span>
                            <span>请提供商品后进入下一步</span>
                            <div className="btn-box" style={{marginTop: '1em'}}><button onClick={this.cancelTrade.bind(this)}>取消交易</button><button onClick={this.toStepTwo.bind(this)}>下一步</button></div>
                        </div>
                    }
                    {
                        <div className="step step-2" style={{visibility: currentStep === 2 ? 'visible' : 'hidden'}}>
                            <span>您已提供商品,等待买家确认后</span>
                            <span>收到货款及退回诚意金</span>
                            <div className="btn-box" style={{marginTop: '8em'}}>
                                {
                                    tobeSured ?
                                        <LoadingBox style={{top: '100%'}} info='买家确认中' type="loading2"/> : null
                                }
                            </div>
                        </div>
                    }
                    {
                        <div className="step step-3" style={{visibility: currentStep === 3 ? 'visible' : 'hidden'}}>
                            <span>买家已确认,交易完成</span>
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
}, {setTradeInfo})(ToSell);