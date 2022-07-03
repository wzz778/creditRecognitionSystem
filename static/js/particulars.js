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

let id = window.location.search.split("=")[1];


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


function render(id){
    package('get','/admin/oneApplication',{id:id},function (data){
        console.log(data);
    })
}
render(id);