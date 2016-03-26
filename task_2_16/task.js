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
	var strExp = new RegExp("^[a-zA-Z\\u4E00-\\u9FFF]+$","g");
	var numExp = new RegExp("^[0-9]+$","g");
	var city = document.getElementById('aqi-city-input');
	var value = document.getElementById('aqi-value-input');
	// console.log(strExp.test("啊a"))
	// console.log(strExp.test(document.getElementById('aqi-city-input').value.trim()))
	if(!strExp.test(city.value.trim())){
		city.nextElementSibling.style.visibility = "visible";
		return;
	}
	if(!numExp.test(value.value.trim())){
		city.nextElementSibling.style.visibility = "hidden";
		value.nextElementSibling.style.visibility = "visible";
		return;
	}
	city.nextElementSibling.style.visibility = "hidden";
	value.nextElementSibling.style.visibility = "hidden";
	aqiData[city.value] = value.value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	if(JSON.stringify(aqiData) === "{}"){
		table.innerHTML = "";
		return;
	}
	var text = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"
	for(var i in aqiData){
		text += "<tr><td>" + i + "</td><td>" + aqiData[i] +　"</td><td style='cursor: pointer;' class='del'>删除</td></tr>"
	}
	table.innerHTML = text;
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
function delBtnHandle(target) {
	var city = target.parentNode.firstChild.innerHTML;
	delete aqiData[city];
 	renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  // document.getElementById("add-btn").onclick = addBtnHandle;
  //想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.onclick = function(e){
  	if(e.target.id === "add-btn"){
  		addBtnHandle();
  	}
  	if(e.target.className === "del"){
  		delBtnHandle(e.target);
  	}
  }
}

window.onload = init;