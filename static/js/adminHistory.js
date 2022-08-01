

// 提示弹窗
// let popUps = document.getElementsByClassName('popUps')


// 点击勾选删除的将所有的勾选框选中
let checkDelAll = document.getElementById('checkDelAll')
checkDelAll.onclick = function () {
    let checkDel = document.getElementsByClassName('checkDel')
    if (checkDelAll.checked) {
        // 全部选中
        for (let i = 0; i < checkDel.length; i++) {
            checkDel[i].checked = 'true'
        }
    } else {
        for (let i = 0; i < checkDel.length; i++) {
            checkDel[i].checked = ''
        }
    }
}
function checkDelFn(event) {
    let checkDel = document.getElementsByClassName('checkDel')
    // 判断是否都中
    let yn = true
    for (let j = 0; j < checkDel.length; j++) {
        if (checkDel[j].checked == '') {
            yn = false
        }
    }
    if (yn) {
        // 所有的都选择了
        checkDelAll.checked = 'true'
    } else {
        checkDelAll.checked = ''
    }

}

// 分页
let allNumber = document.getElementById('allNumber')//总条数
let selectPerpage = document.getElementById('selectPerpage')//选择每页条数
let allPages = document.getElementById('allPages')//总页数
let lastPage = document.getElementById('lastPage')//上一页
let nowPage = document.getElementById('nowPage')//显示当前页数
let jumpPage = document.getElementById('jumpPage')//输入跳转页数
let jump = document.getElementById('jump')//跳转
let nextPage = document.getElementById('nextPage')//下一页
let all_Page = 1//总条数
let per_Page = 10//每页几条
let now_page = 1//当前请求页数

// 限制条件
let passFail = document.getElementById('passFail')
let startDate = document.getElementById('startDate')
let endDate = document.getElementById('endDate')
let sureSearch = document.getElementById('sureSearch')
let resetSearch = document.getElementById('resetSearch')


// 将搜索的值全部都添加到一个对象中
function limitationFactor() {
    let obj = {}
    obj.beginDate = startDate.value
    obj.endDate = endDate.value
    obj.approval_status = passFail.value
    return obj
}

// 查询函数
sureSearch.onclick = function () {
    if (passFail.value == '' && startDate.value == '') {
        // popUps[2].style.display = 'block'
        // setTimeout(() => {
        //     popUps[2].style.display = 'none'
        // }, 2000)
        swal('请输入查询内容')
        return
    }
    GetAllInfo(now_page, per_Page, limitationFactor())
    swal('查询成功')
}
// 重置函数
resetSearch.onclick = function () {
    // 将值清空
    passFail.value = ''
    startDate.value = ''
    endDate.value = ''
    now_page = 1
    nowPage.innerHTML = now_page
    GetAllInfo(now_page, per_Page, limitationFactor())
    swal('已重置')
}

// 判断是否需要请求上一页
function judgeHas() {
    let adminHistoryContentContent = document.getElementsByClassName('adminHistoryContentContent ')[0]
    let allUls = adminHistoryContentContent.getElementsByTagName('ul')
    // console.log('函数',allUls)
    if (allUls.length == 0 && now_page != 1) {
        // 请求上一页
        now_page--
        nowPage.innerHTML = now_page
        GetAllInfo(now_page, per_Page, limitationFactor())
        checkDelAll.checked = ''
        // return
    }
}

selectPerpage.onchange = function () {
    per_Page = selectPerpage.value
    GetAllInfo(now_page, per_Page, limitationFactor())
}

let adminHistoryContentContent = document.getElementsByClassName('adminHistoryContentContent')[0]
let adminHistoryContentNo = document.getElementById('adminHistoryContentNo')
//获取数据
function GetAllInfo(page, perpage, obj) {
    obj.nodePage = page
    obj.pageSize = perpage
    axios({
        method: 'POST',
        url: '/admin/records',
        data: obj
    })
        .then((result) => {
            // console.log(result.data)
            adminHistoryContentContent.innerHTML = ''
            all_Page = result.data.allPage
            allNumber.innerHTML = `共${result.data.allRecords}条`
            allPages.innerHTML=`共${result.data.allPage}页`
            //删除的判断
            // 判断是否有值
            checkDelAll.checked=''
            adminHistoryContentContent.style.display = 'block'
            adminHistoryContentNo.style.display = 'none'
            if (result.data.msg.length == 0) {
                judgeHas()
                // 没有数据
                if(now_page == 1){
                    adminHistoryContentContent.style.display = 'none'
                    adminHistoryContentNo.style.display = 'block'
                }
                return
            }
            for (let i = 0; i < result.data.msg.length; i++) {
                let time = result.data.msg[i].createTime.split(' ')[0]
                // console.log(result.data.msg[i].createTime.split(' ')[0]);
                let status = '审核中'
                if (result.data.msg[i].application.approval_status == '1') {
                    status = '审核通过'
                }
                if (result.data.msg[i].application.approval_status == '-1') {
                    status = '审核未通过'
                }
                let pointS=result.data.msg[i].application.classify.b_points_available
                // console.log(result.data.msg[i].application.points)
                if(result.data.msg[i].application.points){
                    pointS=result.data.msg[i].application.points
                }
                adminHistoryContentContent.innerHTML += `
                <ul>
                    <li>
                        <div style='display:none'>${result.data.msg[i].applicationId}</div>
                        <input type="checkbox" class="checkDel delAllBox" onclick='checkDelFn(this)'>
                    </li>
                    <li>${result.data.msg[i].application.user.name}</li>
                    <li>${result.data.msg[i].application.user.userName}</li>
                    <li>${result.data.msg[i].application.user.major_class}</li>
                    <li>${result.data.msg[i].application.classify.b_Indicator_name}</li>
                    <li>${pointS}</li>
                    <li>${time}</li>
                    <li>${status}</li>
                    <li>
                        <div style='display:none'>${result.data.msg[i].applicationId}</div>
                        <button onclick="removePopup(this)" class="operatorBtnSty">删除</button>
                        <button onclick="watchInfo(this)" class="operatorBtnSty">详情</button>
                        <button onclick="changeStatus(this)" class="operatorBtnSty changeConment">修改</button>
                        <div style='display:none'>${result.data.msg[i].application.approval_status}</div>
                    </li>
                </ul>
                `
            }
            // popUps[0].style.display = 'block'
            // setTimeout(() => {
            //     popUps[0].style.display = 'none'
            // }, 2000)
            // 判断是否需要显示修改功能
            let changeConment = document.getElementsByClassName('changeConment')
            // console.log(changeConment)
            if (window.localStorage.getItem("power") != '普通管理员') {
                for (let i = 0; i < changeConment.length; i++) {
                    // console.log(i)
                    changeConment[i].style.display='none'
                }
            }
            // swal('查询成功')
        })
        .catch((err) => {
            console.log(err)
            // popUps[1].style.display = 'block'
            // setTimeout(() => {
            //     popUps[1].style.display = 'none'
            // }, 2000)
            swal('网络错误')
        })
}
GetAllInfo(1, 10, {})

lastPage.onclick = function () {
    // 点击上一页
    if (now_page == 1) {
        // 当前是第一页
        // popUps[8].style.display = 'block'
        // setTimeout(() => {
        //     popUps[8].style.display = 'none'
        // }, 2000)
        swal('当前是第一页')
    } else {
        now_page--
        nowPage.innerHTML = now_page
        checkDelAll.checked = ''
        // 请求数据
        GetAllInfo(now_page, per_Page, limitationFactor())
    }
}
nextPage.onclick = function () {
    // 下一页
    if (now_page == all_Page) {
        // 最后一页
        // popUps[7].style.display = 'block'
        // setTimeout(() => {
        //     popUps[7].style.display = 'none'
        // }, 2000)
        swal('当前是最后一页')
    } else {
        now_page++
        nowPage.innerHTML = now_page
        checkDelAll.checked = ''
        // 请求数据
        GetAllInfo(now_page, per_Page, limitationFactor())
    }
}
jump.onclick = function () {
    // 跳转
    if (jumpPage.value != '' && /(^[0-9]*[1-9][0-9]*$)/.test(jumpPage.value)) {
        // 数据合法判断是否大于最大页数
        if (Number(jumpPage.value) > all_Page) {
            jumpPage.value = ''
            // popUps[6].style.display = 'block'
            // setTimeout(() => {
            //     popUps[6].style.display = 'none'
            // }, 2000)
            swal('大于最大页数')
        } else {
            now_page = jumpPage.value
            nowPage.innerHTML = now_page
            checkDelAll.checked = ''
            // 请求数据
            GetAllInfo(now_page, per_Page, limitationFactor())
        }
    } else {
        jumpPage.value = ''
        // 数据不合法
        // popUps[5].style.display = 'block'
        // setTimeout(() => {
        //     popUps[5].style.display = 'none'
        // }, 2000)
        swal('请输入合法数据')
    }
}

// 删除弹窗显现函数(只删除一个)
function removePopup(event) {
    swal({
        title: "你确定？",
        text: "要删除该条历史记录",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            let idArr = []
            idArr.push(Number(event.parentElement.firstElementChild.innerHTML))
            // 发送删除请求
            // console.log(idArr)
            axios({
                method: 'POST',
                url: '/del/admin/records',
                data: {
                    idArr: idArr
                }
            })
                .then((result) => {
                    // console.log(result.data)
                    if (result.data.err == 0) {
                        GetAllInfo(now_page, per_Page, limitationFactor())
                        swal('删除成功')
                    } else {
                        swal('删除失败,请重试')
                    }
                })
                .catch((err) => {
                    // console.log(err)
                    swal('网络错误')
                })
        } else {
            swal('已取消')
        }
    })
}

let del = document.getElementById('del')
del.onclick = function () {
    let checkDel = document.getElementsByClassName('checkDel')
    // 判断是否选择删除的值
    let yn = false
    let idArr = []
    for (let i = 0; i < checkDel.length; i++) {
        if (checkDel[i].checked) {
            yn = true
            idArr.push(Number(checkDel[i].parentElement.firstElementChild.innerHTML))
        }
    }
    if (yn) {
        // 选择删除的值
        // 删除多个
        swal({
            title: "你确定？",
            text: "要删除多个历史记录信息吗?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            // 发送数据
            if (isConfirm) {
                axios({
                    method: 'POST',
                    url: '/del/admin/records',
                    data: {
                        idArr: idArr
                    }
                })
                    .then((result) => {
                        // console.log(result.data)
                        if (result.data.err == 0) {
                            swal('删除成功')
                            GetAllInfo(now_page, per_Page, limitationFactor())
                        } else {
                            swal('删除失败,请重试')
                        }
                    })
                    .catch((err) => {
                        // console.log(err)
                        swal('网络错误')
                    })
            } else {
                swal('已取消')
            }
        })
    } else {
        // 显示请选择删除信息
        // popUps[3].style.display = 'block'
        // setTimeout(() => {
        //     popUps[3].style.display = 'none'
        // }, 2000)
        swal('请选择要删除的内容')
    }
}

let ExportApplicationform = document.getElementById('ExportApplicationform')
ExportApplicationform.onclick = function () {
    window.open('adminExportForm')
}
let bodyTop=document.getElementsByClassName('bodyTop')
let selectStatus=document.getElementById('selectStatus')
let applicationId=''
function changeStatus(event){
    applicationId=event.parentElement.firstElementChild.innerHTML
    bodyTop[0].style.display='block'
    selectStatus.value=event.parentElement.lastElementChild.innerHTML
}
let changeUserInfo=document.getElementById('changeUserInfo')
changeUserInfo.onclick=function(){
    bodyTop[0].style.display='none'
    axios({
        method:'POST',
        url:'/admin/auditingApplication',
        data:{
            id:Number(applicationId),
            status:selectStatus.value
        }
    })
    .then((result)=>{
        // console.log(result.data)
        if(result.data.err==-1){
            swal('网络错误')
            return
        }
        swal('修改成功')
        GetAllInfo(now_page, per_Page, limitationFactor())
    })
    .catch((err)=>{
        swal('修改失败')
        // console.log(err)
    })
}
let cancel=document.getElementById('cancel')
cancel.onclick=function(){
    bodyTop[0].style.display='none'
}
// 查看详情
function watchInfo(event){
    window.location.href = 'particulars?id=' + event.parentElement.firstElementChild.innerHTML
}