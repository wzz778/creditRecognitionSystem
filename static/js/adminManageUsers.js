// let popUps = document.getElementsByClassName('popUps')

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
let reset = document.getElementById('reset')//重置按钮
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
let usGrade = document.getElementById('USGrade')

// 判断是否需要请求上一页
function judgeHas() {
    let allUls = adminManageUsersContentContent.getElementsByTagName('ul')
    // console.log('函数',allUls)
    if (allUls.length == 0 && now_page != 1) {
        // 请求上一页
        now_page--
        nowPage.innerHTML = now_page
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
            checkDelAll.checked = ''
            // console.log(result.data)
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
            all_Page = result.data.page
            allPages.innerHTML = `共${all_Page}页`
            allNumber.innerHTML = `共${result.data.total}条`
            for (let i = 0; i < result.data.msg.length; i++) {
                let userClass = '未设置'
                if (result.data.msg[i].major_class) {
                    userClass = result.data.msg[i].major_class
                }
                let str = `<button onclick="authorizeCom(this)" class="operatorBtnSty">授权</button>`
                if (result.data.msg[i].power == '普通用户') {
                    // 普通用户的授权
                    str = `<button onclick="authorizeCom(this)" class="operatorBtnSty">授权</button>`
                } else if (result.data.msg[i].power == '普通管理员') {
                    // 一键授权
                    str = `<button onclick="authorizeSuper(this)" class="operatorBtnSty">授权</button>`
                } else {
                    // 超级管理员
                    str = `<button class="operatorBtnSty" onclick="swal('超级管理员无需授权')" >授权</button>`
                }
                adminManageUsersContentContent.innerHTML += `
            <ul>
                <li>
                    <div style='display:none'>${result.data.msg[i].uid}</div>
                    <input type="checkbox" class="checkDel" onclick="checkDelFn()">
                    <div style='display:none'>${result.data.msg[i].academy}</div>
                </li>
                <li>${result.data.msg[i].name}</li>
                <li>${result.data.msg[i].userName}</li>
                <li>${result.data.msg[i].power}</li>
                <li>${result.data.msg[i].grade}</li>
                <li>${userClass}</li>
                <li>
                    <button class="operatorBtnSty" onclick='reviseFn(this)'>重置密码</button>
                    <div style='display:none'>${result.data.msg[i].uid}</div>
                </li>
                <li>
                    <div style='display:none'>${result.data.msg[i].uid}</div>
                    <div style='display:none'>${result.data.msg[i].major}</div>
                    <button onclick="removePopup(this)" class="operatorBtnSty">删除</button>
                    <button onclick="changeUserInfoFn(this)" class="operatorBtnSty">修改</button>
                    ${str}
                    <div style='display:none'>${result.data.msg[i].sex}</div>
                </li>
            </ul>
                `
            }
            // popUps[0].style.display = 'block'
            // setTimeout(() => {
            //     popUps[0].style.display = 'none'
            // }, 2000)
            // swal('查询成功')
        })
        .catch((err) => {
            // console.log(err)
            // popUps[1].style.display = 'block'
            // setTimeout(() => {
            //     popUps[1].style.display = 'none'
            // }, 2000)
            swal('网络错误')
        })
}
GetAll(1, 10, {})

// 赋值函数(并不判断是否又搜索值就全部加入)
function assignFn() {
    let obj = {}
    obj.academy = Faculty.value
    obj.name = account.value
    obj.major_class = major_class.value
    obj.sex = sex.value
    obj.power = useriDentity.value
    obj.userName = account.value
    var indexGrade = usGrade.selectedIndex; // 选中索引
    var textGrade = usGrade.options[indexGrade].text;
    if (textGrade == '请选择...') {
        textGrade = ''
    }
    obj.grade = textGrade
    // console.log(obj)
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
        now_page = 1
        checkDelAll.checked = ''
        nowPage.innerHTML = now_page
        GetAll(now_page, per_Page, assignFn())
        swal('查询成功')
    } else {
        // 没有查询的数据
        // popUps[2].style.display = 'block'
        // setTimeout(() => {
        //     popUps[2].style.display = 'none'
        // }, 2000)
        swal('请输入查询数据')
    }
}

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
        // 请求数据
        per_Page = selectPerpage.value
        checkDelAll.checked = ''
        GetAll(now_page, per_Page, assignFn())
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
        per_Page = selectPerpage.value
        checkDelAll.checked = ''
        // 请求数据
        GetAll(now_page, per_Page, assignFn())
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
            // 请求数据
            per_Page = selectPerpage.value
            checkDelAll.checked = ''
            GetAll(now_page, per_Page, assignFn())
        }
    } else {
        jumpPage.value = ''
        // 数据不合法
        // popUps[5].style.display = 'block'
        // setTimeout(() => {
        //     popUps[5].style.display = 'none'
        // }, 2000)
        swal('请输入正确数据')
    }
}
// 改变一页的条数
selectPerpage.onchange = function () {
    per_Page = selectPerpage.value
    GetAll(now_page, per_Page, assignFn())
}
// 删除弹窗显现函数(只删除一个)
function removePopup(event) {
    swal({
        title: "你确定？",
        text: "要删除该用户?",
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
                    // console.log(result)
                    if (result.data.err == -2) {
                        swal('您不能删除您自己!')
                        return
                    }
                    if (result.data.err != -1) {
                        // 删除成功
                        swal('删除成功')
                        GetAll(now_page, per_Page, assignFn())
                    } else {
                        swal(result.data.msg)
                    }
                })
                .catch((err) => {
                    // console.log(err)
                    // popUps[1].style.display = 'block'
                    // setTimeout(() => {
                    //     popUps[1].style.display = 'none'
                    // }, 2000)
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
            text: "要删除多个用户吗?",
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
                        if (result.data.err == -2) {
                            swal('您不能删除您自己!')
                            return
                        }
                        if (result.data.err != -1) {
                            // 删除成功
                            swal('删除成功')
                            GetAll(now_page, per_Page, assignFn())
                        } else {
                            swal(result.data.msg)
                        }
                    })
                    .catch((err) => {
                        // console.log(err)
                        // popUps[1].style.display = 'block'
                        // setTimeout(() => {
                        //     popUps[1].style.display = 'none'
                        // }, 2000)
                        swal('网络错误')
                    })
                swal('删除成功')
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
        swal('请选择删除信息')
    }
}
// 重置按钮
reset.onclick = function () {
    // 将所有搜索框的东西清空
    for (let i = 0; i < searchValue.length; i++) {
        searchValue[i].value = ''
    }
    usGrade.value = ''
    now_page = 1
    Faculty.value = ''
    major_class.value = ''
    nowPage.innerHTML = now_page
    GetAll(now_page, per_Page, assignFn())
    swal('已重置')
}

// 修改用户信息弹窗
let bodyTop = document.getElementsByClassName('bodyTop')
let cancel = document.getElementById('cancel')
let changeUserInfo = document.getElementById('changeUserInfo')
let changeUserName = document.getElementById('changeUserName')//用户名
let changeUserAccount = document.getElementById('changeUserAccount')//账号
let changeUserPermission = document.getElementById('changeUserPermission')//用户身份
let changeUserSex = document.getElementById('changeUserSex')//性别
let changeUserHas = document.getElementById('changeUserHas')//是否有学生信息
let changeUserGrade = document.getElementById('changeUserGrade')//年级
let changeUseraCademy = document.getElementById('changeUseraCademy')//学院
let changeUserSpecialized = document.getElementById('changeUserSpecialized')//专业
let changeUserClass = document.getElementById('changeUserClass')//班级
let changeUserId = document.getElementById('changeUserId')//用户id
let bodyTopClu = document.getElementsByClassName('bodyTopClu')
cancel.onclick = function () {
    bodyTop[0].style.display = 'none'
}
let major = document.getElementById('major')
function changeUserInfoFn(event) {
    changeUseraCademy.innerHTML = ''
    major.innerHTML = ''
    changeUserClass.innerHTML = ''
    bodyTop[0].style.display = 'block'
    changeUserId.innerHTML = event.parentElement.firstElementChild.innerHTML
    let ele = event.parentElement.parentElement.firstElementChild
    changeUserName.value = ele.nextElementSibling.innerHTML
    changeUserAccount.value = ele.nextElementSibling.nextElementSibling.innerHTML
    changeUserPermission.value = ele.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML
    changeUserSex.value = event.parentElement.lastElementChild.innerHTML
    if (ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML == '未设置') {
        changeUserHas.value = '无'
        bodyTopClu[0].style.display = 'none'
    } else {
        changeUserHas.value = '有'
        bodyTopClu[0].style.display = 'block'
        changeUserGrade.value = ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML
        BFn(changeUseraCademy, changeUserGrade.value, ele.lastElementChild.innerHTML)
            .then((result) => {
                // console.log(result)
                return AFn(major, result, event.parentElement.firstElementChild.nextElementSibling.innerHTML)
            })
            .then((result) => {
                // console.log(result)
                AFn(changeUserClass, result, ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML)
            })
            .catch((err) => {
                console.log(err)
            })
        // GetOtherLevelTwo(changeUseraCademy, changeUserGrade.value, ele.lastElementChild.innerHTML)
        // setTimeout(() => {
        //     GetOtherLevel(major, changeUseraCademy.value, event.parentElement.firstElementChild.nextElementSibling.innerHTML)
        // }, 200)
        // setTimeout(() => {
        //     GetOtherLevel(changeUserClass, major.value, ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML)
        // }, 450)
        // changeUserClass.value = ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML
    }
}

let reg = /^[0-9]*$/
changeUserInfo.onclick = function () {
    // 判断值是否为空
    if (changeUserName.value == '' || changeUserName.value.replace(/(^\s*)|(\s*$)/g, "") == "") {
        swal('请输入姓名,不能为空格')
        return
    }
    if (changeUserAccount.value == '' || !reg.test(Number(changeUserAccount.value))) {
        swal('请输入正确的格式的学号或教务账号')
        return
    }
    if (changeUserGrade.value == '') {
        swal('请输入年级')
        return
    }
    if (changeUseraCademy.value == '') {
        swal('请输入学院')
        return
    }
    if (major.value == '') {
        swal('请输入专业')
        return
    }
    if (changeUserClass.value == '') {
        swal('请输入班级')
        return
    }
    let obj = {}
    obj.uId = Number(changeUserId.innerHTML)
    obj.name = changeUserName.value
    obj.sex = changeUserSex.value
    obj.userName = changeUserAccount.value
    obj.power = changeUserPermission.value
    if (changeUserHas.value == '有') {
        var indexuschangeUseraCademy = changeUseraCademy.selectedIndex; // 选中索引
        var textuschangeUseraCademy = changeUseraCademy.options[indexuschangeUseraCademy].text;
        obj.academy = textuschangeUseraCademy
        obj.grade = changeUserGrade.value
        var indexusmajor = major.selectedIndex
        var textusmajor = major.options[indexusmajor].text
        obj.major = textusmajor
        var indexusmajor_class = changeUserClass.selectedIndex; // 选中索引
        var textusmajor_class = changeUserClass[indexusmajor_class].text;
        obj.major_class = textusmajor_class
    } else {
        obj.academy = ''
        obj.grade = ''
        obj.major_class = ''
    }
    // console.log(obj)
    axios({
        method: 'POST',
        url: '/admin/update.do.userInfo',
        data: {
            obj: obj
        }
    })
        .then((result) => {
            // console.log(result.data)
            bodyTop[0].style.display = 'none'
            if (result.data.err == 0) {
                swal('修改成功')
                GetAll(now_page, per_Page, assignFn())
            } else {
                if (result.data.msg.msg == "学号或教工号修改有误") {
                    swal(result.data.msg.msg)
                } else if (result.data.msg == "用户名有误") {
                    swal("用户名有误")
                } else {
                    swal('数据重复，操作失败')
                }
            }
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}

function reviseFn(event) {
    swal({
        title: "你确定？",
        text: "要重置该用户密码",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            axios({
                method: 'POST',
                url: '/admin/resetUserPass',
                data: {
                    id: Number(event.parentElement.lastElementChild.innerHTML)
                }
            })
                .then((result) => {
                    // console.log(result.data)
                    if (result.data.err == 0) {
                        swal('已重置')
                    } else {
                        swal('重置失败,请重试')
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

changeUserHas.onchange = function () {
    changeUserGrade.value = ''
    changeUseraCademy.innerHTML = ''
    changeUseraCademy.add(new Option('请选择...', ''))
    changeUseraCademy.value = ''
    major.innerHTML = ''
    major.add(new Option('请选择...', ''))
    major.value = ''
    changeUserClass.innerHTML = ''
    changeUserClass.add(new Option('请选择...', ''))
    changeUserClass.value = ''
    if (changeUserHas.value == '有') {
        bodyTopClu[0].style.display = 'block'
    } else {
        bodyTopClu[0].style.display = 'none'
    }
}




let ResultObj = {}
function GetFirstLevelOne(ele) {
    axios({
        method: 'GET',
        url: '/admin/showOrganization',
    })
        .then((result) => {
            // console.log('获取的结果', result.data)
            ele.innerHTML = ''
            ele.add(new Option('请选择...', ''))
            for (let i = 0; i < result.data.msg.length; i++) {
                ele.add(new Option(result.data.msg[i].name, result.data.msg[i].name))
            }
            ResultObj = result.data
            ele.value = ''
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}

function GetOtherLevelTwo(ele, id, show) {
    let idResult = 1
    for (let i = 0; i < ResultObj.msg.length; i++) {
        if (ResultObj.msg[i].name == id) {
            idResult = ResultObj.msg[i].id
        }
    }
    axios({
        method: 'POST',
        url: '/admin/selectOrganization',
        data: {
            id: idResult
        }
    })
        .then((result) => {
            // console.log('show',show);
            // console.log(idResult);
            // console.log(result.data)
            // 将结果添加到ele上
            ele.innerHTML = ''
            let value = ''
            ele.add(new Option('请选择...', ''))
            for (let i = 0; i < result.data.msg.length; i++) {
                if (result.data.msg[i].name == show) {
                    value = result.data.msg[i].id
                }
                ele.add(new Option(result.data.msg[i].name, result.data.msg[i].id))
            }
            changeUseraCademy.value = value
            // console.log('值', changeUseraCademy.value)
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}

function GetOtherLevelTwoNew(ele, id, show) {
    axios({
        method: 'POST',
        url: '/admin/selectOrganization',
        data: {
            id: id
        }
    })
        .then((result) => {
            // console.log('show',show);
            // console.log(idResult);
            // console.log(result.data)
            // 将结果添加到ele上
            ele.innerHTML = ''
            let value = ''
            ele.add(new Option('请选择...', ''))
            for (let i = 0; i < result.data.msg.length; i++) {
                if (result.data.msg[i].name == show) {
                    value = result.data.msg[i].id
                }
                ele.add(new Option(result.data.msg[i].name, result.data.msg[i].id))
            }
            // console.log('值', changeUseraCademy.value)
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}
GetFirstLevelOne(changeUserGrade)
// 获取下一级
function GetOtherLevel(ele, id, show) {
    if (!id) {
        bodyTop[0].style.display = 'none'
        swal('网络错误，请重新点击')
        return
    }
    axios({
        method: 'POST',
        url: '/admin/selectOrganization',
        data: {
            id: id
        }
    })
        .then((result) => {
            // console.log(result.data)
            // 将结果添加到ele上
            ele.innerHTML = ''
            let value = ''
            ele.add(new Option('请选择...', ''))
            for (let i = 0; i < result.data.msg.length; i++) {
                if (result.data.msg[i].name == show) {
                    value = result.data.msg[i].id
                }
                ele.add(new Option(result.data.msg[i].name, result.data.msg[i].id))
            }
            ele.value = value
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}

changeUserGrade.onchange = function () {
    // 显示学院
    if (changeUserGrade.value == '') {
        return
    }

    // let id = 1
    // for (let i = 0; i < ResultObj.msg.length; i++) {
    //     if (ResultObj.msg[i].name == changeUserGrade.value) {
    //         id = ResultObj.msg[i].id
    //     }
    // }
    GetOtherLevelTwo(changeUseraCademy, changeUserGrade.value)
    major.innerHTML = ''
    major.add(new Option('请选择...', ''))
    major.value = ''
    changeUserClass.innerHTML = ''
    changeUserClass.add(new Option('请选择...', ''))
    changeUserClass.value = ''
}

changeUseraCademy.onchange = function () {
    if (changeUseraCademy.value == '') {
        return
    }
    GetOtherLevelTwoNew(major, changeUseraCademy.value)
    changeUserClass.innerHTML = ''
    changeUserClass.add(new Option('请选择...', ''))
    changeUserClass.value = ''
}

major.onchange = function () {
    if (major.value == '') {
        return
    }
    GetOtherLevelTwoNew(changeUserClass, major.value)
}
// 普通管理员的授权
function authorizeSuper(event) {
    swal({
        title: "你确定？",
        text: "要授权",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            axios({
                method: 'POST',
                url: '/superAdmin/givePower',
                data: {
                    id: event.parentElement.firstElementChild.innerHTML
                }
            })
                .then((result) => {
                    // console.log(result.data)
                    if (result.data.err == 0) {
                        swal('授权成功')
                    } else {
                        swal('授权失败,请重试')
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
// 获取年级
function GetFirstLevel(ele) {
    axios({
        method: 'GET',
        url: '/admin/showOrganization',
    })
        .then((result) => {
            // console.log(result.data)
            ele.innerHTML = ''
            ele.add(new Option('请选择...', ''))
            for (let i = 0; i < result.data.msg.length; i++) {
                ele.add(new Option(result.data.msg[i].name, result.data.msg[i].id))
            }
            ele.value = ''
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}
GetFirstLevel(usGrade)

function authorizeCom(event) {
    bodyTop[1].style.display = 'block'
    changeUserNameOrganization.innerHTML = event.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML
}
// 授权普通用户
let cancelOrganization = document.getElementById('cancelOrganization')
cancelOrganization.onclick = function () {
    bodyTop[1].style.display = 'none'
}
let OrganizationSure = document.getElementById('OrganizationSure')
let changeUserNameOrganization = document.getElementById('changeUserNameOrganization')
let OrganizationPosition = document.getElementById('OrganizationPosition')
let OrganizationName = document.getElementById('OrganizationName')
// 普通用户授权
OrganizationSure.onclick = function () {
    // 判断是否为空
    if (OrganizationName.value == '') {
        swal('请输入组织名')
        return
    }
    if (OrganizationPosition.value == '') {
        swal('请输入职位')
        return
    }
    axios({
        method: 'POST',
        url: '/admin/updatePower',
        data: {
            organization: OrganizationName.value,
            positions: OrganizationPosition.value,
            usernames: changeUserNameOrganization.innerHTML
        }
    })
        .then((result) => {
            // console.log(result.data)
            bodyTop[1].style.display = 'none'
            if (result.data.err == 0) {
                swal('授权成功')
                GetAll(now_page, per_Page, assignFn())
            } else {
                swal('授权失败')
            }
        })
        .catch((err) => {
            swal('网络错误')
        })
}

function AFn(ele, id, show) {
    return new Promise((resolve, resject) => {
        // if (!id) {
        //     // bodyTop[0].style.display = 'none'
        //     swal('网络错误，请重新点击')
        //     return
        // }
        axios({
            method: 'POST',
            url: '/admin/selectOrganization',
            data: {
                id: id
            }
        })
            .then((result) => {
                // console.log(result.data)
                // 将结果添加到ele上
                ele.innerHTML = ''
                let value = ''
                ele.add(new Option('请选择...', ''))
                for (let i = 0; i < result.data.msg.length; i++) {
                    if (result.data.msg[i].name == show) {
                        value = result.data.msg[i].id
                    }
                    ele.add(new Option(result.data.msg[i].name, result.data.msg[i].id))
                }
                ele.value = value
                // console.log('包装的value',value)
                resolve(value)
            })
            .catch((err) => {
                // console.log(err)
                swal('网络错误')
                resject(err)
            })
    })
}

function BFn(ele, id, show) {
    return new Promise((resolve, resject) => {
        let idResult = 1
        for (let i = 0; i < ResultObj.msg.length; i++) {
            if (ResultObj.msg[i].name == id) {
                idResult = ResultObj.msg[i].id
            }
        }
        axios({
            method: 'POST',
            url: '/admin/selectOrganization',
            data: {
                id: idResult
            }
        })
            .then((result) => {
                // console.log('show',show);
                // console.log(idResult);
                // console.log(result.data)
                // 将结果添加到ele上
                ele.innerHTML = ''
                let value = ''
                ele.add(new Option('请选择...', ''))
                for (let i = 0; i < result.data.msg.length; i++) {
                    if (result.data.msg[i].name == show) {
                        value = result.data.msg[i].id
                    }
                    ele.add(new Option(result.data.msg[i].name, result.data.msg[i].id))
                }
                changeUseraCademy.value = value
                // console.log('值', changeUseraCademy.value)
                resolve(value)
            })
            .catch((err) => {
                // console.log(err)
                swal('网络错误')
                resject(err)
            })
    })
}

// 跳转到添加用户
function AddFn() {
    window.location.href = 'superAdminAdd'
}