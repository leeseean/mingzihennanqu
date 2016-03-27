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
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(city,graTime) {
  var aqiChartWrap= document.getElementById('aqi-chart-wrap');
  var cityStr = document.getElementById('city-select').getElementsByTagName('option')[city].innerHTML;
  var aqiArr = chartData[cityStr][graTime];
  var inner = "";
  for (var i = 0; i < aqiArr.length; i++) {
    inner += "<div class='data-box'><div class='data-bar' style='height:" + aqiArr[i] + "px'></div><div class='data-content'>" + aqiArr[i] + "</div></div>"
  }
  aqiChartWrap.innerHTML = inner;
  var dataBar = document.querySelectorAll(".data-bar");
  for (var i = 0; i < dataBar.length; i++) {
    dataBar[i].onmouseover = function(){
      this.parentNode.style.zIndex = 10;
      this.nextSibling.style.bottom = this.offsetHeight + 20 + "px";
      this.nextSibling.style.display = "block";
      this.onmouseout = function(){
        this.parentNode.style.zIndex = 0;
        this.nextSibling.style.display = "none";
      }
    }
  }
  
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
  // 确定是否选项发生了变化 
  if(value === pageState.nowGraTime) return;
  // 设置对应数据
  pageState.nowGraTime = value;
  // 调用图表渲染函数
  renderChart(pageState.nowSelectCity,pageState.nowGraTime);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  var citySelect = document.getElementById('city-select');
  var cityList = citySelect.getElementsByTagName('option');
  // 确定是否选项发生了变化 
  if (citySelect.value === cityList[pageState.nowSelectCity].innerHTML) {
    return;
  }
  // 设置对应数据
  for (var i = 0; i < cityList.length; i++) {
    if(cityList[i].innerHTML === citySelect.value){
      pageState.nowSelectCity = i;
      break;
    }
  }
  // 调用图表渲染函数
  renderChart(pageState.nowSelectCity,pageState.nowGraTime);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  document.onclick = function(e){
    if(e.target.name === "gra-time"){
      graTimeChange(e.target.value);
    }
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var selectText = "";
  var citySelect = document.getElementById('city-select');
  for(var i in aqiSourceData){
    selectText += "<option>" + i + "</option>"
  }
  citySelect.innerHTML = selectText;
  pageState.nowSelectCity = 0;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for(var i in aqiSourceData){
    chartData[i] = {};
    chartData[i].day = [];
    chartData[i].week = [];
    chartData[i].month = [];
    var weekSum = 0;
    var weekDayCount = 0;
    var monthSum = 0;
    var monthDayCount = 0;
    var m = 0;
    for(var j in aqiSourceData[i]){
      var date = new Date(j);
      var nextDay = new Date(j);
      nextDay.setDate(date.getDate() + 1);
      // console.log(nextDay)
      //处理天为粒度的数据
      chartData[i].day.push(aqiSourceData[i][j]);
      //处理周为粒度的数据
      weekSum += aqiSourceData[i][j];
      weekDayCount++;
      if(date.getDay() === 6 || nextDay.getMonth() === 3){
        chartData[i].week.push(Math.round(weekSum/weekDayCount));
        weekSum = 0;
        weekDayCount = 0;
      }
      //处理月为粒度的数据
      if (nextDay.getMonth() !== m) {
        chartData[i].month.push(Math.round(monthSum/monthDayCount));
        monthSum = 0;
        monthDayCount = 0;
        m = nextDay.getMonth();
      }
      monthSum += aqiSourceData[i][j];
      monthDayCount++;
    }
  }
  console.log(chartData)
}

/**
 * 初始化函数
 */
function init() {
  initAqiChartData();
  initGraTimeForm()
  initCitySelector();
  renderChart(pageState.nowSelectCity,pageState.nowGraTime);
}

window.onload = init;
