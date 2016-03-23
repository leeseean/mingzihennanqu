//保存数据的数组
var data=[];
function $(id)
{
    return document.getElementById(id);
}
//添加一个数
function add(pos){
    var numval= $('num').value;
    if(!(new RegExp('^-?\\d+$').test(numval))){
        alert('请输入整数！');
        return false;
    }
    if(pos=='left'){
        data.unshift(numval);
    }else{
        data.push(numval);
    }
    render();
}
//删除一个数
function out(pos){
    if(data.length==0){
        alert('数据为空，已无数据可出！');
        return false;
    }
    if(pos=='left'){
        var val=data.shift();
        alert(val);
    }else{
        var val=data.pop();
        alert(val);
    }
    render();
}
//根据数组展现数据
function render(){
    var html=[];
    data.forEach(function(val,index){
        html.push('<div index="'+index+'">'+val+'</div>');
    });
    $('holder').innerHTML=html.join('');
}
//事件初始化
function initevent(){
    $('leftin').onclick=function(){
        add('left');
    }
    $('rightin').onclick=function(){
        add('right');
    }
    $('leftout').onclick=function(){
        out('left');
    }
    $('rightout').onclick=function(){
        out('right');
    }
    $('holder').onclick=function(e){
        if(e.target.tagName=='DIV'){
            var index= e.target.getAttribute('index');
            data.splice(index,1);
            render();
        }
    }
}
window.onload=function(){
    initevent();
}