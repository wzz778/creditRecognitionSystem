
function pic(){
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
}

let id = window.location.search.split("=")[1];
let history_details = document.getElementsByClassName('history-details')

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
        let html = template('details',data);
        history_details[0].innerHTML = html;
        pic();
    })
    // axios({
    //     method:'get',
    //     url:'/admin/oneApplication',
    //     data:{
    //         id:id,
    //     }
    // }).then((data)=>{
    //     console.log(data);
    //     let html = template('details',data);
    //     history_details[0].innerHTML = html;
    //     pic();
    // }).catch((err)=>{
    //     console.log(err);
    // })
}
render(id);