function watchChild(event) {
    // 判断内容盒子是否显现
    if (event.parentElement.parentElement.parentElement.lastElementChild.style.display == 'none') {
        event.parentElement.parentElement.parentElement.lastElementChild.style.display = ''
        event.firstElementChild.style.display = 'none'
    } else {
        event.parentElement.parentElement.parentElement.lastElementChild.style.display = 'none'
        event.firstElementChild.style.display = ''
    }
}

// 弹窗取消函数
let cancel=document.getElementsByClassName('cancel')
for(let i=0;i<cancel.length;i++){
    cancel[i].onclick=function(){
        cancel[i].parentElement.parentElement.parentElement.style.display='none'
    }
}