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
axios.defaults.baseURL = 'http://127.0.0.1:8080'
function outland(){
    $.ajax({
        url: '/api/outlogin',
        type: "GET",
        contentType : "application/json",
        traditional: true,
        success: function(data) {
            // if(data.msg=='OK'){
                swal('退出成功',"退出账号成功","success");
                sessionStorage.clear();
                setTimeout(function () {
                    window.location.assign("/login");
                }, 1000)
            // }else{
            //     swal('退出失败',"退出账号失败","error");
            // }
        },
        error: function (data) {
        }
    });
}
layui.use('element', function(){
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    
    //监听导航点击
    element.on('nav(demo)', function(elem){
      layer.msg(elem.text());
    });
});
let navul=document.getElementById('navul');
function opennav(event){
    if(event.parentNode.classList.contains('nav-itemed')){
        event.getElementsByTagName('i')[0].style.transform=("rotate(0deg)");
        event.parentNode.classList.remove('nav-itemed');
    }else{
        event.getElementsByTagName('i')[0].style.transform=("rotate(180deg)");
        event.parentNode.classList.add('nav-itemed');
    }

}
if(sessionStorage.getItem('power')=='超级管理员'){
    navul.innerHTML+=`
    <li class="nav-item"  style="transition: 0.3s all;">
        <a class="item_top" href="javascript:;" onclick="opennav(this)">超级管理员<i class="fa fa-chevron-up" aria-hidden="true"></i></a>
        <div class="nav-child">
            <a href="examineApplication">审核申请表</a>
            <a href="adminManageUsers">用户管理</a>
            <a href="adminHistory">提交历史</a>
            <a href="superAdminAdd">添加用户</a>
            <a href="InstituteInformationManagement">组织管理</a>
            <a href="addNewIndicator">添加指标</a>
            <a href="adminCreditManagement">学分构成管理</a>
            <a href="adminWatchApplication">细查申请表</a>
        </div>
    </li>

    `
}else if(sessionStorage.getItem('power')=='普通管理员'){
    navul.innerHTML+=`
    <li class="nav-item "  style="transition: 0.3s all;">
        <a class="item_top" href="javascript:;" onclick="opennav(this)">管理员<i class="fa fa-chevron-up" aria-hidden="true"></i></a>
        <div class="nav-child">
            <a href="adminUsers">用户管理</a>
            <a href="examineApplication">审核申请表</a>
            <a href="adminHistory">提交历史</a>
        </div>
    </li>
    `
}