layui.use(['form', 'layedit', 'laydate'], function () {
  var form = layui.form
    , layer = layui.layer
    , layedit = layui.layedit
    , laydate = layui.laydate;
  //自定义验证规则

  //监听指定开关
  //监听提交
  // form.on('submit(demo1)', function(data){
  //   layer.alert(JSON.stringify(data.field), {
  //     title: '最终的提交信息'
  //   })
  //   return false;
  // });
  //表单取值
  // layui.$('#LAY-component-form-getval').on('click', function(){
  //   var data = form.val('example');
  //   alert(JSON.stringify(data));
  // });

});
$.fn.serializeObject = function () {
  var ct = this.serializeArray();
  var obj = {};
  $.each(ct, function () {
    if (obj[this.name] !== undefined) {
      if (!obj[this.name].push) {
        obj[this.name] = [obj[this.name]];
      }
      obj[this.name].push(this.value || "");
    } else {
      obj[this.name] = this.value || "";
    }
  });
  return obj;
};
axios.defaults.baseURL = 'http://127.0.0.1:8080/';
// const hasClass = (el, className) => el.classList.contains(className)
// let show;
let credittype = document.getElementsByName('application_credit_type')[0];
let son = document.getElementsByName('specific_information')[0];
let son2 = document.getElementById('son2');
let usermessage = document.getElementsByClassName('usermessage');
let credittypesonson = document.getElementById('credittypesonson');

$('#postbutton').on('click', function () {

  var o = $('#form').serializeObject();
  console.log(o);
  if (o.remarks == '') {
    swal("请填写实践内容说明！");
    return
  }
  if (o.specific_information == '0') {
    swal('请选择指标！')
    return
  } else if (credittypesonson.style.display == 'block') {
    console.log(o.specific_information);
    o.specific_information = o.specific_information[1];
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
        axios({
          url: 'http://127.0.0.1:8080/api/getpost',
          method: 'post',
          data: o,
          header: {
            'Content-Type': 'application/json' 
             //如果写成contentType会报错
            
          }
        }).then(data => {
          if (data.data.msg == 'OK') {
            swal('提交成功', '您所填写的申请表提交成功', 'success');
            sessionStorage.setItem('Applicationid', data.data.data);
            console.log(data.data);
            setTimeout(function () {
              window.location.assign("http://127.0.0.1:8080/UploadAttachment");
              // sessionStorage.setItem("tousers", '1');
            }, 1000)
          }
        }).catch(function (error) {
          swal('提交失败',"您所填写的申请表提交失败",'error')
          console.log(error);
        });
      } else {
        swal("您已经取消提交")
      }
    })
  } else {

  }
  // console.log(JSON.stringify(o));
});
function getson1(father) {
  axios({
    url: 'http://127.0.0.1:8080/api/getcreditson',
    method: 'get',
    params: {
      "indicator": father,
    },
  }).then(data => {
    son.innerHTML = `<option value="0">请选择</option>`;
    for (let n of data.data.data.childlist[0].childlist) {
      son.innerHTML += `<option value="${n.classfiy.b_id}">${n.classfiy.b_Indicator_name}</option>`
    }
  }).catch(function (error) {
    console.log(error);
  });
  credittypesonson.style.display = 'none';
  son2.innerHTML = ``;
}
function getson2(father) {
  axios({
    url: 'http://127.0.0.1:8080/api/getsonson',
    method: 'get',
    params: {
      "id": father,
      "level": "2"
    },
  }).then(data => {
    if (data.data.data == '下边没有指标了') {
      credittypesonson.style.display = 'none';
      son2.innerHTML = ``;
    } else if (data.data.data.length > 0) {
      credittypesonson.style.display = 'block';
      // son2.innerHTML=`<option value="0">请选择</option>`;
      son2.innerHTML = ``;
      console.log(data.data.data.length);
      for (let n of data.data.data) {
        son2.innerHTML += `<option value="${n.b_id}">${n.b_Indicator_name}</option>`
      }
    }
    console.log(data.data.data);
  }).catch(function (error) {
    console.log(error);
  });
}
function setson() {
  let option = credittype.getElementsByTagName('option');
  for (let n of option) {
    if (n.selected) {
      getson1(n.innerHTML)
      break;
    }
  }
}
setson()
function setsonson() {
  let option = son.getElementsByTagName('option');
  for (let n of option) {
    if (n.selected) {
      getson2(n.value)
      break;
    }
  }
}
$.get(`http://127.0.0.1:8080/api/getmymessage`,
  function (data) {
    console.log(data);
    usermessage[0].innerHTML = data.name;
    usermessage[1].innerHTML = data.sex;
    usermessage[2].innerHTML = data.userName;
    usermessage[3].innerHTML = data.academy;
    usermessage[4].innerHTML = data.major_class;
    sessionStorage.setItem('username', data.name);
    sessionStorage.setItem('usersex', data.sex);
    sessionStorage.setItem('userName', data.userName);
    sessionStorage.setItem('useracademy', data.academy);
    sessionStorage.setItem('userclass', data.major_class);
  })
// function getclass(event){
//   let dd=event.parentNode.getElementsByTagName('dd');
//   let text=event.parentNode.parentNode.getElementsByTagName('input')[0];
//   for(let i of dd){
//     i.classList="";
//   }
//   event.classList='layui-this';
//   text.value=event.innerHTML
// }
// window.onload=()=>{
//   for(let i of dd){
//     i.onclick=()=>{
//       // console.log(i.innerHTML);
//       axios({
//         url: 'http://127.0.0.1:8080/api/getcreditson',
//         method: 'get',
//         params: {
//             "indicator":i.innerHTML,
//         },
//     }).then(data => {
//       let dl=son.parentNode.getElementsByTagName('dl')[0];
//       // console.log(dl.innerHTML);
//       // son.innerHTML=` <option value="0">请选择</option>`;
//       // dl.innerHTML=`<dd lay-value="0" class="layui-this" onclick="getclass(this)" class="layui-this">请选择</dd>`;
//       son.innerHTML=``;
//       // console.log(son.innerHTML);
//       //  console.log(data.data.data.childlist[0].childlist.length);
//       //  console.log(data.data.data.childlist[0].childlist);
//        for(let n of data.data.data.childlist[0].childlist){
//           son.innerHTML+=`<option value="${n.classfiy.b_id}">${n.classfiy.b_Indicator_name}</option>`
//        }
//       //  console.log(son.innerHTML);
//     }).catch(function (error) {
//         console.log(error);
//     });
//     }
//   }
// }
// function submitpost(){
//   let data={
//     application_credit_type:"2",
//     remarks:"哈哈哈哈哈哈",
//     specific_information:"2"
//   }
//   axios({
//     url: 'http://127.0.0.1:8080/api/getpost',
//     method: 'post',
//     data: data,
//     header:{
//       'Content-Type':'application/json'  //如果写成contentType会报错
//     }
// }).then(data =>{
//   console.log(data.data);
// }).catch(function (error) {
//     console.log(error);
// });
// }
// submitpost();