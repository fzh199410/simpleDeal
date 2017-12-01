import React, {Component} from 'react';
import {crousel} from 'utils/util';
import './crousel.scss';

export default class Crousel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount(){
        crousel('#banner', true, true, 'click', true, true);
    }

    render() {
        return (
            <div className="crousel">
                <div className="course-list">
                    <div className="crousel-box banner" id="banner">
                        <ul className="item-box">
                            <li className="sequence-item" id="banner_li1">
                                <a href="javascript:void(null)" target="_blank">
                                    <div className="pic pic1" ></div>
                                </a>
                            </li>
                            <li className="sequence-item" id="banner_li2" >
                                <a href="javascript:void(null)"  target="_blank">
                                    <div className="pic pic2"  ></div>
                                </a>
                            </li>
                        </ul>
                        <div className="pager-box">
                            <div className="prev">
                                <em className="arrow icon-banner_left2"></em>
                            </div>
                            <div className="next">
                                <em className="arrow icon-banner_right2"></em>
                            </div>
                        </div>
                        <ul className="pagination flatline">
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}