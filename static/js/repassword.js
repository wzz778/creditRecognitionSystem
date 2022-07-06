let text = document.getElementsByClassName('text');
function myFunction() {
    if (text[0].value == '' || text[1].value == ''|| text[2].value == ''|| text[3].value == '') {
        swal("请输入完整的内容！")
    }else if (text[1].value ==text[2].value ){
        swal("您输入原密码和新密码内容一致！")
    } 
    else {
        axios({
            method: 'put',
            url: 'http://127.0.0.1:8080/api/uppassword',
            params:{
                username: text[0].value,
                mypassword:text[1].value,
                password:text[2].value,
                prePassword:text[3].value,
            }
            }).then(response=>{
                if(response.data=='您的密码输入错误！'){
                    swal("您的原密码输入错误！")
                }else if(response.data.data=='输入的密码不一致'){
                    swal("您输入两个新密码密码不一致！")
                }else{
                    swal('修改成功', "您的密码修改成功！", "success");
                setTimeout(function () {
                    window.location.assign("http://127.0.0.1:8080/login");
                    // sessionStorage.setItem("tousers", '1');
                }, 1000)   
                }
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
        });
    }
}
function show(event) {

}