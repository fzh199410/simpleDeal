/**
 * Created by zuilafeng on 2017/7/21.
 */
import {AJAX, HttpMethod} from 'utils/ajax';
import { COMMON } from 'enviroment/config';
import { convertQueryString } from 'utils/util';

class KeyManAnalysisService {

    constructor () {
        var enums = {
            createFocusPeople: {
                jbxx: {
                    title: '基础信息',
                    supports: [
                        {
                            label: '姓名',
                            type: 'input',
                            name: 'xm'
                        },
                        {
                            label: '性别',
                            type: 'radio',
                            name: 'xb',
                            values: ['男', '女']
                        },
                        {
                            label: '别名/绰号',
                            type: 'input',
                            name: 'bm'
                        },
                        {
                            label: '身份证号',
                            type: 'input',
                            name: 'sfzh'
                        },
                        {
                            label: '民族',
                            type: 'select',
                            name: 'mz',
                            options: 'mz'
                        },
                        {
                            label: '明显体貌特征',
                            type: 'input',
                            name: 'tmtz'
                        },
                        {
                            label: '车型车牌号',
                            name: 'cxcph',
                            add: true
                        },
                        {
                            label: '护照',
                            type: 'input',
                            name: 'hz'
                        },
                        {
                            label: '港澳通行证',
                            type: 'input',
                            name: 'gatxz'
                        },
                        {
                            label: '户籍所在地',
                            name: 'hjszd',
                            type: 'level',
                            levels: 3
                        },
                        {
                            label: '实际居住地',
                            name: 'sjjzd',
                            type: 'level',
                            levels: 4
                        },
                        {
                            label: '',
                            name: 'sjjzddetail',
                        },
                        {
                            label: '服务处所',
                            name: 'fwcsmc',
                            type: 'input'
                        },
                        {
                            label: '职位',
                            name: 'zwzw',
                            type: 'input'
                        }
                    ]
                },
                txgj: {
                    title: '通讯工具',
                    supports: [
                        {
                            label: '手机',
                            name: 'sj',
                            add: true

                        },
                        {
                            label: '微信号',
                            name: 'wxh',
                            add: true
                        },
                        {
                            label: 'QQ号',
                            name: 'qqh',
                            add: true
                        },
                        {
                            label: '其他虚拟身份',
                            name: 'qtxnsf',
                            add: true
                        }
                    ]
                },
                gzxx: {
                    title: '关注信息',
                    supports: [
                        {
                            label: '何种原因被关注',
                            name: 'lkyy'
                        },
                        {
                            label: '所属类别',
                            name: 'lkjb',
                            sslb: true
                        },
                        {
                            label: '摸排单位',
                            name: 'lkzrdw',
                            type: 'autoComplete',
                            method: 'getLkzrdwList',
                            child: {
                                method: 'getLkzrrList',
                                field: 'lkzrrsfzh'
                            }
                        },
                        {
                            label: '摸排责任民警',
                            name: 'lkzrrsfzh',
                            type: 'autoComplete',
                            method: 'getLkzrrList',
                            map: {key: 'sid', text: 'fullName'}
                        },
                        {
                            label: '联系电话',
                            name: 'zrrsj'
                        }
                    ]
                }
            },
            createKeyPeople: {
                jbxx: {
                    title: '基础信息',
                    supports: [
                        {
                            label: '身份证号',
                            type: 'input',
                            name: 'sfzh'
                        },
                        {
                            label: '姓名',
                            type: 'input',
                            name: 'xm'
                        },
                        {
                            label: '别名/绰号',
                            type: 'input',
                            name: 'bm'
                        },
                        {
                            label: '性别',
                            type: 'radio',
                            name: 'xb',
                            values: ['男', '女']
                        },
                        {
                            label: '民族',
                            type: 'select',
                            name: 'mz',
                            options: 'mz'
                        },
                        {
                            label: '文化程度',
                            type: 'select',
                            name: 'whcd',
                            options: ['小学', '初中', '高中', '大学']
                        },
                        {
                            label: '身份',
                            type: 'input',
                            name: 'sfzy'
                        },
                        {
                            label: '身高（cm）',
                            type: 'input',
                            name: 'sg'
                        },
                        {
                            label: '明显体貌特征',
                            type: 'input',
                            name: 'tmtz'
                        },
                        {
                            label: '车型车牌号',
                            name: 'cxcph',
                            add: true
                        },
                        {
                            label: '护照',
                            type: 'input',
                            name: 'hz'
                        },
                        {
                            label: '港澳通行证',
                            type: 'input',
                            name: 'gatxz'
                        },
                        {
                            label: '驾照',
                            name: 'jz',
                            type: 'input'
                        },
                        {
                            label: '户籍所在地',
                            name: 'hjszd',
                            type: 'level',
                            levels: 3
                        },
                        {
                            label: '实际居住地',
                            name: 'sjjzd',
                            type: 'level',
                            levels: 4
                        },
                        {
                            label: '',
                            name: 'sjjzddetail',
                        }
                    ]
                },
                jtcy_list: {
                    title: '主要家庭关系',
                    supports: [
                        {
                            label: '身份证号',
                            type: 'input',
                            name: 'sfzh'
                        },
                        {
                            label: '姓名',
                            type: 'input',
                            name: 'xm'
                        },
                        {
                            label: '民族',
                            type: 'select',
                            name: 'mz',
                            options: 'mz'
                        },
                        {
                            label: '性别',
                            type: 'radio',
                            name: 'xb',
                            values: ['男', '女']
                        },
                        {
                            label: '关系',
                            type: 'input',
                            name: 'gx'
                        },
                        {
                            label: '工作单位',
                            type: 'input',
                            name: 'gzdw'
                        },
                        {
                            label: '职务',
                            type: 'input',
                            name: 'zw'
                        },
                        {
                            label: '联系电话',
                            type: 'input',
                            name: 'lxdh'
                        }
                    ]
                },
                gzqk_list: {
                    title: '服务信息',
                    supports: [
                        {
                            label: '服务处所名称',
                            name: 'fwcsmc'
                        },
                        {
                            label: '职务/职位',
                            name: 'zwzw'
                        },
                        {
                            label: '开始时间',
                            name: 'kssj'
                        },
                        {
                            label: '结束时间',
                            name: 'jssj'
                        },
                        {
                            label: '所属派出所',
                            name: 'sspcs'
                        }
                    ]
                },
                gxxx: {
                    title: '个性信息',
                    supports: [
                        {
                            label: '个性特点',
                            name: 'gxtd'
                        },
                        {
                            label: '爱好',
                            name: 'ah'
                        },
                        {
                            label: '专长',
                            name: 'zc'
                        }
                    ]
                },
                txgj: {
                    title: '通讯工具',
                    supports: [
                        {
                            label: '手机',
                            name: 'sj',
                            add: true

                        },
                        {
                            label: '微信号',
                            name: 'wxh',
                            add: true
                        },
                        {
                            label: 'QQ号',
                            name: 'qqh',
                            add: true
                        },
                        {
                            label: '其他虚拟身份',
                            name: 'qtxnsf',
                            add: true
                        }
                    ]
                },
                qtxx: {
                    title: '其他信息',
                    supports: [
                        {
                            label: '经济来源',
                            name: 'jjly'
                        },
                        {
                            label: '经济状况',
                            name: 'jjzk'
                        },
                        {
                            label: '参与或组织非法团体或组织',
                            name: 'cyzz',
                            size: 'large'
                        },
                        {
                            label: '宣扬狭隘民族主义倾向性思想',
                            name: 'xysx',
                            size: 'large'
                        },
                        {
                            label: '宣扬狭隘民族主义倾向性言论',
                            name: 'xyyl',
                            size: 'large'
                        }
                    ]
                },
                grjl_list: {
                    title: '个人简历',
                    supports: [
                        {
                            label: '时间',
                            name: 'grjlsj'
                        },
                        {
                            label: '个人简历',
                            name: 'grjlnr',
                            size: 'large',
                            rows: 4
                        }
                    ]
                },
                wffzxx: {
                    title: '违法犯罪信息',
                    supports: [
                        {
                            label: '是否有犯罪记录',
                            type: 'radio',
                            name: 'delinquencyRecord',
                            hideOther: '0',
                            notInList: true,
                            values: [
                                {
                                    text: '是',
                                    value: '1'
                                },
                                {
                                    text: '否',
                                    value: '0'
                                }
                            ]
                        },
                        {
                            label: '时间',
                            name: 'sj',
                            showModel: {
                                key: 'delinquencyRecord',
                                value: '1'
                            }
                        },
                        {
                            label: '简要情况',
                            name: 'jyqk',
                            showModel: {
                                key: 'delinquencyRecord',
                                value: '1'
                            }
                        },
                        {
                            label: '地点',
                            name: 'dd',
                            showModel: {
                                key: 'delinquencyRecord',
                                value: '1'
                            }
                        },
                        {
                            label: '证据情况',
                            name: 'zjqk',
                            showModel: {
                                key: 'delinquencyRecord',
                                value: '1'
                            }
                        },
                        {
                            label: '录入单位',
                            name: 'zjlrdw',
                            showModel: {
                                key: 'delinquencyRecord',
                                value: '1'
                            }
                        },
                        {
                            label: '录入时间',
                            name: 'zjlrsj',
                            showModel: {
                                key: 'delinquencyRecord',
                                value: '1'
                            }
                        }
                    ]
                },
                djcljl: {
                    title: '打击处理记录',
                    supports: [
                        {
                            label: '是否有处理记录',
                            type: 'radio',
                            name: 'processRecord',
                            hideOther: '0',
                            notInList: true,
                            values: [
                                {
                                    text: '是',
                                    value: '1'
                                },
                                {
                                    text: '否',
                                    value: '0'
                                }
                            ]
                        },
                        {
                            label: '时间',
                            name: 'sj',
                            showModel: {
                                key: 'processRecord',
                                value: '1'
                            }
                        },
                        {
                            label: '简要情况',
                            name: 'jyqk',
                            showModel: {
                                key: 'processRecord',
                                value: '1'
                            }
                        },
                        {
                            label: '地点',
                            name: 'dd',
                            showModel: {
                                key: 'processRecord',
                                value: '1'
                            }
                        },
                        {
                            label: '证据情况',
                            name: 'zjqk',
                            showModel: {
                                key: 'processRecord',
                                value: '1'
                            }
                        },
                        {
                            label: '录入单位',
                            name: 'zjlrdw',
                            showModel: {
                                key: 'processRecord',
                                value: '1'
                            }
                        },
                        {
                            label: '录入时间',
                            name: 'zjlrsj',
                            showModel: {
                                key: 'processRecord',
                                value: '1'
                            }
                        }
                    ]
                },
                lkxx: {
                    title: '列控信息',
                    supports: [
                        {
                            label: '列控原因',
                            name: 'lkyy'
                        },
                        {
                            label: '列控级别',
                            name: 'lkjb',
                            type: 'select',
                            options: [
                                {
                                    text: 'A1',
                                    value: 'A1'
                                },
                                {
                                    text: 'A2',
                                    value: 'A2'
                                },
                                {
                                    text: 'A3',
                                    value: 'A3'
                                },
                                {
                                    text: 'A4',
                                    value: 'A4'
                                }
                            ]
                        }
                    ]
                },
                gkjb: {
                    title: '管控级别及责任单位、责任人',
                    supports: [
                        {
                            label: '管控级别是否有升降或撤控',
                            name: 'sfsjhck',
                            type: 'radio',
                            values: [
                                {
                                    text: '升级',
                                    value: '1'
                                },
                                {
                                    text: '降级',
                                    value: '-1'
                                },
                                {
                                    text: '否',
                                    value: '0'
                                }
                            ]
                        },
                        {
                            label: '目前列控级别',
                            name: 'yqjb',
                            type: 'select',
                            options: [
                                {
                                    text: 'A1',
                                    value: 'A1'
                                },
                                {
                                    text: 'A2',
                                    value: 'A2'
                                },
                                {
                                    text: 'A3',
                                    value: 'A3'
                                },
                                {
                                    text: 'A4',
                                    value: 'A4'
                                }
                            ]
                        },
                        {
                            label: '升降级原因/撤控原因',
                            name: 'sjyy',
                            size: 'large'
                        },
                        {
                            label: '列控时间',
                            size: 'level',
                            name: 'lkrq'
                        },
                        {
                            label: '管控责任单位',
                            name: 'lkzrdw',
                            type: 'autoComplete',
                            method: 'getLkzrdwList',
                            child: {
                                method: 'getLkzrrList',
                                field: 'lkzrrsfzh'
                            }
                        },
                        {
                            label: '管控责任民警',
                            name: 'lkzrrsfzh',
                            type: 'autoComplete',
                            method: 'getLkzrrList',
                            map: {key: 'sid', text: 'fullName'}
                        },
                        {
                            label: '联系电话',
                            name: 'zrrsj'
                        }
                    ]
                }
            },
            tabs: [
                {title: '基本信息', key: 'jbxx'},
                {title: '详细信息', key: 'xxxx'},
                {title: '列控信息', key: 'lkxx'},
                {title: '谈话信息', key: 'thjl'},
                {title: '家庭成员', key: 'jtcy'},
                {title: '工作情况', key: 'gzqk'},
                {title: '金融账户信息', key: 'jrzh'},
                {title: '实物资产信息', key: 'swzc'},
                {title: '无形资产信息', key: 'wxzc'},
                {title: '交通工具', key: 'jtgj'},
                {title: '社交关系', key: 'sjgx'},
                {title: '虚拟身份', key: 'xnsf'},
                {title: '前科信息', key: 'qkxx'},
                {title: '出入境记录', key: 'crjjl'},
                {title: '上报信息', key: 'sbxx'},
                {title: '其他信息', key: 'qtxx'},
                {title: '个人简历', key: 'grjl'},
                {title: '扶贫办', key: 'fp'},
                {title: '住建', key: 'zj'}
            ],
            jbxx: [
                {
                    name: 'xb',
                    label: '性别'
                },
                {
                    name: 'whcd',
                    label: '文化程度'
                },
                {
                    name: 'sj',
                    label: '手机',
                    simple: true,
                    filter: (value) => {
                        var reg = new RegExp(', ','g');
                        return value.replace(reg,',  ');
                    }
                },
                {
                    name: 'sfhcw',
                    label: '是否会藏文'
                },
                {
                    name: 'zjxy',
                    label: '宗教信仰及教派'
                },
                // {
                //     name: 'sf',
                //     label: '省份'
                // },
                // {
                //     name: 'sz',
                //     label: '市/州'
                // },
                // {
                //     name: 'qx',
                //     label: '区/县'
                // },
                // {
                //     name: 'xzpcs',
                //     label: '乡镇/派出所'
                // },
                // {
                //     name: 'cz',
                //     label: '村/寨'
                // },
                {
                    name: 'cxcph',
                    label: '车型车牌号'
                },
                {
                    name: 'jz',
                    label: '驾照'
                }
            ],
            xxxx: [
                {
                    name: 'hz',
                    label: '护照'
                },
                {
                    name: 'gatxz',
                    label: '港澳通行证'
                },
                {
                    name: 'cym',
                    label: '曾用名'
                },
                {
                    name: 'bm',
                    label: '别名'
                },
                {
                    name: 'wwxm',
                    label: '外文姓名'
                },
                {
                    name: 'gj',
                    label: '国籍'
                },
                {
                    name: 'sfzy',
                    label: '身份（职业）'
                },
                {
                    name: 'sg',
                    label: '身高（CM）'
                },
                {
                    name: 'sjjzd',
                    label: '实际居住地'
                },
                {
                    name: 'sspcs',
                    label: '所属派出所'
                },
                {
                    name: 'jnczd',
                    label: '境内常住地'
                },
                {
                    name: 'jwzs',
                    label: '境外住所'
                },
                {
                    name: 'bysj',
                    label: '毕业时间'
                },
                {
                    name: 'byyx',
                    label: '毕业院校/专业'
                },
                // {
                //     name: 'xxjf',
                //     label: '信息积分'
                // },
                // {
                //     name: 'gzjf',
                //     label: '工作积分'
                // },
                {
                    name: 'sfjza',
                    label: '是否建专案'
                },
                // {
                //     name: 'sfwjll',
                //     label: '是否物建力量'
                // },
                {
                    name: 'jszzqk',
                    label: '接收资助情况'
                },
                {
                    name: 'tmtz',
                    label: '体貌特征'
                }
            ],
            lkxx: [
                {'name': 'lkyy', 'label': '列控原因', simple: true},
                {'name': 'lkzrr', 'label': '列控责任人'},
                {'name': 'lkrq', 'label': '列控日期'},
                {'name': 'lkjb', 'label': '列控级别', filter: (v) => {
                    if(!v)
                    {
                        return '-';
                    }

                    let result = '';

                    try {
                        let arr = v.split(/, ?/);
                        if(arr.length === 1)
                        {
                            return v;
                        }
                        result = arr[0] + '种';
                        let value = arr[1];
                        if(value >= 1 && value <= 10)
                        {
                            result = result + '危安犯罪类';
                        }else if(value >= 11 && value <= 18)
                        {
                            result = result + '高危类';
                        }else if(value >= 19 && value <= 22)
                        {
                            result = result + '矛盾纠纷类';
                        }else if(value == 23){
                            result = result + '其他类';
                        }else{
                            result = result + '-类';
                        }
                        result = result + arr[2];
                        return result;
                    }catch (e) {
                        return '-';
                    }

                }},
                {'name': 'lkzrdw', 'label': '列控责任单位'},
                {'name': 'zrrsj', 'label': '责任人手机'},
                {'name': 'sfsjhck', 'label': '管控级别是否有升降或撤控',filter: (value) => {
                    if(value == 0)
                    {
                        return '否';
                    }else if(value == 1)
                    {
                        return '升级';
                    }else if(value == -1)
                    {
                        return '降级';
                    }else{
                        return '-';
                    }
                }},
                {'name': 'yqjb', 'label': '目前列控级别（以前）'},
                {'name': 'sjyy', 'label': '升降级原因/撤控原因'}
            ],
            thjl: [
                {'name': 'talkObj', 'label': '谈话对象'},
                {'name': 'talkTime', 'label': '谈话时间'},
                {'name': 'talkAddress', 'label': '谈话地点'},
                {'name': 'talkType', 'label': '谈话人类型', filter: (value) => {
                    if(value == 1)
                    {
                        return '重点对象';
                    }else if(value == 2)
                    {
                        return '关注对象';
                    }else{
                        return '-';
                    }
                }},
                {'name': 'targetObjIdCard', 'label': '身份证号码'},
                {'name': 'talkContent', 'label': '主要谈话内容', simple: true},
                {'name': 'objAboutThought', 'label': '思想认识是否有异常', yesOrNo: true},
                {'name': 'objAboutWork', 'label': '工作情况是否有异常', yesOrNo: true},
                {'name': 'objAboutFamily', 'label': '家庭状况是否有异常', yesOrNo: true},
                {'name': 'objAboutActivity', 'label': '是否参加危害性活动', yesOrNo: true},
                {'name': 'objAboutPhone', 'label': '联系方式'},
                {'name': 'objAboutTraffic', 'label': '交通工具'},
                {'name': 'objAboutHarmonious', 'label': '是否认同藏区和谐稳定的意义', yesOrNo: true},
                {'name': 'objAboutLaw', 'label': '是否知晓相关法律法规', yesOrNo: true},
                {'name': 'otherTalkContent', 'label': '其它谈话内容', simple: true,},
                {'name': 'objAboutIncome', 'label': '家庭收入是否异常', yesOrNo: true},
                {'name': 'objAboutContradiction', 'label': '家庭内容是否有较大矛盾', yesOrNo: true},
                {'name': 'objAboutChild', 'label': '孩子是否辍学的相关情况', yesOrNo: true},
                {'name': 'objAboutIllness', 'label': '是否有重大疾病', yesOrNo: true},
                {'name': 'objAboutDebt', 'label': '是否有债务', yesOrNo: true},
                {'name': 'objAttidudeResp', 'label': '谈话后态度反应'},
                {'name': 'createTime', 'label': '记录入库时间'}
            ],
            jtcy: [
                {'name': 'xm', 'label': '姓名'},
                {'name': 'mz', 'label': '民族'},
                {'name': 'xb', 'label': '性别'},
                {'name': 'gzdw', 'label': '工作单位'},
                {'name': 'gx', 'label': '关系'},
                {'name': 'zw', 'label': '职务'},
                {'name': 'sfzh', 'label': '身份证号'},
                {'name': 'lxdh', 'label': '联系电话'}
            ],
            gzqk: [
                {'name': 'fwcsmc', 'label': '服务处所名称'},
                {'name': 'zwzw', 'label': '职务/职位'},
                {'name': 'kssj', 'label': '开始时间'},
                {'name': 'jssj', 'label': '结束时间'},
                {'name': 'sspcs', 'label': '所属派出所'}
            ],
            jrzh: [
                {'name': 'zhlb', 'label': '账户类别'},
                {'name': 'khyh', 'label': '开户银行/机构'},
                {'name': 'zhkh', 'label': '账号/卡号'},
                {'name': 'lrdw', 'label': '录入单位'},
                {'name': 'lrsj', 'label': '录入时间'}
            ],
            swzc: [
                {'name': 'zclb', 'label': '资产类别'},
                {'name': 'mcdz', 'label': '名称地址'},
                {'name': 'lrdw', 'label': '录入单位'},
                {'name': 'lrsj', 'label': '录入时间'}
            ],
            wxzc: [
                {'name': 'zcmc', 'label': '资产名称'},
                {'name': 'zsbh', 'label': '证书编号'},
                {'name': 'jyms', 'label': '简要描述'},
                {'name': 'lrdw', 'label': '录入单位'},
                {'name': 'lrsj', 'label': '录入时间'}
            ],
            jtgj: [
                {'name': 'lb', 'label': '类别'},
                {'name': 'pzsj', 'label': '拍照号码'},
                {'name': 'cxcph', 'label': '车型车牌号'},
                {'name': 'zwsdw', 'label': '座位数/吨位'},
                {'name': 'lrdw', 'label': '录入单位'},
                {'name': 'lrsj', 'label': '录入时间'}
            ],
            sjgx: [
                {'name': 'xm', 'label': '姓名'},
                {'name': 'xb', 'label': '性别'},
                {'name': 'sfzh', 'label': '身份证号'},
                {'name': 'lxdh', 'label': '联系电话'},
                {'name': 'sfjwrs', 'label': '是否境外人士'},
                {'name': 'zzmc', 'label': '组织名称'},
                {'name': 'sfzw', 'label': '身份职务'}
            ],
            xnsf: [
                {'name': 'wxh', 'label': '微信号'},
                {'name': 'wbh', 'label': '微博号'},
                {'name': 'qqh', 'label': 'QQ号'},
                {'name': 'qtxnsf', 'label': '其他虚拟身份'}
            ],
            qkxx: [
                {'name': 'qklb', 'label': '前科类别', filter: (value) => {
                    if(value == 0)
                    {
                        return '违法犯罪';
                    }else if(value == 1)
                    {
                        return '打击处理';
                    } else {
                        return '-';
                    }
                }},
                {'name': 'sj', 'label': '时间'},
                {'name': 'dd', 'label': '地点'},
                {'name': 'jyqk', 'label': '简要情况'},
                {'name': 'zjqk', 'label': '证据情况'},
                {'name': 'zjlrdw', 'label': '证据录入单位'},
                {'name': 'zjlrsj', 'label': '证据录入时间'},
                {'name': 'cfcfqkjyy', 'label': '处罚处分情况及原因'},
                {'name': 'cfcflrdw', 'label': '处罚处分录入单位'},
                {'name': 'cfcflrsj', 'label': '处罚处分录入时间'}
            ],
            crjjl: [
                {'name': 'cjsj', 'label': '出境时间'},
                {'name': 'rjsj', 'label': '入境时间'},
                {'name': 'sfhf', 'label': '是否合法'},
                {'name': 'dddz', 'label': '达到地址'},
                {'name': 'sy', 'label': '事由'},
                {'name': 'txry', 'label': '通讯人员'},
                {'name': 'cfcs', 'label': '处罚措施'}
            ],
            sbxx: [
                {'name': 'sj', 'label': '时间'},
                {'name': 'dd', 'label': '地点'},
                {'name': 'sfjdbr', 'label': '是否见到本人'},
                {'name': 'sflkgxqy', 'label': '是否离开管辖区域'},
                {'name': 'sfbrjt', 'label': '手机通话是否本人接听', simple: true},
                {'name': 'jtms', 'label': '具体描述', simple: true},
                {'name': 'source', 'label': '情报来源', simple: true}
            ],
            qtxx: [
                {'name': 'gxtd', 'label': '个性特点'},
                {'name': 'ah', 'label': '爱好'},
                {'name': 'zc', 'label': '专长'},
                {'name': 'jjly', 'label': '经济来源'},
                {'name': 'jjzk', 'label': '经济状况'},
                {'name': 'cyzz', 'label': '参与或组织非法团体或组织'},
                {'name': 'xysx', 'label': '宣扬狭隘民族注意倾向性思想'},
                {'name': 'xyyl', 'label': '宣扬狭隘民族注意倾向性言论'}
            ],
            grjl: [
                {'name': 'grjlsj', 'label': '时间'},
                {'name': 'grjlnr', 'label': '个人简历'}
            ],
            fp: [
                {'name': 'rs', 'label': '家庭人数'},
                {'name': 'jkzk', 'label': '健康状况'},
                {'name': 'ldnlym', 'label': '劳动能力'},
                {'name': 'sfcjxnhym', 'label': '是否参加新农合'},
                {'name': 'sfcjxxylbxym', 'label': '是否参加新型养老保险'},
                {'name': 'tpsx', 'label': '脱贫属性'},
                {'name': 'pkhsx', 'label': '贫困户属性'},
                {'name': 'zyzpyy', 'label': '主要致贫原因'},
                {'name': 'rjcsr', 'label': '人均纯收入'},
                {'name': 'lxdh', 'label': '联系电话'},
                {'name': 'khyhmc', 'label': '开户银行名称'},
                {'name': 'yhkh', 'label': '银行卡号'}
            ],
            zj: [
                {'name': 'cqr', 'label': '产权人'},
                {'name': 'sfzh', 'label': '身份证号'},
                {'name': 'fwzl', 'label': '房屋坐落'},
                {'name': 'yt', 'label': '用途'},
                {'name': 'mj', 'label': '面积'},
                {'name': 'cqzt', 'label': '产权状态'},
                {'name': 'djsj', 'label': '登记时间'}
            ],
            talkStatus: [
                {
                    'name': '0',
                    'label': '未谈话'
                },
                {
                    'name': '1',
                    'label': '按时谈话'
                },
                {
                    'name': '2',
                    'label': '超时谈话'
                }
            ]
        };

        this.getEnum = (key) => {
            return enums[key];
        };
    }

    // 预警筛选
    warningFilter = (params) => {
        return axios.get(`${COMMON}/warning/query` + convertQueryString(params)).then(data => ({data}));
    }

    // 对象标签
    getKeyPeopleTags = (params) => {
        return axios.get(`${COMMON}/bq/findByType` + convertQueryString(params)).then(data => ({data}));
    }

    // 获取民族list
    getMinZuList = (params) => {
        return axios.get(`${COMMON}/mz/queryAll` + convertQueryString(params)).then(data => ({data}));
    }

    // 校验身份证号
    checkSfzh = (params) => {
        return axios.get(`${COMMON}/archives/checkConflict` + convertQueryString(params)).then(data => ({data}));
    }

    // 获取地区
    getLocation = (level, query) => {
        return axios.get(`${COMMON}/location` + convertQueryString({
            level: level,
            query: query
        })).then(data => ({data}));
    }

    // 获取对应重点人的上报信息
    getUploadInfo = (params) => {
        return axios.get(`${COMMON}/getab` + convertQueryString(params)).then(data => ({data}));
    }

    // 获取对应重点人的扶贫信息
    getHelpPoor = (params) => {
        return axios.get(`${COMMON}/task/fpsj` + convertQueryString(params)).then(data => ({data}));
    }

    // 获取对应重点人的住建信息
    getHousingInfo = (params) => {
        return axios.get(`${COMMON}/task/fgsj` + convertQueryString(params)).then(data => ({data}));
    }

    // 获取对应重点人的谈话信息
    getTalkInfo = (params) => {
        return axios.get(`${COMMON}/talk/record/query` + convertQueryString(params)).then(data => ({data}));
    }

    // 获取重点人列表
    getKeyPeopleList = (params) => {
        return axios.get(`${COMMON}/query/keylist` + convertQueryString(params)).then(data => ({data}));
    }

    // 获取关注人列表
    getFocusPeopleList = (params) => {
        return axios.post(`${COMMON}/selConcerned`, params).then(data => ({data}));
    }

    // 新增重点人对象
    addKeyPeople = (params) => {
        return axios.post(`${COMMON}/keyusers`, params).then(data => ({data}));
    }

    // 新增关注对象
    addFocusPeople = (params) => {
        return axios.post(`${COMMON}/concern`, params).then(data => ({data}));
    }

    // 获取重点人个人档案
    getPersonProfile = (params) => {
        return axios.get(`${COMMON}/archives/querybig` + convertQueryString(params)).then(data => ({data}));
    }

    // 获取重点人图表信息
    getChartsInfo = (params) => {
        return axios.get(`${COMMON}/query/keycharts` + convertQueryString(params)).then(data => ({data}));
    }

    // 获取关注人图表信息
    getFocusChartsInfo = (params) => {
        return axios.get(`${COMMON}/query/concerncharts` + convertQueryString(params)).then(data => ({data}));
    }

    // 获取列控责任单位
    getLkzrdwList = (word) => {
        return axios.get(`${COMMON}/auth/department/queryAutoCompleteName?keyword=${word}`).then(data => ({data}));
    }

    // 获取列控责任单位
    getLkzrrList = (params) => {
        return axios.get(`${COMMON}/auth/user/associate` + (convertQueryString(params) || '')).then(data => ({data}));
    }

    //添加谈话信息
    addTalk = (params) => {
        return axios.post(`${COMMON}/talk/record/add`, params).then(data => ({data}));
    }
}

export default new KeyManAnalysisService();
