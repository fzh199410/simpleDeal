import React from 'react';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import './tradePlatformCommon.scss';

class TradePlatformContainer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            {this.props.children}
        </div>;
    }

}

export default TradePlatformContainer;
