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
function outland(){
    $.ajax({
        url: 'http://127.0.0.1:8080/api/outlogin',
        type: "GET",
        contentType : "application/json",
        traditional: true,
        success: function(data) {
            console.log(data);
            // if(data.msg=='OK'){
                swal('退出成功',"退出账号成功","success");
                setTimeout(function () {
                    window.location.assign("http://127.0.0.1:8080/login");
                }, 1000)
            // }else{
            //     swal('退出失败',"退出账号失败","error");
            // }
        },
        error: function (data) {
            console.log(data);
        }
    });
}
layui.use('element', function(){
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    
    //监听导航点击
    element.on('nav(demo)', function(elem){
      //console.log(elem)
      layer.msg(elem.text());
    });
});