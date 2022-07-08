
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

checkbox_all[0].numbers = 0;


function page(numbers){
    console.log(numbers);
    console.log(btn_new[0].allLength)
    layui.use('laypage',function (){
        var laypage = layui.laypage;

        laypage.render({
            elem:'page',
            count:numbers,
            jump:function (obj,first){
                console.log(obj.curr);
                console.log(obj.limit)
                if(!first){
                    render(obj.curr);
                }
            }
        })
    })
}

function rendering() {
    axios({
        method:'get',
        url:'/admin/commonUserPage',
        params:{
            "nodePage":1,
            "pageSize": 10,
        },
    }).then((date)=>{

        let all = date.data.data.pageInfo;
        console.log(date.data);
        console.log(all);
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
                        <li class="student-state lis">${all[i].sex}</li>
                        <li class="student-operator operator-check">
                            <span class="opertor-list check-out">查看</span>
                            <span class="opertor-list check">编辑</span>
                            <span class="opertor-list reset">重置</span>
                            <span class="opertor-list deletes">删除</span>
                        </li>
                    </ul>`
        }
        main_content[0].innerHTML = html;
        let sum = date.data.data.allPages;
        console.log(sum);
        // let nodepage = parseInt((all.length / 10));
        // let allLength = all.length % 10 ==0 ? nodepage : nodepage + 1;
        // console.log(nodepage)
        // console.log(allLength * 10);
        btn_new[0].allLength = sum * 10;
        page(btn_new[0].allLength);
        console.log(checkbox_list.length)
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
                    console.log(checkbox_all[0].numbers);
                    index = this.numbers;
                    checkbox_all[0].ids.push(checkbox_list[index].ids);
                    console.log(checkbox_all[0].ids);
                }else {
                    checkbox_all[0].numbers -= 1;
                    console.log(checkbox_all[0].numbers);
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
                layer_submit[0].numbers = 1;
                layer_submit[0].ids = i;
                checkbox_list[i].ids = all[i].uid;
                layer_input[0].value = all[i].name;
                layer_input[1].value = all[i].userName;
                layer_input[2].value = all[i].grade;
                layer_input[3].value = all[i].academy;
                layer_input[4].value = all[i].major_class;
                let sex = all[i].sex;
                console.log(sex);
                let clist = 'layer-this';
                let cla = 'layer-form-radioed';
                for(let i=0;i<startTime.length;i++){
                    if(startTime[i].innerHTML == layer_input[2].value){
                        switchover(startTime,i,clist)
                    }
                    if(academy[i].innerHTML == layer_input[3].value){
                        switchover(academy,i,clist)
                    }
                    if(grade[i].innerHTML == layer_input[4].value){
                        switchover(grade,i,clist)
                    }

                }
                for(let j=0;j<radios.length;j++){
                    if(radios[j].value == sex){
                        switchover(layer_form_radio,j,cla);
                        checke(j);
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
                    console.log(date.data);
                    if(date.data.msg == 'OK'){
                        swal('重置密码成功', "密码是111111", "success");
                    }
                })
            }
            deletes[i].onclick =function () {
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
}
rendering();





checkbox_all[0].ids = new Array();

let index = -1;
function render(numbers){
    axios({
        method:'get',
        url:'/admin/commonUserPage',
        params:{
            "nodePage":numbers,
            "pageSize": 10,
        },
    }).then((date)=>{

        let all = date.data.data.pageInfo;
        console.log(all);
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
                        <li class="student-state lis">${all[i].sex}</li>
                        <li class="student-operator operator-check">
                            <span class="opertor-list check-out">查看</span>
                            <span class="opertor-list check">编辑</span>
                            <span class="opertor-list reset">重置</span>
                            <span class="opertor-list deletes">删除</span>
                        </li>
                    </ul>`
        }
        main_content[0].innerHTML = html;
        let sum = date.data.data.allPages;
        console.log(sum);
        // let nodepage = parseInt((all.length / 10));
        // let allLength = all.length % 10 ==0 ? nodepage : nodepage + 1;
        // console.log(nodepage)
        // console.log(allLength * 10);
        btn_new[0].allLength = sum * 10;
        console.log(checkbox_list.length)
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
                    console.log(checkbox_all[0].numbers);
                    index = this.numbers;
                    checkbox_all[0].ids.push(checkbox_list[index].ids);
                    console.log(checkbox_all[0].ids);
                }else {
                    checkbox_all[0].numbers -= 1;
                    console.log(checkbox_all[0].numbers);
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
                layer_submit[0].numbers = 1;
                layer_submit[0].ids = i;
                // checkbox_list[i].ids = all[i].uid;
                layer_input[0].value = all[i].name;
                layer_input[1].value = all[i].userName;
                layer_input[2].value = all[i].grade;
                layer_input[3].value = all[i].academy;
                layer_input[4].value = all[i].major_class;
                let sex = all[i].sex;
                console.log(sex);
                let clist = 'layer-this';
                let cla = 'layer-form-radioed';
                for(let i=0;i<startTime.length;i++){
                    if(startTime[i].innerHTML == layer_input[2].value){
                        switchover(startTime,i,clist)
                    }
                    if(academy[i].innerHTML == layer_input[3].value){
                        switchover(academy,i,clist)
                    }
                    if(grade[i].innerHTML == layer_input[4].value){
                        switchover(grade,i,clist)
                    }

                }
                for(let j=0;j<radios.length;j++){
                    if(radios[j].value == sex){
                        switchover(layer_form_radio,j,cla);
                        checke(j);
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
                    console.log(date.data);
                    if(date.data.msg == 'OK'){
                        swal('重置密码成功', "密码是111111", "success");
                    }
                })
            }
            deletes[i].onclick =function () {
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
}


// new Promise((resolve,reject)=>{
//     render(1);
// }).then((data)=>{
//     page(btn_new[0].allLength);
// })

// page(btn_new[0].allLength);


btn_del[0].onclick = function (){
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


btn_update[0].onclick =function () {
    cover_layer[0].style.display = 'block'
    layer_submit[0].numbers = 1;
    layer_input[0].value = checkbox_all[0].name;
    layer_input[1].value = checkbox_all[0].userName;
    layer_input[2].value = checkbox_all[0].grade;
    layer_input[3].value = checkbox_all[0].academy;
    layer_input[4].value = checkbox_all[0].major_class;
    let sex = checkbox_all[0].sex;
    console.log(sex);
    let clist = 'layer-this';
    let cla = 'layer-form-radioed';
    for(let i=0;i<startTime.length;i++){
        if(checkbox_all[0].ids == checkbox_list[i].ids){
            layer_submit[0].ids = i;
        }
        if(startTime[i].innerHTML == layer_input[2].value){
            switchover(startTime,i,clist)
        }
        if(academy[i].innerHTML == layer_input[3].value){
            switchover(academy,i,clist)
        }
        if(grade[i].innerHTML == layer_input[4].value){
            switchover(grade,i,clist)
        }

    }
    for(let j=0;j<radios.length;j++){
        if(radios[j].value == sex){
            switchover(layer_form_radio,j,cla);
            checke(j);
        }
    }
}





function switchover(listName,numbers,clList){
    for(let i=0;i<listName.length;i++){
        listName[i].classList.remove(clList);
    }
    listName[numbers].classList.add(clList);
}


function selectTitle(clickName,listName,numbers){
    let flag = true;
    let index2 = 0;
    clickName[numbers].onclick = function (){
        if(flag == true){
            layer_list[numbers].style.display = 'block';
            layer_unselect[numbers].classList.add('layer-form-selected');
            flag = false;
        }else{
            layer_list[numbers].style.display = 'none';
            layer_unselect[numbers].classList.remove('layer-form-selected');
            flag = true;
        }
    }


    for(let i=0;i<listName.length;i++){
        listName[i].numbers = i;
        listName[i].onclick = function () {
            layer_unselect[numbers].classList.remove('layer-form-selected');
            layer_list[numbers].style.display = 'none';
            flag = true;
            index2 = this.numbers;
            let clist = 'layer-this';
            switchover(listName,index2,clist);
            clickName[numbers].value = listName[index2].innerHTML;
        }
    }
}

selectTitle(layer_click,startTime,0);
selectTitle(layer_click,academy,1);
selectTitle(layer_click,grade,2);
// layer-this


let index1 = 0

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

layer_input[1].onblur = function (){
    let patrn = /^[0-9]{11}$/
    if(!patrn.exec(this.value)){
        warn[0].innerHTML = `<span class="warning">输入的格式不对</span>`
    }else{
        warn[0].innerHTML = '';
    }
}



btn_new[0].onclick = function (){
    cover_layer[0].style.display = 'block'
    layer_submit[0].numbers = 0;
}

layer_submit[0].onclick = function (){
    let index = 0;
    if(radios[0].hasAttribute('checked')){
        index = 0;
    }else{
        index = 1;
    }
    if(layer_submit[0].numbers == 0){
        let users ={
            "name":layer_input[0].value,
            "userName":layer_input[1].value,
            "grade":layer_input[2].value,
            "academy":layer_input[3].value,
            "major_class":layer_input[4].value,
            "sex": radios[index].value,
            "power":'普通用户',
            "password": "111111",
        }
        console.log(users);
        let patrn = /^[0-9]{11}$/
        if(!patrn.exec(layer_input[1].value)){
            warn[0].innerHTML = `<span class="warning">输入的格式不对</span>`
        }else{
            warn[0].innerHTML = '';
            axios({
                method:'post',
                url:'/admin/User',
                data:users,
            }).then((date)=>{
                console.log(date.data);
                cover_layer[0].style.display = 'none';
                render(1);
            }).catch((err)=>{
                console.log(err);
            })
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
        console.log(users);
        let patrn = /^[0-9]{11}$/
        if(!patrn.exec(layer_input[1].value)){
            warn[0].innerHTML = `<span class="warning">输入的格式不对</span>`
        }else{
            warn[0].innerHTML = '';
            axios({
                method:'put',
                url:'/admin/update.do.userInfo',
                params:users,
            }).then((date)=>{
                console.log(date.data);
                cover_layer[0].style.display = 'none';
                render(1);
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

}

layer_btn_primary[1].onclick = function (){
    cover_layer[0].style.display = 'none';
}

layer_btn_primary[0].onclick = function (){
    layer_input[0].value = "";
    layer_input[1].value = "";
    layer_input[2].value = '';
    layer_input[3].value = "";
    layer_input[4].value = "";
    let clist = 'layer-this';
    switchover(startTime,0,clist);
    switchover(academy,0,clist);
    switchover(grade,0,clist);
    let cla = 'layer-form-radioed';
    switchover(layer_form_radio,1,cla);
    checke(1);

    // axios({
    //     method:'get',
    //     url:'/admin/getUserByClass',
    //     params:{
    //         grade:'2018',
    //         power:'普通用户',
    //         beginIndex:1,
    //         size:10,
    //     }
    // }).then((date)=>{
    //     console.log(date.data.data);
    // }).catch((err)=>{
    //     console.log(err);
    // })
}