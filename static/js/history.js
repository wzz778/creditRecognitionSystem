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


function render(numbers){
    package('get','/users/records',{nodePage:numbers,pageSize:10},function (data){
        console.log(data);
        layui.use('laypage',function (){
            var laypage = layui.laypage;

            laypage.render({
                elem:'page',
                count:data.data.count,
                jump:function (obj,first){
                    console.log(obj.curr);
                    console.log(obj.limit)
                    if(!first){

                    }
                }
            })
        })




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
render(1);