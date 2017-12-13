import React, {Component} from 'react';
import './tradePlatform.scss';
import TypeField from './TypeField';
import {Input, Tip} from 'ui/index';
import Trade from 'service/trade';
import {PageList, Button} from 'mtui/index';
import {isNotEmpty} from 'utils/util';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {setTradeInfo} from 'store/simpleDeal';

function switchUnfinishedOrderStatus(status) {
    return ['已创建', '已支付', '已接受交易', '已确认交易', '卖家已发货', '已完成', '申请撤销', '撤销中', '已撤销'][status];
}
class TradePlatform extends Component {
    constructor(props) {
        super(props);
        this.myHistoryTrading = null;
        this.platformTrading = null;
        this.state = {
            searchOrderId: '',
            unfinishedOrderList: [],
            myHistoryTrading: {
                list: [],
                page: 1,
                pageSize: 10,
                total: 0,
                btnNumber: 0
             },
            platformTrading: {
                list: [],
                page: 1,
                pageSize: 10,
                total: 0,
                btnNumber: 0
            }
        };
    }
    componentDidMount() {
       this.loadUnfinishedOrderData();
       this.loadUserFinishedOrderData();
       this.loadAllFinishedOrderData();
    }

    pageListChange(pageListName, obj) {
        this.setState({
            [pageListName]: Object.assign({}, this.state[pageListName], {page: obj.current})
        }, () => {
            switch (pageListName){
                case 'myHistoryTrading': this.loadUserFinishedOrderData();break;
                case 'platformTrading': this.loadAllFinishedOrderData();break;
            }
        });
    }

    // 分页num回调
    toPage(pageListName) {
        switch (pageListName) {
            case 'myHistoryTrading':
                this.myHistoryTrading.toPage(this.state.myHistoryTrading.btnNumber);
                break;
            case 'platformTrading' :
                break;
                this.platformTrading.toPage(this.state.platformTrading.btnNumber);
        }
    }


    loadUnfinishedOrderData () {
        Trade.findUserUnfinishedOrderList().then((data) => {
            if(isNotEmpty(data.content)) {
                this.setState({
                    unfinishedOrderList: data.content || []
                });
            }
        });
    }

    loadUserFinishedOrderData() {
        Trade.findUserFinishedOrderList({
            page: this.state.myHistoryTrading.page,
            pageSize: this.state.myHistoryTrading.pageSize
        }).then((data) => {
            if(isNotEmpty(data.content)) {
                this.setState({
                    myHistoryTrading: {
                        list: data.content.items || [],
                        page: data.content.page,
                        pageSize: data.content.pageSize,
                        total: data.content.totalCount
                    }
                });
            }
        })
    }

    loadAllFinishedOrderData() {
        Trade.findAllFinishedOrdersPage({
            page: this.state.platformTrading.page,
            pageSize: this.state.platformTrading.pageSize
        }).then((data) => {
            if(isNotEmpty(data.content)) {
                this.setState({
                    platformTrading: {
                        list: data.content.items || [],
                        page: data.content.page,
                        pageSize: data.content.pageSize,
                        total: data.content.totalCount
                    }
                });
            }
        })
    }

    goTo(path) {
        this.props.setTradeInfo(null);
        browserHistory.push('/tradePlatform/' + path);
    }

    findOrderByOrderNO() {
        Trade.findOrderByOrderNO({
            orderNO: this.state.searchOrderId
        }).then((data) => {
            if(isNotEmpty(data.content)) {
                this.props.setTradeInfo(data.content);
                if(data.content.type === 1) { // 买家创建的交易
                    browserHistory.push('/tradePlatform/tradeForSeller');
                }else { // 卖家创建的交易
                    browserHistory.push('/tradePlatform/tradeForBuyer');
                }
            }
        })
    }

    continueTrade(item) {
        this.props.setTradeInfo(item);
        let {user} = this.props;
        if(item.type === 1) { // 买家创建的交易
            if(item.sellUserId == user.id) { // 买家创建 卖家id 是用户
                browserHistory.push('/tradePlatform/tradeForSeller');
            }else {
                browserHistory.push('/tradePlatform/buyerCreateFast');
            }
        }else { // 卖家创建的交易
            if(item.buyUserId == user.id) { // 卖家创建 买家id 是用户
                browserHistory.push('/tradePlatform/tradeForBuyer');
            }else {
                browserHistory.push('/tradePlatform/sellerCreateFast');
            }
        }
    }

    passRevokeOrder(item) {
        // 通过撤销
        Trade.passRevokeOrder({
            orderNO: item.orderNO
        }).then((data) => {
            if(data.code === 200) {
                this.loadUnfinishedOrderData();
                Tip.success('撤销申请通过');
            }
        })
    }

    refuseRevokeOrder(item) {
        // 拒绝撤销
        Trade.refuseRevokeOrder({
            orderNO: item.orderNO
        }).then((data) => {
            if(data.code === 200) {
                this.loadUnfinishedOrderData();
                Tip.success('撤销申请已拒绝');
            }
        })
    }

    render() {
        let {unfinishedOrderList, myHistoryTrading ,platformTrading, searchOrderId} = this.state;
        let {user} = this.props;
        return (
            <div className="trade-platform">
                <div className="type-field-box">
                    <TypeField title="对方已创建交易">
                        <p><img src={require('assets/images/1.jpg')} alt=""/></p>
                        <p><label>交易号</label><Input value={searchOrderId} onChange={(e) => {this.setState({searchOrderId: e.target.value});}} style={{height: '32px'}}/></p>
                        <p><button onClick={this.findOrderByOrderNO.bind(this)}>立即交易</button></p>
                    </TypeField>
                    <TypeField title="创建新交易-极快">
                        <p><img src={require('assets/images/2.jpg')} alt=""/></p>
                        <p><button onClick={this.goTo.bind(this, 'SellerCreateFast')}>卖家身份创建-极快</button></p>
                        <p><button onClick={this.goTo.bind(this, 'BuyerCreateFast')}>买家身份创建-极快</button></p>
                    </TypeField>
                    <TypeField title="创建交易-安全">
                        <p><img src={require('assets/images/3.jpg')} alt=""/></p>
                        <p><button onClick={this.goTo.bind(this, 'SellerCreateSafe')}>卖家身份创建-安全</button></p>
                        <p><button onClick={this.goTo.bind(this, 'BuyerCreateSafe')}>买家身份创建-安全</button></p>
                    </TypeField>
                </div>
                <div className="tradingList">
                    <div className="title">我进行中的交易</div>
                    <div className="tableWrap">
                        <div className="tableContainer">
                            <div className="table-us">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>卖家</th>
                                        <th>买家</th>
                                        <th>交易金额</th>
                                        <th>交易说明</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        unfinishedOrderList.length ? unfinishedOrderList.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.sellUserName}</td>
                                                <td>{item.buyUserName}</td>
                                                <td>{item.goodsAmount}</td>
                                                <td>{item.tradeDetail}</td>
                                                <td>{switchUnfinishedOrderStatus(item.status)}</td>
                                                {
                                                    item.status === 6 ?
                                                        item.cancelBy === user.id
                                                        ?
                                                        <td><Button type="primary" disabled={true} >撤销待通过</Button></td>
                                                        :<td><Button type="primary" onClick={this.passRevokeOrder.bind(this, item)} >通过撤销</Button><Button type="danger" style={{marginLeft: '5px'}} onClick={this.refuseRevokeOrder.bind(this, item)} >拒绝撤销</Button></td>
                                                        :
                                                        <td><Button type="primary" onClick={this.continueTrade.bind(this, item)} >继续交易</Button></td>
                                                }
                                            </tr>;
                                        }) : null
                                    }
                                    {
                                        !isNotEmpty(unfinishedOrderList) && <tr style={{textAlign: 'center'}}><td colSpan="6">暂无数据...</td></tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tradingList">
                    <div className="title">历史交易</div>
                    <div className="tableWrap">
                        <div className="tableContainer">
                            <div className="title">
                                我的历史交易
                            </div>
                            <div className="table-us">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>交易类型</th>
                                        <th>交易金额</th>
                                        <th>交易时间</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        myHistoryTrading.list.length ? myHistoryTrading.list.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.type === 1 ? '买家创建求购单' : '卖家创建出售单'}</td>
                                                <td>{item.goodsAmount}</td>
                                                <td>{item.finishDate}</td>
                                            </tr>;
                                        }) : null
                                    }
                                    {
                                        !isNotEmpty(myHistoryTrading.list) && <tr style={{textAlign: 'center'}}><td colSpan="3">暂无数据...</td></tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', margin: 10, visibility: isNotEmpty(myHistoryTrading.list) ? 'visible' : 'hidden' }}>
                        <PageList ref={ (c) => { this.myHistoryTrading = c; }} callback={this.pageListChange.bind(this, 'myHistoryTrading')} current={myHistoryTrading.page || 1} pageSize={myHistoryTrading.pageSize} total={myHistoryTrading.total}/>
                        &nbsp;<Input style={{width: 50}} value={this.state.myHistoryTrading.btnNumber} onChange={(e) => this.setState({myHistoryTrading: Object.assign({}, this.state.myHistoryTrading, {btnNumber: e.target.value})})} size="xs" type="text" />
                        &nbsp;<Button size="xs" onClick={this.toPage.bind(this, 'myHistoryTrading')}>跳转</Button>
                        </div>
                    </div>
                </div>

                <div className="tradingList">
                    <div className="tableWrap">
                        <div className="tableContainer">
                            <div className="title">
                                平台交易
                            </div>
                            <div className="table-us">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>买家</th>
                                        <th>卖家</th>
                                        <th>交易金额</th>
                                        <th>交易时间</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        platformTrading.list.length ? platformTrading.list.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{item.buyUserName}</td>
                                                    <td>{item.sellUserName}</td>
                                                    <td>{item.goodsAmount}</td>
                                                    <td>{item.finishDate}</td>
                                                </tr>;
                                            }) : null
                                    }
                                    {
                                        !isNotEmpty(platformTrading.list) && <tr style={{textAlign: 'center'}}><td colSpan="4">暂无数据...</td></tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', margin: 10, visibility: isNotEmpty(platformTrading.list) ? 'visible' : 'hidden' }}>
                            <PageList ref={ (c) => { this.myHistoryTrading = c; }} callback={this.pageListChange.bind(this, 'myHistoryTrading')} current={platformTrading.page || 1} pageSize={platformTrading.pageSize} total={platformTrading.total}/>
                            &nbsp;<Input style={{width: 50}} value={this.state.platformTrading.btnNumber} onChange={(e) => this.setState({platformTrading: Object.assign({}, this.state.platformTrading, {btnNumber: e.target.value})})} size="xs" type="text" />
                            &nbsp;<Button size="xs" onClick={this.toPage.bind(this, 'platformTrading')}>跳转</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(function(state) {
    return {
        user: state.simpleDeal.user
    };
}, {setTradeInfo})(TradePlatform);