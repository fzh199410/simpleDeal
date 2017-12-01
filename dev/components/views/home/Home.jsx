/**
 * Created by ashima on 2017/4/17.
 * Remark 首页入口
 */
import './home.scss';
import React, { Component } from 'react';
import banner2 from 'assets/images/banner1.jpg';
import Crousel from 'common/crousel/Crousel';
import LoginAndSign from 'views/loginAndSign/index';

const style = {
    position: 'absolute',
    top: '80px',
    right: '18.75%',
    zIndex: '200'
};

export default class Home extends Component  {
    constructor(props) {
        super(props);
        this.state = {};
       
    }

    render() {
        return (
            <div className="home">
                <Crousel />
                <LoginAndSign style={style}/>
                <div className="wrap banner2">
                    <div className="banner2-content">
                        <div className="item">
                            <span className="inco1"></span>
                            <p>彻底解决交易困难</p>
                        </div>
                        <div className="item">
                            <span className="inco2"></span>
                            <p>随时取消交易</p>
                        </div>
                        <div className="item">
                            <span className="inco3"></span>
                            <p>平台操作简单</p>
                        </div>
                        <div className="item">
                            <span className="inco4"></span>
                            <p>快速完成交易</p>
                        </div>
                    </div>
                </div>

                <div className="banner3 banner-content">
                    <h3>极简平台优势</h3>
                    <div className="wrapMin">
                        <div className="items">
                            <img src={banner2} />
                            <h3>一站式服务</h3>
                            <span>通过提交交易进行支付订单</span>
                        </div>

                        <div className="items">
                            <img src={banner2} />
                            <h3>一站式服务</h3>
                            <span>通过提交交易进行支付订单</span>
                        </div>

                        <div className="items">
                            <img src={banner2} />
                            <h3>一站式服务</h3>
                            <span>通过提交交易进行支付订单</span>
                        </div>
                    </div>
                </div>

                <div className="banner4 banner-content">
                    <h3>常见问题</h3>
                    <div className="wrapMin">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            <p><em>1</em>什么事卖家诚意金</p>
                                            <span>答：全球最大保险集团安盛宣布使用以太坊公有区块链为航空旅</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p><em>2</em>什么事卖家诚意金</p>
                                            <span>答：全球最大保险集团安盛宣布使用以太坊公有区块链为航空旅</span>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div>
                                            <p><em>3</em>什么事卖家诚意金</p>
                                            <span>答：全球最大保险集团安盛宣布使用以太坊公有区块链为航空旅</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p><em>4</em>什么事卖家诚意金</p>
                                            <span>答：全球最大保险集团安盛宣布使用以太坊公有区块链为航空旅</span>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div>
                                            <p><em>5</em>什么事卖家诚意金</p>
                                            <span>答：全球最大保险集团安盛宣布使用以太坊公有区块链为航空旅</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p><em>6</em>什么事卖家诚意金</p>
                                            <span>答：全球最大保险集团安盛宣布使用以太坊公有区块链为航空旅</span>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="banner5 banner-content">
                    <h3>累计超过5百万用户</h3>
                    <div className="wrap">
                        <div className="items clearfix">
                            <div className="img"></div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img"></div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img"></div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img"></div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img"></div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img"></div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img"></div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img"></div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img"></div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}