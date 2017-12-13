/**
 * Created by ashima on 2017/4/17.
 * Remark 首页入口
 */
import './home.scss';
import React, { Component } from 'react';
import item1 from 'assets/images/1.jpg';
import item2 from 'assets/images/2.jpg';
import item3 from 'assets/images/3.jpg';
import Crousel from 'common/crousel/Crousel';
import LoginAndSign from 'views/loginAndSign/index';
import {Image} from 'ui/index';
import {connect} from 'react-redux';
import helpList from 'const/helpCenter';
import {browserHistory} from 'react-router';

const style = {
    position: 'absolute',
    top: '80px',
    right: '18.75%',
    zIndex: '200'
};

class Home extends Component  {
    constructor(props) {
        super(props);
        this.state = {

        };
       
    }
    goToHelpCenter(index) {
        browserHistory.push({
            pathname: '/helpCenter',
            query: {
                active: index
            },
        });
    }


    render() {
        let {user} = this.props;
        return (
            <div className="home">
                <Crousel />
                <LoginAndSign style={Object.assign({}, style, {display: this.props.user ? 'none' : 'block'})}/>
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
                            <img src={item1} />
                            <h3>一站式服务</h3>
                            <span>通过提交交易进行支付订单</span>
                        </div>

                        <div className="items">
                            <img src={item2} />
                            <h3>一站式服务</h3>
                            <span>通过提交交易进行支付订单</span>
                        </div>

                        <div className="items">
                            <img src={item3} />
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
                                        <div onClick={this.goToHelpCenter.bind(this, 0)}>
                                            <p><em>1</em>{helpList[0].question}</p>
                                            <span>答：{helpList[0].answer}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div onClick={this.goToHelpCenter.bind(this, 1)}>
                                            <p><em>2</em>{helpList[1].question}</p>
                                            <span>答：{helpList[1].answer}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div onClick={this.goToHelpCenter.bind(this, 2)}>
                                            <p><em>3</em>{helpList[2].question}</p>
                                            <span>答：{helpList[2].answer}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div onClick={this.goToHelpCenter.bind(this, 3)}>
                                            <p><em>4</em>{helpList[3].question}</p>
                                            <span>答：{helpList[3].answer}</span>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div onClick={this.goToHelpCenter.bind(this, 4)}>
                                            <p><em>5</em>{helpList[4].question}</p>
                                            <span>答：{helpList[4].answer}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div onClick={this.goToHelpCenter.bind(this, 5)}>
                                            <p><em>6</em>{helpList[5].question}</p>
                                            <span>答：{helpList[5].answer}</span>
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
                            <div className="img">
                                <Image src={'www.fuzhihong.com'}/>
                            </div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img">
                                <Image src={'www.fuzhihong.com'}/>
                            </div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img">
                                <Image src={'www.fuzhihong.com'}/>
                            </div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img">
                                <Image src={'www.fuzhihong.com'}/>
                            </div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img">
                                <Image src={'www.fuzhihong.com'}/>
                            </div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img">
                                <Image src={'www.fuzhihong.com'}/>
                            </div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img">
                                <Image src={'www.fuzhihong.com'}/>
                            </div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img">
                                <Image src={'www.fuzhihong.com'}/>
                            </div>
                            <div className="msg">
                                <p>卖家****73435</p>
                                <span>金币1000币</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="img">
                                <Image src={'www.fuzhihong.com'}/>
                            </div>
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

export default connect(function(state) {
    return {
        user: state.simpleDeal.user
    };
}, {})(Home);
