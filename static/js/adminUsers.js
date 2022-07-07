

function page(numbers){
    layui.use('laypage',function (){
        var laypage = layui.laypage;

        laypage.render({
            elem:'page',
            count:numbers,
            jump:function (obj,first){
                console.log(obj.curr);
                console.log(obj.limit)
                if(!first){

                }
            }
        })
    })
}

let main_content = document.getElementsByClassName("main-content");
let checkbox_list = document.getElementsByClassName('checkbox-list');
let check  = document.getElementsByClassName("check");
let reset = document.getElementsByClassName("reset");
let deletes = document.getElementsByClassName("deletes");
let btn_new = document.getElementsByClassName("btn-new");
let btn_update = document.getElementsByClassName('btn-update');
let btn_del = document.getElementsByClassName('btn-del');
let checkbox_all = document.getElementsByClassName('checkbox-all');

checkbox_all[0].ids = new Array();

let index = -1;
function render(numbers){
    // package('get','/admin/commonUserPage',{nodePage:numbers,pageSize:10},function (data){
    //     console.log(data);
    //     let html = template('main-content',data);
    //     main_content[0].innerHTML = html;
    //
    // })
    axios({
        method:'get',
        url:'/admin/commonUserPage',
        params:{
            "nodePage":numbers,
            "pageSize": 10,
        },
    }).then((date)=>{

        let all = date.data.data.allRecords;
        console.log(all);
        // let html = template('main-cont',all);
        // console.log(html);
        let html = "";
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
                        <li class="student-state lis"></li>
                        <li class="student-apply-credit lis"></li>
                        <li class="student-operator operator-check">
                            <span class="opertor-list check-out">查看</span>
                            <span class="opertor-list check">编辑</span>
                            <span class="opertor-list reset">重置</span>
                            <span class="opertor-list deletes">删除</span>
                        </li>
                    </ul>`
        }
        main_content[0].innerHTML = html;

        page(10);
        console.log(checkbox_list.length)
        for(let i=0;i<checkbox_list.length;i++){
            checkbox_list[i].ids = all[i].uid;
            checkbox_list[i].numbers = i;
            checkbox_list[i].onclick = function (){
                if(this.checked){
                    index = this.numbers;
                    checkbox_all[0].ids.push(checkbox_list[index].ids);
                    console.log(checkbox_all[0].ids);
                }else {
                    index = this.numbers;
                    for(let j=0;j<checkbox_all[0].ids.length;j++){
                        if(checkbox_all[0].ids[j] == checkbox_list[index].ids){
                            checkbox_all[0].ids.splice(j,1);
                            console.log(checkbox_all[0].ids);
                        }
                    }
                }
            }
            check[i].onclick = function (){

            }
            reset[i].onclick = function (){
                // $.ajax({
                //     method:'put',
                //     url:'/admin/resetUserPass',
                //     data:{
                //         UId:checkbox_list[i].ids,
                //     },
                //     success:function (date){
                //         console.log(date);
                //     },
                //     error:function (err){
                //         console.log(err);
                //     }
                // })
                axios({
                    method:'put',
                    url:'/admin/resetUserPass',
                    params:{
                        id:checkbox_list[i].ids,
                    }
                }).then((date)=>{
                    console.log(date.data);
                    if(date.data.msg == 'OK'){
                        swal('重置密码成功', "密码是111111", "success");
                    }
                })
            }
            deletes[i].onclick =function () {
                // $.ajax({
                //     method:'delete',
                //     url:'/admin/delete.doUserInfo',
                //     params:{
                //         user:checkbox_list[i].ids,
                //     },
                //     success:function (date){
                //         console.log(date.data);
                //     },
                //     error:function (err){
                //         console.log(err);
                //     }
                // })
                axios({
                    method:'delete',
                    url:'/admin/delete.doUserInfo',
                    params:{
                        user:checkbox_list[i].ids,
                    }
                }).then((date)=>{
                    console.log(date.data);
                    if(date.data.msg == 'OK'){
                        swal('删除成功', "删除成功", "success");
                        render(1);
                    }
                })
            }
        }
    }).catch((err)=>{
        console.log(err);
    })
    // $.ajax({
    //     method:'get',
    //     url:'/admin/commonUserPage',
    //     data:{
    //         "nodePage":numbers,
    //         "pageSize": 10,
    //     },
    //     success:function (date){
    //
    //     },
    //     error:function (err){
    //         console.log(err);
    //     }
    // })
    // axios({
    //     method:'get',
    //     url:'/admin/commonUserPage',
    //     data:{
    //         nodePage:numbers,
    //         pageSize:10
    //     }
    // }).then((data)=>{
    //
    // }).catch((err)=>{
    //     console.log(err);
    // })
}
render(1);




btn_del[0].onclick = function (){
    // $.ajax({
    //     method:'delete',
    //     url:'/admin/delete.doUserInfo',
    //     params:{
    //         user:checkbox_all[0].ids,
    //
    //     },
    //     success:function (date){
    //         console.log(date.data);
    //     },
    //     error:function (err){
    //         console.log(err);
    //     }
    // })
    console.log(checkbox_all[0].ids)
    for(let i = 0;i<checkbox_all[0].ids.length;i++){
        axios({
            method:'delete',
            url:'/admin/delete.doUserInfo',
            params:{
                user:checkbox_all[0].ids[i],
            }
        }).then((date)=>{
            console.log(date.data);
            if(date.data.msg == 'OK'){
                swal('删除成功', "删除成功", "success");
                render(1);
            }
        })
    }
}

let layer_unselect = document.getElementsByClassName('layer-unselect');
let cover_layer = document.getElementsByClassName('cover-layer');
let layer_list = document.getElementsByClassName('layer-list');
let layer_click = document.getElementsByClassName('layer-click');
let layer_select_title = document.getElementsByClassName('layer-select-title')
let layer_select_tips = document.getElementsByClassName('layer-select-tips');
// let layer_click = document.getElementsByClassName('layer-click');
let flag = true;
layer_select_title[0].onclick = function (){
    if(flag == true){
        console.log(1);
        layer_list[0].style.display = 'block';
        layer_unselect[0].classList.add('layer-form-selected');
        flag = false;
    }else{
        console.log(2);
        layer_list[0].style.display = 'none';
        layer_unselect[0].classList.remove('layer-form-selected');
        flag = true;
    }
}
let index2 = 0;

function switchover(){
    for(let i=0;i<layer_select_tips.length;i++){
        layer_select_tips[i].classList.remove('layer-this');
    }
    layer_select_tips[index2].classList.add('layer-this');
}

for(let i=0;i<layer_select_tips.length;i++){
    layer_select_tips[i].numbers = i;
    layer_select_tips[i].onclick = function () {
        layer_unselect[0].classList.remove('layer-form-selected');
        layer_list[0].style.display = 'none';
        flag = true;
        index2 = this.numbers
        switchover();
        layer_click[0].value = this.nodeValue;
        console.log(layer_click[0].value)
    }
}