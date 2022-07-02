
// 提示弹窗
let popUps = document.getElementsByClassName('popUps')
let remove = document.getElementsByClassName('remove')
let expandItem = document.getElementsByClassName('expandItem')
for (let i = 0; i < expandItem.length; i++) {
    expandItem[i].onclick = function () {
        // 判断内容盒子是否显现
        if (expandItem[i].parentElement.parentElement.parentElement.lastElementChild.style.display == 'none') {
            expandItem[i].parentElement.parentElement.parentElement.lastElementChild.style.display = ''
            remove[i].style.display = 'none'
        } else {
            expandItem[i].parentElement.parentElement.parentElement.lastElementChild.style.display = 'none'
            remove[i].style.display = ''
        }
    }
}
// 父级选择框
function allChildInputFather(event) {
    let allUls = event.parentElement.parentElement.parentElement.parentElement.lastElementChild.getElementsByTagName('ul')
    if (event.checked) {
        // 看下边有几个ul
        for (let j = 0; j < allUls.length; j++) {
            // 将所有选中
            allUls[j].firstElementChild.firstElementChild.checked = 'true'
        }
    } else {
        for (let j = 0; j < allUls.length; j++) {
            // 将所有选中
            allUls[j].firstElementChild.firstElementChild.checked = ''
        }
    }
}
// 判断子级选择框是否完全选中
function judgeChild(event) {
    // 判断是否都选中
    let yn = true
    let fatherInput = event.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.firstElementChild
    let allUls = event.parentElement.parentElement.parentElement.parentElement.lastElementChild.getElementsByTagName('ul')
    for (let i = 0; i < allUls.length; i++) {
        if (!allUls[i].firstElementChild.firstElementChild.checked) {
            yn = false
        }
    }
    if (yn) {
        // 全部都选中了
        fatherInput.checked = 'true'
    } else {
        fatherInput.checked = ''
    }
}

let commonDel = document.getElementsByClassName('commonDel')
// 删除的选中函数
function delFnAll() {
    let yn = false
    for (let i = 0; i < commonDel.length; i++) {
        if (commonDel[i].checked) {
            yn = true
        }
    }
    if (yn) {
        swal({
            title: "你确定？",
            text: "要删除选中学分认定范围",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                swal('确定')
                return true
            } else {
                swal('已取消')
                return false
            }
        })
    } else {
        popUps[3].style.display = 'block'
        setTimeout(() => {
            popUps[3].style.display = 'none'
        }, 2000)
        // 未选删除元素
        return false
    }
}

// 删除单个元素
function delFnOne(event) {
    // 获取id值
    swal({
        title: "你确定？",
        text: "要删除改内容",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal('确定')
            return true
        } else {
            swal('已取消')
            return false
        }
    })
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