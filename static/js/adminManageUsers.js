
let popUps = document.getElementsByClassName('popUps')

// 点击勾选删除的将所有的勾选框选中
let checkDelAll = document.getElementById('checkDelAll')
checkDelAll.onclick = function () {
    let checkDel = document.getElementsByClassName('checkDel')
    if (checkDelAll.checked == false) {
        // 之前是勾选这里把他取消了
        for (let i = 0; i < checkDel.length; i++) {
            checkDel[i].checked = ''
        }
    } else {
        for (let i = 0; i < checkDel.length; i++) {
            checkDel[i].checked = 'true'
        }
    }
}
// 如果下边的都选择了
function checkDelFn() {
    let checkDel = document.getElementsByClassName('checkDel')
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
let reset=document.getElementById('reset')//重置按钮
let all_Page = 1//总页数
let per_Page = 10//每页几条
let now_page = 1//当前请求页数

// 搜索的条件
let useriDentity = document.getElementById('useriDentity')
let sex = document.getElementById('sex')
let Faculty = document.getElementById('Faculty')
let specialized = document.getElementById('specialized')
let major_class = document.getElementById('major_class')
let usname = document.getElementById('name')
let account = document.getElementById('account')
let sureSearch = document.getElementById('sureSearch')
let searchValue = document.getElementsByClassName('searchValue')
let adminManageUsersContentContent = document.getElementsByClassName('adminManageUsersContentContent')[0]
let adminHistoryContentNo = document.getElementById('adminHistoryContentNo')

// 判断是否需要请求上一页
function judgeHas() {
    let allUls = adminManageUsersContentContent.getElementsByTagName('ul')
    // console.log('函数',allUls)
    if (allUls.length == 0 && now_page != 1) {
        // 请求上一页
        now_page--
        nowPage.innerHTML=nowPage
        GetAll(now_page, per_Page, assignFn())
        checkDelAll.checked = ''
    }
}

// 分页/查询函数(将值全部传入，最后node里边判断)
function GetAll(page, perPage, obj) {
    obj.beginIndex = page
    obj.size = perPage
    axios({
        method: 'POST',
        url: '/admin/getUserByClass',
        data: obj
    })
        .then((result) => {
            console.log(result.data.msg)
            adminManageUsersContentContent.innerHTML = ''
            adminManageUsersContentContent.style.display = 'block'
            adminHistoryContentNo.style.display = 'none'
            if (result.data.msg.length == 0) {
                judgeHas()
                if (now_page == 1) {
                    adminManageUsersContentContent.style.display = 'none'
                    adminHistoryContentNo.style.display = 'block'
                }
                return
            }
            console.log(result.data)
            all_Page = result.data.page
            allPages.innerHTML=`共${all_Page}页`
            allNumber.innerHTML = `共${result.data.total}条`
            for (let i = 0; i < result.data.msg.length; i++) {
                let userClass = '未知'
                if (result.data.msg[i].major_class) {
                    userClass = result.data.msg[i].major_class
                }
                adminManageUsersContentContent.innerHTML += `
            <ul>
                <li>
                    <div style='display:none'>${result.data.msg[i].uid}</div>
                    <input type="checkbox" class="checkDel" onclick="checkDelFn()">
                </li>
                <li>${result.data.msg[i].name}</li>
                <li>${result.data.msg[i].userName}</li>
                <li>${result.data.msg[i].power}</li>
                <li>${result.data.msg[i].grade}</li>
                <li>${userClass}</li>
                <li>
                    <button class="operatorBtnSty">查看</button>
                </li>
                <li>
                    <div style='display:none'>${result.data.msg[i].uid}</div>
                    <button onclick="removePopup(this)" class="operatorBtnSty">删除</button>
                </li>
            </ul>
                `
            }
            popUps[0].style.display = 'block'
            setTimeout(() => {
                popUps[0].style.display = 'none'
            }, 2000)
        })
        .catch((err) => {
            console.log(err)
            popUps[1].style.display = 'block'
            setTimeout(() => {
                popUps[1].style.display = 'none'
            }, 2000)
        })
}
GetAll(1, 10, {})

// 赋值函数(并不判断是否又搜索值就全部加入)
function assignFn() {
    let obj = {}
    obj.academy = Faculty.value
    obj.name = usname.value
    obj.major_class = major_class.value
    obj.sex = sex.value
    obj.power = useriDentity.value
    obj.userName = account.value
    return obj
}
// 点击查询
sureSearch.onclick = function () {
    // 判断查询内容是否全是空
    let yn = false
    for (let i = 0; i < searchValue.length; i++) {
        if (searchValue[i].value != '') {
            yn = true
        }
    }
    if (yn) {
        // 查询数据
        now_page=1
        GetAll(now_page, per_Page, assignFn())
    } else {
        // 没有查询的数据
        popUps[2].style.display = 'block'
        setTimeout(() => {
            popUps[2].style.display = 'none'
        }, 2000)
    }
}

lastPage.onclick = function () {
    // 点击上一页
    if (now_page == 1) {
        // 当前是第一页
        popUps[8].style.display = 'block'
        setTimeout(() => {
            popUps[8].style.display = 'none'
        }, 2000)
    } else {
        now_page--
        nowPage.innerHTML = now_page
        // 请求数据
        GetAll(now_page, 10, assignFn())
    }
}
nextPage.onclick = function () {
    // 下一页
    if (now_page == all_Page) {
        // 最后一页
        popUps[7].style.display = 'block'
        setTimeout(() => {
            popUps[7].style.display = 'none'
        }, 2000)
    } else {
        now_page++
        nowPage.innerHTML = now_page
        // 请求数据
        GetAll(now_page, 10, assignFn())
    }
}
jump.onclick = function () {
    // 跳转
    if (jumpPage.value != '' && /(^[0-9]*[1-9][0-9]*$)/.test(jumpPage.value)) {
        // 数据合法判断是否大于最大页数
        if (Number(jumpPage.value) > all_Page) {
            jumpPage.value = ''
            popUps[6].style.display = 'block'
            setTimeout(() => {
                popUps[6].style.display = 'none'
            }, 2000)
        } else {
            now_page = jumpPage.value
            nowPage.innerHTML = now_page
            // 请求数据
            GetAll(now_page, 10, assignFn())
        }
    } else {
        jumpPage.value = ''
        // 数据不合法
        popUps[5].style.display = 'block'
        setTimeout(() => {
            popUps[5].style.display = 'none'
        }, 2000)
    }
}
// 改变一页的条数
selectPerpage.onclick = function () {
    per_Page=selectPerpage.value
    GetAll(now_page, per_Page, assignFn())
}
// 删除弹窗显现函数(只删除一个)
function removePopup(event) {
    // 判断删除的是否是自己
    // if(){
    //     swal('您不能删除您自己')
    // }
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
            // 发送数据
            axios({
                method: 'POST',
                url: '/admin/delete.doUserInfo',
                data: {
                    idArray: event.parentElement.firstElementChild.innerHTML
                }
            })
                .then((result) => {
                    console.log(result)
                    if (result.data.err != -1) {
                        // 删除成功
                        swal('删除成功')
                        GetAll(now_page, per_Page, assignFn())
                    } else {
                        swal(result.data.msg)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    popUps[1].style.display = 'block'
                    setTimeout(() => {
                        popUps[1].style.display = 'none'
                    }, 2000)
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
    let arrId = []
    for (let i = 0; i < checkDel.length; i++) {
        if (checkDel[i].checked == true) {
            yn = true
            arrId.push(Number(checkDel[i].parentElement.firstElementChild.innerHTML))
        }
    }
    if (yn) {
        // 选择删除的值
        // 删除多个
        swal({
            title: "你确定?",
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
                // 请求数据
                axios({
                    method: 'POST',
                    url: '/delAllUser',
                    data: {
                        arrId: arrId
                    }
                })
                    .then((result) => {
                        if (result.data.err != -1) {
                            // 删除成功
                            swal('删除成功')
                            GetAll(now_page, per_Page, assignFn())
                        } else {
                            swal(result.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        popUps[1].style.display = 'block'
                        setTimeout(() => {
                            popUps[1].style.display = 'none'
                        }, 2000)
                    })
                swal('删除成功')
            } else {
                swal('已取消')
            }
        })
    } else {
        // 显示请选择删除信息
        popUps[3].style.display = 'block'
        setTimeout(() => {
            popUps[3].style.display = 'none'
        }, 2000)
    }
}
// 重置按钮
reset.onclick=function(){
    // 将所有搜索框的东西清空
    for(let i=0;i<searchValue.length;i++){
        searchValue[i].value=''
    }
    now_page=1
    nowPage.innerHTML=now_page
    GetAll(now_page,per_Page,assignFn())
}