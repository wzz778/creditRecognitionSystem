

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
    $.ajax({
        method:'get',
        url:'admin/commonUserPage',
        data:{
            nodePage:numbers,
            pageSize: 10,
        },
        success:function (date){
            console.log(date);
            let html = template('main-content',date);
            main_content[0].innerHTML = html;
            page(date);
            for(let i=0;i<checkbox_list.length;i++){
                checkbox_list[i].ids = '';
                checkbox_list[i].numbers = i;
                checkbox_list[i].onclick = function (){
                    if(this.checked){
                            index = this.numbers;
                            checkbox_all[0].ids.push(index);
                            console.log(checkbox_all[0].ids);
                    }else {
                        index = this.numbers;
                        for(let j=0;j<checkbox_all[0].ids.length;j++){
                            if(j == index){
                                checkbox_all[0].ids.splice(j,1);
                                console.log(checkbox_all[0].ids);
                            }
                        }
                    }
                }
                check[i].onclick = function (){

                }
                reset[i].onclick = function (){
                    $.ajax({
                        method:'put',
                        url:'/admin/resetUserPass',
                        data:{
                            UId:checkbox_list[i].ids,
                        },
                        success:function (date){
                            console.log(date);
                        },
                        error:function (err){
                            console.log(err);
                        }
                    })
                    // axios({
                    //     method:'put',
                    //     url:'/admin/update.do.userInfo',
                    //     data:{
                    //         UId:checkbox_list[i].ids,
                    //     }
                    // })
                }
                deletes[i].onclick =function () {
                    $.ajax({
                        method:'delete',
                        url:'/admin/delete.doUserInfo',
                        data:{
                            user:checkbox_list[i].ids,
                        },
                        success:function (date){
                            console.log(date);
                        },
                        error:function (err){
                            console.log(err);
                        }
                    })
                    // axios({
                    //     method:'delete',
                    //     url:'/admin/delete.doUserInfo',
                    //     data:{
                    //         user:checkbox_list[i].ids,
                    //     }
                    // })
                }
            }
        },
        error:function (err){
            console.log(err);
        }
    })
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

// function paging(){
//     package('get','/admin/commonUserPage',{nodePage:numbers,pageSize:10},function (data){
//         console.log(data);
//         layui.use('laypage',function (){
//             var laypage = layui.laypage;
//
//             laypage.render({
//                 elem:'page',
//                 count:data.data.length,
//                 jump:function (obj,first){
//                     console.log(obj.curr);
//                     console.log(obj.limit)
//                     if(!first){
//
//                     }
//                 }
//             })
//         })
//     })
// }


btn_del[0].onclick = function (){
    $.ajax({
        method:'delete',
        url:'/admin/delete.doUserInfo',
        data:{
            user:checkbox_all[0].ids,
        },
        success:function (date){
            console.log(date);
        },
        error:function (err){
            console.log(err);
        }
    })
}