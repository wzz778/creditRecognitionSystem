let text = document.getElementsByClassName('text');
let eyeimg=document.getElementById('eyeimg');
let passwordin=document.getElementById('passwordin');
function myFunction() {
    if (text[0].value == '' || text[1].value == '') {
        swal("请输入完整的内容！")
    } else {
        axios({
            url: '/api/login',
            method: 'post',
            data: {
                "password": text[1].value,
                "userName": text[0].value,
            },
        }).then(data => {
            if (data.data.msg == 'OK') {
                swal('登录成功', "您输入了正确的账号密码", "success");
                // setTimeout(function () {
                //     window.location.assign("http://127.0.0.1:8080/submitApplication");
                //     // sessionStorage.setItem("tousers", '1');
                // }, 1000)               
            } else {
                swal('登录失败', "您输入的账号密码不正确", "error");
                return 
            }
            return  axios({
                url: '/api/getmymessage',method: 'get',})
        }).then((user)=>{
                    // console.log(user);
                    sessionStorage.setItem('name', user.data.name);
                    sessionStorage.setItem('power', user.data.power);
                    if(user.data.power!='普通用户'){
                        setTimeout(function () {
                            window.location.assign("/examineApplication");
                        }, 1000)   
                        return
                    }
                    setTimeout(function () {
                        window.location.assign("/submitApplication");
                        // sessionStorage.setItem("tousers", '1');
                    }, 1000)   
        }).catch(function (error) {
            // console.log(error);
        });
    }
}

// passwordin.addEventListener("keyup",function(event){
//     if(event.keyCode==13){
//         myFunction();
//     }
//   });
function eye() {
    let type=passwordin.type;
    if(type=='password'){
        passwordin.type='text'
        eyeimg.src='public/img/eye.png'
    }else{
        passwordin.type='password'
        eyeimg.src='public/img/noeye.png'
    }
}