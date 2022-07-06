
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
console.log(id);
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
    // package('get','/admin/oneApplication',{id:id},function (data){
    //     console.log(data);
    //     let html = template('details',data);
    //     history_details[0].innerHTML = html;
    //     pic();
    // })
    axios({
        method:'get',
        url:'/admin/oneApplication',
        params:{
            id:id,
        }
    }).then((data)=>{
        console.log(data.data.data);
        let date = data.data.data;
        // let html = template('details',data);
        let all = `<div class="application-message">
                        <ul class="messages">
                            <li>
                                姓名：
                                <span class="name">${date.user.name}</span>
                            </li>
                            <li>
                                性别：
                                <span class="sex">${date.user.sex}</span>
                            </li>
                            
                            <li>
                                所属学院：
                                <span>${date.user.academy}</span>
                            </li>
                            
                            <li>
                                班级：
                                <span>${date.user.major_class}</span>
                            </li>
                            <li>
                                申请类型：
                                <span>${date.creditType.afirstLevel}</span>
                            </li>
                            <li>
                                是否为集体项目：
                                <span>否</span>
                            </li>
                            <li class="parctice-content">
                                实践内容说明：
                                <div>

                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="attchment">
                        <div class="attchment-title">附件</div>
                        <div class="layui-carousel" id="attchment-pic">
                            <div carousel-item>
                                <div class="attchment-everyOne"><img src='/public/img/loginback.png' class="attchment-imgs"></div>
                                <div class="attchment-everyOne"><img src='/public/img/loginback.png' class="attchment-imgs"></div>
                                <div class="attchment-everyOne"><img src='/public/img/loginback.png' class="attchment-imgs"></div>
                                <div class="attchment-everyOne"><img src='/public/img/loginback.png' class="attchment-imgs"></div>
                                <div class="attchment-everyOne"><img src='/public/img/loginback.png' class="attchment-imgs"></div>
                            </div>
                        </div>
                    </div>`
        history_details[0].innerHTML = all;
        pic();
    }).catch((err)=>{
        console.log(err);
    })
}
render(id);