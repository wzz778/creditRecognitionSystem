let grade=document.getElementById('grade');
let grades=document.getElementsByClassName('grade');
let reclassdiv=document.getElementById('reclassdiv');
let body=document.getElementById('Contentbody');
let addclassdiv=document.getElementById('addclassdiv');
let academy=document.getElementById('academy');
let remajordiv=document.getElementById('remajordiv');
let reclassop=document.getElementById('reclassop');
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
function getgrade(){
    axios({
        method: 'get',
        url: 'http://127.0.0.1:8080/api/getgrade',
        }).then(response=>{
            console.log(response.data);
            let date=response.data.data;
            for(let n in grades){
                grades[n].innerHTML='<option value="0">请选择...</option>';
                for(let i of date){
                    grades[n].innerHTML+=`
                        <option value="${i.id}">${i.name}</option>
                    `
                }
            }
        }).catch(function (error) {
            console.log(error);
    });
}
getgrade();
function getacademy(){
    let option = grade.getElementsByTagName('option');
    for (let n of option) {
      if (n.selected) {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8080/api/getacademy',
            params:{id:n.value},
            }).then(response=>{
                console.log(response.data);
                let date=response.data.data;
                academy.innerHTML='<option value="0">请选择...</option>';
                for(let i of date){
                    academy.innerHTML+=`
                        <option value="${i.id}">${i.name}</option>
                    `
                }
            }).catch(function (error) {
                console.log(error);
        });
        break;
      }
    }
}
function getmajor(){
    let option=academy.getElementsByTagName('option');
    for (let n of option) {
      if (n.selected) {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8080/api/getacademy',
            params:{id:n.value},
            }).then(response=>{
                console.log(response.data);
                let date=response.data.data;
                body.innerHTML='';
                for(let i in date){
                    body.innerHTML+=`
                        <div class="InfoContentItem">
                            <ul>
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
                                    <button onclick="toaddclass(this)">添加班级</button>
                                    <button onclick="toremajor(this)">修改</button>
                                    <button onclick="delmajor(this)">删除</button>
                                </li>
                            </ul>
                            <!-- 存放班级的盒子 -->
                            <div class="InfoContentItemson" style="display: none;">

                            </div>
                        </div>
                    `
                }
            }).catch(function (error) {
                console.log(error);
        });
        break;
      }
    }
}

// function getclass(){
//     let option=academy.getElementsByTagName('option');
//     for (let n of option) {
//       if (n.selected) {
//         axios({
//             method: 'get',
//             url: 'http://127.0.0.1:8080/api/getacademy',
//             params:{id:n.value},
//             }).then(response=>{
//                 console.log(response.data);
//                 let date=response.data.data;
//                 body.innerHTML='';
//                 for(let i of date){
//                     body.innerHTML+=`
//                         <div class="InfoContentItem">
//                             <ul>
//                                 <li class="id">${i.id}</li>
//                                 <li class="constituteSty">
//                                     <span class="expandItem" onclick='watchChild(this)'>
//                                         <span class="remove"></span>
//                                         <span onclick="" class=""></span>
//                                     </span>
//                                     <span>${i.name}</span>
//                                 </li>
//                                 <li>1</li>
//                                 <li>
//                                     <button>添加班级</button>
//                                     <button>修改</button>
//                                     <button>删除</button>
//                                 </li>
//                             </ul>
//                             <!-- 存放班级的盒子 -->
//                             <div class="InfoContentItemson" style="display: none;">
//                                 <ul>
//                                     <li class="id">12</li>
//                                     <li>计科211</li>
//                                     <li>1</li>
//                                     <li>
//                                         <button>修改</button>
//                                         <button>删除</button>
//                                     </li>
//                                 </ul>
//                                 <ul>
//                                     <li class="id">21</li>
//                                     <li>计科211</li>
//                                     <li>1</li>
//                                     <li>
//                                         <button>修改</button>
//                                         <button>删除</button>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     `
//                 }
//             }).catch(function (error) {
//                 console.log(error);
//         });
//         break;
//       }
//     }
// }
function watchChild(event) {
    let faid=event.parentElement.parentElement.firstElementChild.innerHTML;
    console.log(faid);
    let son=event.parentElement.parentElement.parentElement.getElementsByClassName('InfoContentItemson')[0];
    axios({
        method: 'get',
        url: 'http://127.0.0.1:8080/api/getacademy',
        params:{id:faid},
        }).then(response=>{
            console.log(response.data);
            let date=response.data.data;
            son.innerHTML=''
            for(let i in date){
                son.innerHTML+=`
                    <ul>
                        <li class="id">${date[i].id}</li>
                        <li class='majorname'>${date[i].name}</li>
                        <li>${parseInt(i)+1}</li>
                        <li>
                            <button onclick="toreclass(this)">修改</button>
                            <button onclick="delclass(this)">删除</button>
                        </li>
                    </ul>
                `
            }
        }).catch(function (error) {
            console.log(error);
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
    if(input.value==''){
        swal("请填写内容！");
    }else{
        axios({
            url:'http://127.0.0.1:8080/api/addorgin',
            method:'post',
            data:{
                'level':'1',
                'name':input.value,
                'super_id':'0'
            },  
        }).then(response=>{
            console.log(response.data);
            getgrade();
        }).catch(function (error) {
            console.log(error);
        });
    }
}
function delgrade(event){
    console.log(event.innerHTML);
    let option=document.getElementById('delgradein').getElementsByTagName('option');
    let ptag_ids = new Array();
    for (let n of option) {
        if (n.selected) {
            ptag_ids.push(n.value);
          break;
        }
    }  
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:8080/api/deleteorganization',
        data: ptag_ids,
    })
    .then((result) => {
        console.log(result)
        getgrade();
    })
    .catch((err)=>{
        console.log(err)
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
    if(input.value==''){
        swal("请填写组织名称！");
        return
    }
    axios({
        method: 'put',
        url: 'http://127.0.0.1:8080/api/uploador',
        params:{
            level:'1',
            id: reid,
            name:input.value
        }
        }).then(response=>{
            console.log(response.data);
            getgrade();
        }).catch(function (error) {
            console.log(error);
    });
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
    if(input.value==''){
        swal("请填写组织名称！");
        return
    }
    axios({
        url:'http://127.0.0.1:8080/api/addorgin',
        method:'post',
        data:{
            'level':'2',
            'name':input.value,
            'super_id':reid
        },  
    }).then(response=>{
        console.log(response.data);
        getgrade();
    }).catch(function (error) {
        console.log(error);
    });
}
function delacademy(event){
    let option=document.getElementById('delac').getElementsByTagName('option');
    let ptag_ids = new Array();
    for (let n of option) {
        if (n.selected) {
            ptag_ids.push(n.value);
          break;
        }
    }  
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:8080/api/deleteorganization',
        data: ptag_ids,
    })
    .then((result) => {
        console.log(result)
    })
    .catch((err)=>{
        console.log(err)
    })
}
function getacademy1(event){
    let option = event.getElementsByTagName('option');
    let getac= event.parentElement.parentElement.getElementsByTagName('select')[1];
    for (let n of option) {
      if (n.selected) {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8080/api/getacademy',
            params:{id:n.value},
            }).then(response=>{
                console.log(response.data);
                let date=response.data.data;
                getac.innerHTML='<option value="0">请选择...</option>';
                for(let i of date){
                    getac.innerHTML+=`
                        <option value="${i.id}">${i.name}</option>
                    `
                }
            }).catch(function (error) {
                console.log(error);
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
    if(input.value==''){
        swal("请填写组织名称！");
        return
    }
    axios({
        method: 'put',
        url: 'http://127.0.0.1:8080/api/uploador',
        params:{
            level:'2',
            id: reid,
            name:input.value
        }
        }).then(response=>{
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
    });
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
    if(input.value==''){
        swal("请填写组织名称！");
        return
    }
        axios({
            url:'http://127.0.0.1:8080/api/addorgin',
            method:'post',
            data:{
                'level':'3',
                'name':input.value,
                'super_id':reid
            },  
        }).then(response=>{
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
}
function delmajor(event){
    let id=event.parentElement.parentElement.firstElementChild.innerHTML;
    let name=event.parentElement.parentElement.getElementsByClassName('majorname')[0].innerHTML;
    
    let ptag_ids = new Array();
    ptag_ids.push(id); 
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:8080/api/deleteorganization',
        data: ptag_ids,
    })
    .then((result) => {
        console.log(result)
        getmajor()
    })
    .catch((err)=>{
        console.log(err)
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
    if(rename.value==''){
        swal("请填写完整内容！");
    }
    axios({
        method: 'put',
        url: 'http://127.0.0.1:8080/api/uploador',
        params:{
            level:'3',
            id:faid,
            name:rename
        }
        }).then(response=>{
            console.log(response.data);
            getmajor();
        }).catch(function (error) {
            console.log(error);
    });
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
    if( rename==''){
        swal("请填写组织名称！");
        return
    }
        axios({
            url:'http://127.0.0.1:8080/api/addorgin',
            method:'post',
            data:{
                'level':'4',
                'name':rename,
                'super_id':newclassfa.value
            },  
        }).then(response=>{
            console.log(response.data);
            watchChild( previousevent)
        }).catch(function (error) {
            console.log(error);
        });
}
var sonevent;
function delclass(event){
    sonevent=event.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('expandItem')[0];
    let id=event.parentElement.parentElement.firstElementChild.innerHTML;
    let ptag_ids = new Array();
    ptag_ids.push(id); 
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:8080/api/deleteorganization',
        data: ptag_ids,
    })
    .then((result) => {
        console.log(result)
        watchChild(sonevent)
    })
    .catch((err)=>{
        console.log(err)
    })
}
function toreclass(event){
    reclassdiv.style.display='';
    let id=event.parentElement.parentElement.firstElementChild.innerHTML;
    let name=event.parentElement.parentElement.getElementsByClassName('majorname')[0].innerHTML;
    reclassop.value=id;
    reclassop.innerHTML=name;
    sonevent=event.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('expandItem')[0];
}
function reclass(event){
    let faid=reclassop.value
    let rename=event.parentElement.parentElement.getElementsByTagName('input')[0].value;
    if(rename.value==''){
        swal("请填写完整内容！");
    }
    axios({
        method: 'put',
        url: 'http://127.0.0.1:8080/api/uploador',
        params:{
            level:'4',
            id:faid,
            name:rename
        }
        }).then(response=>{
            console.log(response.data);
            watchChild(sonevent)
        }).catch(function (error) {
            console.log(error);
    });
}