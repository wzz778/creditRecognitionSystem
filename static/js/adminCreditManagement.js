
// 提示弹窗
let popUps = document.getElementsByClassName('popUps')


// 点击勾选删除的将所有的勾选框选中
let checkDelAll = document.getElementById('checkDelAll')
let checkDel = document.getElementsByClassName('checkDel')
let childDelAll = document.getElementsByClassName('childDelAll')
let childDel = document.getElementsByClassName('childDel')
let commonDel=document.getElementsByClassName('commonDel')//所有的input框
// 点击全选将所有都选中/取消选中
checkDelAll.onclick=function(){
    if(checkDelAll.checked){
        for(let i=0;i<commonDel.length;i++){
            commonDel[i].checked='true'
        }
    }else{
        for(let i=0;i<commonDel.length;i++){
            commonDel[i].checked=''
        }
    }
}
axios({
    method:'GET',
    url:'/ccc'
})
.then((result)=>{
    console.log(result)
})
.catch((err)=>{
    console.log(err)
})
