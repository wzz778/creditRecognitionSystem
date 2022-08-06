

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
let reject = document.getElementsByClassName('reject');
let attchment_header = document.getElementsByClassName('attchment-header');
let ranking = document.getElementsByClassName('ranking');
let describe = document.getElementsByClassName('describe');
let messages = document.getElementsByName('messages');
let returns = document.getElementsByClassName('returns');


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
        let scords = '分';
        let all = '';
        all += `
                        
                            <li class="contents">
                                姓名：
                                <span class="name">${date.申请表.user.name}</span>
                            </li>
                            <li class="contents">
                                性别：
                                <span class="sex">${date.申请表.user.sex}</span>
                            </li>
                            
                            <li class="contents">
                                所属学院：
                                <span>${date.申请表.user.academy}</span>
                            </li>
                            
                            <li class="contents">
                                班级：
                                <span>${date.申请表.user.major_class}</span>
                            </li>
                            <li class="contents">
                                申请类型：
                                <span>${date.申请表.creditType.afirstLevel}</span>
                            </li>
                            <li class="contents">
                                申请时间：
                                <span>${date.申请表.application_time}</span>
                            </li>
                            <li class="contents">
                                获得奖项或参见的项目：
                                <span>${date.申请表.classify.b_Indicator_name}</span>
                            </li>
                            <li class="contents">
                                是否为集体项目：
                                <span>${date.申请表.team}</span>
                            </li>
                            <li class="contents">
                                最高申请的学分：
                                <span>${date.申请表.classify.b_points_available}${scords}</span>
                            </li>
                            <li class="contents">
                                个人申请的学分：
                                <span>${date.分数}${scords}</span>
                            </li>
                        `
        application_message[0].innerHTML = all;
        if(date.team == '是'){
            application_message[0].innerHTML += `
                            
                            <li class="contents">
                                个人排名：
                                <span>第${date.申请表.orders}名</span>
                            </li>
                            <li class="contents">
                                备注：
                                <span>${date.申请表.classify.b_remark}</span>
                            </li>
                            `
        }else{
            application_message[0].innerHTML += `
                            <li class="contents">
                                备注：
                                <span>${date.申请表.classify.b_remark}</span>
                            </li>
                            `
        }
        describe[0].innerHTML = `<div class="parctice-content">
                            <span>实践内容说明：</span>
                            <div>
                                <textarea name="" id="textarea" readonly style="resize: none">${date.申请表.remarks}</textarea>
                            </div>
                        </div>`
        // pic(300);
    }).catch((err)=>{
        console.log(err);
    })

    axios({
        method:'get',
        url:'/user/feedback',
        params:{
            id:id,
        }
    }).then((data)=>{
        // console.log(data.data);
        if(data.data.status == 200){
            reject[0].innerHTML = `<div class="failure">
                            <span>驳回的理由：</span>
                            <div>
                                <textarea name="" id="textarea" readonly style="resize: none">${data.data.data.message}</textarea>
                            </div>
                        </div>`
        }
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
            pic(640);
            carousel_item[0].innerHTML = `<div class="attchment-everyOne"><img src='public/img/no-content.png' class="attchment-imgs"><div class="no-content">暂无内容</div></div>`
        }else{
            pic(600);
            for(let i=0;i<date.data.data.length;i++){
                let  arr = date.data.data[i].address.split('.');
                // console.log(arr[arr.length -1]);
                if(arr[arr.length -1] == 'pdf'){
                    all += `<iframe src="${date.data.data[i].address}" class="attchment-imgs attchments"></iframe>`
                    // all += `<object data="${date.data.data[i].address}" type="application/pdf" class="attchment-imgs attchments"></object>`
                }else{
                    all +=`<div class="attchment-everyOne"><img src='${date.data.data[i].address}' class="attchment-imgs attchments" ></div>`
                }
            }
            carousel_item[0].innerHTML = all;
            attchment_header[0].innerHTML = '附件名称：' + date.data.data[0].enclosure_name;
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
            console.log(attchment_imgs[i].src)
            let all = attchment_imgs[i].src.split('.');
            if(all[all.length - 1] == 'pdf'){
                downloadIamge(attchment_imgs[i].src);
            }else{
                downloadImages(attchment_imgs[i].src)
            }
            if(i == attchment_imgs.length -1){
                let timer = setTimeout(function (){
                    swal('下载成功','全部下载完毕','success');
                    clearTimeout(timer);
                },500);
            }

        }
    }
}


//下载图片
function downloadIamge(imgSrc) {
    let imgUrl = imgSrc;// 图片链接
    let a = document.createElement('a');
    let now =Date.now();
    // console.log(now);
    // 这里是将url转成blob地址，
    fetch(imgUrl,{
        mode:'cors'
    })  // 跨域时会报错
        .then(res => res.blob())
        .then(blob => { // 将链接地址字符内容转变成blob地址
            a.href = URL.createObjectURL(blob);
            a.download ='图片'+ now; // 下载文件的名字
            document.body.appendChild(a);
            a.click();
            //在资源下载完成后 清除 占用的缓存资源
            window.URL.revokeObjectURL(a.href);
            document.body.removeChild(a);
        })
}


function downloadImages(imgsrc) {//下载图片地址和图片名
    var image = new Image();
    // 解决跨域 Canvas 污染问题,
    image.setAttribute("crossorigin", "anonymous");
    image.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); //将图片格式转为base64
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = '图片'+ Date.now(); // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = imgsrc + '?time=' + Date.now();  //注意，这里是灵魂，否则依旧会产生跨域问题

}

returns[0].onclick = function (){
    window.history.go(-1);
}