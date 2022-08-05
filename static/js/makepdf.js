let message=document.getElementsByClassName('message');
axios({
    url: '/api/getpostmessage',
    method: 'get',
    params: {id:sessionStorage.getItem('Applicationid')},
  }).then(response=> {
    //   console.log(response.data);   
      let data=response.data.data;
    let qu=data.申请表.team=="否"?"否":`是   团队排名为  ${data.申请表.orders}`;
    if(response.data.msg!='OK'){
        alert('获取失败！');
    }else{
        message[0].innerText=data.申请表.user.name;
        message[1].innerText=data.申请表.user.sex;
        message[2].innerText=data.申请表.user.userName;
        message[3].innerText=data.申请表.user.academy;
        message[4].innerText=data.申请表.user.major_class
        message[5].innerText=data.申请表.creditType.afirstLevel;
        message[6].innerText=qu;
        message[7].innerText=data.分数;
        message[8].innerText=data.申请表.remarks;
    }
  }).catch(error=> {
    // swal('提交失败',"您所填写的申请表提交失败",'error')
    alert('获取内容失败！');
    // console.log(error);
});
for(let n of message){
    if(n.innerHTML=='null'){
        n.innerHTML=''
    }
}
function makepdf() {
    let com=confirm('您确定下载该psf表格?');
    if(com){
        html2canvas(
            document.getElementById("schoolform"),
            {
                dpi: 172,//导出pdf清晰度
                onrendered: function (canvas) {
                    var contentWidth = canvas.width;
                    var contentHeight = canvas.height;
    
                    //一页pdf显示html页面生成的canvas高度;
                    var pageHeight = contentWidth / 592.28 * 841.89;
                    //未生成pdf的html页面高度
                    var leftHeight = contentHeight;
                    //pdf页面偏移
                    var position = 0;
                    //html页面生成的canvas在pdf中图片的宽高（a4纸的尺寸[595.28,841.89]）
                    var imgWidth = 595.28;
                    var imgHeight = 592.28 / contentWidth * contentHeight;
    
                    var pageData = canvas.toDataURL('image/jpeg', 1.0);
                    var pdf = new jsPDF('', 'pt', 'a4');
    
                    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                    //当内容未超过pdf一页显示的范围，无需分页
                    if (leftHeight < pageHeight) {
                        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                    } else {
                        while (leftHeight > 0) {
                            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                            leftHeight -= pageHeight;
                            position -= 841.89;
                            //避免添加空白页
                            if (leftHeight > 0) {
                                pdf.addPage();
                            }
                        }
                    }
                    pdf.save(`${message[4].innerHTML}${message[0].innerHTML}.pdf`);
                },
                //背景设为白色（默认为黑色）
                background: "#fff"
            })
    }
}