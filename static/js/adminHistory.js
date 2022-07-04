
// 提示弹窗
let popUps = document.getElementsByClassName('popUps')


// 点击勾选删除的将所有的勾选框选中
let checkDelAll = document.getElementById('checkDelAll')
let checkDel = document.getElementsByClassName('checkDel')
checkDelAll.onclick = function () {
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
for (let i = 0; i < checkDel.length; i++) {
    checkDel[i].onclick = function () {
        // 判断是否全部都选择了
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


// 将搜索的值全部都添加到一个对象中
function limitationFactor() {
    let obj = {}
    obj.beginDate = startDate.value
    obj.endDate = endDate.value
    obj.approval_status = passFail.value
    return obj
}

//获取数据
function GteAllInfo(page, perpage, obj) {
    obj.nodePage = page
    obj.pageSize = perpage
    axios({
        method: 'POST',
        url: '/admin/records',
        data: obj
    })
        .then((result) => {
            console.log(result.data)
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
GteAllInfo(1,10,{})

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

// 删除弹窗显现函数(只删除一个)
function removePopup() {
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
            swal('删除成功')
        } else {
            swal('已取消')
        }
    })
}

let del = document.getElementById('del')
del.onclick = function () {
    // 判断是否选择删除的值
    let yn = false
    for (let i = 0; i < checkDel.length; i++) {
        if (checkDel[i].checked == true) {
            yn = true
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
                // 请求数据
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
