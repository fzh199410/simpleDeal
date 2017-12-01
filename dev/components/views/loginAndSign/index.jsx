import React, {Component} from 'react';
import './index.scss';
import Login from './Login';
import Sign from './Sign';

export default class LoginAndSign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'login'
        };
    }

    switch(type) {
        this.setState({
            show: type
        });
    }

    render() {
        let {show} = this.state;
        return (
          <div className="login-sign-frame" style={this.props.style}>
              <ul>
                  <li onClick={this.switch.bind(this, 'login')}>
                      登录
                  </li>
                  <li onClick={this.switch.bind(this, 'sign')}>
                      注册
                  </li>
              </ul>
              {
                  show === 'login'
                    ?
                      <Login />
                    :
                      <Sign />
              }
          </div>
        );
    }
}