/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city=document.getElementById('aqi-city-input').value.trim();
    var airval=document.getElementById('aqi-value-input').value.trim();
    if(!(new RegExp("^[\u4e00-\u9fa5a-zA-Z]+$")).test(city)){
        alert('城市名称只能包含中文和英文。');
        return false;
    }
    if(!new RegExp("^[0-9]*$").test(airval)){
        alert('空气质量指数只能为数字.');
        return false;
    }
    aqiData[city]=airval;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var htmlarr=[];
    htmlarr.push('<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>')
    for(var i in aqiData){
        htmlarr.push('<tr><td>'+i+'</td><td>'+aqiData[i]+'</td><td><button class="delbtn">删除</button></td></tr>');
    }
    document.getElementById('aqi-table').innerHTML=htmlarr.join('');
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
    // do sth.
    var target= e.target;
    if(target.tagName=='BUTTON'){
        var delname=target.parentNode.parentNode.childNodes[0].innerHTML;
        delete aqiData[delname];
        renderAqiList();
    }

}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById('add-btn').onclick=function(){
        addBtnHandle();
    }

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    addEvent(document.getElementById('aqi-table'),'click',delBtnHandle)
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
}
//删除前后的空格
String.prototype.trim = function()
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
window.onload=function(){
    init();
}
