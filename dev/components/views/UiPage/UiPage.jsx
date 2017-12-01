import React, { Component } from 'react';
import {AutoComplete, Input, ImageUploader, Progress, Tip} from 'ui/index';
import {autoComplete} from 'service/uipage';

export default class UiPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            progress: 0
        };
    }



    onChangeCb(value) {
        return autoComplete({keyword: value}).then((data) => {
            return data.data.map((item, index) => {
                return {
                    value: item,
                    text: item.xm + '-' + item.sfzh
                }
            })
        })
    }

    onSelectCb(value) {
        let {selected} = this.state;
        selected.push(value);
        this.setState({
            selected
        });
    }

    inputChange(e) {
        this.setState({
            val: e.target.value
        })
    }

    showTip() {
        Tip.error('哈哈哈');
    }


    render() {
        return (
          <div style={{height: '2000px', padding: '2em'}}>
              <Input size={'normal'} type={'password'} onChange={this.inputChange.bind(this)}/>
              <AutoComplete
                  onChangeCb={this.onChangeCb.bind(this)}
                  onSelectCb={this.onSelectCb.bind(this)}
              />
              {
                  this.state.selected.length ?
                      this.state.selected.map((item, index) => {
                        return <p key={index}>姓名:{item.value.xm} 身份证号:{item.value.sfzh}</p>
                      }) : null
              }
              {
                  this.state.val
              }
              <button onClick={this.showTip.bind(this)}>点击</button>
              <ImageUploader uploadUrl={'www.baidu.com'} uploadFileKey={'file'} params={{file: '', id: '123', timestamp: '1020201'}}/>
          </div>
        );
    }
}