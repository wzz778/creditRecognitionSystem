layui.use(['upload', 'element', 'layer'], function(){
    var $ = layui.jquery
    ,upload = layui.upload
    ,element = layui.element
    ,layer = layui.layer; 
    //演示多文件列表
    var uploadListIns = upload.render({
      elem: '#testList'
      ,elemList: $('#demoList') //列表元素对象
      ,url: 'https://httpbin.org/post' //此处用的是第三方的 http 请求演示，实际使用时改成您自己的上传接口即可。
      ,accept: 'file'
      ,multiple: true
      ,number: 3
      ,auto: false
      ,bindAction: '#testListAction'
      ,choose: function(obj){   
        var that = this;
        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
        //读取本地文件
        obj.preview(function(index, file, result){
          var tr = $(['<tr id="upload-'+ index +'">'
            ,'<td>'+ file.name +'</td>'
            ,'<td>'+ (file.size/1014).toFixed(1) +'kb</td>'
            ,'<td><div class="layui-progress" lay-filter="progress-demo-'+ index +'"><div class="layui-progress-bar" lay-percent=""></div></div></td>'
            ,'<td>'
              ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
              ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
            ,'</td>'
          ,'</tr>'].join(''));
          
          //单个重传
          tr.find('.demo-reload').on('click', function(){
            obj.upload(index, file);
          });
          
          //删除
          tr.find('.demo-delete').on('click', function(){
            delete files[index]; //删除对应的文件
            tr.remove();
            uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
          });
          
          that.elemList.append(tr);
          element.render('progress'); //渲染新加的进度条组件
        });
      }
      ,done: function(res, index, upload){ //成功的回调
        var that = this;
        //if(res.code == 0){ //上传成功
          var tr = that.elemList.find('tr#upload-'+ index)
          ,tds = tr.children();
          tds.eq(3).html(''); //清空操作
          delete this.files[index]; //删除文件队列已经上传成功的文件
          return;
        //}
        this.error(index, upload);
      }
      ,allDone: function(obj){ //多文件上传完毕后的状态回调
        console.log(obj)
      }
      ,error: function(index, upload){ //错误回调
        var that = this;
        var tr = that.elemList.find('tr#upload-'+ index)
        ,tds = tr.children();
        tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
      }
      ,progress: function(n, elem, e, index){ //注意：index 参数为 layui 2.6.6 新增
        element.progress('progress-demo-'+ index, n + '%'); //执行进度条。n 即为返回的进度百分比
      }
    });
  });
  document.getElementById('nextAction').onclick=function(){
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
            swal('提交成功','您所填写的申请表提交成功','success')
            setTimeout(function () {
                window.location.assign("http://127.0.0.1:8080/EndApplication");
            }, 1000)  
        } else {
            swal('已取消',"您已经取消上传",'error')
        }
    })
  }