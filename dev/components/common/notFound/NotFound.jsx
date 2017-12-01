import './notFound.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import NotFoundImg from 'assets/images/404.png';

export default class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <img src={NotFoundImg}/>
                <div className="error-info">
                    <h3>当前访问的页面出现错误</h3>
                    <div className="list-box">
                        <span>你可以：</span>
                        <ul>
                            <li>检查网络连接</li>
                            <li>检查访问地址是否正确</li>
                            <li>返回网站首页</li>
                        </ul>
                    </div>
                    <Link to="/"><button type="button">返回首页</button></Link>
                </div>
            </div>
        );
    }
}
