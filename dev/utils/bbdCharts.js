/**
 * Created by fuzhihong on 2017/4/13.
 * bbdBar 柱状图
 * bbdRadar 雷达图
 * bbdPie 饼状图
 * bbdLine 折线图
 * bbdWaterPolo 水球仪
 * bbdmap 地图
 * bbdGauge 仪表盘
 * scatterBase 气泡图
 */
import {Link, hashHistory} from 'react-router';
import {insert_flg} from '../utils/util';
import echarts from 'echarts';
const CHATBBD = {
    bbdBar: function(params, callBack){
        let BarChart = echarts.init(document.getElementById(params.chartName));
        let gradientColor = params.gradientColors === undefined ? [
            [{offset: 0, color: '#0474dc'}, {offset: 0.5, color: '#0291e1'}, {offset: 1, color: '#00afe6'}],
            [{offset: 0, color: '#6cb5ec'}, {offset: 0.5, color: '#8fc9f2'}, {offset: 1, color: '#b0dbf8'}]
        ] : params.gradientColors; // 渐变颜色
        let seriesData = [];
        // 同一颜色
        if(params.unUnitColor === undefined){
            for (let i = 0; i < params.series.length; i++) {
                let item = {
                    type: 'bar',
                    name: params.legend[i], // params.legend[i],
                    barGap: '0',
                    barWidth: params.barWidth === undefined ? '22' : params.barWidth,
                    stack: params.stack === undefined ? null : params.stack,
                    itemStyle: {
                        normal: {
                            barBorderRadius: params.barBorderRadius === undefined ? 0 : params.barBorderRadius, // 圆角度数
                            color: params.row === undefined ? new echarts.graphic.LinearGradient(0, 0, 0, 1, gradientColor[i]) : new echarts.graphic.LinearGradient(0, 0, 1, 1, gradientColor[i]) // 渐变行颜色
                        },
                        emphasis: {
                            barBorderRadius: params.barBorderRadius === undefined ? 0 : params.barBorderRadius
                        }
                    },
                    label: {
                        normal: {
                            show: params.seriesLabelShow === undefined ? false : params.seriesLabelShow,
                            formatter: '{c}%',
                            position: 'right',
                            offset: [4, -3],
                            textStyle: {
                                color: '#333',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontFamily: 'sans-serif',
                                fontSize: 14
                            }
                        }
                    },
                    data: params.series[i]
                };
                seriesData.push(item);
            }
        }
        let options = {
            color: params.colors === undefined ? ['#24a9ee', '#ffdb6b', '#fe6321'] : params.colors,
            grid: {
                left: params.gridLeft === undefined ? '10%' : params.gridLeft,
                top: params.gridTop === undefined ? '60' : params.gridTop,
                containLabel: params.containLabel === undefined ? false : params.containLabel
            },
            title: {
                text: params.title === undefined ? '' : params.title,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                },
                left: '30%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'none' // 默认为直线，可选为：'line' | 'shadow'
                },
                backgroundColor: params.tooltipBackgroundColor === undefined ? 'rgba(255,255,255,0.8)' : params.tooltipBackgroundColor,
                textStyle: {
                    color: '#333333',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                },
                padding: [10, 10, 10, 10],
                formatter: function(param){
                    let info = '';
                    if(params.specialFormatter === 'averageLoanDateFormatter'){
                        info =  `<div class = "mapTooltip pieTooltip">
                                <p class = "title" style="font-size: 14px"><b>${param[0].name}</b></p>
                                <p style="text-align: left;font-size: 14px">${param[1].seriesName}<span class = "color-blue" style="color:${param[1].color.colorStops[0].color}">${param[1].value === '0.0' ? '--' : param[1].value} (月) </span></p>
                                <p style="text-align: left ;font-size: 14px">${param[0].seriesName}<span class = "color-blue" style="color:${param[0].color.colorStops[0].color}">${param[0].value === '0.0' ? '--' : param[0].value} (月) </span></p>
                            <div>`;
                    } else if(params.specialFormatter === 'bangdan'){
                        info = `<div class = "mapTooltip pieTooltip">
                                <p>${param[0].name}：<span class = "color-yellow">${param[0].value } </span>${params.unit ? params.unit : ''}</p>
                            <div>`;
                    }else{
                        info = `<div class = "mapTooltip pieTooltip">
                                <p class = "title"><b>${param[0].name}</b></p>
                                <p>${params.labelName}<span class = "color-yellow">${param[0].value} </span>${params.unit ? params.unit : ''}</p>
                            <div>`;
                    }
                    return info;
                }
            },
            legend: {
                data: params.legend,
                right: params.legendRight === undefined ? 'center' : params.legendRight,
                icon: params.legendIcon === undefined ? '' : params.legendIcon,
                show: params.legendShow === undefined ? true : params.legendShow,
                top: '5%',
                itemWidth: 6,
                itemHeight: 6,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '12'
                }
            },
            xAxis: {
                type: params.row === undefined ? 'category' : 'value',
                data: params.xAxis,
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: params.xsplitLineShow === undefined ? false : params.xsplitLineShow,
                    lineStyle: {
                        color: params.splitLineColor === undefined ? 'rgba(242,242,242,0.9)' : params.splitLineColor
                    }
                },
                axisLine: {
                    show: params.axisLineShow === undefined ? true : params.axisLineShow,
                    lineStyle: {
                        width: 1,
                        color: params.axisLineColor === undefined ? '#f2f2f2' : params.axisLineColor
                    }
                },
                axisLabel: {
                    show: params.xaxisLabelShow === undefined ? true : params.xaxisLabelShow,
                    textStyle: {
                        color: params.labelTextColor === undefined ? '#333333' : params.labelTextColor
                    }
                }
            },
            yAxis: {
                type: params.row === undefined ? 'value' : 'category',
                data: params.yAxis,
                name: params.yAxisName === undefined ? '' : params.yAxisName,
                nameLocation: 'end',
                nameTextStyle: {
                    color: '#cecece',
                    right: '5%'
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: params.ysplitLineShow === undefined ? true : params.ysplitLineShow, // 横坐标的间隔横线
                    lineStyle: {
                        color: params.splitLineColor === undefined ? 'rgba(242,242,242,0.9)' : params.splitLineColor
                    }
                },
                axisLine: {
                    show: params.yxisLineShow === undefined ? true : params.yxisLineShow,
                    lineStyle: {
                        width: 1,
                        color: params.axisLineColor === undefined ? '#f2f2f2' : params.axisLineColor
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: params.labelTextColor === undefined ? '#333333' : params.labelTextColor,
                        fontSize: params.labelTextSize === undefined ? 12 : params.labelTextSize
                    }
                }
            },
            series: seriesData
        };
        ECHART_ROOM.push(BarChart);
        BarChart.setOption(options);
        if(callBack){
            BarChart.on('click', function(param){
                callBack(param);
            });
        }
    },
    bbdRadar: function ( params, callBack){
        let RadarChart = echarts.init(document.getElementById(params.chartName));
        let seriesData = [];
        RadarChart.showLoading();
        
        for(let i = 0; i < params.series.length; i++){
            let seriesItem = {
                type: 'radar',
                name: '',
                data: [
                    {
                        value: params.series[i],
                        // name: params.legend[i],
                        areaStyle: {
                            normal: {
                                color: 'rgba(255, 255, 255, 0.5)'
                            }
                        }
                    }
                ]
            };
            seriesData.push(seriesItem);
        }
        let options = {
            color: params.color,
            title: {
                text: params.title,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                }
            },
            legend: {
                show: params.legendShow === undefined ? true : params.legendShow,
                data: params.legend === undefined ? [] : params.legend
            },
            tooltip: {
                backgroundColor: 'rgba(255,255,255,0.8)',
                textStyle: {
                    color: '#333333',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                },
                formatter: function(param, s){
                    return '总风险值：' + params.totalScore;
                },
                padding: [10, 10, 10, 10]
            },
            radar: {
                nameGap: 3, // 指示器名称和指示器轴的距离
                radius: '55%',
                shape: 'circle', // 雷达图绘制类型，支持 'polygon' 和 'circle'。
                splitArea: {
                    areaStyle: {
                        color: [
                            'rgba(255, 255, 255, 0.9)',
                            'rgba(213, 242, 250, 1)',
                            'rgba(158, 236, 255, 1)',
                            'rgba(85, 195, 254, 1)',
                            'rgba(2, 168, 254, 1)'
                        ],
                        shadowColor: 'rgba(255, 255, 255, 0.3)',
                        shadowBlur: 10
                    }
                },
                triggerEvent: true,
                axisLabel: {
                    textStyle: {
                        show: true,
                        align: 'center',
                         color: 'red'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.7)', // 中间的米字线
                        type: 'dashed' // 米字线类型
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.7)' // 中间的米字线
                    }
                },
                name: {
                    textStyle: {
                        color: '#999'
                    },
                     formatter: function (value, indicator) {
                        return  indicator.name + '\n  (' + indicator.value + ')分';
                    }
                },
                indicator: params.indicator
            },
            series: seriesData
        };
        RadarChart.hideLoading();
        ECHART_ROOM.push(RadarChart);
        RadarChart.setOption(options);
        RadarChart.on('mouseover', function (param) {
            param.event.event.preventDefault();
            if(param.targetType === 'axisName'){
                let tipDemo = document.getElementById('radar-lable-tip');
                let offsetX = param.event.offsetX;
                let offsetY = param.event.offsetY;
                let newX = offsetX;
                let newY = offsetY;
                if(offsetX >= 250){
                    newX = offsetX - 190;
                }

                 if(newY >= 250){
                    newY = offsetY - 170;
                }else{
                    newY = offsetY + 20;
                }
                tipDemo.innerHTML = params.tipsText[param.name.split('\n')[0]]; 
                tipDemo.style.top = newY + 'px';
                tipDemo.style.left = newX + 'px';
                tipDemo.style.display = 'block';
            }
        });
        RadarChart.on('mouseout', function (param) {
            if(param.targetType === 'axisName'){
                param.event.event.preventDefault();
                let tipDemo = document.getElementById('radar-lable-tip');
                tipDemo.innerHTML = '';
                tipDemo.style.display = 'none';
            }
        });
    },
    bbdPie: function (params, callBack){
        let PieChart = echarts.init(document.getElementById(params.chartName));
        let options = {
            color: params.color === undefined ? ['rgb(0,86,192)', 'rgb(2,115,220)', 'rgb(113,200,244)', 'rgb(2,147,220)'] : params.color,
            tooltip: {
                trigger: 'item',
                backgroundColor: '#fff',
                padding: [12, 12, 12, 12],
                borderWidth: 0,
                extraCssText: 'box-shadow: -3px 3px 14px 4px #053a6b',
                textStyle: {
                    color: '#333333',
                    fontSize: '14'
                },
                formatter: function(param){
                    let info = '';
                    if(params.showLable){
                        info = `<div class = "mapTooltip pieTooltip">
                                <p class = "title"><b>${param.name}</b></p>
                                <p>占比<span class = "color-blue">${param.percent}%</span></p>
                            <div>`;
                    }else{
                       info = `<div class = "mapTooltip pieTooltip">
                                <p class = "title"><b>${param.name}</b></p>
                                <p>${param.seriesName}<span class = "color-yellow">${param.value}</span>${params.unit ? params.unit : ''}</p>
                                <p>占比<span class = "color-blue">${param.percent}%</span></p>
                            <div>`;
                    }
                    return info;
                }
            },
            title: {
                show: params.titleShow === undefined ? false : params.titleShow,
                text: params.title,
                x: 'center',
                bottom: params.titleBottom === undefined ? '10%' : params.titleBottom,
                textStyle: params.titleStyle === undefined ? {
                    color: '#cecece',
                    fontSize: 16
                } : params.titleStyle
            },
            legend: {
                show: params.legendShow === undefined ? true : params.legendShow,
                data: params.legend === undefined ? [] : params.legend,
                orient: 'vertical',
                top: 20,
                left: 20,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                }
            },
            series: {
                name: params.name,
                type: 'pie',
                radius: params.radius === undefined ? ['30%', '45%'] : params.radius,
                center: params.center === undefined ? ['50%', '50%'] : params.center,
                data: params.data,
                minAngle: 7,
                label: {
                    normal: {
                        show: params.labelShow === undefined ? true : params.labelShow,
                        position: 'outside',
                        formatter: function(parm){
                            let lableInfo = '';
                            if(params.showLable){
                                lableInfo = parm.name + ' ' + parm.percent + '%';
                            }else{
                                lableInfo = parm.name;
                                if(lableInfo === '证券投资基金'){
                                    lableInfo = insert_flg(lableInfo, '\n', 2);
                                } else if(lableInfo.length >= 5){
                                    lableInfo = insert_flg(lableInfo, '\n', 3);
                                }
                            }
                            return lableInfo;
                        },
                        textStyle: {
                            fontSize: params.labelFontSize === undefined ? 14 : params.labelFontSize,
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontFamily: 'microsoft yahei'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length: params.length === undefined ? 15 : params.length,
                        length2: params.length2 === undefined ? 20 : params.length2,
                        smooth: 0.2
                    }
                }
            }
        };
        ECHART_ROOM.push(PieChart);
        PieChart.setOption(options);
    },
    bbdLine: function(params, callBack){
        let LineChart = echarts.init(document.getElementById(params.chartName));
        let gradientColor = params.gradientColor === undefined ? [
            [{offset: 0, color: 'rgb(244, 250, 254)'}, {offset: 1, color: 'rgb(130, 201, 238)'}],
            [{offset: 0, color: '#258dee'}, {offset: 1, color: '#258dee'}],
            [{offset: 0, color: '#74c6f5'}, {offset: 1, color: '#74c6f5'}]
        ] : params.gradientColor; // 渐变颜色
        let lineColor = ['#0c5ec2', '#258dee', '#74c6f5'];
        let seriesData = [];
        let areaStyle = {};
        
        for (let i = 0; i < params.series.length; i++) {
            if(params.graphic === undefined){
                areaStyle = {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, gradientColor[i] )
                    } 
                };
            }else{
                areaStyle = {};
            }
            let item = {
                type: 'line',
                symbol: params.symbol === undefined ? 'emptyCircle' : params.symbol,
                symbolSize: params.symbolSize === undefined ? 4 : params.symbolSize,
                showSymbol: params.showSymbol === undefined ? true : params.showSymbol,
                smooth: params.smooth === undefined ? true : params.smooth, // 是否平滑显示
                name: params.legend[i],
                stack: params.stack === undefined ? null : params.stack,
                lineStyle: {
                    normal: {
                        type: 'solid',
                        color: params.lineStyleColor === undefined ? lineColor[i] : params.lineStyleColor[i],
                        opacity: params.lineStyleOpacity === undefined ? '0.5' : params.lineStyleOpacity,
                        width: params.lineStyleWidth === undefined ? 2 : params.lineStyleWidth
                    }
                },
                itemStyle: {
                    normal: params.itemStyle === undefined ? {
                    shadowColor: 'rgba(255, 255, 255, 0.5)',
                    shadowBlur: 5
                } : params.itemStyle
                },
                cursor: 'pointer',
                areaStyle: params.full === undefined ? areaStyle :  params.graphic === undefined ? {normal: {}} : {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, gradientColor[i] )
                    }
                },
                data: params.series[i]
            };
            seriesData.push(item);
        }
        let options = {
            color: params.colors === undefined ? ['#24a9ee', '#ffdb6b', '#fe6321'] : params.colors,
            title: {
                text: params.title,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                },
                left: '30%'
            },
            grid: {
                width: params.width === undefined ? 'auto' : params.width,
                left: params.left === undefined ? '10%' : params.left,
                top: params.top === undefined ? 60 : params.top,
                right: params.right === undefined ? '10%' : params.right,
                bottom: params.bottom === undefined ? 60 : params.bottom
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: params.tooltipTrigger === undefined ? 'none' : params.tooltipTrigger, // 默认为直线，可选为：'line' | 'shadow'
                    lineStyle: {
                        color: 'rgba(192, 224, 248, .8)'
                    },
                    snap: true
                },
                backgroundColor: 'rgba(255,255,255,1)',
                // formatter: '{b}:{c}',
                textStyle: {
                    color: '#333333',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                },
                padding: [10, 10, 10, 10],
                formatter: function (param) {
                    let info = '';
                    if(params.specialFormatter === 'gaugeTendChart'){
                        let newDate = param[0].name.substring(0, 4) + '-' + param[0].name.substring(4, 6);
                       info = `<div class="gaugeTend-tip">
                                <p class="title">${newDate}</p>
                                <p class="tip-msg">口碑值：
                                    <span>${param[0].value > 0 ? '+' + param[0].value : param[0].value} </span>
                                </p>
                                <p  class="tip-msg">总体舆情情感：
                                    <span >${param[0].value > 0 ? '正面' : param[0].value === 0 ? '中性' : '负面'} </span>
                                </p>
                            <div>`;
                    }else if (params.specialFormatter === 'averageProfit'){
                        info = `<div class = "mapTooltip pieTooltip">
                                <p class = "title" style="font-size: 14px"><b>${param[0].name}</b></p>
                                <p style="text-align: left;font-size: 14px">${param[1].seriesName}<span class = "color-blue" style="color:${param[1].color}">${param[1].value}% </span></p>
                                <p style="text-align: left;font-size: 14px">${param[0].seriesName}<span class = "color-blue" style="color:${param[0].color}">${param[0].value}%</span></p>
                            <div>`;
                    }else if(params.specialFormatter === 'eventLineChart'){
                        let data = param[0].data;
                        let newDate = data.news_pubdate.substring(0, 4) + '-' + data.news_pubdate.substring(4, 6) + '-' + data.news_pubdate.substring(6, 8);
                        info = `<div >
                                <p >${newDate}</p>
                                <p >舆情总量：${data.news_all_count}</p>
                                <p >负面舆情数：${data.news_minus_count}</p>
                                <p >正面舆情数：${data.news_positive_count}</p>
                                <p >中性舆情数：${data.news_middle_count}</p>
                            <div>`;
                    }else if(params.specialFormatter === 'eventTrend'){
                        info = `<div class = "mapTooltip pieTooltip">
                                    <p>${param[0].name}：<span class = "color-yellow">${param[0].value} </span>${params.unit ? params.unit : ''}</p>
                            <div>`;
                    }else if(params.specialFormatter === 'detailTrend'){
                            info = param[0].name + '<br/>'; 
                            for(let i = 0; i < param.length; i++){
                                let spanCorlor = '<span style=color:' + params.colors[i] + '>' + param[i].value + '</span><br/>';
                                 info += param[i].seriesName + ' :&nbsp;' + spanCorlor;
                            }
                    }else if(params.specialFormatter === 'recrutment'){
                            info = param[0].name + '<br/>'; 
                            for(let i = 0; i < param.length; i++){
                                let spanCorlor = '<span style=color:' + params.colors[i] + '>' + param[i].value + '</span><br/>';
                                 info += param[i].seriesName + ' :&nbsp;' + spanCorlor;
                            }
                    }else {
                        info = `<div class = "mapTooltip pieTooltip">
                                <p class = "title"><b>${param[0].name}</b></p>
                                <p>${params.labelName}<span class = "color-yellow">${param[0].value} </span>${params.unit ? params.unit : ''}</p>
                            <div>`;
                    }
                    return info;
                }
            },
            legend: {
                data: params.legend,
                show: params.legendShow === undefined ? true : params.legendShow,
                itemWidth: params.regionLegend === undefined ? 6 : 25,
                itemHeight: params.regionLegend === undefined ? 6 : 14,
                icon: params.legendIcon === undefined ? null : params.legendIcon,
                top: '5%',
                left: params.legendRight === undefined ? 40 : '',
                right: params.legendRight === undefined ? '' : params.legendRight,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '12'
                }
            },
            xAxis: {
                position: params.xPosition === undefined ? null : params.xPosition,
                name: params.xName === undefined ? null : params.xName,
                nameGap: 10,
                nameLocation: 'end',
                nameTextStyle: {
                    color: '#333',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    fontSize: 12
                },
                boundaryGap: params.xBoundaryGap === undefined ? true : params.xBoundaryGap,
                data: params.xAxis,
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: params.showSplitLine === undefined ? false : params.showSplitLine
                },
                axisLine: {
                    show: params.axisLineShow === undefined ? true : params.axisLineShow,
                    lineStyle: {
                        width: 1,
                        color: params.axisLineColor === undefined ? '#f2f2f2' : params.axisLineColor
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: params.labelTextColor === undefined ? '#333333' : params.labelTextColor
                    },
                    interval: 'auto' // params.interval === undefined ? 'auto' : params.interval
                }
            },
            yAxis: {
                max: params.max === undefined ? null : params.max,
                min: params.min === undefined ? null : params.min,
                name: params.yAxisName === undefined ? '' : params.yAxisName,
                splitNumber: params.ySplitNumber === undefined ? null : params.ySplitNumber,
                nameTextStyle: {
                    color: params.nameTextColor  === undefined ? '#666' : params.nameTextColor,
                    fontSize: 14
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: params.showySplitLine === undefined ? true : params.showySplitLine, // 横坐标的间隔横线
                    lineStyle: {
                        color: params.splitLineColor === undefined ? 'rgba(242,242,242,0.9)' : params.splitLineColor
                    }
                },
                axisLine: {
                    show: params.yxisLineShow === undefined ? true : params.yxisLineShow,
                    lineStyle: {
                        width: 1,
                        color: params.axisLineColor === undefined ? '#f2f2f2' : params.axisLineColor
                    }
                },
                axisLabel: {
                    formatter: params.transformYAxis === undefined ? '{value}' : '{value}%',
                    show: true,
                    textStyle: {
                        color: params.labelTextColor === undefined ? '#333333' : params.labelTextColor
                    }
                },
                splitArea: {
                    show: params.splitAreaShow === undefined ? false : params.splitAreaShow,
                    areaStyle: {
                        color: ['#fafdff']
                    }
                }
            },
            series: seriesData
        };
        ECHART_ROOM.push(LineChart);
        LineChart.setOption(options);
        $(window).resize(function() {
            LineChart.resize();
        });
    },
    bbdWave: function (params, callBack) {
        let waveChart = echarts.init(document.getElementById(params.chartName));
        let options = {
            series: [
                {
                    animation: true,
                    waveAnimation: true,
                    type: 'liquidFill',
                    data: [0.45, 0.40],
                    color: ['#9BD2F3', '#9BCAF2'],
                    backgroundStyle: {
                        color: '#0299e2'
                    },
                    center: ['50%', '50%'],
                    radius: '100%',
                    amplitude: 8,
                    label: {
                        normal: {
                            formatter: function() {
                                return '';
                            },
                            textStyle: {
                                fontSize: 18,
                                color: '#fff',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontFamily: 'microsoft yahei'
                            },
                            position: ['50%', '40%']
                        }
                    },
                    outline: {
                        itemStyle: {
                            borderColor: '#e35140',
                            borderWidth: 0
                        },
                        borderDistance: 0
                    },
                    itemStyle: {
                        normal: {
                            backgroundColor: '#0293DC'
                        },
                        emphasis: {
                            backgroundColor: '#0293DC'
                        }
                    }
                }
            ]
        };
        ECHART_ROOM.push(waveChart);
        waveChart.setOption(options);
    },
    bbdPercent: function (params, callBack) {
        let percentChart = echarts.init(document.getElementById(params.chartName));
        let options = {
            title: {
                text: (params.percent * 100).toFixed(0) + '%',
                x: 'center',
                y: 'center',
                textStyle: {
                    color: '#0293DC',
                    fontSize: 18
                }
            },
            series: [
                {
                    center: ['50%', '50%'],
                    name: 'loading',
                    type: 'pie',
                    radius: ['65%', '80%'],
                    hoverAnimation: false,
                    label: {
                        normal: {
                            show: false,
                            fontSize: 12
                        }
                    },
                    data: [
                        {
                            value: parseInt(params.percent * 100, 10),
                            itemStyle: {
                                normal: {
                                    color: '#0293DC',
                                    shadowBlur: 5,
                                    shadowColor: '#0293DC',
                                    borderRadius: 5
                                }
                            }
                        }, {
                            value: parseInt((1 - params.percent) * 100, 10),
                            itemStyle: {
                                normal: {
                                    color: 'rgb(2,34,60)',
                                    shadowBlur: 5,
                                    shadowColor: 'rgb(2,34,60)',
                                    borderRadius: 5
                                }
                            }
                        }
                    ]
                }
            ]
        };
        ECHART_ROOM.push(percentChart);
        percentChart.setOption(options);
    },
    bbdmap: function(opt, data, province, city, mapback){
        let mapTypeName = city ? city : province;
        let idHaiNan = false;
        if(province === '海南省' && city === ''){
            idHaiNan = true;
        }
        echarts.registerMap(mapTypeName, data);
        var mapChart = echarts.init(document.getElementById('map-chart'));
        ECHART_ROOM.push(mapChart);
        mapChart.setOption(
            {
                center: idHaiNan ? [110.388793, 18.796216] : '',
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: [10, 10, 20, 10],
                    trigger: 'item',
                    borderWidth: 0,
                    extraCssText: 'box-shadow: -3px 3px 14px 4px #053a6b',
                    textStyle: {
                        color: '#333333',
                        fontSize: '14'
                    },
                    formatter: function (param) {
                        let data = param.data.value;
                        let changeMonitorCompany = '';
                        if(data[8] > 0){
                            changeMonitorCompany = '+' + data[8];
                        }else if(data[8] < 0){
                            changeMonitorCompany = data[8];
                        }
                        let changeHighCompany = '';
                        if(data[7] > 0){
                            changeHighCompany = '+' + data[7];
                        }else if(data[7] < 0){
                            changeHighCompany = data[7];
                        }
                        let highCollect = data[5] ? data[5] : '- -';
                        return city ? 
                                `<div class = "mapTooltip">
                                    <p class = "title"><b>${param.name}</b></p>
                                    <p>高危企业数<span class = "color-blue">${data[2]}</span>家<span class = "color-yellow">${changeHighCompany}</span></p>
                                    <p>监控企业数<span class = "color-blue">${data[6]}</span>家<span class = "color-yellow">${changeMonitorCompany}</span></p>
                                <div>` : 
                                `<div class = "mapTooltip">
                                    <p class = "title"><b>${param.name}</b></p>
                                    <p>监测地区<span class = "color-blue">${data[4]}</span>个</p>
                                    <p>高危聚集区<span class = "color-blue">${highCollect}</span></p>
                                    <p>高危企业数<span class = "color-blue">${data[2]}</span>家<span class = "color-yellow">${changeHighCompany}</span></p>
                                    <p>监控企业数<span class = "color-blue">${data[6]}</span>家<span class = "color-yellow">${changeMonitorCompany}</span></p>
                                <div>`;
                    }
                },
                geo: {
                    type: 'map',
                    zoom: idHaiNan ? 4 : 1,
                    map: mapTypeName,
                    mapType: mapTypeName,
                    label: {
                        normal: {
                            show: opt.labelShow ? true : false,
                            textStyle: {
                                color: opt.textColor ? opt.textColor : '#fff'
                            }
                        },
                        emphasis: {
                            show: opt.labelShow ? true : false,
                            textStyle: {
                                color: opt.textColor ? opt.textColor : '#fff'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: opt.areaColor ? opt.areaColor : 'none',
                            borderColor: opt.borderColor ? opt.borderColor : 'none'
                        },
                        emphasis: {
                            areaColor: opt.areaColorEmp ? opt.areaColorEmp : 'none' // 鼠标放上去的效果
                        }
                    }
                },
                series: [{
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: opt.scatterdata,
                    symbolSize: function (val) {
                        // 任意一点的半径为a+（b-a）/（最大企业量-最小企业量）*（该点企业量-最小点企业量）
                        // 最大点半径限制为b，最小为a
                        let simple = 0;
                        if(val[2]){
                            simple = opt.highMax === opt.highMin ? 10 : 10 + (30 - 10) / (opt.highMax - opt.highMin) * ( val[2] - opt.highMin);
                        }
                        return simple;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#fdde62',
                            shadowBlur: 10,
                            shadowColor: '#ECDA6B'
                        }
                    },
                    zlevel: 1
                },
                {
                    name: 'categoryA',
                    type: 'map',
                    geoIndex: 0,
                    tooltip: {
                        show: true,
                        formatter: function (param) {
                            let data = opt.formatterArr[param.name];
                            if(data){
                                let changeMonitorCompany = '';
                                if(data[8] > 0){
                                    changeMonitorCompany = '+' + data[8];
                                }else if(data[8] < 0){
                                    changeMonitorCompany = data[8];
                                }
                                let changeHighCompany = '';
                                if(data[7] > 0){
                                    changeHighCompany = '+' + data[7];
                                }else if(data[7] < 0){
                                    changeHighCompany = data[7];
                                }
                                let highCollect = data[5] ? data[5] : '- -';
                                return city ? 
                                `<div class = "mapTooltip">
                                    <p class = "title"><b>${param.name}</b></p>
                                    <p>高危企业数<span class = "color-blue">${data[2]}</span>家<span class = "color-yellow">${changeHighCompany}</span></p>
                                    <p>监控企业数<span class = "color-blue">${data[6]}</span>家<span class = "color-yellow">${changeMonitorCompany}</span></p>
                                <div>` : 
                                `<div class = "mapTooltip">
                                    <p class = "title"><b>${param.name}</b></p>
                                    <p>监测地区<span class = "color-blue">${data[4]}</span>个</p>
                                    <p>高危聚集区<span class = "color-blue">${highCollect}</span></p>
                                    <p>高危企业数<span class = "color-blue">${data[2]}</span>家<span class = "color-yellow">${changeHighCompany}</span></p>
                                    <p>监控企业数<span class = "color-blue">${data[6]}</span>家<span class = "color-yellow">${changeMonitorCompany}</span></p>
                                <div>`;
                            }
                            
                        }
                    }
                }]
            });
        mapChart.on('click', function(param){
            if(mapback){
                mapback(param.name);
            }
            mapChart.setOption({
                geo: {
                    regions: [{
                        name: param.name,
                        selected: true
                    }]
                }
            });
        });
    },
    bbdGauge: function (params, callback) {
        let GaugeChart = echarts.init(document.getElementById(params.chartName));
        let options = {
            tooltip: {
                formatter: '{a} <br/>{c}'
            },
            series: [{
                max: 100,
                min: -100,
                // center: ['50%', '50%'],    // 默认全局居中
                // radius: '50%',
                splitNumber: 10,
                beginAngle: 40,
                endAngle: -45,
                // startAngle: 270, // 总的360，设置180就是半圆
                name: '口碑值',
                type: 'gauge',
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [
                            [0.2, 'rgb(159,237,255)'],
                            [0.8, 'rgb(84,195,255)'],
                            [1, 'rgb(18,173,255)']
                        ],
                        width: 20,
                        shadowColor: '#fff', // 默认透明
                        shadowBlur: 8
                    }
                },
                axisLabel: { // 坐标数值样式
                    textStyle: {
                        // fontWeight: 'bolder',
                        color: '#999',
                        shadowColor: '#fff',
                        shadowBlur: 8
                    }
                },
                axisTick: { // 坐标小分割线
                    length: 5,
                    lineStyle: {
                        color: '#fff',
                        shadowColor: '#fff',
                        shadowBlur: 8
                    }
                },
                splitLine: { // 坐标分割线
                    length: 14,
                    lineStyle: {
                        width: 2,
                        color: '#fff'
                    }
                },
                pointer: {           // 指针
                    color: 'rgba(85, 197, 255, .9)',
                    show: true,
                    length: '88%',
                    width: 6,
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 5
                }, 
                title: {
                    offsetCenter: [0, '20%'],
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 18,
                        color: '#666',
                        shadowColor: '#fff', // 默认透明
                        shadowBlur: 10
                    }
                },
                detail: {
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#e4eef4',
                    shadowColor: '#fbfcfc',
                    shadowBlur: 5,
                    offsetCenter: [0, '48%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#12adff', 
                        fontWeight: 'bold',
                        fontSize: 20
                    }
                },
                data: params.data
            }]
        };
        ECHART_ROOM.push(GaugeChart);
        GaugeChart.setOption(options);
    },
    scatterBase: function(params, callback){
        let scatterBaseChart = echarts.init(document.getElementById(params.chartName));
        let seriesData = [];
        let shadowColor = ['rgba(25, 100, 150, 0.5)', 'rgba(120, 36, 50, 0.5)', 'rgba(129, 177, 221, 0.5)', 'rgba(138, 210, 206, 0.5)'];
        let gradientColor = [
            [{offset: 0, color: 'rgb(129, 227, 238)'}, {offset: 1, color: 'rgb(25, 183, 207)'}],
            [{offset: 0, color: 'rgb(251, 118, 123)'}, {offset: 1, color: 'rgb(204, 46, 72)'}],
            [{offset: 0, color: 'rgb(148, 193, 234)'}, {offset: 1, color: 'rgb(116, 167, 214)'}],
            [{offset: 0, color: 'rgb(150, 244, 239)'}, {offset: 1, color: 'rgb(119, 229, 223)'}]
        ]; // 渐变颜色
        for(let i = 0; i < params.series.length; i++){
            let item = {
                name: params.legendData[i],
                type: 'scatter',
                symbolSize: function(data) {
                    // 任意一点的最小半径为a+（b-a）/（最大企业量-最小企业量）*（该点企业量-最小点企业量） 最大点半径限制为b
                    // return Math.sqrt(data[1]) * 2.5;
                    let symbolSize = 0;
                    if(data !== 0){
                        symbolSize = 25; // 5 + (50 - 5) / (100 - 0) * (Math.abs(data) - 1);
                    }
                    return symbolSize;
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: shadowColor[i],
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, gradientColor[i])
                    }
                },
                data: params.series[i]
            };
            seriesData.push(item);
        }
        let scatterBaseOption = {
            legend: {
                data: params.legendData,
                top: 20,
                right: '10%'
            },
            tooltip: {
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'none' // 默认为直线，可选为：'line' | 'shadow'
                },
                backgroundColor: 'rgba(255,255,255,0.9)',
                textStyle: {
                    color: '#333333',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                },
                padding: [10, 10, 10, 10],
                formatter: function(data, index){

                    let itemData = data.data;
                    let newDate = itemData.name.substring(0, 4) + '-' + itemData.name.substring(4, 6) + '-' + itemData.name.substring(6, 8);
                    let formatterTypeInfo = params.formatterType === 'dataapi_hongjing_hoteventList' ? '活跃度' : '情感指数';
                    return `<div>
                                <p style="font-size:16px;font-weight: bold;text-align:left">${itemData.date}</p>
                                <p style="color:#333;text-align:left">${newDate}</p>
                                <p style="font-size:16px;font-weight: bold;text-align:left">${formatterTypeInfo}：<span class = "color-blue">${itemData.value}</span></p>
                            <div>`;
                }
            },
             grid: {
                left: params.left === undefined ? '10%' : params.left,
                top: params.top === undefined ? 60 : params.top,
                right: params.right === undefined ? '10%' : params.right,
                bottom: params.bottom === undefined ? 60 : params.bottom
            },
            xAxis: {
                type: 'category',
                data: params.xAxisDate,
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: '#e5ebf1'
                    }
                },
                axisLine: {
                    show: params.axisLineShow === undefined ? true : params.axisLineShow,
                    lineStyle: {
                        width: 2,
                        color: '#e5ebf1'
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 2,
                    formatter: function (date, index) {
                       let newDate = date.substring(4, 6) + '-' + date.substring(6, 8);
                        return newDate;
                    },
                    textStyle: {
                        color: params.labelTextColor === undefined ? '#333333' : params.labelTextColor
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
                name: params.yAxisName === undefined ? '' : params.yAxisName,
                nameTextStyle: {
                    color: params.nameTextColor  === undefined ? '#666' : params.nameTextColor,
                    fontSize: 14
                },
                max: 100,
                splitNumber: params.splitNumber === undefined ? 5 : params.splitNumber,
                min: params.min === undefined ? 0 : params.min,
                splitLine: {// 网 格横线
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: '#e5ebf1'
                    }
                },
                axisLine: {
                    show: params.axisLineShow === undefined ? true : params.axisLineShow,
                    lineStyle: {
                        width: 1,
                        color: '#f2f2f2'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: params.labelTextColor === undefined ? '#333333' : params.labelTextColor
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['#fafdff']
                    }
                }
            },
            series: seriesData
        };
        ECHART_ROOM.push(scatterBaseChart);
        scatterBaseChart.on('click', function(param) {
            if (callback) {
                callback(param);
            }
        });
        scatterBaseChart.setOption(scatterBaseOption);
    }
};
export default CHATBBD;