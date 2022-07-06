

// layui.use('laypage',function (){
//     var laypage = layui.laypage;
//
//     laypage.render({
//         elem:'page',
//         count:100,
//         jump:function (obj,first){
//             console.log(obj.curr);
//             console.log(obj.limit)
//             if(!first){
//
//             }
//         }
//     })
// })
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
        // ready:function (){
        //     document.getElementById('layui-laydate1').classList.add('modal');
        // }
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
let cover_layer = document.getElementsByClassName('cover-layer')

function package(method,url,args,callback){
    if(method == "post"){
        $.post(url,args,function (data,status){
            callback(data,status);
        })
    }else{
        $.get(url,args,function (data,status){
            callback(data,status);
        })
    }
}

function pading(sum){

    layui.use('laypage',function (){
        var laypage = layui.laypage;

        laypage.render({
            elem:'page',
            count:sum,
            jump:function (obj,first){
                console.log(obj.curr);
                render(obj.curr);
                console.log(obj.limit)
                if(!first){

                }
            }
        })
    })

}




function render(numbers){
    let index1 = search_type[1].selectedIndex;
    let index = search_type[0].selectedIndex;
    let his = {approval_status:search_type[1].options[index1].value,
        b_Indicator_name:search_type[0].options[index].value,
        b_points_available:search[0].value,
        beginDate:startTime.value,
        endDate: endTime.value,
        nodePage:numbers,
        pageSize:10,
    }
    // let index = search_type[0].selectedIndex;
    let typeName = search_type[0].options[index].value;
    if(typeName == ''){
        delete  his.b_Indicator_name
    }

    // let index1 = search_type[1].selectedIndex;
    let typeStatus = search_type[1].options[index1].value;
    if(typeStatus == ''){
        delete  his.approval_status
    }
    let scords = search[0].value;
    let start = startTime.value;
    let end = endTime.value;
    if(scords == ''){
        delete  his.b_points_available
    }
    if(start == ''){
        delete his.beginDate
    }
    if(end == ''){
        delete  his.endDate
    }
    console.log(typeName);
    console.log(typeStatus);
    console.log(his);
    // package('get','/users/records',{approval_status:typeStatus,b_Indicator_name:typeName,b_points_available:scords,beginDate:start,endDate:end,nodePage:numbers,pageSize:10},function (data){
    //     console.log(data.data);
    //
    //
    //
    //
    //     let html = template('main-content',data.data);
    //     main_content[0].innerHTML = html;
    //     let index = 0;
    //     for(let i=0;i<check.length;i++){
    //         check[i].ids = '';
    //         check[i].onclick = function () {
    //
    //
    //             window.location.href = 'particulars.html?id=' + check[i].ids;
    //         }
    //     }
    // })
    axios({
        method:'get',
        url:'/users/records',
        params:his,
    }).then((data)=>{
        console.log(data.data.data.allRecords);
        let date = data.data.data.allRecords;
        let all = "";
        // let html = template('main-content',data.data);
        for(let i=0;i<date.length;i++){
            if(date[i].application.approval_status == 0){
                var approval_status = '未审核';
            }else if(date[i].application.approval_status == 1){
                var approval_status = '通过';
            }else{
                var approval_status = '未通过';
            }
            all +=`<ul class="header">
                        <li class="student-name lis">${date[i].application.user.name}</li>
                        <li class="student-major lis">${date[i].application.user.academy}</li>
                        <li class="student-class lis">${date[i].application.user.major_class}</li>
                        <li class="student-apply lis">${date[i].application.creditType.afirstLevel}</li>
                        <li class="student-time lis">${date[i].application.application_time}</li>
                        <li class="student-state lis">${approval_status}</li>
                        <li class="student-apply-credit lis">${date[i].application.classify.b_points_available}</li>
                        <li class="student-operator lis"><span class="check">查看</span></li>
                    </ul>`
        }
        main_content[0].innerHTML = all;
        let index = 0;
        // pading(10);
        for(let i=0;i<check.length;i++) {
            check[i].ids = date[i].application.id;
            check[i].onclick = function () {


                window.location.href = 'particulars?id=' + check[i].ids;
            }
        }
    })
}
render(1);



btn[0].onclick = function (){
    render(1);
    // axios({
    //     method:'get',
    //     url:'/users/records',
    //     params:{
    //         beginDate:startTime.value,
    //         endDate:endTime.value,
    //         nodePage:1,
    //         pageSize:10}
    // }).then((data)=>{
    //     console.log(data.data.data.allRecords);
    //     let date = data.data.data.allRecords;
    //     let all = "";
    //     // let html = template('main-content',data.data);
    //     for(let i=0;i<date.length;i++){
    //         all +=`<ul class="header">
    //                     <li class="student-name lis">${date[i].application.user.name}</li>
    //                     <li class="student-major lis">${date[i].application.user.academy}</li>
    //                     <li class="student-class lis">${date[i].application.user.major_class}</li>
    //                     <li class="student-apply lis">${date[i].application.creditType.afirstLevel}</li>
    //                     <li class="student-time lis">${date[i].application.application_time}</li>
    //                     <li class="student-state lis">${date[i].application.approval_status}</li>
    //                     <li class="student-apply-credit lis">${date[i].application.specific_information}</li>
    //                     <li class="student-operator lis"><span class="check">查看</span></li>
    //                 </ul>`
    //     }
    //     main_content[0].innerHTML = all;
    //     let index = 0;
    //     for(let i=0;i<check.length;i++) {
    //         check[i].ids = date[i].application.id;
    //         check[i].onclick = function () {
    //
    //
    //             window.location.href = 'particulars?id=' + check[i].ids;
    //         }
    //     }
    // })

}
btn[1].onclick = function (){
    search_type[0].value = "";
    search_type[1].value = "";
    search[0].value = "";
    startTime.value = "";
    endTime.value = "";
    render(1);
}


// layui_btn[0].addEventListener('click',function (){
//     cover_layer[0].style.display = 'none';
// })

layui.use('form', function(){
    var form = layui.form;

    //监听提交
    form.on('submit(formDemo)', function(data){
        console.log(data);
    });
});





