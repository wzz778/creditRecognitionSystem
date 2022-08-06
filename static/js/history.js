
// layui日期插件
layui.use('laydate',function () {
    var laydate = layui.laydate;

    laydate.render({
        elem: '#startTime',
        // position:'fixed',
        change:function (value,date) {
            lay('#body').html(value)
        }
    })
})
layui.use('laydate',function () {
    var laydate = layui.laydate;

    laydate.render({
        elem: '#endTime',
        position:'fixed',
    })
})



let main_content = document.getElementsByClassName('main-content');
let  student_operator = document.getElementsByClassName('student-operator');
let btn = document.getElementsByClassName('btn');
let search_type = document.getElementsByClassName('search-type');
let search = document.getElementsByClassName('search');
let startTime = document.getElementById('startTime');
let endTime = document.getElementById('endTime');
let check = document.getElementsByClassName('check');
let layui_btn = document.getElementsByClassName('layui-btn');
let cover_layer = document.getElementsByClassName('cover-layer');
let schedule = document.getElementsByClassName('schedule');
let update = document.getElementsByClassName('update');

// layui分页
function pading(sum,size){

    layui.use('laypage',function (){
        var laypage = layui.laypage;

        laypage.render({
            elem:'page',
            count:sum,
            limit:size,
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            jump:function (obj,first){
                // console.log(obj.curr);

                // console.log(obj.limit)
                btn[0].pages = obj.curr;
                btn[0].sizes = obj.limit;
                // btn[0].count = obj.count;
                if(!first){
                    render(obj.curr,obj.limit);
                }
            }
        })
    })

}

//获取学分类型
function applicationType() {
    axios({
        method:'get',
        url:'/IndicatorOperates/showAllIndicator',
    }).then((data)=>{
        // console.log(data.data);
                // console.log(data.data.msg);
        let all = `<option value="">请选择...</option>`;
        if(data.data.data.length !=0){
            for(let i=0;i<data.data.data.length;i++){
                all += `<option value="${data.data.data[i].classfiy.b_Indicator_name}">${data.data.data[i].classfiy.b_Indicator_name}</option>`
            }
        }
        search_type[0].innerHTML = all;
    }).catch((err)=>{
        console.log(err);
    })
}
applicationType()

//输入的学分限制
// search[0].oninput = function (){
//     this.value=this.value.replace(/^\D*(\d*(?:\.\d{0,1})?).*$/g, '$1');
//     if (this.value / 1 > 12) {
//         this.value = this.value + "";
//         this.value = this.value.slice(0, this.value.length - 1);
//     }
// }

//初始渲染页面
function rendering(){
    let index1 = search_type[1].selectedIndex;
    let index = search_type[0].selectedIndex;
    let his = {approval_status:search_type[1].options[index1].value,
        a_first_level:search_type[0].value,
        beginDate:startTime.value,
        endDate: endTime.value,
        nodePage:1,
        pageSize:10,
    }
    let typeName = search_type[0].value;
    if(typeName == ''){
        delete  his.a_first_level
    }

    let typeStatus = search_type[1].options[index1].value;
    if(typeStatus == ''){
        delete  his.approval_status
    }
    let start = startTime.value;
    let end = endTime.value;
    if(start == ''){
        delete his.beginDate
    }
    if(end == ''){
        delete  his.endDate
    }
    console.log(his);
    axios({
        method:'get',
        url:'/users/records',
        params:his,
    }).then((data)=>{
        console.log(data.data)
        console.log(data.data.data);
        // console.log(data.data.data);
        let date = data.data.data.pageInfo;
        // console.log(date);
        btn[0].count = date.length;
        let all = "";
        if(date.length != 0){
            for(let i=0;i<date.length;i++){
                let scord = data.data.data.分数 + i;
                console.log(scord)
                if(date[i].application.approval_status == 0){
                    var approval_status = '审核中';
                }else if(date[i].application.approval_status == 1){
                    var approval_status = '通过';
                }else{
                    var approval_status = '未通过';
                }
                if(date[i].application.classify.b_Indicator_name !=''){
                    all +=`<ul class="header">
                        <li class="student-name lis">${date[i].application.user.name}</li>
                        <li class="student-major lis">${date[i].application.user.academy}</li>
                        <li class="student-class lis">${date[i].application.user.major_class}</li>
                        <li class="student-apply lis">${date[i].application.classify.b_Indicator_name}</li>
                        <li class="student-time lis">${date[i].application.application_time}</li>
                        <li class="student-state lis">${approval_status}</li>
                        <li class="student-apply-credit lis">${data.data.data.分数0}</li>
                        <li class="student-operator lis"><span class="check">查看</span><span class="update">修改</span></li>
                    </ul>`
                }else{
                    all +=`<ul class="header">
                        <li class="student-name lis">${date[i].application.user.name}</li>
                        <li class="student-major lis">${date[i].application.user.academy}</li>
                        <li class="student-class lis">${date[i].application.user.major_class}</li>
                        <li class="student-apply lis">指标已不存在</li>
                        <li class="student-time lis">${date[i].application.application_time}</li>
                        <li class="student-state lis">${approval_status}</li>
                        <li class="student-apply-credit lis">${date[i].application.points}</li>
                        <li class="student-operator lis"><span class="check">查看</span><span class="update">修改</span></li>
                    </ul>`
                }
            }
        }else{
            all += `<ul class="header">
                        <li class="search-nothing">没有找到匹配的记录</li>
                    </ul>`
        }
        main_content[0].innerHTML = all;
        let pages = data.data.data.allPages * 10;
        let allPages = data.data.data.allRecords;
        pading(allPages,10);
        let index = 0;
        for(let i=0;i<check.length;i++) {
            check[i].ids = date[i].applicationId;
            update[i].status = date[i].application.approval_status
            check[i].onclick = function () {
                window.location.href = 'particulars?id=' + check[i].ids;
            }
            update[i].onclick = function (){
                if(this.status == 0){
                    window.location.href = 'UpdateApplication?id=' + check[i].ids ;
                }else{
                    swal('无法修改','已审核','error');
                }
            }
        }
    })
}
rendering()






//分页渲染页面
function render(numbers,size){
    let index1 = search_type[1].selectedIndex;
    let index = search_type[0].selectedIndex;
    let his = {approval_status:search_type[1].options[index1].value,
        a_first_level:search_type[0].options[index].value,
        beginDate:startTime.value,
        endDate: endTime.value,
        nodePage:numbers,
        pageSize:size,
    }
    let typeName = search_type[0].options[index].value;
    if(typeName == ''){
        delete  his.a_first_level
    }

    let typeStatus = search_type[1].options[index1].value;
    if(typeStatus == ''){
        delete  his.approval_status
    }
    let start = startTime.value;
    let end = endTime.value;
    if(start == ''){
        delete his.beginDate
    }
    if(end == ''){
        delete  his.endDate
    }
    // console.log(typeName);
    // console.log(typeStatus);
    // console.log(his);
    axios({
        method:'get',
        url:'/users/records',
        params:his,
    }).then((data)=>{
        // console.log(data.data.data);
        // console.log(data.data.data.pageInfo);
        let date = data.data.data.pageInfo;
        let all = "";
        btn[0].count = date.length;
        if(date.length > 0){
            for(let i=0;i<date.length;i++){
                if(date[i].application.approval_status == 0){
                    var approval_status = '审核中';
                }else if(date[i].application.approval_status == 1){
                    var approval_status = '通过';
                }else{
                    var approval_status = '未通过';
                }
                if(date[i].application.classify.b_Indicator_name !=''){
                    all +=`<ul class="header">
                        <li class="student-name lis">${date[i].application.user.name}</li>
                        <li class="student-major lis">${date[i].application.user.academy}</li>
                        <li class="student-class lis">${date[i].application.user.major_class}</li>
                        <li class="student-apply lis">${date[i].application.classify.b_Indicator_name}</li>
                        <li class="student-time lis">${date[i].application.application_time}</li>
                        <li class="student-state lis">${approval_status}</li>
                        <li class="student-apply-credit lis">${data.data.data.分数i}</li>
                        <li class="student-operator lis"><span class="check">查看</span><span class="update">修改</span></li>
                    </ul>`
                }else{
                    all +=`<ul class="header">
                        <li class="student-name lis">${date[i].application.user.name}</li>
                        <li class="student-major lis">${date[i].application.user.academy}</li>
                        <li class="student-class lis">${date[i].application.user.major_class}</li>
                        <li class="student-apply lis">指标已不存在</li>
                        <li class="student-time lis">${date[i].application.application_time}</li>
                        <li class="student-state lis">${approval_status}</li>
                        <li class="student-apply-credit lis">${date[i].application.points}</li>
                        <li class="student-operator lis"><span class="check">查看</span><span class="update">修改</span></li>
                    </ul>`
                }
                main_content[0].innerHTML = all;
            }
        }else{
            all += `<ul class="header">
                        <li class="search-nothing">没有找到匹配的记录</li>
                    </ul>`
            main_content[0].innerHTML = all;
        }

        let index = 0;
        for(let i=0;i<check.length;i++) {
            check[i].applicationId = date[i].applicationId;
            check[i].ids = date[i].id;
            update[i].status = date[i].application.approval_status
            check[i].onclick = function () {


                window.location.href = 'particulars?applicationId=' + check[i].applicationId ;
            }
            update[i].onclick = function (){
                if(this.status == 0){
                    window.location.href = 'UpdateApplication?id=' + check[i].applicationId ;
                }else{
                    swal('无法修改','已审核','error');
                }
            }
        }
    })
}
// render(1);


//搜索
btn[0].onclick = function (){
    pading(btn[0].count,btn[0].sizes);
    render(1,btn[0].sizes);
    swal('搜索成功','','success');
}
//重置
btn[1].onclick = function (){
    search_type[0].value = "";
    search_type[1].value = "";
    startTime.value = "";
    endTime.value = "";
    rendering();
}

// let search_type = document.getElementsByClassName('search-type');

//



