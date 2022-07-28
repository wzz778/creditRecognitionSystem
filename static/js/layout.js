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
                    window.history.replaceState(null, "", '/login');
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
let navul=document.getElementById('renavul');
function opennav(event){
    if(event.parentNode.classList.contains('renav-itemed')){
        event.getElementsByTagName('i')[1].style.transform=("rotate(0deg)");
        event.parentNode.classList.remove('renav-itemed');
    }else{
        event.getElementsByTagName('i')[1].style.transform=("rotate(180deg)");
        event.parentNode.classList.add('renav-itemed');
    }

}
if(sessionStorage.getItem('power')=='超级管理员'){
    navul.innerHTML+=`
    <li class="renav-item renav-itemed"  style="transition: 0.3s all;">
        <a class="item_top" href="javascript:;" onclick="opennav(this)"><i class="fa fa-users iii" aria-hidden="true"></i>超级管理员<i class="fa fa-chevron-up" aria-hidden="true"></i></a>
        <div class="child">
            <a class="columna" href="InstituteInformationManagement"><i class="fa fa-users" aria-hidden="true"></i>组织管理</a>
            <a class="columna" href="adminManageUsers"><i class="fa fa-user-circle-o" aria-hidden="true"></i>用户管理</a>
            <a class="columna" href="superAdminAdd"><i class="fa fa-user-plus" aria-hidden="true"></i>添加用户</a>
            <a class="columna" href="adminCreditManagement"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>学分构成管理</a>
            <a class="columna" href="addNewIndicator"><i class="fa fa-plus" aria-hidden="true"></i>添加指标</a>
            <a class="columna" href="adminHistory"><i class="fa fa-history" aria-hidden="true"></i> 提交历史</a>
            <a class="columna" href="examineApplication"><i class="fa fa-file-excel-o" aria-hidden="true"></i>审核申请表</a>
            <a class="columna" href="adminWatchApplication"><i class="fa fa-file-excel-o" aria-hidden="true"></i>查看申请表</a>
        </div>
    </li>
    `
    let columna=document.getElementsByClassName('columna');
    let pagename=location.pathname;
    if (pagename=='/submitApplication') {
        console.log(columna[1].innerHTML);
        columna[1].style.background="#1271D5";
    }else if(pagename=='/history') {
        columna[0].style.background="#1271D5";
    }else if(pagename=='/InstituteInformationManagement') {
        columna[2].style.background="#1271D5";
    }else if(pagename=='/adminManageUsers') {
        columna[3].style.background="#1271D5";
    }else if(pagename=='/superAdminAdd') {
        columna[4].style.background="#1271D5";
    }else if(pagename=='/adminCreditManagement') {
        columna[5].style.background="#1271D5";
    }else if(pagename=='/addNewIndicator') {
        columna[6].style.background="#1271D5";
    }else if(pagename=='/adminHistory') {
        columna[7].style.background="#1271D5";
    }else if(pagename=='/examineApplication') {
        columna[8].style.background="#1271D5";
    }else if(pagename=='/adminWatchApplication') {
        columna[9].style.background="#1271D5";
    }
}else if(sessionStorage.getItem('power')=='普通管理员'){
    navul.innerHTML+=`
    <li class="renav-item renav-itemed"  style="transition: 0.3s all;">
        <a class="item_top" href="javascript:;" onclick="opennav(this)"><i class="fa fa-user iii" aria-hidden="true"></i>管理员<i class="fa fa-chevron-up" aria-hidden="true"></i></a>
        <div class="child">
            <a class="columna" href="adminUsers"><i class="fa fa-user-circle-o" aria-hidden="true"></i>用户管理</a>
            <a class="columna" href="examineApplication"><i class="fa fa-file-excel-o" aria-hidden="true"></i>审核申请表</a>
            <a class="columna" href="adminHistory"><i class="fa fa-history" aria-hidden="true"></i> 提交历史</a>
        </div>
    </li>   
    `
    let columna=document.getElementsByClassName('columna');
    let pagename=location.pathname;
    if (pagename=='/submitApplication') {
        columna[1].style.background="#1271D5";
    }else if(pagename=='/history') {
        columna[0].style.background="#1271D5";
    }else if(pagename=='/adminUsers') {
        columna[2].style.background="#1271D5";
    }else if(pagename=='/examineApplication') {
        columna[3].style.background="#1271D5";
    }else if(pagename=='/adminHistory') {
        columna[4].style.background="#1271D5";
    }
}else{
    let columna=document.getElementsByClassName('columna');
    let pagename=location.pathname;
    if (pagename=='/submitApplication') {
        columna[1].style.background="#1271D5";
    }else if(pagename=='/history') {
        columna[0].style.background="#1271D5";
    }
}

