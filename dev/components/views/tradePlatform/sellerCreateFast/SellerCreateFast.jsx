import React, {Component} from 'react';
import './sellerCreateFast.scss';
import Steps, { Step } from 'rc-steps';
import {LoadingBox} from 'mtui/index';
import {Input, Tip, Modal, ToolTip} from 'ui/index';
import {connect} from 'react-redux';
import Trade from 'service/trade';
import CopyToClipboard from 'react-copy-to-clipboard';
import {browserHistory} from 'react-router';
const NumReg = /^(([1-9]\d*)|\d)(\.\d{1})?$/;


class SellerCreateFast extends Component {
    constructor(props) {
        super(props);
        this.sincereTimer = null;
        this.tobePayedTimer = null;
        this.counter = 0;
        this.state = {
            order: {},
            currentStep: 0,
            totalFee: '',
            sincereFee: '',
            tradeDetail: '',
            tradeNumber: '',
            tobePayed: true,
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
            case 0: // 0已创建（未支付出价或诚意金
                currentStep = 1;break;
            case 1: //1已支付（订单已创建，买家出价或卖家诚意金已支付）
                currentStep = 2;break;
            case 2: //2已接受交易
                currentStep = 3;break;
            case 3: //3已确认交易（卖家支付诚意金或买家支付出价）
                currentStep = 4;break;
            case 4: //4卖家已发货
                currentStep = 5;break;
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
        this.tobePayedTimer = setTimeout(() => {
            // 请求某个成功之后 set  tobePayed:false;
            if(this.judgePayed()) { // 对方已经付款
                this.setState({
                    tobePayed: false,
                    currentStep: 4
                });
                clearTimeout(this.tobePayedTimer);
            }
        }, 10e3);
    }

    componentDidMount(){
        this.setStep();
    }


    handleInput(type, e) {
        let val = e.target.value.trim();
        if(type === 'totalFee' && typeof +val === 'number') {
            this.setState({
                sincereFee: val/10
            });
        }
        this.setState({
            [type]: val
        });
    }

    toStepOne() {
        let {totalFee, sincereFee, tradeDetail, order} = this.state;
        if(!totalFee) {
            return Tip.error('请输入商品交易总价');
        }else if(!sincereFee) {
            return Tip.error('请输入卖家诚意金');
        }else if(!NumReg.test(totalFee)) {
            return Tip.error('商品交易总价格式不正确,参考10或10.1');
        }else if(!NumReg.test(sincereFee)) {
            return Tip.error('卖家诚意金格式不正确,参考10或10.1');
        }
        Trade.createSellOrder({
            goodsAmount: totalFee,
            depositAmount: sincereFee,
            tradeDetail: tradeDetail
        }).then((data) => {
            order = data.content;
            this.setState({
                currentStep: 1,
                order
            });
        });

    }

    toStepZero() {
        this.setState({
            currentStep: 0
        });
        this.sincereTimer && clearTimeout(this.sincereTimer);
    }

    toStepTwo() { // 支付诚意金再跳转
        let {order} = this.state;
        Trade.payOrderDepositAmountAfterCreate({
            orderNO: order.orderNO
        }).then((data) => {
            if(data.message === '支付成功') {
                this.setState({
                    currentStep: 2
                });
            }
        })
    }

    toStepThree() {
        this.setState({
            currentStep: 3
        });
        this.startTimeout();
    }

    toStepFive() {
        Trade.updateOrderShiped({
            orderNO: this.state.order.orderNO
        }).then(() => {
            this.setState({
                currentStep: 5
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
            orderNO: this.state.order.orderNO
        }).then(() => {
            Tip.success('取消成功');
            browserHistory.push('/tradePlatform');
        });
    }

    onCopy() {
        this.setState({copied: true});
    }

    backToPlatform() {
        browserHistory.push('/tradePlatform');
    }


    render() {
        let {currentStep, totalFee, sincereFee, tradeDetail, tobePayed, order, copied, showModal} = this.state;
        let {user} = this.props;
        return (
            <div className="seller-create-fast">
                <h3>卖家创建-极快</h3>
                <Steps current={currentStep}>
                    <Step title="第一步" />
                    <Step title="第二步" />
                    <Step title="第三步" />
                    <Step title="第四步" />
                    <Step title="第五步" />
                    <Step title="第六步" />
                </Steps>
                <div className="content-box">
                    {
                        <div className="step step-0" style={{visibility: currentStep === 0 ? 'visible' : 'hidden'}}>
                            <p><label>商品交易总价:</label> <Input value={totalFee} onChange={this.handleInput.bind(this, 'totalFee')}/> 元</p>
                            <p><label>卖家诚意金:</label> <Input value={sincereFee} onChange={this.handleInput.bind(this, 'sincereFee')}/> 元 <em><ToolTip direction="top" text="卖家诚意金?" content="卖家诚意金是卖家为了防止卖家对接交易后不发货而且胁迫买家而设定的." /></em></p>
                            <p>
                               <label>交易说明:</label> <Input type="textarea" value={tradeDetail} onChange={this.handleInput.bind(this, 'tradeDetail')}/>
                            </p>
                            <div className="btn-box"><button onClick={this.toStepOne.bind(this)}>下一步</button></div>
                        </div>
                    }
                    {
                        user.balance < (order.depositAmount || +sincereFee) ?
                        <div className="step step-1" style={{visibility: currentStep === 1 ? 'visible' : 'hidden'}}>
                            <span>账户余额不足,请扫描支付宝充值</span>
                            <img src={require('assets/images/支付宝付款码.png')}/>
                            <div className="btn-box"><button onClick={this.toStepZero.bind(this)}>上一步</button></div>
                        </div> :
                        <div className="step step-1" style={{visibility: currentStep === 1 ? 'visible' : 'hidden'}}>
                            <span>将从您账户余额扣除{order.depositAmount || sincereFee}元,确认后点击下一步</span>
                            <div className="btn-box"><button onClick={this.toStepZero.bind(this)}>上一步</button><button onClick={this.toStepTwo.bind(this)}>下一步</button></div>
                        </div>
                    }
                    {
                        <div className="step step-2" style={{visibility: currentStep === 2 ? 'visible' : 'hidden'}}>
                            <p>您已支付卖家诚意金{order.depositAmount || sincereFee}到平台,请将交易号码告诉买家后点击下一步</p>
                            <div className="btn-box"><label>交易号:</label> {order.orderNO} <CopyToClipboard text={order.orderNO} onCopy={this.onCopy.bind(this)}><button>{copied ? '已复制到粘贴板' : '复制交易号'}</button></CopyToClipboard></div>
                            <div className="btn-box"><button onClick={this.toStepThree.bind(this)}>下一步</button></div>
                        </div>
                    }
                    {
                        <div className="step step-3" style={{visibility: currentStep === 3 ? 'visible' : 'hidden'}}>
                            <span><label>交易号:</label> {order.orderNO}</span>
                            <div className="btn-box" style={{marginTop: '8em'}}>
                                {
                                    tobePayed ?
                                        <LoadingBox style={{top: '100%'}} info='买家付款中' type="loading2"/> : null
                                }
                            </div>
                        </div>
                    }
                    {
                        <div className="step step-4" style={{visibility: currentStep === 4 ? 'visible' : 'hidden'}}>
                            <span>买家已支付{order.goodsAmount || totalFee}元货款,请提供商品后点击下一步</span>
                            <div className="btn-box"><button onClick={this.cancelTrade.bind(this)}>取消交易</button><button onClick={this.toStepFive.bind(this)}>下一步</button></div>
                        </div>
                    }
                    {
                        <div className="step step-5" style={{visibility: currentStep === 5 ? 'visible' : 'hidden'}}>
                            <span>请告知买家您已提供给商品,并等待买家最终确认</span>
                            <div className="btn-box"><button onClick={this.backToPlatform.bind(this)}>返回交易平台</button></div>
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
        user: state.simpleDeal.user,
        trade:  state.simpleDeal.trade
    };
}, {})(SellerCreateFast);