
// layui.use(['form', 'layedit', 'laydate'], function () {
//   var form = layui.form
//     , layer = layui.layer
//     , layedit = layui.layedit
//     , laydate = layui.laydate;
//   //自定义验证规则
// });
let aid = window.location.search.split("=")[1];
let subtextarea=document.getElementById('subtextarea');
let teamin=document.getElementsByClassName('teamin');
let credittype = document.getElementsByName('application_credit_type')[0];
let son = document.getElementById('son');
let son2 = document.getElementById('son2');
let usermessage = document.getElementsByClassName('usermessage');
let credittypesonson = document.getElementById('credittypesonson');
let ranking= document.getElementById('ranking');
let getcredit= document.getElementById('getcredit');
var sqb;
function myFunction(event) {        
  if (isNaN(event.value) ||event.value<= 0 || event.value >= 101 || !(/^\d+$/.test(event.value))) {
      {    
      event.value = "";
      }
  }
}
axios({
    url: '/api/getpostmessage',
    method: 'get',
    params: {id:aid},
  }).then(response=> {
      console.log(response.data);   
      let data=response.data.data;
    if(response.data.msg!='OK'){
        swal('获取失败！');
        window.replace('404.html');
    }else{
        document.getElementById('aid').value=aid;
        getcredit.innerText=data.分数;
        subtextarea.value=data.申请表.remarks;
        if(data.申请表.team=="是"){
          ranking.innerHTML='';
          ranking.innerHTML=`
          项目人数：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
          <input name='allnumber' id='teamnumber' autocomplete="off" placeholder="人数" class="layui-input"  maxlength='3' onkeyup="myFunction(this)">
          人&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
          项目排名：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
          <input name="orders" id='rankinput'  maxlength='3' onkeyup="myFunction(this)" autocomplete="off" placeholder="排名"  class="layui-input">
          名
          `;
          teamin[0].checked=false;
          teamin[1].checked=true;
          document.getElementById('rankinput').value=data.申请表.orders;
        }
        let num=data.申请表.remarks.length;
        console.log(num);
        document.getElementById('word').innerText=num;
        setfather(data.申请表.creditType.aid);
        // if(data.申请表.classify.b_Indicator_level==2){
        //   resetson(data.申请表.classify.b_Indicator_name);
        // }else if(data.申请表.classify.b_Indicator_level==3){

        // }
        sqb=data.申请表.classify;
        return data.申请表.classify;
        // return data.申请表.classify.b_Indicator_name;
      }
    }).then(date1=>{
      let option = credittype.getElementsByTagName('option');
      // console.log("2222222222222");
      for (let n of option) {
        if (n.selected) {
          return     axios({
            url: '/api/getsonson',
            method: 'get',
            params: {
              "id": n.value,
              "level": "1"
            },
          })
        }
      }
  }).then(data => {
    // console.log(data);
    son.innerHTML = `<option value="0">请选择</option>`;
    // console.log(data.data.data.length);
    let reson=data.data.data.length!=undefined?data.data.data:data.data.data.childlist[0].childlist;
    for (let n of reson) {
      son.innerHTML += `<option value="${n.b_id}">${n.b_Indicator_name}</option>`
    }
  })  
  .then(date=>{
    // console.log(sqb);
    // console.log("44444444444");
    if(sqb.b_Indicator_level==2){
      resetson(sqb.b_Indicator_name);
      return 0;
    }else if(sqb.b_Indicator_level==3){
      resetson2(sqb.b_superior_id);
      return sqb.b_superior_id;
    }
  }).then(end=>{
    if(end==0){
      return 0;
    }
    let option = son.getElementsByTagName('option');
    for (let n of option) {
      
      if (n.selected) {
       return     axios({
        url: '/api/getsonson',
        method: 'get',
        params: {
          "id": end,
          "level": "2"
        },
      })
      }
    }
    // resetson(end.data.);
  }).then(data => {
    if(data==0){
      return 0;
    }
    if (data.data.data == '下边没有指标了') {
      axios({
        url: '/api/gefatherm',
        method: 'get',
        params: {
          "id": father,
        }}).then(redate=>{
          console.log(redate.data);
          if(redate.data.data.classfiy.b_points_available==0){
            credittypesonson.style.display = 'block';
            // son2.innerHTML=`<option value="0">请选择</option>`;
            son2.innerHTML = `<option value="0">暂时无数据</option>`;
            return
          }
        })
      credittypesonson.style.display = 'none';
      son2.innerHTML = ``;
    } else if (data.data.data.length > 0) {
      credittypesonson.style.display = 'block';
      // son2.innerHTML=`<option value="0">请选择</option>`;
      son2.innerHTML = ``;
      // console.log(data.data.data.length);
      for (let n of data.data.data) {
        son2.innerHTML += `<option value="${n.b_id}">${n.b_Indicator_name}</option>`
      }
    }
    resonson(sqb.b_Indicator_name)
    // console.log(data.data.data);
  })
  .catch(error=> {
    // swal('提交失败',"您所填写的申请表提交失败",'error')
    // swal('获取内容失败！');
    // console.log(error);
});
function getnowcredit(){
  var o = $('#form').serializeObject();
  o.remarks=htmllEscape(o.remarks);
  console.log(o);
  if (o.specific_information == '0') {
    swal('请选择指标！')
    return
  } else if (credittypesonson.style.display == 'block') {
    // console.log(o.specific_information);
    o.specific_information = o.specific_information[1];
  }
  if(o.team=='否'){
    return   axios({
      url: '/api/getCreditById',
      method: 'get',
      params: {
        "id": o.specific_information,
        "order": 1
      },
    }).then(data => {
      console.log(data);
      getcredit.innerText=data.data.data
    }).catch(function (error) {
      console.log(error);
    });
  }else{
    if(isnull(o.orders)){
      swal("请填写您的团队排名！");
      return
    }
    if(isnull(o.allnumber)){
      swal("请填写您的团队人数！");
      return
    }
    if(o.orders<=0||parseInt(o.orders)>parseInt(o.allnumber)){
      swal("请填写合理的团队排名！");
      return  
    }
    return   axios({
      url: '/api/getCreditById',
      method: 'get',
      params: {
        "id": o.specific_information,
        "order": o.orders
      }
    }).then(data => {
      console.log(data)
      getcredit.innerText=data.data.data
    }).catch(function (error) {
      console.log(error);
    });
  }
}
function setfather(id){
  let option = credittype.getElementsByTagName('option');
  for (let n of option) {
    if (n.value==id) {
      n.selected=true;
    }
  }
}
function resetson(id){
  // console.log(id);
  let reoption = son.getElementsByTagName('option');
  for (let n of reoption) {
    if (n.innerHTML==id) {
      n.selected=true;
    }
  }
}
function resetson2(id){
  // console.log(id);
  // console.log(son);
  let reoption = son.getElementsByTagName('option');
  for (let n of reoption) {
    if (n.value==id) {
      n.selected=true;
    }
  }
}
function resonson(id){
  let option = son2.getElementsByTagName('option');
  for (let n of option) {
    if (n.innerHTML==id) {
      n.selected=true;
    }
  }
}
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
  // const hasClass = (el, className) => el.classList.contains(className)
  // let show;
  if(sessionStorage.getItem('Applicationid')){
    swal("您还有申请表未上传完整！");
    setTimeout(function () {
      // window.location.assign("/UploadAttachment");
      location.replace('/UploadAttachment');
    }, 500)
  }
  function isnull(val) {
   
    var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
  
    if (str == '' || str == undefined || str == null) {
        return true;
    } else {
        return false;
    }
  }
  function htmllEscape(htmlstr){
    return htmlstr.replace(/<|>"|&/g,(match)=>{
        switch(match){
            case '<':
                return "&lt"
            case '>':
                return "&gt"
            case '&':
                return "&amp"
        }
    })
  }
  axios({
    url: '/api/getmymessage',
    method: 'get',
    }).then(data=>{
      // console.log(data);
      usermessage[0].innerHTML=data.data.name;
      usermessage[1].innerHTML=data.data.sex;
      usermessage[2].innerHTML=data.data.userName;
      usermessage[3].innerHTML=data.data.academy;
      usermessage[4].innerHTML=data.data.major;
      usermessage[5].innerHTML=data.data.major_class;
  })
  $('#postbutton').on('click', function () {
    var o = $('#form').serializeObject();
    // console.log(o);
    o.remarks=htmllEscape( o.remarks);
    if (isnull(o.remarks)) {
    // if (o.remarks == '') {
      swal("请填写实践内容说明！");
      return
    }
    // if (isnull(o.points)) {
    //   // if (o.remarks == '') {
    //     swal("请您要申请的分值！");
    //     return
    //   }
    if(o.team=="是"){
      if(isnull(o.orders)){
        swal("请填写您的团队排名！");
        return
      }
      if(isnull(o.allnumber)){
        swal("请填写您的团队人数！");
        return
      }
      if(o.orders<=0||parseInt(o.orders)>parseInt(o.allnumber)){
        swal("请填写合理的团队排名！");
        return  
      }
    }
    if (o.specific_information == '0') {
      swal('请选择指标！')
      return
    } else if (credittypesonson.style.display == 'block') {
      // console.log(o.specific_information);
      o.specific_information = o.specific_information[1];
      if(o.specific_information=='0'){
        swal('下级指标不存在！');
        return
      }
      axios({
        url: '/api/gefatherm',
        method: 'get',
        params: {
          "id": o.specific_information,
        }
      }).then(data => {
        // console.log(data.data);
        let thism=data.data.data.classfiy;
        o.indicator_name=thism.b_Indicator_name;
        o.rule0=thism.rule;
        o.remark=thism.b_remark;
        o.points_available=thism.b_points_available;
      }).catch(function (error) {
        
      });
      swal({
        title: "你确定提交该申请表？",
        text: "你将添提交该部分数据！",
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
            url: '/api/updatapost',
            method: 'post',
            data: o,
            header: {
              'Content-Type': 'application/json' 
               //如果写成contentType会报错
            }
          }).then(data => {
            // console.log(data.data);
            let aid = window.location.search.split("=")[1];
            if (data.data.msg == 'OK') {
              swal('修改成功', '您所填写的申请表修改成功', 'success');
              if(o.ore=="是"){
                setTimeout(function () {
                  sessionStorage.setItem('Applicationid',aid);
                  window.location.assign("/UploadAttachment");
                  // sessionStorage.setItem("tousers", '1');
                }, 1000)
              }else{
                setTimeout(function () {
                  sessionStorage.setItem("havesuccess", '1');
                  window.location.assign("/EndApplication");
                }, 1000)
              }
            }else if(data.data.msg == '已超过最大分值'){
              swal('修改失败',"您所填写的申请已超过最大分值",'error');
            }
          }).catch(function (error) {
            // console.log(error);
            if(error.data.msg == '已超过最大分值'){
              swal('修改失败',"您所填写的申请已超过最大分值",'error');
              return
            }
            swal('修改失败',"您所填写的申请表提交失败",'error')
          });
        } else {
          swal("您已经取消修改")
        }
      })
    } else {
      if(o.specific_information=='0'){
        swal('下级指标不存在！');
        return
      }
      axios({
        url: '/api/gefatherm',
        method: 'get',
        params: {
          "id": o.specific_information,
        }
      }).then(data => {
        // console.log(data.data);
        let thism=data.data.data.classfiy;
        o.indicator_name=thism.b_Indicator_name;
        o.rule0=thism.rule;
        o.remark=thism.b_remark;
        o.points_available=thism.b_points_available;
      }).catch(function (error) {
        
      });
      swal({
        title: "你确定提交该申请表？",
        text: "你将添提交该部分数据！",
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
            url: '/api/updatapost',
            method: 'post',
            data: o,
            header: {
              'Content-Type': 'application/json' 
               //如果写成contentType会报错
            }
          }).then(data => {
            // console.log(data.data);
            
            if(data.data.msg == '已超过最大分值'){
              swal('修改失败',"您所填写的申请已超过最大分值",'error');
              return
            }
            swal('修改成功', '您所填写的申请表提交成功', 'success');
            let date=data.data;
            // console.log(data.data);
            let aid = window.location.search.split("=")[1];
            // console.log(aid);
            if(o.ore=="是"){
              setTimeout(function () {
                sessionStorage.setItem('Applicationid',aid);
                window.location.assign("/UploadAttachment");
                // sessionStorage.setItem("tousers", '1');
              }, 1000)
            }else{
              setTimeout(function () {
                sessionStorage.setItem("havesuccess", '1');
                window.location.assign("/EndApplication");
              }, 1000)
            }
          }).catch(function (error) { 
            if(data.data.msg == '已超过最大分值'){
              swal('修改失败',"您所填写的申请已超过最大分值",'error');
              return
            }
            swal('修改失败',"您所填写的申请表提交失败",'error')
            // console.log(error);
          });
        } else {
          swal("您已经取消修改")
        }
      })
    }
    // console.log(JSON.stringify(o));
  });
  function getson1(father) {
    axios({
      url: '/api/getsonson',
      method: 'get',
      params: {
        "id": father,
        "level": "1"
      },
    }).then(data => {
      // console.log(data);
      son.innerHTML = `<option value="0">请选择</option>`;
      // console.log(data.data.data.length);
      let reson=data.data.data.length!=undefined?data.data.data:data.data.data.childlist[0].childlist;
      for (let n of reson) {
        son.innerHTML += `<option value="${n.b_id}">${n.b_Indicator_name}</option>`
      }
      // console.log(son.innerHTML);
    }).catch(function (error) {
      // console.log(error);
    });
    credittypesonson.style.display = 'none';
    son2.innerHTML = ``;
  }
  function getson2(father) {
    axios({
      url: '/api/getsonson',
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
        // console.log(data.data.data.length);
        for (let n of data.data.data) {
          son2.innerHTML += `<option value="${n.b_id}">${n.b_Indicator_name}</option>`
        }
      }else if (data.data.data.length ==0) {
        credittypesonson.style.display = 'block';
        // son2.innerHTML=`<option value="0">请选择</option>`;
        son2.innerHTML = `<option value="0">暂时无数据</option>`;
        // console.log(data.data.data.length);
      }
      // console.log(data.data.data);
    }).catch(function (error) {
      // console.log(error);
    });
  }
  function showson(id){

  }
  function setson() {
    let option = credittype.getElementsByTagName('option');
    for (let n of option) {
      if (n.selected) {
        getson1(n.value)
        break;
      }
    }
  }
  // setson()
  function setsonson() {
    let option = son.getElementsByTagName('option');
    for (let n of option) {
      if (n.selected) {
        getson2(n.value)
        break;
      }
    }
  }
  // $.get(`http://127.0.0.1:8080/api/getmymessage`,
  //   function (data) {
  //     console.log(data);
  //     usermessage[0].innerHTML = data.name;
  //     usermessage[1].innerHTML = data.sex;
  //     usermessage[2].innerHTML = data.userName;
  //     usermessage[3].innerHTML = data.academy;
  //     usermessage[4].innerHTML = data.major_class;
  //     sessionStorage.setItem('username', data.name);
  //     sessionStorage.setItem('usersex', data.sex);
  //     sessionStorage.setItem('userName', data.userName);
  //     sessionStorage.setItem('useracademy', data.academy);
  //     sessionStorage.setItem('userclass', data.major_class);
  //   })
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
      teamin[0].onclick=function(){
      ranking.innerHTML='';
    }
  teamin[1].onclick=function(){
    ranking.innerHTML='';
    ranking.innerHTML=`
    项目排名：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
    <input name="orders" maxlength="2" autocomplete="off" placeholder="排名"  class="layui-input" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
    名
    `;
  }
  $(function(){
    $("#subtextarea").keyup(function(){
      var len = $(this).val().length;
      if(len > 999){
       $(this).val($(this).val().substring(0,1000));
      }
      var num = len;
      $("#word").text(num);
     });
    $("#subtextarea").keydown(function(){
     var len = $(this).val().length;
     if(len > 999){
      $(this).val($(this).val().substring(0,1000));
     }
     var num = len;
     $("#word").text(num);
    });
   });