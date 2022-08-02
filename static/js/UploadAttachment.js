if(!sessionStorage.getItem('Applicationid')){
      location.replace('/submitApplication');
}
var files;
layui.use('upload', function () {
    var $ = layui.jquery
        , upload = layui.upload;
    //多文件列表示例
    var demoListView = $('#demoList')
        , uploadListIns = upload.render({
        elem: '#testList'
        , accept: 'file'
        , multiple: true
        ,number: 2
        , auto: false
        // , bindAction: '#testListAction'
        , choose: function (obj) {
            var that = this;
            files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                var tr = $(['<tr id="upload-'+ index +'">'
                ,'<td>'+ file.name +'</td>'
                ,'<td>'+ (file.size/1014).toFixed(1) +'kb</td>'
                ,'<td class="datastatus">等待上传</td>'
                ,'<td>'
                  ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                  ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                ,'</td>'
              ,'</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });

                //删除
                tr.find('.demo-delete').on('click', function () {
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });
                demoListView.append(tr);
            });
        }
    });
});
let demoList=document.getElementById('demoList');
const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
axios({
    method: 'GET',
    url: '/api/getEnclosure',
    params:{
        id:sessionStorage.getItem('Applicationid'),
    }
})
    .then((result) => {
        let data=result.data.data;
        // console.log(data);
        if(data.length==0) {
            return
        }else{
            for(let i in data){
                let name=getLastItem(data[i].address);
                demoList.innerHTML+=`
                <tr id="upload-'+ index +'">
                    <td>${name}</td>
                    <td></td>
                    <td class="datastatus" style='color:#3FCEBF'>上传成功</td>
                    <td>
                        <button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>
                        <button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>
                    </td>
                </tr>
                
                `
            }
        }
    })
    .catch((err)=>{
        // console.log(err)
    })
let Attname=document.getElementById('Attname');
function isnull(val) {
 
    var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
  
    if (str == '' || str == undefined || str == null) {
        return true;
    } else {
        return false;
    }
  }
$("#testListAction").on("click", function () {
        let name=Attname.value;
        if(isnull(name)){
            swal("请输入附件名！");
            if(!isNaN(name)){
                swal("请按正常的附件名格式填写！");
            }
            return
        }
        let datastatus=document.getElementsByClassName('datastatus');
        if(datastatus.length==0){
            swal("请选择要上传的附件！");
            return
        }
        if(datastatus.length>4){
            swal("上传的附件不能超过4个！");
            return
        }
        for(let i of datastatus){
            if( i.innerHTML=='等待上传'){
             i.innerHTML=`<div class="loading"></div><span style='color:#1e9fff;line-height:30px'>上传中......</span>`
            }
         }
        let formData = new FormData();  
        let a=JSON.stringify(files)
        let i=0;
        for (let key in files) {
            formData.append(`file${i}`,files[key])
            i++;
        }
        formData.append('application_id', sessionStorage.getItem('Applicationid'))
        formData.append('enclosure_name',name)
        // console.log(formData)
        axios({
            method: 'POST',
            url: '/api/UploadAttachment',
            data: formData,
            // params:{
            //     id:11,
            //     name:'测试222'
            // }
        })
            .then((result) => {
                // console.log(result.data)
                if(result.data.msg.msg=="OK"){
                    swal("上传成功！","您的文件上传成功！","success")
                    let static=document.getElementsByClassName("datastatus");
                    for(let n of static){
                        n.innerHTML='上传成功'
                        n.style.color="#3FCEBF"
                    }
                    return 
                }else if(result.data.err==-1){
                    swal("上传失败！","您提交的文件上传失败！","error")
                }else if(result.data.msg.msg=="文件格式错误"){
                    swal("上传失败！","您提交的文件格式错误！","error")
                }else{
                    swal("上传失败！","您提交的文件上传失败！","error")
                }
                for(let i of datastatus){
                    if( i.innerText=='上传中......'){
                     i.innerHTML=`等待上传`
                    }
                 }
            })
            .catch((err)=>{
                // console.log(err)
            })
});
document.getElementById('toend').onclick=function(){
    let datastatus=document.getElementsByClassName('datastatus');
    if(datastatus.length==0){
        swal("请选择要上传的附件！");
        return
    }
    for(let i of datastatus){
        if( i.innerHTML!='上传成功'){
         swal("你还有附件未上传成功！");
         return
        }
     }
    swal({
        title: "你确定完成该申请表？",
        text: "你将没有机会修改该申请表！",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
              swal('提交成功', '您所填写的申请表提交成功', 'success');
              sessionStorage.setItem("havesuccess", '1');
              sessionStorage.removeItem('Applicationid');
              setTimeout(function () {
                window.location.assign("/EndApplication");
                // sessionStorage.setItem("tousers", '1');
              }, 1000)
        } else {
          swal("您已经取消完成")
        }
      })
}
