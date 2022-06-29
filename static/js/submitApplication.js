layui.use(['form', 'layedit', 'laydate'], function(){
    var form = layui.form
    ,layer = layui.layer
    ,layedit = layui.layedit
    ,laydate = layui.laydate;
    
    //日期
    laydate.render({
      elem: '#date'
    });
    laydate.render({
      elem: '#date1'
    });
    
    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');
   
    //自定义验证规则
    
    //监听指定开关
    form.on('switch(switchTest)', function(data){
      layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
        offset: '6px'
      });
      layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    });
    
    //监听提交
    form.on('submit(demo1)', function(data){
      layer.alert(JSON.stringify(data.field), {
        title: '最终的提交信息'
      })
      return false;
    });
   
    //表单赋值
    layui.$('#LAY-component-form-setval').on('click', function(){
      form.val('example', {
        "username": "贤心" // "name": "value"
        ,"password": "123456"
        ,"interest": 1
        ,"like[write]": true //复选框选中状态
        ,"close": true //开关状态
        ,"sex": "女"
        ,"desc": "我爱 layui"
      });
    });
    //表单取值
    layui.$('#LAY-component-form-getval').on('click', function(){
        swal({
            title: "你确定？",
            text: "您将无法恢复这个虚构的文件！",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "是的，删除！",
            cancelButtonText: "不，取消",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                var data = form.val('example');
                alert(JSON.stringify(data)); 						
                swal("删除!", "您的虚构文件已被删除！", "success")
            } else{
                swal("取消!", "您的虚构文件是安全的！", "error")
            }
        })
    //   var data = form.val('example');
    //   alert(JSON.stringify(data));
    });
    
  });