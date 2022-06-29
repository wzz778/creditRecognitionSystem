let head_cord=document.getElementById('head-cord');
let head_cord_fade=document.getElementById('head-cord-fade');
function dropdown() {
    head_cord_fade.style.display = 'block'
}
head_cord.onmousemove=dropdown;
head_cord_fade.onmousemove=dropdown;
head_cord_fade.onmouseout=function(){
    head_cord_fade.style.display = 'none'
}
head_cord.onmouseout=function(){
    head_cord_fade.style.display = 'none'
}
layui.use('element', function(){
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    
    //监听导航点击
    element.on('nav(demo)', function(elem){
      //console.log(elem)
      layer.msg(elem.text());
    });
});