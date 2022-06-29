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