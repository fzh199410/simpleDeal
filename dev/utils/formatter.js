
// 判断字段是否异常，‘--’
export function fieldAnomaly(value) {
    if(value === '' || value === undefined || value === null || value === '-'){
        return '--';
    }
    return value;
}
export function toThousands(value) {
    if(Math.abs(value) < 1000){
        return value;
    }
    let num = (value || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}
export function isEmptyObject(data) {  
    for (let item in data) { 
        if(data.hasOwnProperty(item)){
            return !1;
        }
    }
    return !0;
}  
export function setScrollTop(scroll_top) {  
    document.documentElement.scrollTop = scroll_top;  
    window.pageYOffset = scroll_top;  
    document.body.scrollTop = scroll_top;  
}  

export function sortArrJson(property, isAsc){
     return function(obj1, obj2){
         var value1 = obj1[property];
         var value2 = obj2[property];
         let  data = value2 - value1;
         if(isAsc){
            data = value1 - value2;     // 降序
        }
        return data;
     };
}
export function extendJson(source, target) {
    let newDate = [];
    for (var obj in source) {
        if(source.hasOwnProperty(obj)){
            if(target[obj]){
                newDate.push(target[obj]);
            }else{
                 newDate.push({
                    date: obj,
                    industry: '',
                    name: '',
                    value: 0,
                    value2: 0
                });
            }
        }
    }
    return newDate;
}
export function windowOpenByUrl(url){
     let openWindowUrl = window.open();
     openWindowUrl.location = url;
}

export function radarTip(industry) {
    let radarTipArr = {
        xxjr: {
            // '静态关联方风险': '通过在特定时点解析目标企业股权结构合理性、核心控制人业务专注度、关联方关系地区分布，关联网络结构特征等方面，识别企业的反经济行为特征度。',
            // '动态关联方风险': '通过在不同时点关联方图谱发展快慢、核心企业群关联度、关联企业行业/地域扩散特征、关联方增长构成等方面，描述企业行为变化的稳定性和趋势性。',
            // '综合实力风险': '通过企业股东类型、资本实力、人员结构与规模、知识产权拥有量、运营稳定性、公司所在地域经济运行整体情况等方面对企业基本面进行风险刻画。',
            // '经营行为风险': '通过公司运营情况的指标，主要包括工商变更频率、招中标数量、资产抵质押程度、域名备案情况等方面对企业经营进行风险度量。',
            // '企业诚信风险': '通过目标公司及其核心关联公司所涉及的司法诉讼、行政处罚、失信被执行、被举报次数、负面舆情分析、信息披露程度等方面，全息衡量企业整体信誉风险。'

            '静态关联方风险': '通过在特定时点解析目标企业股权结构合理性、核心控制人业务专注度、关联方关系地区分布，关联网络结构特征等方面，识别企业的反经济行为特征度。',
            '动态关联方风险': '通过在不同时点关联方图谱发展快慢、核心企业群关联度、关联企业行业/地域扩散特征、关联方增长构成等方面，描述企业行为变化的稳定性和趋势性。',
            '综合实力风险': '通过企业股东类型、资本实力、人员结构与规模、知识产权拥有量、运营稳定性、公司所在地域经济运行整体情况等方面对企业基本面进行风险刻画。',
            '经营行为风险': '通过公司运营情况的指标，主要包括工商变更频率、招中标数量、资产抵质押程度、域名备案情况等方面对企业经营进行风险度量。',
            '企业诚信风险': '通过目标公司及其核心关联公司所涉及的司法诉讼、行政处罚、失信被执行、被举报次数、负面舆情分析、信息披露程度等方面，全息衡量企业整体信誉风险。'

        },
        wljd: {
            // '平台合规性风险': '通过平台是否能自动投标、平台业务模式、资金存管情况等行业合规性指标，判断平台风险偏好设定，刻画了平台对合规性指标的整体风险情况。',
            // '交易指标风险': '通过平台投资人数、借款人数、投资金额、借款金额、贷款产品利率区间、月交易量与交易额、累积交易量与交易额、平均满标时间等效率与效果行为指标综合刻画了P2P平台整体交易风险。',
            // '企业诚信风险': '通过平台所在公司及其核心关联公司所涉及的司法诉讼、行政处罚、失信被执行、被举报次数、负面舆情分析、信息披露程度等方面，全息衡量企业整体信誉风险。',
            // '综合实力风险': '通过平台所在公司的股东类型、资本实力、人员结构与规模、知识产权拥有量、运营稳定性、公司所在地域经济运行整体情况等方面对企业基本面进行风险刻画。',
            // '平台关联方风险': '通过在特定时点解析平台所在公司的股权结构合理性、核心控制人业务专注度、关联方关系地区分布，关联网络结构特征等方面，识别企业的反经济行为特征度。'

            '网络借贷行业风险': '通过平台业务模式、资金存管情况、风险准备金托管情况、产品收益率、产品期限等网络借贷行业指标，综合刻画了网贷平台综合风险情况。',
            '综合实力风险': '通过企业股东类型、资本实力、人员结构与规模、知识产权拥有量、运营稳定性、公司所在地域经济运行整体情况等方面对企业基本面进行风险刻画。',
            '企业行为风险': '通过公司经营行为与综合信用的指标，主要包括工商变更频率、招中标数量、域名备案、失信、诉讼、行政处罚情况等方面对企业经营行为进行风险度量。',
            '静态关联方风险': '通过在特定时点解析目标企业股权结构合理性、核心控制人业务专注度、关联方关系地区分布，关联网络结构特征等方面，识别企业的反经济行为特征度。',
            '动态关联方风险': '通过在不同时点关联方图谱发展快慢、核心企业群关联度、关联企业行业/地域扩散特征、关联方增长构成等方面，描述企业行为变化的稳定性和趋势性。'

        },
        jycs: { 
            // '交易风险': '通过交易场所对交易波动率设定区间、交易杠杆倍数、交易手续费收取区间、交易品种设定等交易规则指标刻画交易场所整体风险偏好设定，反映了交易场所整体的操作风险。',
            // '会员企业风险': '利用风险传递原理，通过衡量交易场所的交易主体，即在交易场所登记的会员单位的风险情况，切实刻画了交易场所的整体风险情况。',
            // '交易场所风险': '通过对交易场所的背景实力、实际经营情况、整体信誉度等相关指标进行分析，综合考量交易场所的整体风险。',
            // '静态关联方风险': '通过在特定时点解析目标企业股权结构合理性、核心控制人业务专注度、关联方关系地区分布，关联网络结构特征等方面，识别交易场所的反经济行为特征度。',
            // '动态关联方风险': '通过在不同时点关联方图谱发展快慢、核心企业群关联度、关联企业行业/地域扩散特征、关联方增长构成等方面，描述交易场所行为变化的稳定性和趋势性。'

            '交易场所行业风险': '通过交易场所是否具备政府批文、相关交易管理规则、交易品种设定、同时利用风险传递原理，综合衡量交易场所的会员单位的风险，全面刻画交易场所的整体风险情况。',
            '综合实力风险': '通过企业股东类型、资本实力、人员结构与规模、知识产权拥有量、运营稳定性、公司所在地域经济运行整体情况等方面对企业基本面进行风险刻画。',
            '企业行为风险': '通过公司经营行为与综合信用的指标，主要包括工商变更频率、招中标数量、域名备案、失信、诉讼、行政处罚情况等方面对企业经营行为进行风险度量。',
            '静态关联方风险': '通过在特定时点解析目标企业股权结构合理性、核心控制人业务专注度、关联方关系地区分布，关联网络结构特征等方面，识别企业的反经济行为特征度。',
            '动态关联方风险': '通过在不同时点关联方图谱发展快慢、核心企业群关联度、关联企业行业/地域扩散特征、关联方增长构成等方面，描述企业行为变化的稳定性和趋势性。'

        },
        smjj: {
            // '监管合规性风险': '通过私募基金管理人是否备案设定合规性的前置规则、基金管理人是否被要求过提交法律意见书、管理人领导层的专业素质情况，从机构合规的角度刻画了企业对监管政策的配合度。',
            // '私募综合实力风险': '通过对基金管理人不同资历会员类别、不同基金类别属性、不同人员规模情况，对基金整体实力进行综合评估，刻画了整体的风险程度。',
            // '私募基金管理风险': '通过判断机构发行的基金产品的非正常清盘个数、在基金业暂行办法实施后是否存在基金发行异常、基金整体规模情况和基金管理人是否存在基金业协会列出的不良诚信信息从基金经营管理的角度刻画企业风险。',
            // '管理机构风险': '通过对私募基金管理机构的背景实力、实际经营情况、整体信誉度等相关指标进行分析，综合考量机构的整体风险。',
            // '机构关联方风险': '通过在特定时点解析机构的股权结构合理性、核心控制人业务专注度、关联方关系地区分布，关联网络结构特征等方面，识别机构的反经济行为特征度。'

            '私募基金行业风险': '通过私募基金管理人从业资格、法律意见书提交情况、会员类别、基金类别属性、人员规模情况等，对私募基金整体实力进行综合评和风险刻画。',
            '综合实力风险': '通过企业股东类型、资本实力、人员结构与规模、知识产权拥有量、运营稳定性、公司所在地域经济运行整体情况等方面对企业基本面进行风险刻画。',
            '企业行为风险': '通过公司经营行为与综合信用的指标，主要包括工商变更频率、招中标数量、域名备案、失信、诉讼、行政处罚情况等方面对企业经营行为进行风险度量。',
            '静态关联方风险': '通过在特定时点解析目标企业股权结构合理性、核心控制人业务专注度、关联方关系地区分布，关联网络结构特征等方面，识别企业的反经济行为特征度。',
            '动态关联方风险': '通过在不同时点关联方图谱发展快慢、核心企业群关联度、关联企业行业/地域扩散特征、关联方增长构成等方面，描述企业行为变化的稳定性和趋势性。'
        }
    };
    let listInfo = {};
    if(industry === 'rzdb' || industry === 'xedk'){
        listInfo = radarTipArr['xxjr'];
    }else {
        listInfo =  radarTipArr[industry];
    }
    return listInfo;
}
/**
 * 行业转换
 * @param  {[type]} industry [description]
 * @return {[type]}          [description]
 */
export function switchIndustryYW(industry) {
    switch (industry){
        case '网络借贷' :
            return 'wljd';
        case '新兴金融' :
            return 'xxjr';
         case '融资担保' :
            return 'rzdb';
        case '小额贷款' :
            return 'xedk';
        case '交易场所' :
            return 'jycs';
        case '私募基金' :
            return 'smjj';
        default :
            return 'other';
    }
}
/**
 * 行业转换
 * @param  {[type]} industry [description]
 * @return {[type]}          [description]
 */
export function switchIndustry(industry) {
    switch (industry){
        case '网络借贷' :
            return 'network';
        case '新兴金融' :
            return 'emerging';
         case '融资担保' :
            return 'emerging';
        case '小额贷款' :
            return 'emerging';
        case '交易场所' :
            return 'trading';
        case '私募基金' :
            return 'private';
        default :
            return 'other';
    }
}
/**
 * 日期字符串转换
 * @param date
 * @returns {string}
 */
export function formatDate(date) {
    return date.toString().substring(0, 4) + '年' + date.toString().substring(4, 6) + '月' + date.toString().substring(6, 8) + '日';
}
/**
 * 日期字符串转换
 * @param date
 * @returns {string}
 */
export function formatDateline(date) {
    return date.toString().substring(0, 4) + '-' + date.toString().substring(4, 6) + '-' + date.toString().substring(6, 8);
}
/**
 * 日期字符串转换
 * @param date
 * @returns {string}
 */
export function formatDateShort(date) {
    return date.substring(0, 4) + '-' + date.substring(4, 6);
}