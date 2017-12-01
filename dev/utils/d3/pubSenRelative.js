
/*
 * @desc 舆情关联图
 * @author xuyao
 */

var d3 = require('d3');
module.exports = function() {
    let pubSen = {};
    let id = '';
    let color = ['#02a7ff', '#f67d7d', '#14adff', '#333']; // 依次为 [中心点颜色, 趋势上升颜色，趋势下降颜色，周围点的文字颜色]
    let data = '';
    let svg = '';
    let width = 1200;
    let height = 440;
    let scaleData = []; // value缩放后
    let handleData = [];
    let centerPoint = {x: width / 2, y: height / 2};
    let handleCenterData = []; // 格式后的中心数据
    let groupSortData = {
        0: [],
        1: [],
        2: []
    }; // 分组后的数据
    let allAngle = []; // 存储每个分组的弧度

    pubSen.data = function(_){
        _.list.length ? data = _ : null;
    };

    pubSen.setId = function(_){
        id = _;
    };

    pubSen.setColor = function(_){
        _.length ? color = _ : color;
    };

    pubSen.start = function(){
        setSide();
        drawSvg(); // 绘制svg
        formatCenterData(); // 格式化中心点数据
        drawCenterText(); // 绘制中心点
        formatAroundData(); // 格式化周围点的数据
        pointGroup(); // 把周围点分组
        countEachPointAngle(); // 计算周围点的角度
        drawAroundPoint(); // 绘制周围点
        drawAroundText(); // 绘制周围点的文字

    };

    return pubSen;

    function setSide(){
        let $this = $('#' + id);
        let $parent =  $this.parent();
        let w = $parent.width();
        let h = $parent.height();

        $this.width(w)
            .height(h);

        width = w;
        height = h;

        centerPoint = {x: width / 2, y: height / 2 + 4};
    }

    /*
     * @desc 绘制画布
     */
    function drawSvg(){
        svg = d3.select('#' + id).append('svg')
            .attr('width', width)
            .attr('height', height);
    }

    /*
     * @desc 格式化中心点数据
     */
    function formatCenterData(){
        let centerText = data.center;
        let center = {
            name: centerText,
            x: centerPoint.x,
            y: centerPoint.y,
            color: color[0]
        };
        handleCenterData.push(center);
    }

    /*
     * @desc 绘制中心点
     */
    function drawCenterText(){
        svg.selectAll('text')
            .data(handleCenterData)
            .enter()
            .append('text')
            .attr('font-size', '18px')
            .attr('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .attr('class', 'text')
            .attr('x', function(d) {
                return d.x;
            })
            .attr('y', function(d) {
                return d.y;
            })
            .attr('dx', function(d){
                return 0;
            })
            .attr('dy', function(d){
                return 0;
            })
            .text(function(d){
                return d.name;
            })
            .attr('fill-opacity', 1)
            .transition().duration(2500)
            .attr('fill-opacity', 1)
            .attr('fill', function(d){
                return d.color;
            });
    }

    function compare(property){
        return function(a, b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        };
    }

    /*
     * @desc 格式化周围点的数据
     */
    function formatAroundData(){
        let aroundData = data.list;

        let sortData = aroundData.sort(compare('bigValue'));

        let sortLen = sortData.length;
        let maxValue = sortData[sortLen - 1].bigValue;
        let scale = 2 * maxValue / (width - width / 3);

        for(let i = 0; i < sortLen; i++){ // 循环遍历 求出对应比例的br sr
            let sData = sortData[i];
            let bigValue = sData.bigValue;
            let smallValue = sData.smallValue;
            let br = bigValue / scale + width / 10; // 每个点距离中心点的距离 强弱关系
            let sr = smallValue; // 每个点的大小 半径
            scaleData.push({
                name: sData.name,
                br: br,
                sr: sr,
                lift: sData.lift,
                smallValue: smallValue,
                bigValue: bigValue
            });
        }
    }

    /*
     * @desc 对每个点分组 按照br分组   按照弧长的比例分组
     */
    function pointGroup(){
        let sortLen = scaleData.length;

        let halfWidth = width / 2;
        let halfHeight = height / 2;
        let num = 3;
        let r = (halfWidth - 20) / num; // 把宽度的一半再分成三段 对点分组
        let arc = []; // 定义一个数组用于装弧长
        let arcScale = []; // 定义一个数组用于装每组占的比例
        let PI = Math.PI;
        let arcsum = 0; // 对弧长求和

        for(let i = 0; i < num; i++){
            let line = (i + 1) * r; // 线段长度
            let angle = 0;
            if(line < halfHeight){
                angle = PI / 2; // 求出弧度
            }else{
                angle = Math.asin(halfHeight / ((i + 1) * r)); // 求出弧度
            }

            let l = 2 * angle * (i + 1) * r; // 求出弧长
            arcsum = arcsum + l;
            arc.push(l);
            allAngle.push(angle * 4);
        }

        for(let j = 0; j < num; j++){
            let eachArcScale = parseInt(sortLen * (arc[j] / arcsum), 10);
            arcScale.push(eachArcScale);
        }

        for(let k = 0; k < sortLen; k++){ // 循环遍历 按照br分组
            let br = scaleData[k].br;
            if(k < arcScale[0]){
                groupSortData[0].push(scaleData[k]);
            }else if(k < (arcScale[0] + arcScale[1])){
                groupSortData[1].push(scaleData[k]);
            }else{
                groupSortData[2].push(scaleData[k]);
            }
        }
    }

    /*
     * @desc 计算每个点的弧度 从中间点开始往两边排
     */
    function countEachPointAngle(){
        let PI = Math.PI;
        for(let i in groupSortData){
            let egLen = groupSortData[i].length;

            let angle = allAngle[i];
            let eachAngle = angle / egLen; // 每个点的间隔弧度
            let halfEachAngle = eachAngle / 2;
            let half = parseInt(egLen / 2, 10);

            for(let j = 0; j < egLen; j++){
                let a = 0;
                // 0 1 2 3  4 5 6 7 8     9 10
                if(j < half){
                    if(half % 2){ // 奇数个的情况
                        a = j % 2 ? (-eachAngle * (j + 1) / 2) : (eachAngle * j / 2);
                    }else{ // 偶数个的情况 halfEachAngle修正间隔
                        a = j % 2 ? (-eachAngle * ((j - 1) / 2 + 1) + halfEachAngle) : (eachAngle * (j / 2 + 1) - halfEachAngle);
                    }
                }else{
                    if((egLen - half) % 2){ // 奇数个的情况
                        a = j % 2 ? (PI - eachAngle * (j - half + 1) / 2) : (PI + eachAngle * (j - half) / 2);
                    }else{ // 偶数个的情况 halfEachAngle修正间隔
                        a = j % 2 ? (PI - eachAngle * ((j - half) / 2 + 1) + halfEachAngle) : (PI + eachAngle * ((j - half - 1) / 2 + 1) - halfEachAngle);
                    }
                }
                countPoint(groupSortData[i][j], a, i);
            }
        }
    }

    /*
     * @desc 计算点的位置
     */
    function countPoint(data, angle, i){
        let PI = Math.PI;
        let x0 = centerPoint.x;
        let y0 = centerPoint.y;
        let x1 = '';
        let y1 = '';
        let r = data.br;

        x1 = x0 + r * Math.cos(angle);
        y1 = y0 - r * Math.sin(angle);

        let point = {
            br: data.br,
            r: data.sr,
            name: data.name,
            x: x1,
            y: y1,
            color: data.lift ? color[1] : color[2]
        };
        handleData.push(point);
    }

    /*
     * @desc 绘制周围点
     */
    function drawAroundPoint(){
        svg.selectAll('circle')
            .data(handleData)
            .enter()
            .append('circle')
            .attr('class', 'point')
            .attr('name', function(d){
                return d.name;
            })
            .attr('br', function(d){
                return d.br;
            })
            .attr('cx', function(d){
                return d.x;
            })
            .attr('cy', function(d){
                if(d.y > 410) {
                    d.y = 410;
                }else if(d.y < 20){
                    d.y = 20;
                }
                return d.y;
            })
            .attr('r', function(d){
                return d.r + 5;
            })
            .style('fill', function(d){
                return d.color;
            })
            .style({'fill-opacity': 0.8, 'cursor': 'pointer'});
    }

    /*
     * @desc 绘制周围点的文字
     */
    function drawAroundText(){
        handleData.forEach((item) =>{
            svg.append('text')
                .attr('font-size', '14px')
                .attr('text-anchor', 'middle')
                .attr('class', 'text')
                .attr('x', item.x)
                .attr('y', item.y)
                .attr('dx', 0)
                .attr('dy', item.r + 18)
                .text(item.name)
                .attr('fill-opacity', 1)
                .transition().duration(2500)
                .attr('fill-opacity', 1)
                .attr('fill', color[3]);
        });
    }
};





