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