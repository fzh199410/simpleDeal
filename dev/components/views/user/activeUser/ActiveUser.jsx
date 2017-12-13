import React from 'react';
import User from 'service/user';
import {Tip} from 'ui/index';
import {LoadingBox} from 'mtui/index';
import {browserHistory} from 'react-router';
import './activeUser.scss';

class ActiveUser extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {email, emailValidateCode} = this.props.location.query;
        User.active({
            email,
            emailValidateCode
        }).then((data) => {
            if(data.code === 200) {
                Tip.success('激活成功,请登录 ^_^');
            }else {
                Tip.success('激活失败 >_<');
            }
            setTimeout(() => {
                browserHistory.push('/main');
            }, 1000)
        })
    }

    render() {
        return <div className="active-user">
            <LoadingBox info="拼命加载中" type="loading2"/>
        </div>;
    }

}

export default ActiveUser;
