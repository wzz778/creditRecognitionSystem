

// 使用layui轮播图
function pic(hei){
    layui.use('carousel',function () {
        var carousel = layui.carousel;

        carousel.render({
            elem:'#attchment-pic',
            width:'100%',
            arrow:'always',
            height:hei + 'px',
            indicator:'none',
            anim:'default',
            autoplay:false,
        })
    })
}


let id = window.location.search.split("=")[1];
// console.log(id);
let history_details = document.getElementsByClassName('history-details');
let application_message = document.getElementsByClassName('application-message');
let attchment = document.getElementsByClassName('attchment');
let carousel_item = document.getElementsByClassName('carousel-item');
let download = document.getElementsByClassName('download');
let attchment_imgs = document.getElementsByClassName('attchments');



//渲染页面
function render(id){
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
        let all = '';
        if(date.approval_status == 2){
            all += `
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
                                <span>${date.group}</span>
                            </li>
                            
                        </ul>
                        <div class="parctice-content">
                            <span>实践内容说明：</span>
                            <div>
                                <textarea name="" id="textarea" readonly style="resize: none">${date.remarks}</textarea>
                            </div>
                        </div>
                        <div class="failure">
                            <span>驳回的理由：</span>
                            <div>
                                <textarea name="" id="textarea" readonly style="resize: none"></textarea>
                            </div>
                        </div>`
        }else{
            all += `
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
                            
                        </ul>
                        <div class="parctice-content">
                            <span>实践内容说明：</span>
                            <div>
                                <textarea name="" id="textarea" readonly style="resize: none">${date.remarks}</textarea>
                            </div>
                        </div>`
        }
        application_message[0].innerHTML = all;
        // pic(300);
    }).catch((err)=>{
        console.log(err);
    })

    axios({
        method: 'get',
        url: '/user/getEnclosure',
        params: {
            id:id,
        }
    }).then((date)=>{
        console.log(date.data.data);
        let all = '';
        // let datte = date.data.data;
        // preloadimages(datte);
        if(date.data.data.length == 0){
            pic(340);
            carousel_item[0].innerHTML = `<div class="attchment-everyOne"><img src='public/img/no-content.png' class="attchment-imgs"><div class="no-content">暂无内容</div></div>`
        }else{
            pic(300);
            for(let i=0;i<date.data.data.length;i++){
                all +=`<div class="attchment-everyOne"><img src='${date.data.data[i].address}' class="attchment-imgs attchments" ></div>`
            }
            carousel_item[0].innerHTML = all;
        }

    })
}
render(id);

// 点击下载图片
download[0].onclick = function (){
    // console.log(attchment_imgs[0].src);
    if(attchment_imgs.length == 0){
        swal('下载失败','暂无内容','error');
    }else{
        for(let i=0;i<attchment_imgs.length;i++){
            downloadIamge(attchment_imgs[i].src);
        }
        swal('下载成功','全部下载完毕','success');
    }
}


//下载图片
function downloadIamge(imgSrc) {
    let imgUrl = imgSrc;// 图片链接
    let a = document.createElement('a');
    let now =Date.now();
    // console.log(now);
    // 这里是将url转成blob地址，
    fetch(imgUrl)  // 跨域时会报错
        .then(res => res.blob())
        .then(blob => { // 将链接地址字符内容转变成blob地址
            a.href = URL.createObjectURL(blob);
            a.download ='图片'+ now + '.jpg'; // 下载文件的名字
            document.body.appendChild(a);
            a.click();
            //在资源下载完成后 清除 占用的缓存资源
            window.URL.revokeObjectURL(a.href);
            document.body.removeChild(a);
        })
}


function preloadimages(arr){
    let newimages=[];
    let loadedimages = 0;
    let  postaction = function (newImages){
        let all = '';
        for(let i=0;i<newImages.length;i++){
            all +=`<div class="attchment-everyOne"><img src='${newImages[i].src}' class="attchment-imgs"></div>`
        }
        carousel_item[0].innerHTML = all;
    }

    function imageloadpost(){
        loadedimages ++;
        if(loadedimages == arr.length){
            postaction(newimages);
        }
    }
    for(let i=0;i<arr.length;i++){
        newimages[i] = new Image();
        newimages[i].src = arr[i].address;
        newimages[i].onload = function (){
            imageloadpost();
        }
        newimages[i].onerror = function (){
            imageloadpost();
        }
    }
    // return { //此处返回一个空白对象的done方法
    //     done:function(f){
    //         postaction=f || postaction
    //     }
    // }
}