let Tbody = document.getElementsByClassName("Application_main")[0].getElementsByTagName("tbody")[0];
let statusoption=document.getElementsByName('approval_status')[0].getElementsByTagName('option');
let apagenumber=document.getElementsByName('apagenumber')[0].getElementsByTagName('option');
let page_number=document.getElementById('page_number');
let gopage=document.getElementById('gopage');
let pageinput=document.getElementById('pageinput');
let Application_delete=document.getElementById('Application_delete');
let layuinumber=0;
function look(event){
    let id=event.parentNode.parentNode.children[0].innerHTML;

}
function pass(event){
    let oneid=event.parentNode.parentNode.children[0].innerHTML;
    swal({
        title: "你确定驳回该申请表？",
        text: "你确定驳回该申请表？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
            swal('驳回成功', "您所选择的申请表已驳回！", "success");
            axios({
                method: 'put',
                url: 'http://127.0.0.1:8080/api/passpost',
                params:{
                    id: oneid,
                    status:'1'
                }
                }).then(response=>{
                    console.log(response.data);
                    
                }).catch(function (error) {
                    console.log(error);
            });
            changepage(pageinput.value,"1");
        } else{
            swal("您已取消操作")
        }
      })
}
function refuse(event){
    let oneid=event.parentNode.parentNode.children[0].innerHTML;
    swal({
        title: "你确定通过该申请表？",
        text: "你确定通过该申请表？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
            swal('成功', "您所选择的申请表已通过！", "success");
            axios({
                method: 'put',
                url: 'http://127.0.0.1:8080/api/passpost',
                params:{
                    id: oneid,
                    status:'-1'
                }
                }).then(response=>{
                    console.log(response.data);
                    
                }).catch(function (error) {
                    console.log(error);
            });
            changepage(pageinput.value,"1");
        } else{
            swal("您已取消操作")
        }
      })
}
function changepage(page,set) {
    let status;
    let apage;
    for (let n of statusoption) {
        if (n.selected) {
        status=n.value;
          break;
        }
    }
    for (let n of apagenumber) {
        if (n.selected) {
        apage=n.value;
          break;
        }
    }
    pageinput.value=page;
    console.log(apage);
    axios({
        url: 'http://127.0.0.1:8080/api/allapplication',
        method: 'get',
        params: {
            "nodePage":page,
            "pageSize":apage,
            "approval_status":status
        },
    }).then(data => {
        console.log(data.data);
        let redata=data.data.data;
        Tbody.innerHTML='';
        page_number.innerHTML=`共有${redata.records}条，<span>${redata.allPage}</span>页数据  `
        console.log(redata);
        if(set=='1'){
            setlayui(apage,redata.records);
        }
        for (let n = 0; n < redata.pageInfo.length; n++) {
            // let learnn= date.data[n].learn;
            // let learn=learnn ==0? '前端':"后端";
            Tbody.innerHTML +=`
            <tr>
                <td class="ms" style='display:none'>${redata.pageInfo[n].id}</td>
                <td class="ms"><input type="checkbox" name="team_a" value="a"></td>
                <td class="ms">${redata.pageInfo[n].user.name}</td>
                <td class="ms">${redata.pageInfo[n].user.userName}</td>
                <td class="ms">${redata.pageInfo[n].user.academy}</td>
                <td class="ms">${redata.pageInfo[n].user.major_class}</td>
                <td class="ms">${redata.pageInfo[n].creditType.afirstLevel}</td>
                <td class="ms">${redata.pageInfo[n].classify.b_Indicator_name}</td>
                <td class="ms">${redata.pageInfo[n].classify.b_points_available}</td>
                <td class="ml">
                    <a class='mr'  target="_blank" href='particulars?id=${redata.pageInfo[n].id}' onclick='look(this)'>观看详情</a>
                    <a class='md' href='javascript:;' onclick='pass(this)'>通过</a>
                    <a class='md' href='javascript:;' onclick='refuse(this)'>驳回</a>
                </td>
            </tr>
            `
            let ms = document.getElementsByClassName("ms");
            let ml = document.getElementsByClassName("ml");
            for (let i of ms) {
                if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                    i.innerHTML = " ";
                }
            }
            for (let i of ml) {
                if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                    i.innerHTML = " ";
                }
            }
        }
    }).catch(function (error) {
        console.log(error);
    });
}
changepage(1,1);
gopage.onclick=function(){
    let page=pageinput.value;
    let allpage=page_number.getElementsByTagName('span')[0].innerText;
    if(0<page&&page<=allpage&&page==parseInt(page)){
        changepage(page,0);
    }else{
        swal("请输入合理的页数！");
    }
}
function setlayui(apage,records){
    layui.use(['laypage', 'layer'], function(){
        var laypage = layui.laypage
        //自定义样式
        laypage.render({
          elem: 'demo2'
          ,count: records
          ,limit: apage
          ,theme: '#63a5f7'
          ,jump:function(obj){
           document.getElementById("demo2").onclick=function(){
                // pageinput.value=obj.curr;
               changepage(obj.curr,"0")
           }
          }
        });
      });
}
function allover() {
    let all = document.getElementsByName("team_all")[0];
    let a=document.getElementsByName("team_a");
    if (all.checked) {
        for (let n of a) {
            n.checked = true;
        }
    }
    else if (all.checked == false) {
        for (let n of a) {
            n.checked = false;
        }
    }
}
Application_delete.onmousemove = function () {
    let a=document.getElementsByName("team_a");
    let c = false;
    for (let i of a) {
        if (i.checked) {
            c = true;
        }
    }
    if (!c) {
        Application_delete.style.cursor = "not-allowed";
        Application_delete.onclick = () => {
            swal("请勾选你要删除的对象！");
        };
    } else {
        Application_delete.style.cursor = "pointer";
        Application_delete.onclick = deleteall;
    }
}
function deleteall(){
    let a=document.getElementsByName("team_a");
    swal({
        title: "你确定删除选中人的信息?",
        text: "你将无法恢复该用户信息！",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定删除！",
        cancelButtonText: "取消删除！",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                let ptag_ids = new Array();
                // let formData = new FormData();
                let n=1;
                for (let i in a) {
                    if (a[i].checked) {
                        var id = a[i].parentNode.parentNode.children[0].innerHTML;
                        ptag_ids.push(id);
                    }
                }
                axios({
                    method: 'POST',
                    url: 'http://127.0.0.1:8080/api/deletepost',
                    data: ptag_ids,
                })
                    .then((result) => {
                        changepage(pageinput.value,"1");
                        console.log(result.data)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    swal("删除！", "你所勾选的用户信息被删除。", "success");

            } else {
                swal("取消！", "你已经取消删除:", "error");
            }
        });
}