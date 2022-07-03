layui.use('laypage',function (){
    var laypage = layui.laypage;

    laypage.render({
        elem:'page',
        count:100,
        jump:function (obj,first){
            console.log(obj.curr);
            console.log(obj.limit)
            if(!first){

            }
        }
    })
})
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
    let index = search_type[0].selectedIndex;
    let typeName = search_type[0].options[index].value;
    let index1 = search_type[1].selectedIndex;
    let typeStatus = search_type[1].options[index1].value;
    let scords = search[0].value;
    let start = startTime.value;
    let end = endTime.value;
    console.log(typeName);
    console.log(typeStatus);
    package('get','/users/records',{approval_status:typeStatus,b_Indicator_name:typeName,b_points_available:scords,beginDate:start,endDate:end,nodePage:numbers,pageSize:10},function (data){
        console.log(data);




        let html = template('main-content',data);
        main_content[0].innerHTML = html;
        for(let i=0;i<student_operator.length;i++){
            student_operator[i].ids = '';
            student_operator[i].onclick = function () {


                window.location.href = 'particulars.html?id=' + '';
            }
        }
    })
}

btn[0].onclick = function (){
    render(1);

}
btn[1].onclick = function (){
    search_type[0].value = "";
    search_type[1].value = "";
    search[0].value = "";
    startTime.value = "";
    endTime.value = "";
    render(1);
}


render(1);