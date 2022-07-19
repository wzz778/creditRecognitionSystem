
let main_content = document.getElementsByClassName("main-content");
let checkbox_list = document.getElementsByClassName('checkbox-list');
let check  = document.getElementsByClassName("check");
let reset = document.getElementsByClassName("reset");
let deletes = document.getElementsByClassName("deletes");
let btn_new = document.getElementsByClassName("btn-new");
let btn_update = document.getElementsByClassName('btn-update');
let btn_del = document.getElementsByClassName('btn-del');
let checkbox_all = document.getElementsByClassName('checkbox-all');
let layer_unselect = document.getElementsByClassName('layer-unselect');
let cover_layer = document.getElementsByClassName('cover-layer');
let layer_list = document.getElementsByClassName('layer-list');
let layer_click = document.getElementsByClassName('layer-click');
let startTime = document.getElementsByClassName('startTimes');
let academy = document.getElementsByClassName('academy');
let grade = document.getElementsByClassName('grade');
let layer_form_radio = document.getElementsByClassName('layer-form-radio');
let layer_input = document.getElementsByClassName('layer-input');
let warn = document.getElementsByClassName('warn');
let radios = document.getElementsByClassName('radios');
let layer_submit = document.getElementsByClassName('layer-submit');
let layer_btn_primary = document.getElementsByClassName('layer-btn-primary');
let check_out = document.getElementsByClassName('check-out');
let search_type = document.getElementsByClassName('search-type');
let btn_primay = document.getElementsByClassName('btn-primay');
let btn_warning = document.getElementsByClassName('btn-warning');
let layer_check = document.getElementsByClassName('layer-check');
let layer_radio = document.getElementsByClassName('layer-radio');
let layer_primary = document.getElementsByClassName('layer-primary');
let major = document.getElementsByClassName('major');
let changes = document.getElementsByClassName('changes');
let layer_this = document.getElementsByClassName('layer-this');
let cover_main = document.getElementsByClassName('cover-main');
let inner = document.getElementsByName('inner');
let header_grade = document.getElementsByClassName('header_grade');
let header_academy = document.getElementsByClassName('header_academy');
let header_class = document.getElementsByClassName('header_class');
let identity = document.getElementsByClassName('identity');
checkbox_all[0].numbers = 0;
checkbox_all[0].changes = -1;


axios({
    method:'get',
    url:'/judgeUser',
}).then((data)=>{
    // console.log(data.data);
    btn_new[0].superPower = data.data.err;
    // if(data.data.err == 0){
    //     selectTitle(layer_click,'identity',4);
    // }
}).catch((err)=>{
    console.log(err);
})


// 用了layui的分页处理
function page(numbers){
    // console.log(numbers);
    // console.log(btn_new[0].allLength)
    layui.use('laypage',function (){
        var laypage = layui.laypage;

        laypage.render({
            elem:'page',
            count:numbers,
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            jump:function (obj,first){
                // console.log(obj.curr);
                // console.log(obj.limit)
                if(!first){
                    render(obj.curr,obj.limit);
                }
            }
        })
    })
}


// 弹出层中的下来选择框 获取下一级的信息
function selectOrganization(id,className,numbers){
    axios({
        method:'get',
        url:'/admins/selectOrganization',
        params:{
            id:id,
        }
    }).then((date)=>{
        // console.log(date.data);
        let all = date.data.data;
        let html = `<dd class="layer-select-tips layer-this ${className}" >请选择</dd>`;
        for(let i=0;i<all.length;i++){
            html += `<dd class="layer-select-tips ${className}" value="${all[i].name}" id="${all[i].id}">${all[i].name}</dd>`;
        }
        layer_list[numbers].innerHTML = html;
        if(numbers == 1){
            selectTitle(layer_click,academy,1);
        }else if(numbers == 2){
            selectTitle(layer_click,major,2);
        }else if(numbers == 3){
            selectTitle(layer_click,grade,3);
        }
    }).catch((err)=>{
        console.log(err);
    })
}


// 获取第一级的信息
function selectYear(){
    axios({
        method:'get',
        url:'/admins/showOrganization',
        params:{},
    }).then((date)=>{
        // console.log(date.data);
        let all = date.data.data;
        let html = `<dd class="layer-select-tips layer-this startTimes" >请选择</dd>`;
        let html_one = `<option value="" class="header_grade">所有</option>`
        for(let i=0;i<all.length;i++){
            html += `<dd class="layer-select-tips startTimes" value="${all[i].name}" id="${all[i].id}">${all[i].name}</dd>`;
            html_one += `<option value="${all[i].name}" id="${all[i].id}" class="header_grade">${all[i].name}</option>`
        }
        layer_list[0].innerHTML = html;
        search_type[0].innerHTML = html_one;
        selectTitle(layer_click,startTime,0);

    }).catch((err)=>{
        console.log(err);
    })
}
selectYear()

search_type[0].onchange = function (){
    // console.log(this.value);
    // console.log(header_grade.length);
    for(let j=0;j<header_grade.length;j++){
        if(header_grade[j].value == this.value){
            // console.log(header_grade[j].id);
            headerOrganization(header_grade[j].id,"header_academy",1);
        }
            // console.log(this.id)
    }
}

search_type[1].onchange = function (){
    // console.log(this.value);
    // console.log(header_academy.length);
    for(let j=0;j<header_academy.length;j++){
        if(header_academy[j].value == this.value){
            // console.log(header_academy[j].id);
            headerOrganization(header_academy[j].id,"header_class",2);
        }
        // console.log(this.id)
    }
}




// 搜索框的下拉选择框的信息
function headerOrganization(id,className,numbers){
    axios({
        method:'get',
        url:'/admins/selectOrganization',
        params:{
            id:id,
        }
    }).then((date)=>{
        // console.log(date.data);
        let all = date.data.data;
        let html = `<option value="" class="${className}">所有</option>`;
        for(let i=0;i<all.length;i++){
            html += `<option value="${all[i].name}" id="${all[i].id}" class="${className}">${all[i].name}</option>`;
        }
        search_type[numbers].innerHTML = html;

    }).catch((err)=>{
        console.log(err);
    })
}





// 初始化页面
function rendering() {
    axios({
        method:'get',
        url:'/admin/commonUserPage',
        params:{
            nodePage:1,
            pageSize: 10,
        },
    }).then((date)=>{
        // console.log(date.data);
        let all = date.data.data.pageInfo;
        // console.log(all);
        let html = "";
        if(all.length != 0){
            for(let i=0;i<all.length;i++){
                html +=`<ul class="header">
                        <li class="checkbox lis">
                            <div class="inner">
                                <input type="checkbox" class="checkbox-list" >
                            </div>
                        </li>
                        <li class="student-name lis">${all[i].name}</li>
                        <li class="student-major lis">${all[i].userName}</li>
                        <li class="student-class lis">${all[i].grade}</li>
                        <li class="student-apply lis">${all[i].major_class}</li>
                        <li class="student-time lis">${all[i].academy}</li>
                        <li class="student-state lis">${all[i].sex}</li>
                        <li class="student-operator operator-check">
                            <span class="opertor-list check-out">查看</span>
                            <span class="opertor-list check">编辑</span>
                            <span class="opertor-list reset">重置</span>
                            <span class="opertor-list deletes">删除</span>
                        </li>
                    </ul>`
            }
        }else{
            html +=`<ul class="header">
                        <li class="search-nothing">没有找到匹配的记录</li>
                    </ul>`
        }
        main_content[0].innerHTML = html;
        let sum = date.data.data.allPages;
        let allPages = date.data.data.allRecords;
        // console.log(sum);
        btn_new[0].allLength = sum * 10;
        // page(allPages);
        // console.log(btn_primay[0].pageSize)
        // console.log(checkbox_list.length)
        for(let i=0;i<checkbox_list.length;i++){
            checkbox_list[i].ids = all[i].uid;
            checkbox_list[i].numbers = i;
            checkbox_list[i].onclick = function (){

                if(this.checked){
                    checkbox_all[0].numbers +=1;
                    checkbox_all[0].name = all[i].name;
                    checkbox_all[0].userName = all[i].userName;
                    checkbox_all[0].grade = all[i].grade;
                    checkbox_all[0].academy = all[i].academy;
                    checkbox_all[0].major_class = all[i].major_class;
                    checkbox_all[0].sex = all[i].sex;
                    // console.log(checkbox_all[0].numbers);
                    index = this.numbers;
                    checkbox_all[0].ids.push(checkbox_list[index].ids);
                    // console.log(checkbox_all[0].ids);
                }else {
                    checkbox_all[0].numbers -= 1;
                    // console.log(checkbox_all[0].numbers);
                    index = this.numbers;
                    for(let j=0;j<checkbox_all[0].ids.length;j++){
                        if(checkbox_all[0].ids[j] == checkbox_list[index].ids){
                            checkbox_all[0].ids.splice(j,1);
                            // console.log(checkbox_all[0].ids);
                        }
                    }
                }
                if(checkbox_all[0].numbers == 1 ){
                    btn_update[0].style.pointerEvents = 'auto';
                }else{
                    btn_update[0].style.pointerEvents = 'none';
                }
            }
            check_out[i].onclick = function () {
                cover_main[1].style.height = '500px'
                let id = checkbox_list[i].ids;
                axios({
                    method:'get',
                    url:'/admin/getUserByClass',
                    params:{
                        UId:id,
                        beginIndex:1,
                        size:1,
                    }
                }).then((date)=>{
                    // console.log(date.data);
                    let user = date.data.data.records;
                    layer_check[0].value = user[0].name;
                    layer_check[1].value = user[0].userName;
                    layer_check[2].value = user[0].grade;
                    layer_check[3].value = user[0].academy;
                    layer_check[4].value = user[0].major_class;
                    for(let i=0;i<layer_radio.length;i++){
                        if(layer_radio[i].value == user[0].sex){
                            let cla = 'layer-form-radioed';
                            switchover(layer_form_radio,i+2,cla);
                        }
                    }
                    cover_layer[1].style.display = 'block';
                }).catch((err)=>{
                    console.log(err);
                })
            }
            
            
            check[i].onclick = function (){
                cover_layer[0].style.display = 'block'
                cover_main[0].style.height = '500px'
                changes[0].innerHTML = `<div class="layer-form-item">
                <label class="layer-form-label">班级</label>
                <div class="layer-input-block">
                    <div class="layer-unselect layer-form-select ">
                        <div class="layer-select-title">
                            <input type="text" name=""  placeholder="请选择" class="layer-input layer-click" >
                        </div>
                    </div>
                </div>
            </div>`
                layer_submit[0].numbers = 1;
                layer_submit[0].ids = i;
                layer_btn_primary[1].sums = 0;
                checkbox_list[i].ids = all[i].uid;
                layer_input[0].value = all[i].name;
                layer_input[1].value = all[i].userName;
                layer_input[2].value = all[i].grade;
                layer_input[3].value = all[i].academy;
                layer_input[4].value = all[i].major_class;
                let sex = all[i].sex;
                // console.log(sex);
                let clist = 'layer-this';
                let cla = 'layer-form-radioed';
                for(let i=0;i<startTime.length;i++){
                    if(startTime[i].innerHTML == layer_input[2].value){
                        switchover(startTime,i,clist);
                        selectOrganization(layer_this[0].id,'academy',1);
                        for(let j=0;j<academy.length;j++) {
                            if (academy[j].innerHTML == layer_input[3].value) {
                                // console.log(academy[j].innerHTML)
                                // console.log(layer_input[3].value)
                                switchover(academy, j, clist);
                            }
                        }
                    }
                }
                for(let z=0;z<radios.length;z++){
                    if(radios[z].value == sex){
                        switchover(layer_form_radio,z,cla);
                        checke(z);
                    }
                }
            }
            reset[i].onclick = function (){
                axios({
                    method:'put',
                    url:'/admin/resetUserPass',
                    params:{
                        id:checkbox_list[i].ids,
                    }
                }).then((date)=>{
                    // console.log(date.data);
                    if(date.data.msg == 'OK'){
                        swal('重置密码成功', "密码是111111", "success");
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
            deletes[i].onclick =function () {
                swal({
                    title: "你确定？",
                    text: "该用户会被删除！",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "删除！",
                    cancelButtonText: "取消",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function(isConfirm) {
                    if (isConfirm) {
                        axios({
                            method:'delete',
                            url:'/admin/delete.doUserInfo',
                            params:{
                                user:checkbox_list[i].ids,
                            }
                        }).then((date)=>{
                            // console.log(date.data);
                            // console.log(btn_primay[0].pageSize);
                            if(date.data.msg == 'OK'){
                                swal('删除成功', "删除成功", "success");
                                render(1,10);
                            }
                        }).catch((err)=>{
                            console.log(err)
                        })
                        // swal("删除!", "该用户已被删除！", "success")
                    } else{
                        swal("取消!", "用户没有被删除！", "error")
                    }
                })
            }
        }

    }).catch((err)=>{
        console.log(err);
    })
}
rendering();






checkbox_all[0].ids = new Array();
let index = -1;


// 分页切换渲染页面
function render(numbers,size){
    // console.log(btn_primay[0].pageSize);
    if(checkbox_all[0].checked){
        checkbox_all[0].click();
    }
    let index = search_type[0].selectedIndex;
    let index_one = search_type[1].selectedIndex;
    let index_two = search_type[2].selectedIndex;
    let his = {
        beginIndex:numbers,
        size:size,
        grade:search_type[0].options[index].value,
        academy:search_type[1].options[index_one].value,
        major_class:search_type[2].options[index_two].value,
        power:'普通用户'
    }
    if(search_type[0].options[index].value == ''){
        delete his.grade
    }
    if(search_type[1].options[index_one].value == ''){
        delete  his.academy
    }
    if(search_type[2].options[index_one].value == ''){
        delete  his.major_class
    }
    // console.log(his);
    axios({
        method:'get',
        url:'/admin/getUserByClass',
        params:his,
    }).then((date)=>{
        // console.log(date.data);
        let all = date.data.data.records;
        // console.log(all);
        let html = "";
        if(all.length != 0){
            for(let i=0;i<all.length;i++){
                html +=`<ul class="header">
                        <li class="checkbox lis">
                            <div class="inner">
                                <input type="checkbox" class="checkbox-list" >
                            </div>
                        </li>
                        <li class="student-name lis">${all[i].name}</li>
                        <li class="student-major lis">${all[i].userName}</li>
                        <li class="student-class lis">${all[i].grade}</li>
                        <li class="student-apply lis">${all[i].major_class}</li>
                        <li class="student-time lis">${all[i].academy}</li>
                        <li class="student-state lis">${all[i].sex}</li>
                        <li class="student-operator operator-check">
                            <span class="opertor-list check-out">查看</span>
                            <span class="opertor-list check">编辑</span>
                            <span class="opertor-list reset">重置</span>
                            <span class="opertor-list deletes">删除</span>
                        </li>
                    </ul>`
            }
        }else{
            html +=`<ul class="header">
                        <li class="search-nothing">没有找到匹配的记录</li>
                    </ul>`
        }
        main_content[0].innerHTML = html;
        for(let i=0;i<checkbox_list.length;i++){
            checkbox_list[i].ids = all[i].uid;
            checkbox_list[i].numbers = i;
            checkbox_list[i].onclick = function (){
                if(this.checked){
                    checkbox_all[0].numbers +=1;
                    checkbox_all[0].name = all[i].name;
                    checkbox_all[0].userName = all[i].userName;
                    checkbox_all[0].grade = all[i].grade;
                    checkbox_all[0].academy = all[i].academy;
                    checkbox_all[0].major_class = all[i].major_class;
                    checkbox_all[0].sex = all[i].sex;
                    // console.log(checkbox_all[0].numbers);
                    index = this.numbers;
                    checkbox_all[0].ids.push(checkbox_list[index].ids);
                    // console.log(checkbox_all[0].ids);
                }else {
                    checkbox_all[0].numbers -= 1;
                    // console.log(checkbox_all[0].numbers);
                    index = this.numbers;
                    for(let j=0;j<checkbox_all[0].ids.length;j++){
                        if(checkbox_all[0].ids[j] == checkbox_list[index].ids){
                            checkbox_all[0].ids.splice(j,1);
                            console.log(checkbox_all[0].ids);
                        }
                    }
                }
                if(checkbox_all[0].numbers == 1 ){
                    btn_update[0].style.pointerEvents = 'auto';
                }else{
                    btn_update[0].style.pointerEvents = 'none';
                }
            }
            check[i].onclick = function (){
                cover_layer[0].style.display = 'block'
                cover_main[0].style.height = '500px'
                changes[0].innerHTML = `<div class="layer-form-item">
                <label class="layer-form-label">班级</label>
                <div class="layer-input-block">
                    <div class="layer-unselect layer-form-select ">
                        <div class="layer-select-title">
                            <input type="text" name=""  placeholder="请选择" class="layer-input layer-click" >
                        </div>
                    </div>
                </div>
                </div>`
                layer_submit[0].numbers = 1;
                layer_submit[0].ids = i;
                layer_btn_primary[1].sums = 0;
                checkbox_list[i].ids = all[i].uid;
                layer_input[0].value = all[i].name;
                layer_input[1].value = all[i].userName;
                layer_input[2].value = all[i].grade;
                layer_input[3].value = all[i].academy;
                layer_input[4].value = all[i].major_class;
                let sex = all[i].sex;
                // console.log(sex);
                let clist = 'layer-this';
                let cla = 'layer-form-radioed';
                for(let i=0;i<startTime.length;i++){
                    if(startTime[i].innerHTML == layer_input[2].value){
                        switchover(startTime,i,clist);
                        selectOrganization(layer_this[0].id,'academy',1);
                        for(let j=0;j<academy.length;j++) {
                            if (academy[j].innerHTML == layer_input[3].value) {
                                // console.log(academy[j].innerHTML)
                                // console.log(layer_input[3].value)
                                switchover(academy, j, clist);
                            }
                        }
                    }
                }
                for(let z=0;z<radios.length;z++){
                    if(radios[z].value == sex){
                        switchover(layer_form_radio,z,cla);
                        checke(z);
                    }
                }
            };
            check_out[i].onclick = function () {

                let id = checkbox_list[i].ids;
                axios({
                    method:'get',
                    url:'/admin/getUserByClass',
                    params:{
                        UId:id,
                        beginIndex:1,
                        size:1,
                    }
                }).then((date)=>{
                    // console.log(date.data);
                    let user = date.data.data.records;
                    layer_check[0].value = user[0].name;
                    layer_check[1].value = user[0].userName;
                    layer_check[2].value = user[0].grade;
                    layer_check[3].value = user[0].academy;
                    layer_check[4].value = user[0].major_class;
                    for(let i=0;i<layer_radio.length;i++){
                        if(layer_radio[i].value == user[0].sex){
                            let cla = 'layer-form-radioed';
                            switchover(layer_form_radio,i+2,cla);
                        }
                    }
                    cover_layer[1].style.display = 'block';
                    cover_main[1].style.height = '500px'
                }).catch((err)=>{
                    console.log(err);
                })
            }
            reset[i].onclick = function (){
                axios({
                    method:'put',
                    url:'/admin/resetUserPass',
                    params:{
                        id:checkbox_list[i].ids,
                    }
                }).then((date)=>{
                    // console.log(date.data);
                    if(date.data.msg == 'OK'){
                        swal('重置密码成功', "密码是111111", "success");
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
            deletes[i].onclick =function () {
                swal({
                    title: "你确定？",
                    text: "您将无法恢复这个虚构的文件！",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "是的，删除！",
                    cancelButtonText: "不，取消",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function(isConfirm) {
                    if (isConfirm) {
                        axios({
                            method:'delete',
                            url:'/admin/delete.doUserInfo',
                            params:{
                                user:checkbox_list[i].ids,
                            }
                        }).then((date)=>{
                            // console.log(date.data);
                            if(date.data.msg == 'OK'){
                                swal('删除成功', "删除成功", "success");
                                render(1,10);
                            }
                        }).catch((err)=>{
                            console.log(err);
                        })
                        // swal("删除!", "您的虚构文件已被删除！", "success")
                    } else{
                        swal("取消!", "您的虚构文件是安全的！", "error")
                    }
                })
            }
        }
        checkbox_all[0].removeAttribute('checked');
        checkbox_all[0].ids.splice(0,checkbox_all[0].ids.length);
        for(let i=0;i<checkbox_list.length;i++){
            checkbox_list[i].removeAttribute('checked');
        }
    }).catch((err)=>{
        console.log(err);
    })
}



// 单个或多个删除
btn_del[0].onclick = function (){
    // console.log(checkbox_all[0].ids)
    swal({
        title: "你确定？",
        text: "该用户会被删除！",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "删除！",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function(isConfirm) {
        if (isConfirm) {
            for(let i = 0;i<checkbox_all[0].ids.length;i++){
                axios({
                    method:'delete',
                    url:'/admin/delete.doUserInfo',
                    params:{
                        user:checkbox_all[0].ids[i],
                    }
                }).then((date)=>{
                    // console.log(date.data);
                    if(date.data.msg == 'OK'){
                        swal('删除成功', "删除成功", "success");
                        render(1,10);
                    }
                })
            }
            // swal("删除!", "该用户已被删除！", "success")
        } else{
            swal("取消!", "用户没有被删除！", "error")
        }
    })
}

// 修改个人信息
btn_update[0].onclick =function () {
    cover_layer[0].style.display = 'block';
    cover_main[0].style.height = '500px'
    layer_submit[0].numbers = 1;
    changes[0].innerHTML = `<div class="layer-form-item">
                <label class="layer-form-label">班级</label>
                <div class="layer-input-block">
                    <div class="layer-unselect layer-form-select ">
                        <div class="layer-select-title">
                            <input type="text" name=""  placeholder="请选择" class="layer-input layer-click" >
                        </div>
                    </div>
                </div>
                </div>`
    layer_input[0].value = checkbox_all[0].name;
    layer_input[1].value = checkbox_all[0].userName;
    layer_input[2].value = checkbox_all[0].grade;
    layer_input[3].value = checkbox_all[0].academy;
    layer_input[4].value = checkbox_all[0].major_class;
    let sex = checkbox_all[0].sex;
    // console.log(sex);
    let clist = 'layer-this';
    let cla = 'layer-form-radioed';
    for(let i=0;i<startTime.length;i++){
        if(checkbox_all[0].ids == checkbox_list[i].ids){
            layer_submit[0].ids = i;
        }
        if(startTime[i].innerHTML == layer_input[2].value){
            switchover(startTime,i,clist);
            selectOrganization(layer_this[0].id,'academy',1);
            for(let j=0;j<academy.length;j++) {
                if (academy[j].innerHTML == layer_input[3].value) {
                    // console.log(academy[j].innerHTML)
                    // console.log(layer_input[3].value)
                    switchover(academy, j, clist);
                }
            }
        }

    }
    for(let j=0;j<radios.length;j++){
        if(radios[j].value == sex){
            switchover(layer_form_radio,j,cla);
            checke(j);
        }
    }
}




// 改变弹出层下拉选择框里面的样式
function switchover(listName,numbers,clList){
    for(let i=0;i<listName.length;i++){
        listName[i].classList.remove(clList);
    }
    listName[numbers].classList.add(clList);
}


// 点击选择框改变样式
function selectTitle(clickName,listName,numbers){
    let flag = true;
    let index2 = 0;
    clickName[numbers].onclick = function (){
        // console.log(numbers);
        if(flag == true){
            checkbox_all[0].changes = numbers;
            layer_list[numbers].style.display = 'block';
            layer_unselect[numbers].classList.add('layer-form-selected');
            // console.log(layer_unselect[numbers].getAttribute('class').indexOf('layer-form-selected') > -1);
            flag = false;
            for(let j=0;j<layer_click.length;j++){
                if( j != checkbox_all[0].changes){
                    if(layer_unselect[j].getAttribute('class').indexOf('layer-form-selected') > -1){
                        layer_click[j].click();
                    }
                }
            }
        }else{
            layer_list[numbers].style.display = 'none';
            layer_unselect[numbers].classList.remove('layer-form-selected');
            // console.log(layer_unselect[numbers].getAttribute('class').indexOf('layer-form-selected') > -1);
            flag = true;
        }
    }


    for(let i=0;i<listName.length;i++){
        listName[i].numbers = i;
        listName[i].onclick = function () {
            // console.log(this.id);
            if(layer_click[numbers].value != this.value){
                emptys(numbers,layer_click);
            }
            layer_unselect[numbers].classList.remove('layer-form-selected');
            layer_list[numbers].style.display = 'none';
            flag = true;
            index2 = this.numbers;
            let clist = 'layer-this';
            switchover(listName,index2,clist);
            clickName[numbers].value = listName[index2].innerHTML;
            if(numbers == 0){
                selectOrganization(this.id,'academy',1);
            }else if(numbers == 1){
                selectOrganization(this.id,'major',2);
            }else if(numbers == 2){
                selectOrganization(this.id,'grade',3);
            }
        }
    }
}





let index1 = 0

// 改变单选框的样式
function checke(numbers){
    for(let i=0;i<radios.length;i++){
        radios[i].removeAttribute('checked');
    }
    radios[numbers].setAttribute('checked','checked');
}

for(let i=0;i<layer_form_radio.length;i++){
    layer_form_radio[i].numbers = i;
    layer_form_radio[i].onclick = function (){
        index1 = this.numbers;
        checke(index1);
        let cla = 'layer-form-radioed';
        switchover(layer_form_radio,index1,cla);
    }
}

// 清空选择
function emptys(numbers,name){
    for(let i=0;i<name.length;i++){
        if(i >numbers && i<4){
            name[i].value = '';
        }
    }
}




// 提示学号输入的格式不正确
layer_input[1].onblur = function (){
    let patrn = /^[0-9]{11}$/
    if(!patrn.exec(this.value)){
        warn[0].innerHTML = `<span class="warning">输入的格式不对</span>`
    }else{
        warn[0].innerHTML = '';
    }
}


// 添加用户
btn_new[0].onclick = function (){
    cover_layer[0].style.display = 'block'

    layer_btn_primary[1].sums = 1;
    layer_submit[0].numbers = 0;
    layer_input[0].value = '';
    layer_input[1].value = '';
    layer_input[2].value = '';
    layer_input[3].value = '';
    if(btn_new[0].superPower == 0){
        changes[0].innerHTML = `<div class="layer-form-item">
                <label class="layer-form-label">专业</label>
                <div class="layer-input-block">
                    <div class="layer-unselect layer-form-select ">
                        <div class="layer-select-title">
                            <input type="text" name=""  placeholder="请选择" class="layer-input layer-click" readonly>
                            <i class="layer-edge"></i>
                        </div>
                        <dl class="layer-list">
                            <dd class="layer-select-tips layer-this major" >请选择</dd>
                            <dd class="layer-select-tips major" >信工212</dd>
                            <dd class="layer-select-tips major" >计科214</dd>
                            <dd class="layer-select-tips major" >通信212</dd>
                            <dd class="layer-select-tips major" >物联212</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="layer-form-item">
                <label class="layer-form-label">班级</label>
                <div class="layer-input-block">
                    <div class="layer-unselect layer-form-select ">
                        <div class="layer-select-title">
                            <input type="text" name=""  placeholder="请选择" class="layer-input layer-click" readonly>
                            <i class="layer-edge"></i>
                        </div>
                        <dl class="layer-list">
                            <dd class="layer-select-tips layer-this grade" >请选择</dd>
                            <dd class="layer-select-tips grade" >信工212</dd>
                            <dd class="layer-select-tips grade" >计科214</dd>
                            <dd class="layer-select-tips grade" >通信212</dd>
                            <dd class="layer-select-tips grade" >物联212</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="layer-form-item">
                <label class="layer-form-label">用户身份</label>
                <div class="layer-input-block">
                    <div class="layer-unselect layer-form-select ">
                        <div class="layer-select-title">
                            <input type="text" name=""  placeholder="请选择" class="layer-input layer-click" readonly>
                            <i class="layer-edge"></i>
                        </div>
                        <dl class="layer-list">
                            <dd class="layer-select-tips layer-this identity" >请选择</dd>
                            <dd class="layer-select-tips identity" >普通用户</dd>
                            <dd class="layer-select-tips identity" >普通管理员</dd>
                        </dl>
                    </div>
                </div>
            </div>
            `;

        selectTitle(layer_click,identity,4);
        cover_main[0].style.height = '600px';
    }else{
        changes[0].innerHTML = `<div class="layer-form-item">
                <label class="layer-form-label">专业</label>
                <div class="layer-input-block">
                    <div class="layer-unselect layer-form-select ">
                        <div class="layer-select-title">
                            <input type="text" name=""  placeholder="请选择" class="layer-input layer-click" readonly>
                            <i class="layer-edge"></i>
                        </div>
                        <dl class="layer-list">
                            <dd class="layer-select-tips layer-this major" >请选择</dd>
                            <dd class="layer-select-tips major" >信工212</dd>
                            <dd class="layer-select-tips major" >计科214</dd>
                            <dd class="layer-select-tips major" >通信212</dd>
                            <dd class="layer-select-tips major" >物联212</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="layer-form-item">
                <label class="layer-form-label">班级</label>
                <div class="layer-input-block">
                    <div class="layer-unselect layer-form-select ">
                        <div class="layer-select-title">
                            <input type="text" name=""  placeholder="请选择" class="layer-input layer-click" readonly>
                            <i class="layer-edge"></i>
                        </div>
                        <dl class="layer-list">
                            <dd class="layer-select-tips layer-this grade" >请选择</dd>
                            <dd class="layer-select-tips grade" >信工212</dd>
                            <dd class="layer-select-tips grade" >计科214</dd>
                            <dd class="layer-select-tips grade" >通信212</dd>
                            <dd class="layer-select-tips grade" >物联212</dd>
                        </dl>
                    </div>
                </div>
            </div>`;
        cover_main[0].style.height = '550px';
    }

}


// 新增的提交和修改的提交
layer_submit[0].onclick = function (){
    let index = 0;
    if(radios[0].hasAttribute('checked')){
        index = 0;
    }else{
        index = 1;
    }
    if(layer_submit[0].numbers == 0){
        if(btn_new[0].superPower == 0){
            var users ={
                "name":layer_input[0].value,
                "userName":layer_input[1].value,
                "grade":layer_input[2].value,
                "academy":layer_input[3].value,
                "major_class":layer_input[5].value,
                "sex": radios[index].value,
                "power":layer_input[6].value,
                "password": "111111",
            }
        }else{
            var users ={
                "name":layer_input[0].value,
                "userName":layer_input[1].value,
                "grade":layer_input[2].value,
                "academy":layer_input[3].value,
                "major_class":layer_input[5].value,
                "sex": radios[index].value,
                "power":'普通用户',
                "password": "111111",
            }
        }

        // console.log(users);
        let patrn = /^[0-9]{11}$/
        if(!patrn.exec(layer_input[1].value)){
            warn[0].innerHTML = `<span class="warning">输入的格式不对</span>`
        }else{
            warn[0].innerHTML = '';
            if(layer_input[0].value != '' && layer_input[2].value != '' && layer_input[3].value != '' && layer_input[4].value != ''){
                axios({
                    method:'post',
                    url:'/admin/User',
                    data:users,
                }).then((date)=>{
                    // console.log(date.data);

                    cover_layer[0].style.display = 'none';
                    swal('添加成功','成功添加','success');
                    render(1,10);
                }).catch((err)=>{
                    // console.log(err);
                })
            }else{
                swal('请把信息填写完整','','error');
            }
        }
    }else{
        let users ={
            "UId":checkbox_list[layer_submit[0].ids].ids,
            "name":layer_input[0].value,
            "userName":layer_input[1].value,
            "grade":layer_input[2].value,
            "academy":layer_input[3].value,
            "major_class":layer_input[4].value,
            "sex": radios[index].value,
            "power":'普通用户',
            "password": "111111",
        }
        // console.log(users);
        let patrn = /^[0-9]{11}$/
        if(!patrn.exec(layer_input[1].value)){
            warn[0].innerHTML = `<span class="warning">输入的格式不对</span>`
        }else{
            warn[0].innerHTML = '';
            if(layer_input[0].value != '' && layer_input[2].value != '' && layer_input[3].value != '' && layer_input[4].value != ''){
                axios({
                    method:'put',
                    url:'/admin/update.do.userInfo',
                    params:users,
                }).then((date)=>{
                    // console.log(date.data);
                    cover_layer[0].style.display = 'none';
                    swal('修改成功','成功修改','success');
                    render(1,10);
                }).catch((err)=>{
                    console.log(err);
                })
            }else{
                swal('请把信息填写完整','','error');
            }
        }
    }

}


// 关闭弹出层
layer_btn_primary[1].onclick = function (){
    layer_input[0].value = "";
    layer_input[1].value = "";
    layer_input[2].value = '';
    layer_input[3].value = "";
    layer_input[4].value = "";
    let clist = 'layer-this';
    switchover(startTime,0,clist);
    switchover(academy,0,clist);
    if( this.sums == 1){
        switchover(grade,0,clist);
    }
    let cla = 'layer-form-radioed';
    switchover(layer_form_radio,1,cla);
    checke(1);
    cover_layer[0].style.display = 'none';
}

// 重置弹出层里面的数据
layer_btn_primary[0].onclick = function (){
    layer_input[0].value = "";
    layer_input[1].value = "";
    layer_input[2].value = '';
    layer_input[3].value = "";
    layer_input[4].value = "";
    let clist = 'layer-this';
    switchover(startTime,0,clist);
    switchover(academy,0,clist);
    if(layer_btn_primary[1].sums == 1){
        switchover(grade,0,clist);
    }
    let cla = 'layer-form-radioed';
    switchover(layer_form_radio,1,cla);
    checke(1);

}

// console.log(layer_btn_primary.length);


// 搜索
btn_primay[0].onclick = function (){
    render(1,10);
    swal('搜索成功','','success');
}

// 重置搜索
btn_warning[0].onclick = function (){
    search_type[0].value = "";
    search_type[1].value = "";
    search_type[2].value = "";
    render(1,10);
}


// 删除的数组里面添加数据和删除数据
function batch(name){
    for(let i=0;i<name.length;i++){
        if(name[i].checked){
            checkbox_all[0].ids.push(checkbox_list[i].ids);
        }else{
            checkbox_all[0].ids.splice(i,name.length);
        }
    }
}


// 全选
checkbox_all[0].onclick = function (){
    if(this.checked){
        for(let i=0;i<checkbox_list.length;i++){
            checkbox_list[i].setAttribute('checked','checked');
        }
        batch(checkbox_list);
        // console.log(checkbox_all[0].ids);
    }else{
        for(let i=0;i<checkbox_list.length;i++){
            checkbox_list[i].removeAttribute('checked');
            // console.log(checkbox_list[i].hasAttribute('checked'));
        }
        batch(checkbox_list);
        // console.log(checkbox_all[0].ids);
    }
}

// 弹出层的关闭
layer_primary[0].onclick = function (){
    cover_layer[1].style.display = 'none';
}