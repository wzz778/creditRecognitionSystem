let grade=document.getElementById('grade');
let grades=document.getElementsByClassName('grade');
let reclassdiv=document.getElementById('reclassdiv');
let body=document.getElementById('Contentbody');
let addclassdiv=document.getElementById('addclassdiv');
let academy=document.getElementById('academy');
let academys=document.getElementsByClassName('academy');
let remajordiv=document.getElementById('remajordiv');
let reclassop=document.getElementById('reclassop');/*  */
let newmagor=document.getElementById('newmagor');
let newclassfa=document.getElementById('newclassfa');
let funbutton=document.getElementsByClassName('topOperator')[0].getElementsByTagName('button');
let bodyTop=document.getElementsByClassName('bodyTop');
for(let i in funbutton){
    funbutton[i].onclick=function(){
        bodyTop[i].style.display='block';
    }
}
// 弹窗取消函数
let cancel=document.getElementsByClassName('cancel')
for(let i=0;i<cancel.length;i++){
    cancel[i].onclick=function(){
        cancel[i].parentElement.parentElement.parentElement.style.display='none'
    }
}
function isnull(val) {
 
    let str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
  
    if (str == '' || str == undefined || str == null) {
        return true;
    } else {
        return false;
    }
  }
  function htmllEscape(htmlstr){
    return htmlstr.replace(/<|>"|&/g,(match)=>{
        switch(match){
            case '<':
                return "&lt"
            case '>':
                return "&gt"
            case '&':
                return "&amp"
        }
    })
 }
 function openhtmllEscape(htmlstr){
    return htmlstr.replace(/&lt|&gt"|&amp/g,(match)=>{
        switch(match){
            case '&lt':
                return "<"
            case '&gt':
                return ">"
            case '&amp':
                return ""
        }
    })
 }  
function getgrade(){
    axios({
        method: 'get',
        url: '/api/getgrade',
        }).then(response=>{
            // console.log(response.data);
            let date=response.data.data;
            for(let n in grades){
                grades[n].innerHTML='';
                // grades[n].innerHTML='<option value="0">请选择...</option>';
                for(let i of date){
                    grades[n].innerHTML+=`
                        <option value="${i.id}">${i.name}</option>
                    `
                }
            }
            begingetacademy();
        }).catch(function (error) {
    });
}
getgrade();
function begingetacademy(){
    let option = grade.getElementsByTagName('option');
    for (let n of option) {
      if (n.selected) {
        axios({
            method: 'get',
            url: '/api/getacademy',
            params:{id:n.value},
            }).then(response=>{
                let date=response.data.data;
                for(let n in academys){
                    academys[n].innerHTML='';
                    // grades[n].innerHTML='<option value="0">请选择...</option>';
                    for(let i of date){
                        academys[n].innerHTML+=`
                            <option value="${i.id}">${i.name}</option>
                        `
                    }
                }
                getmajor()
                // for(let i of date){
                //     academy.innerHTML+=`
                //         <option value="${i.id}">${i.name}</option>
                //     `
                //     getmajor()
                // }
            }).catch(function (error) {
        });
        break;
      }
    }
}
function getacademy(){
    let option = grade.getElementsByTagName('option');
    for (let n of option) {
      if (n.selected) {
        axios({
            method: 'get',
            url: '/api/getacademy',
            params:{id:n.value},
            }).then(response=>{
                let date=response.data.data;
                academy.innerHTML='';
                // academy.innerHTML='<option value="0">请选择...</option>';
                getmajor()
                for(let i of date){
                    academy.innerHTML+=`
                        <option value="${i.id}">${i.name}</option>
                    `
                    getmajor()
                }
            }).catch(function (error) {
        });
        break;
      }
    }
}
// getacademy()
function getmajor(){
    let option=academy.getElementsByTagName('option');
    if(option.length==0){
        body.innerHTML=`
        <div class="emptymeaage" style="padding-top: 100px;width: 100%;height: 200px;text-align: center;font-size: 16px;">
            <i class="fa fa-files-o" aria-hidden="true" style="padding-bottom: 10px;color: #68b0f3;font-size: 40px;"></i></br>
            什么都没有呢 . . .
        </div>
            `
            return
    }
    for (let n of option) {
      if (n.selected) {
        axios({
            method: 'get',
            url: '/api/getacademy',
            params:{id:n.value},
            }).then(response=>{
                // console.log(response.data);
                let date=response.data.data;
                body.innerHTML='';
                if(date.length==0){
                    body.innerHTML=`
                <div class="emptymeaage" style="padding-top: 100px;width: 100%;height: 200px;text-align: center;font-size: 16px;">
                    <i class="fa fa-files-o" aria-hidden="true" style="padding-bottom: 10px;color: #68b0f3;font-size: 40px;"></i></br>
                    什么都没有呢 . . .
                </div>
                    `
                    return
                }
                for(let i in date){
                    body.innerHTML+=`
                        <div class="InfoContentItem">
                            <ul class='open'>
                                <li class="id">${date[i].id}</li>
                                <li class="constituteSty">
                                    <span class="expandItem" onclick='watchChild(this)'>
                                        <span class="remove"></span>
                                        <span onclick="" class=""></span>
                                    </span>
                                    <span class="majorname">${date[i].name}</span>
                                </li>
                                <li>${parseInt(i)+1}</li>
                                <li>
                                    <button class="addbu" onclick="toaddclass(this)">添加班级</button>
                                    <button class="rebu" onclick="toremajor(this)">修改</button>
                                    <button class="debu" onclick="delmajor(this)">删除</button>
                                </li>
                            </ul>
                            <!-- 存放班级的盒子 -->
                            <div class="InfoContentItemson" style="display: none;">

                            </div>
                        </div>
                    `
                }
            }).catch(function (error) {
                swal('提交失败', '网络错误', 'error');
                // console.log(error);
        });
        break;
      }
    }
}
function watchChild(event) {
    let faid=event.parentElement.parentElement.firstElementChild.innerHTML;
    // console.log(faid);
    let son=event.parentElement.parentElement.parentElement.getElementsByClassName('InfoContentItemson')[0];
    axios({
        method: 'get',
        url: '/api/getacademy',
        params:{id:faid},
        }).then(response=>{
            // console.log(response.data);
            let date=response.data.data;
            son.innerHTML=''
            if(date.length==0){
                son.innerHTML=`
                <div id="emptymeaage" style="border-bottom: 1px solid #242424; background-color:#DDDDDD;pading:10px 0;width: 100%;height: 80px;text-align: center;font-size: 16px;">
                    <i class="fa fa-files-o" aria-hidden="true" style="padding: 10px 0;color: #68b0f3;font-size: 28px;"></i></br>
                    什么都没有呢 . . .
                </div>
                `
                return
            }
            for(let i in date){
                son.innerHTML+=`
                    <ul class='open'>
                        <li class="id">${date[i].id}</li>
                        <li class='majorname'>${date[i].name}</li>
                        <li>${parseInt(i)+1}</li>
                        <li>
                            <button class="rebu" onclick="toreclass(this)">修改</button>
                            <button class="debu" onclick="delclass(this)">删除</button>
                        </li>
                    </ul>
                `
            }
        }).catch(function (error) {
            swal('提交失败', '网络错误', 'error');
            // console.log(error);
    });
    // 判断内容盒子是否显现
    if (event.parentElement.parentElement.parentElement.lastElementChild.style.display == 'none') {
        event.parentElement.parentElement.parentElement.lastElementChild.style.display = ''
        event.firstElementChild.style.display = 'none'
    } else {
        event.parentElement.parentElement.parentElement.lastElementChild.style.display = 'none'
        event.firstElementChild.style.display = ''
    }
}
function addgrade(event){
    let input=event.parentNode.parentNode.getElementsByTagName('input')[0];
    if(isnull(input.value)){
        swal("请填写内容！");
        return
    }else if(isNaN(input.value)){
        swal("请填写纯数字！")
        return
    }else if(2000>input.value||3000<input.value){
        swal("请输入合理的年份！")
        return
    }else{
        swal({
            title: "你确定添加该组织？",
            text: "你确定添加该组织？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: false
          }, function (isConfirm) {
            if (isConfirm) {
                  axios({
                      url:'/api/addorgin',
                      method:'post',
                      data:{
                          'level':'1',
                          'name':input.value,
                          'super_id':'0'
                      },  
                  }).then(response=>{
                    if(response.data.msg=="插入重复数据"){
                        swal('提交失败', '您所填写的组织已存在', 'error');
                    }else{
                        swal('提交成功', '您所填写的组织添加成功', 'success');
                        console.log(response.data);
                        getgrade();
                        input.value=''
                        bodyTop[2].style.display='none';
                    }
                  }).catch(function (error) {
                    swal('提交失败', '网络错误', 'error');
                    //   console.log(error);
                  });

            } else {
                swal("您已经取消操作")
            }
          })
    }
}
function delgrade(event){
    let option=document.getElementById('delgradein').getElementsByTagName('option');
    let ptag_ids = new Array();
    for (let n of option) {
        if (n.selected) {
            ptag_ids.push(n.value);
          break;
        }
    }  
    swal({
        title: "你确定删除该组织？",
        text: "你确定删除该组织？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
              swal('删除成功', '您所选的组织删除成功', 'success');
              axios({
                  method: 'POST',
                  url: '/api/deleteorganization',
                  data: ptag_ids,
              })
              .then((result) => {
                //   console.log(result)
                  getgrade();
                  bodyTop[0].style.display='none';
              })
              .catch((err)=>{
                swal('提交失败', '网络错误', 'error');
                //   console.log(err)
              })
        } else {
            swal("您已经取消操作")
        }
      })
}
function regrade(event){
    let option=document.getElementById('regrade').getElementsByTagName('option');
    let input=document.getElementById('regrade').getElementsByTagName('input')[0];
    let reid;
    for (let n of option) {
        if (n.selected) {
           reid=n.value;
          break;
        }
    }  
    if(reid=="0"){
        swal("请选择组织！");
        return
    }
    if(isnull(input.value)){
        swal("请填写组织名称！");
        return
    }else if(isNaN(input.value)){
        swal("请填写纯数字！")
        return
    }else if(2000>input.value||3000<input.value){
        swal("请输入合理的年份！")
        return
    }
    swal({
        title: "你确定修改该组织？",
        text: "你确定修改该组织？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
            axios({
                method: 'put',
                url: '/api/uploador',
                params:{
                    level:'1',
                    id: reid,
                    name:input.value
                }
            }).then(response=>{
                    if(response.data.msg=="插入重复数据"){
                        swal('提交失败', '您所填写的组织已存在', 'error');
                    }else{
                        swal('修改成功', '您所选的组织修改成功', 'success');

                        // console.log(response.data);
                        getgrade();
                        input.value=''
                        bodyTop[1].style.display='none';
                    }
                }).catch(function (error) {
                    swal('提交失败', '网络错误', 'error');
                    // console.log(error);
            });
        } else {
            swal("您已经取消操作")
        }
      })
}
function addacamacy(event){
    let input=event.parentNode.parentNode.getElementsByTagName('input')[0];
    let option=document.getElementById('addacamacy1').getElementsByTagName('option');
    let reid;
    for (let n of option) {
        if (n.selected) {
           reid=n.value;
          break;
        }
    }  
    if(reid=="0"){
        swal("请选择组织！");
        return
    }
    if(isnull(input.value)){
        swal("请填写组织名称！");
        return
    }
    swal({
        title: "你确定添加该组织？",
        text: "你确定添加该组织？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
            axios({
                url:'/api/addorgin',
                method:'post',
                data:{
                    'level':'2',
                    'name':input.value,
                    'super_id':reid
                },  
            }).then(response=>{
                if(response.data.msg=="插入重复数据"){
                    swal('提交失败', '您所填写的组织已存在', 'error');
                }else{
                    swal('提交成功', '您所填写的组织添加成功', 'success');

                    // console.log(response.data);
                    getacademy()
                        // getgrade();
                    input.value=''
                    bodyTop[5].style.display='none';
                }
            }).catch(function (error) {
                swal('提交失败', '网络错误', 'error');
                // console.log(error);
            });

        } else {
            swal("您已经取消操作")
        }
      })
}
function delacademy(event){
    let option=document.getElementById('delac').getElementsByTagName('option');
    let ptag_ids = new Array();
    for (let n of option) {
        if (n.selected) {
            if(n.value=="0"){
                swal("请选择您要删除的学院！")
                return 
            }
            ptag_ids.push(n.value);
          break;
        }
    }  
    swal({
        title: "你确定删除该组织？",
        text: "你确定删除该组织？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
              swal('删除成功', '您所选的组织删除成功', 'success');
              axios({
                method: 'POST',
                url: '/api/deleteorganization',
                data: ptag_ids,
            })
            .then((result) => {
                // console.log(result)
                getacademy()
                bodyTop[3].style.display='none';
            })
            .catch((err)=>{
                swal('提交失败', '网络错误', 'error');
                // console.log(err)
            })
        } else {
            swal("您已经取消操作")
        }
      })
}
function getacademy1(event){
    let option = event.getElementsByTagName('option');
    let getac= event.parentElement.parentElement.getElementsByTagName('select')[1];
    for (let n of option) {
      if (n.selected) {
        axios({
            method: 'get',
            url: '/api/getacademy',
            params:{id:n.value},
            }).then(response=>{
                // console.log(response.data);
                let date=response.data.data;
                getac.innerHTML='<option value="0">请选择...</option>';
                for(let i of date){
                    getac.innerHTML+=`
                        <option value="${i.id}">${i.name}</option>
                    `
                }
            }).catch(function (error) {
                swal('提交失败', '网络错误', 'error');
                // console.log(error);
        });
        break;
      }
    }
}
function reacamacy(event){
    let input=event.parentNode.parentNode.getElementsByTagName('input')[0];
    let option=document.getElementById('getac').getElementsByTagName('option');
    let reid;
    for (let n of option) {
        if (n.selected) {
           reid=n.value;
          break;
        }
    }  
    if(reid=="0"){
        swal("请选择组织！");
        return
    }
    if(isnull(input.value)){
        swal("请填写组织名称！");
        return
    }
    swal({
        title: "你确定修改该组织？",
        text: "你确定修改该组织？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
            axios({
                method: 'put',
                url: '/api/uploador',
                params:{
                    level:'2',
                    id: reid,
                    name:input.value
                }
                }).then(response=>{
                    if(response.data.msg=="插入重复数据"){
                        swal('提交失败', '您所填写的组织已存在', 'error');
                    }else{
                        swal('修改成功', '您所选的组织修改成功', 'success');
                        getacademy()
                        console.log(response.data);
                        input.value=''
                        bodyTop[4].style.display='none';
                    }
                }).catch(function (error) {
                    swal('提交失败', '网络错误', 'error');
                    // console.log(error);
            });
        } else {
            swal("您已经取消操作")
        }
      })
}
function addmajor(event){
    let input=event.parentNode.parentNode.getElementsByTagName('input')[0];
    let option=document.getElementById('addmajerid').getElementsByTagName('option');
    let reid;
    for (let n of option) {
        if (n.selected) {
           reid=n.value;
          break;
        }
    }  
    if(reid=="0"){
        swal("请选择组织！");
        return
    }
    if(isnull(input.value)){
        swal("请填写组织名称！");
        return
    }
    swal({
        title: "你确定添加该组织？",
        text: "你确定添加该组织？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
            axios({
                url:'/api/addorgin',
                method:'post',
                data:{
                    'level':'3',
                    'name':input.value,
                    'super_id':reid
                },  
            }).then(response=>{
                if(response.data.msg=="插入重复数据"){
                    swal('提交失败', '您所填写的组织已存在', 'error');
                }else{
                    getmajor();
                    swal('添加成功', '您所填写的组织添加成功', 'success');
                    // console.log(response.data);
                    input.value=''
                    bodyTop[6].style.display='none';
                }
            }).catch(function (error) {
                swal('提交失败', '网络错误', 'error');
                // console.log(error);
            });

        } else {
            swal("您已经取消操作")
        }
      })

}
function delmajor(event){
    let id=event.parentElement.parentElement.firstElementChild.innerHTML;
    let name=event.parentElement.parentElement.getElementsByClassName('majorname')[0].innerHTML;
    swal({
        title: `你确定删除该${name}的组织？`,
        text: "你确定删除该组织？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
              swal('删除成功', '您所选的组织删除成功', 'success');
              let ptag_ids = new Array();
              ptag_ids.push(id); 
              axios({
                  method: 'POST',
                  url: '/api/deleteorganization',
                  data: ptag_ids,
              })
              .then((result) => {
                //   console.log(result)
                  getmajor()
              })
              .catch((err)=>{
                swal('提交失败', '网络错误', 'error');
                //   console.log(err)
              })
        } else {
            swal("您已经取消操作")
        }
      })
  
}
function toremajor(event){
    remajordiv.style.display="";
    let id=event.parentElement.parentElement.firstElementChild.innerHTML;
    let name=event.parentElement.parentElement.getElementsByClassName('majorname')[0].innerHTML;
    newmagor.value=id;
    newmagor.innerHTML=name;
}
function remajor(event){
    let faid=newmagor.value
    let rename=event.parentElement.parentElement.getElementsByTagName('input')[0].value;
    if(isnull(rename)){
        swal("请填写完整内容！");
    }
    swal({
        title: "你确定修改该组织？",
        text: "你确定修改该组织？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
            axios({
                method: 'put',
                url: '/api/uploador',
                params:{
                    level:'3',
                    id:faid,
                    name:rename
                }
            }).then(response=>{
                if(response.data.msg=="插入重复数据"){
                    swal('提交失败', '您所填写的组织已存在', 'error');
                }else{
                    swal('修改成功', '您所选的组织修改成功', 'success');
                    // console.log(response.data);
                    getmajor();
                    event.parentElement.parentElement.getElementsByTagName('input')[0].value=''
                    bodyTop[7].style.display='none';
                }
                }).catch(function (error) {
                    swal('提交失败', '网络错误', 'error');
                    // console.log(error);
            });
        } else {
          swal("您已经取消操作")
        }
      })
}
var previousevent;
function toaddclass(event){
    addclassdiv.style.display='';
    let id=event.parentElement.parentElement.firstElementChild.innerHTML;
    let name=event.parentElement.parentElement.getElementsByClassName('majorname')[0].innerHTML;
    newclassfa.value=id;
    newclassfa.innerHTML=name;
    previousevent=event.parentElement.parentElement.getElementsByClassName('expandItem')[0];
}
function addclass(event){
    let rename=event.parentElement.parentElement.getElementsByTagName('input')[0].value;
    if(isnull(rename)){
        swal("请填写组织名称！");
        return
    }else if(rename.length<2||7<rename.length){
        swal("请输入合理的班级！")
        return
    }
    swal({
        title: "你确定添加该组织？",
        text: "你确定添加该组织？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
            axios({
                url:'/api/addorgin',
                method:'post',
                data:{
                    'level':'4',
                    'name':rename,
                    'super_id':newclassfa.value
                },  
            }).then(response=>{
                if(response.data.msg=="插入重复数据"){
                    swal('提交失败', '您所填写的组织已存在', 'error');
                }else{
                    
                    swal('添加成功', '您所填写的组织添加成功', 'success');
                    // console.log(response.data);
                    watchChild( previousevent)
                    previousevent.parentElement.parentElement.parentElement.lastElementChild.style.display = ''
                    previousevent.firstElementChild.style.display = 'none'
                    event.parentElement.parentElement.getElementsByTagName('input')[0].value=''
                    bodyTop[8].style.display='none';
                }
            }).catch(function (error) {
                swal('提交失败', '网络错误', 'error');
                // console.log(error);
            });
        } else {
          swal("您已经取消操作")
        }
      })
}
var sonevent;
function delclass(event){
    sonevent=event.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('expandItem')[0];
    let id=event.parentElement.parentElement.firstElementChild.innerHTML;
    let name=event.parentElement.parentElement.getElementsByClassName('majorname')[0].innerHTML;
    let ptag_ids = new Array();
    ptag_ids.push(id); 
    swal({
        title: `你确定删除该${name}的组织？`,
        text: "你确定删除该组织？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
              swal('删除成功', '您所选的组织删除成功', 'success');
              let ptag_ids = new Array();
              ptag_ids.push(id); 
              axios({
                method: 'POST',
                url: '/api/deleteorganization',
                data: ptag_ids,
            })
            .then((result) => {
                // console.log(result)
                watchChild(sonevent)
                previousevent.parentElement.parentElement.parentElement.lastElementChild.style.display = ''
                previousevent.firstElementChild.style.display = 'none'
            })
            .catch((err)=>{
                swal('提交失败', '网络错误', 'error');
                // console.log(err)
            })
        } else {
          swal("您已经取消操作")
        }
      })

}
function toreclass(event){
    reclassdiv.style.display='';
    let id=event.parentElement.parentElement.firstElementChild.innerHTML;
    let name=event.parentElement.parentElement.getElementsByClassName('majorname')[0].innerHTML;
    let faid=event.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML;
    newclassfa.value=faid;
    reclassop.value=id;
    reclassop.innerHTML=name;
    sonevent=event.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('expandItem')[0];
}
function reclass(event){
    let faid=reclassop.value
    let rename=event.parentElement.parentElement.getElementsByTagName('input')[0].value;
    if(isnull(rename)){
        swal("请填写完整内容！")
        return
    }
    swal({
        title: "你确定修改该组织？",
        text: "你确定修改该组织？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
            axios({
                method: 'put',
                url: '/api/uploador',
                params:{
                    level:'4',
                    id:faid,
                    name:rename,
                    super_id:newclassfa.value
                }
            }).then(response=>{
                if(response.data.msg=="插入重复数据"){
                    swal('提交失败', '您所填写的组织已存在', 'error');
                }else{
                        swal('修改成功', '您所选的组织修改成功', 'success');

                        // console.log(response.data);
                        watchChild(sonevent)
                        previousevent.parentElement.parentElement.parentElement.lastElementChild.style.display = ''
                        previousevent.firstElementChild.style.display = 'none'
                        bodyTop[9].style.display='none';
                        event.parentElement.parentElement.getElementsByTagName('input')[0].value=''
                    }
                }).catch(function (error) {
                    swal('提交失败', '网络错误', 'error');
                    // console.log(error);
            });
        } else {
          swal("您已经取消操作")
        }
      })
}