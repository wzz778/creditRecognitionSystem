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

let main_content = document.getElementsByClassName("main-content");

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
    package('get','/admin/commonUserPage',{nodePage:numbers,pageSize:10},function (data){
        console.log(data);
        let html = template('main-content',data);
        main_content[0].innerHTML = html;
    })
}
render(1);

function paging(){
    package('get','/admin/commonUserPage',{nodePage:numbers,pageSize:10},function (data){
        console.log(data);
        layui.use('laypage',function (){
            var laypage = layui.laypage;

            laypage.render({
                elem:'page',
                count:data.data.length,
                jump:function (obj,first){
                    console.log(obj.curr);
                    console.log(obj.limit)
                    if(!first){

                    }
                }
            })
        })
    })
}