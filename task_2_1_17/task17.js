/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {
    //'day':'10',
    //'year-month':'13',
    //'year-month-day-year-month-day':'160'
};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    //根据pageState修改chartData
    chartData={};
    switch(pageState.nowGraTime){
        case 'day':
            for(var i in aqiSourceData[pageState.nowSelectCity]){
                chartData[i]=aqiSourceData[pageState.nowSelectCity][i];
            }
            break;
        case 'week':
            var weekval=0;
            var weekname='';
            var count=1;
            for(var i in aqiSourceData[pageState.nowSelectCity]){
                if(count==1){
                    weekname=i;
                    weekval=0;
                }
                weekval+=aqiSourceData[pageState.nowSelectCity][i];
                if(count==7){
                    weekname+='--'+i
                    chartData[weekname]=weekval/count;
                    count=1;
                }else{
                    count++;
                }
            }
            break;
        case 'month':
            var monthval=0;
            var monthname='';
            var currentmonth='-1';
            var count=0;
            var firsttime=true;
            for(var i in aqiSourceData[pageState.nowSelectCity]){
                if(i.split('-')[1]!=currentmonth&&!firsttime){
                    chartData[monthname]=monthval/count;
                    monthval=0;
                    count=0;
                }
                monthname= i.split('-')[0]+'-'+i.split('-')[1];
                currentmonth=i.split('-')[1];
                firsttime=false;
                count++;
                monthval+=aqiSourceData[pageState.nowSelectCity][i];
            }
            chartData[monthname]=monthval/count;
            break;
        default:
            break;
    }

    //渲染图表
    document.getElementsByClassName('aqi-chart-wrap')[0].innerHTML='';
    for(var i in chartData){
        var div=document.createElement('div');
        div.className=pageState.nowGraTime;
        div.style.height=chartData[i];
        var color='';
        if(chartData[i]<=50){
            color='ff0000';
        }else if(chartData[i]>50&&chartData[i]<=100){
            color='00ff00';
        }else if(chartData[i]>100&&chartData[i]<=150){
            color='00ffff';
        }else if(chartData[i]>150&&chartData[i]<=200){
            color='0000ff';
        }else if(chartData[i]>200&&chartData[i]<=250){
            color='ffff00';
        }else if(chartData[i]>250&&chartData[i]<=300){
            color='ff00ff';
        }else{
            color='ff7d00'
        }
        div.style.background='#'+color;
        div.setAttribute('title',i+'Qua:'+chartData[i]);
        document.getElementsByClassName('aqi-chart-wrap')[0].appendChild(div);
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(val) {
    // 确定是否选项发生了变化
    if(pageState.nowGraTime==val){
        return false;
    }
    // 设置对应数据
    pageState.nowGraTime=val;
    // 调用图表渲染函数
    renderChart()
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(val) {
    // 确定是否选项发生了变化
    if(pageState.nowSelectCity==val){
        return false;
    }
    // 设置对应数据
    pageState.nowSelectCity=val;
    // 调用图表渲染函数
    renderChart()
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    //init time
    pageState.nowSelectCity=gettimeval();

    //添加事件
    var radionode=document.getElementsByName('gra-time');
    for(var i in radionode){
        addEvent(radionode[i],'click',function(){
            graTimeChange(gettimeval())
        })
    }


    //获取当前radio中时间的值
    function gettimeval(){
        var temp=document.getElementsByName('gra-time');
        var val='';
        for(var i =0;i<temp.length;i++){
            if(temp[i].checked){
                val=temp[i].value;
            }
        }
        return val;
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var html=[];
    for(var i in aqiSourceData){
        html.push('<option value="'+i+'">'+i+'</option>');
    }
    document.getElementById('city-select').innerHTML=html.join('');
    //init city
    pageState.nowSelectCity=document.getElementById('city-select').value;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    addEvent(document.getElementById('city-select'),'change',function(e){
        citySelectChange(document.getElementById('city-select').value);
    })
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    renderChart();
}

function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}
window.onload=function(){
    init();
}
