import React, {Component} from 'react';
import helpList from 'const/helpCenter';
import Crousel from 'common/crousel/Crousel';
import './helpCenter.scss';

export default class HelpCenter extends Component {
    constructor(props) {
        super(props);
        this.helpList = helpList;
        this.state = {
            selectedIndex: 0
        };
    }

    componentDidMount() {
        this.setState({
            selectedIndex: +this.props.location.query.active || 0
        });
    }

    selectQuestion(index) {
        this.setState({
            selectedIndex: index
        });
    }

    render() {
        let {selectedIndex} = this.state;
        return (
            <div className="help-center">
                <Crousel />
                <div className="help-center-box">
                    <div className="columns one-of-four leftPart">
                        <p className="title">帮助中心</p>
                        <ul>
                            {
                                this.helpList.map((item, index) => {
                                    return <li className={index === selectedIndex ? 'active' : ''} onClick={this.selectQuestion.bind(this, index)} key={index}>
                                        {item.question}
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="columns three-of-four rightPart">
                        <p className="title">
                            {
                                this.helpList[selectedIndex].question
                            }
                        </p>
                        <p className="answer">
                            {
                                this.helpList[selectedIndex].answer
                            }
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}