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
        ,number: 3
        , auto: false
        , bindAction: '#testListAction'
        , choose: function (obj) {
            files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1024).toFixed(1) + 'kb</td>'
                    , '<td>等待上传</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));

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

$("#testListAction").on("click", function () {
//   var form = new FormData();
//   console.log(files);
//   for (let i in files) {
//       form.append("file", files[i]);
//   }
// //   console.log(files[0]);
//   form.append("application_id", '11');
//   form.append("enclosure_name",'上传的附件1');
//     axios({
//             method: 'POST',
//             url: 'http://127.0.0.1:8080/api/UploadAttachment',
//             data: formData,
//             params:{
//                 id:11,
//                 name:'测试'
//             }
//         }).then((result) => {
//             console.log(result.data)
//         })
//         .then((err)=>{
//             console.log(err)
//         })
        let formData = new FormData()   
        let a=JSON.stringify(files)
        // for(let key in files){
        //      console.log(key);
        //      console.log(files[key]);
        // }
        // let b=JSON.parse(a)
        // let d=a.replaceAll(/"/g, "").replaceAll(/:{}/g, "").replaceAll(/{/g, "").replaceAll(/}/g, "")
        // console.log(d);
        // let c=d.split(',');
        // console.log(c);
        // console.log(c[0]);
        // let w=c[0]
        // console.log(files);
        let i=0;
        for (let key in files) {
            formData.append(`file${i}`,files[key])
            i++;
        }

        formData.append('application_id',22)
        formData.append('enclosure_name','测试22')
        // console.log(formData)
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8080/api/UploadAttachment',
            data: formData,
            params:{
                id:11,
                name:'测试222'
            }
        })
            .then((result) => {
                console.log(result.data)
            })
            .then((err)=>{
                console.log(err)
            })
});

// let sure = document.getElementById('sure')
//         let uploadFile = document.getElementById('uploadFile')
//         sure.onclick = function () {
//             let formData = new FormData()
//             console.log(uploadFile.files)
//             console.log(typeof uploadFile.files)
//             for (let i = 0; i < uploadFile.files.length; i++) {
//                 console.log(uploadFile.files[i]);
//                 formData.append(`file${i}`, uploadFile.files[i])
//             }
//             formData.append('application_id',22)
//             formData.append('enclosure_name','测试22')
//             // console.log(formData)
//             axios({
//                 method: 'POST',
//                 url: 'http://127.0.0.1:8080/api/UploadAttachment',
//                 data: formData,
//             })
//                 .then((result) => {
//                     console.log(result.data)
//                 })
//                 .then((err)=>{
//                     console.log(err)
//                 })
//         }