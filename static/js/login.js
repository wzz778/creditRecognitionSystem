let text = document.getElementsByClassName('text');
function myFunction() {
    if (text[0].value == '' || text[1].value == '') {
        swal("请输入完整的内容！")
    } else {
        axios({
            url: 'http://127.0.0.1:8080/api/login',
            method: 'post',
            data: {
                "password": text[1].value,
                "userName": text[0].value,
            },
        }).then(data => {
            if (data.data.msg == 'OK') {
                swal('登录成功', "您输入了正确的账号密码", "success");
                setTimeout(function () {
                    window.location.assign("http://127.0.0.1:8080/submitApplication");
                    // sessionStorage.setItem("tousers", '1');
                }, 1000)               
            } else {
                swal('登录失败', "您输入的账号密码不正确", "error");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
}
function show(event) {

}