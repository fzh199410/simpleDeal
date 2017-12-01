import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './imageUploader.scss';
import { Progress, Tip } from 'ui/index';

const propTypes = {
  uploadUrl: PropTypes.string.isRequired,
  uploadFileKey: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired
};

export default class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.uploadRef = null;
        this.state = {
            uploadFile: null,
            imageBase64: '',
            uploading: false,
            progress: 0
        }
    }

    openInput() {
        this.uploadRef.click();
    }

    inputChange(e) {
        let files = e.target.files;
        if(!files) {
            return this.setImagePreview('');
        }
        this.setState({
            uploadFile: files[0]
        });
        this.readImage(files[0], (rs) => {
            this.setImagePreview(rs);
        })
    }

    setImagePreview(imageBase64) {
        if(this.resolveImage(imageBase64)) {
            this.setState({
                imageBase64
            });
            this.props.onSelect && this.props.onSelect(imageBase64);
        }
    }

    readImage(filePath, cb) {
        let fileReader = new FileReader();
        fileReader.onload = function () {
            let result = this.result;
            cb(result);
        }
        fileReader.readAsDataURL(filePath);
    }

    resolveImage = (url) => {
        if(!url) {
            this.setState({
                imageBase64: ''
            });
            return false;
        }
        let reg = new RegExp('(data:image/jpeg;base64,)|(data:image/png;base64,)|(data:image/jpg;base64,)|(data:image/bmp;base64,)');
        if(!reg.test(url))
        {
            this.setState({
                imageBase64: '',
                errorInfo: '上传头像格式为jpg、png、jpeg、bmp'
            }, function () {
                return false;
            });
        }else {
            return true;
        }
    }

    reset() {
        this.setImagePreview('');
    }

    // 通过input 的onChange触发
    upLoad(e){
        let _this = this;
        let {uploadFileKey} = this.props;
        // 控制loading窗口的显示，进度重置
        this.setState({
            uploading: true,
            progress: 0
        });
        let url = _this.props.uploadUrl;
        // new FormData 来装我们的post body的内容
        // 外部请求的参数 {file: '', id: '123', timestamp: '20160114'}
        let params = _this.props.params;
        let formData = new FormData();
        let keys = Object.keys(params);
        keys.length && keys.map((key) => {
            if(key === uploadFileKey) {
                formData.append(uploadFileKey, _this.state.uploadFile);
            }else {
                formData.append(key, params[key]);
            }
        });
        // 将请求需要的内容append进formData
        // 新建一个xhr
        let xhr = new XMLHttpRequest();
        xhr.abort(); // 终止上一次请求
        xhr.open('POST', url, true);
        xhr.onload = function () {
            if(xhr.readyState === 4 && xhr.status === 200){
                // 查看后台反馈
                let req = JSON.parse(xhr.responseText);
                // 登出状态重定向
                _this.setState({
                    uploading: false,
                    progress: 0
                });
                // Tip提示上传成功
                Tip.success('上传成功');
            } else if(xhr.readyState === 4 && xhr.status === 404){
                Tip.error('上传失败');
                _this.setState({
                    uploading: false,
                    progress: 0
                });
            }
        };
        xhr.upload.onprogress = function(evt){
            // 侦查附件上传情况
            // 通过事件对象侦查
            // 该匿名函数表达式大概0.05-0.1秒执行一次
        };
        if(xhr.upload){
            xhr.upload.onprogress = (event) => {
                if(event.lengthComputable){
                    let percent = Number((event.loaded / event.total).toFixed(2));
                    _this.setState({
                        // 上传百分比进度，就可以用这个来表示我们上传的进度，让用户有更好的体验
                        progress: percent
                    });
                }
            };
        }
        xhr.send(formData);
    }

    render() {
        let {imageBase64, uploading} = this.state;
        return (
            <div className="T-imageUploader" style={Object.assign({}, {
                border: imageBase64 ? 'none' : "2px solid #0e90d2"
            }, this.props.style)}>
                {
                    imageBase64
                        ?
                        <img src={imageBase64}/>
                        :
                        <span className="T-imageUploader-icon" onClick={this.openInput.bind(this)}></span>
                }
                {
                    imageBase64 ?
                        <div>
                            <button onClick={this.upLoad.bind(this)}>上传</button>
                            <button onClick={this.reset.bind(this)}>重选</button>
                        </div> : null
                }
                {
                    uploading ?
                        <Progress progress={this.state.progress}/> : null
                }
                {this.state.errorInfo ? <p style={{color: 'red'}}>{this.state.errorInfo}</p> : null}
                <input style={{visibility: 'hidden'}} name="file" type="file" id="upload" onChange={this.inputChange.bind(this)} ref={fileIpt => this.uploadRef = fileIpt}/>
            </div>
        )
    }
}

ImageUploader.propTypes = propTypes;