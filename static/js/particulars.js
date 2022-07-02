layui.use('carousel',function () {
    var carousel = layui.carousel;

    carousel.render({
        elem:'#attchment-pic',
        width:'100%',
        arrow:'always',
        height:'300px',
        indicator:'none',
        anim:'default',
        autoplay:'false',
    })
})




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
    })
}