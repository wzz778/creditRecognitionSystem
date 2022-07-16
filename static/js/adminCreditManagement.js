// let popUps = document.getElementsByClassName('popUps')
// 提示弹窗
let expandItem = document.getElementsByClassName('expandItem')

// 获取学分构成数据
function watchFather() {
    axios({
        method: 'GET',
        url: '/getCreditsComposition',
    })
        .then((result) => {
            if (result.data.err != 0) {
                swal('网络错误,请重试!')
                return
            }
            item.innerHTML = ''
            for (let i = 0; i < result.data.msg.length; i++) {
                item.innerHTML += `
            <div class="adminCreditManagementContentContent adminCreditManagementContentItem">
                <ul>
                    <li class="constituteSty">
                        <span class="expandItem" onclick='watchChild(this)'>
                            <span class="remove"></span>
                            <span onclick="" class=""></span>
                        </span>
                        <span>${result.data.msg[i].afirstLevel}</span>
                        <div style="display: none;">${result.data.msg[i].aid}</div>
                    </li>
                    <li>${i + 1}</li>
                    <li>
                        <span style="display: none;">${result.data.msg[i].afirstLevel}</span>
                        <button onclick='CompositionChangeFn(this)'>修改</button>
                        <button onclick='addDirFn(this)'>添加子级目录</button>
                        <div style="display: none;">${result.data.msg[i].aid}</div>
                    </li>
                    <li>
                        <button onclick='skipAdd(this)'>添加认定范围</button>
                        <button onclick="delFnFather(this)">删除</button>
                        <div style="display: none;">${result.data.msg[i].aid}</div>
                    </li>
                </ul>
                <div class="ChildDetails" style="display: none; ">
                    <div class="ChildDetailsTop ChildDetailsItem">
                        <ul>
                            <li>
                                <input type="checkbox" class="childDelAll " onclick="allChildInputFather(this)">
                            </li>
                            <li>认定范围</li>
                            <li>学分</li>
                            <li>操作框</li>
                        </ul>
                    </div>
                    <div class="ChildDetailsContent ChildDetailsItem"></div>
                </div>
            </div>
            `
            }
            swal('获取成功')
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}
watchFather()
// 查看子级
function watchChild(event) {
    // 判断内容盒子是否显现
    if (event.parentElement.parentElement.parentElement.lastElementChild.style.display == 'none') {
        event.parentElement.parentElement.parentElement.lastElementChild.style.display = ''
        event.firstElementChild.style.display = 'none'
    } else {
        event.parentElement.parentElement.parentElement.lastElementChild.style.display = 'none'
        event.firstElementChild.style.display = ''
    }
    // 请求下一级函数
    let ele = event.parentElement.parentElement.parentElement.lastElementChild.lastElementChild//获取存放的位置
    axios({
        method: 'POST',
        url: '/IndicatorOperate/showIndicator',
        data: {
            id: event.parentElement.lastElementChild.innerHTML
        }
    })
        .then((result) => {
            // console.log(result.data)
            if (result.data.err != 0) {
                swal('网络错误,请重试!')
                return
            }
            ele.innerHTML = ''
            if (result.data.msg == '没有指标信息') {
                // 没有指标信息
                ele.innerHTML = `
            <div id="adminHistoryContentNo" style='min-height: 50px;
            line-height: 50px;
            text-align: center;
            color: red;
            font-size: 18px'>
                对不起没有该内容
            </div>
            `
                return
            }
            for (let i = 0; i < result.data.msg.length; i++) {
                // 判断是否是目录
                if (result.data.msg[i].child == '下边没有指标了' && result.data.msg[i].b_points_available) {
                    // 不是目录
                    ele.innerHTML += `
                    <ul>
                        <li>
                            <input type="checkbox" class="childDel commonDel" onclick="judgeChild(this)">
                            <div style="display: none;">${result.data.msg[i].b_id}</div>
                        </li>
                        <li>${result.data.msg[i].b_Indicator_name}</li>
                        <li>${result.data.msg[i].b_points_available}</li>
                        <li>
                            <div style='display:none;'>${result.data.msg[i].b_remark}</div>
                            <button onclick="delFnOne(this)">删除</button>
                            <button onclick='IndicatorTwo(this)'>修改</button>
                            <button onclick='watchRemark(this)'>查看备注</button>
                            <div style='display:none;'>
                                <div>${result.data.msg[i].b_id}</div>
                                <div>${result.data.msg[i].b_Indicator_name}</div>
                                <div>${result.data.msg[i].b_points_available}</div>
                                <div>${result.data.msg[i].b_remark}</div>
                            </div>
                        </li>
                    </ul>
                `
                }
            }
            for (let i = 0; i < result.data.msg.length; i++) {
                // console.log(result.data)
                if (!result.data.msg[i].b_points_available) {
                    // 有子级目录判断下面有没有值
                    if (result.data.msg[i].child == '下边没有指标了') {
                        // console.log(123)
                        // 这里是目录但是没有指标
                        ele.innerHTML += `
                    <div class="SecondDir clearFloat">
                        子级目录:
                        <span>${result.data.msg[i].b_Indicator_name}</span>
                        <button style="float: right;" onclick='changeOneDirFn(this)'>修改子级目录</button>
                        <button class="floatRight" onclick='delFnOneNo(this)'>删除此子级目录</button>
                        <div style='display:none'>${result.data.msg[i].b_id}</div>
                    </div>
                    <div id="adminHistoryContentNo" style='min-height: 50px;
            line-height: 50px;
            text-align: center;
            color: red;
            font-size: 18px'>
                对不起没有没有子级指标
            </div>
                `
                    } else {
                        // 遍历
                        let divEle = document.createElement('div')
                        divEle.innerHTML += `
                        <div class="SecondDir clearFloat">
                            子级目录:
                            <span>${result.data.msg[i].b_Indicator_name}</span>
                            <button style="float: right;" onclick='changeTwoDirFn(this)'>修改子级目录</button>
                            <button class="floatRight" onclick='delFnOne(this)'>删除此子级目录</button>
                            <div style='display:none'>${result.data.msg[i].b_id}</div>
                        </div>
                        `
                        for (let j = 0; j < result.data.msg[i].child.length; j++) {
                            divEle.innerHTML += `
                                <ul>
                                    <li>
                                        <input type="checkbox" class="childDel commonDel" onclick="judgeChild(this)">
                                        <div style='display:none;'>${result.data.msg[i].child[j].b_id}</div>
                                    </li>
                                    <li>${result.data.msg[i].child[j].b_Indicator_name}</li>
                                    <li>${result.data.msg[i].child[j].b_points_available}</li>
                                    <li>
                                        <div style='display:none;'>${result.data.msg[i].child[j].b_remark}</div>
                                        <button onclick="delFnOne(this)">删除</button>
                                        <button onclick='IndicatorThree(this)'>修改</button>
                                        <button onclick='watchRemark(this)'>查看备注</button>
                                        <div style='display:none;'>${result.data.msg[i].child[j].b_superior_id}</div>
                                    </li>
                                </ul>
                `
                        }
                        divEle.className = 'ChildDetailsContent ChildDetailsItem new'
                        ele.append(divEle)
                    }
                }
            }
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}
// 查看备注
function watchRemark(event) {
    // 奖备注显示在弹窗中
    let str = '没有备注信息'
    if (event.parentElement.firstElementChild.innerHTML != 'null') {
        str = event.parentElement.firstElementChild.innerHTML
    }
    swal(str)
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
// 删除的选中函数
function delFnAll() {
    let commonDel = document.getElementsByClassName('commonDel')
    let yn = false
    let arrId = []
    for (let i = 0; i < commonDel.length; i++) {
        if (commonDel[i].checked) {
            arrId.push(Number(commonDel[i].parentElement.lastElementChild.innerHTML))
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
                axios({
                    method: 'POST',
                    url: '/IndicatorOperate/deleteIndicator',
                    data: {
                        arrId: arrId
                    }
                })
                    .then((result) => {
                        if (result.data.err == 0) {
                            swal('删除成功')
                            // 重新获取数据
                            watchFather()
                        } else {
                            swal('删除失败')
                        }
                    })
                    .catch((err) => {
                        swal('网络错误')
                    })
            } else {
                swal('已取消')
                return false
            }
        })
    } else {
        // popUps[3].style.display = 'block'
        // setTimeout(() => {
        //     popUps[3].style.display = 'none'
        // }, 2000)
        swal('请选择删除内容')
        // 未选删除元素
        return false
    }
}

// 删除单个元素
function delFnOne(event) {
    // 获取id值
    swal({
        title: "你确定？",
        text: "要删除该内容",
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
            let arrId = []
            arrId.push(Number(event.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML))
            axios({
                method: 'POST',
                url: '/IndicatorOperate/deleteIndicator',
                data: {
                    arrId: arrId
                }
            })
                .then((result) => {
                    // console.log(result.data)
                    if (result.data.err == 0) {
                        swal('删除成功')
                        // 重新获取数据
                        watchFather()
                    } else {
                        swal('删除失败')
                    }
                })
                .catch((err) => {
                    // console.log(err)
                    swal('网络错误')
                })
        } else {
            swal('已取消')
            return false
        }
    })
}
// 删除当个元素(是目录但是没有子级指标)
function delFnOneNo(event) {
    // 获取id值
    swal({
        title: "你确定？",
        text: "要删除该内容",
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
            let arrId = []
            arrId.push(Number(event.parentElement.lastElementChild.innerHTML))
            axios({
                method: 'POST',
                url: '/IndicatorOperate/deleteIndicator',
                data: {
                    arrId: arrId
                }
            })
                .then((result) => {
                    // console.log(result.data)
                    if (result.data.err == 0) {
                        swal('删除成功')
                        // 重新获取数据
                        watchFather()
                    } else {
                        swal('删除失败')
                    }
                })
                .catch((err) => {
                    // console.log(err)
                    swal('网络错误')
                })
        } else {
            swal('已取消')
            return false
        }
    })
}

// 删除学分构成
function delFnFather(event) {
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
            axios({
                method: 'POST',
                url: '/creditTypeOperate/deleteCreditType',
                data: {
                    ids: Number(event.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML)
                }
            })
                .then((result) => {
                    if (result.data.err == 0) {
                        swal('删除成功')
                        // 重新获取数据
                        watchFather()
                    } else {
                        swal('删除失败')
                    }
                })
                .catch((err) => {
                    swal('网络错误')
                })
        } else {
            swal('已取消')
            return false
        }
    })
}

let item = document.getElementById('item')
// 跳转新增学分构成
function skipAdd(event) {
    // 将id保存到本地
    sessionStorage.setItem('skipAddAid', event.parentElement.lastElementChild.innerHTML)
    window.location.href = 'http://127.0.0.1:8080/addNewIndicator'
}

// 弹窗中添加子级目录
function addCertification(event) {
    let div = document.createElement('div')
    div.innerHTML = `
        <div class="dirItemI">
            请输入子级目录:
            <input type="text" placeholder="请输入子级目录"  class="clearValue subValue AddDirValue">
            <button  class="addChildDri" onclick="addCertification(this)">添加</button>
            <!-- 第一个不能取消 -->
            <button class="cancel" onclick="removeEle(this)">取消</button>
        </div>
    `
    event.parentElement.parentElement.append(div)
}

// 取消添加
function removeEle(event) {
    // 移除元素
    event.parentElement.remove()
}


let sureAdd = document.getElementById('sureAdd')
let enterComposition = document.getElementById('enterComposition')
let hasDir = false
let selectHasChild = document.getElementById('selectHasChild')
let dirItem = document.getElementsByClassName('dirItem')[0]
selectHasChild.onclick = function () {
    if (selectHasChild.value == '2') {
        hasDir = false
        dirItem.style.display = 'none'
    } else {
        hasDir = true
        dirItem.style.display = 'block'
    }
}
// 确定添加
sureAdd.onclick = function () {
    // 判断值是否为空
    if (enterComposition.value == '') {
        // enterComposition.parentElement.lastElementChild.style.display = 'block'
        swal('请输入添加内容')
    } else {
        let resultData = []
        if (hasDir) {
            // 奖子级目录添加进去
            let subValue = document.getElementsByClassName('subValue')
            for (let i = 0; i < subValue.length; i++) {
                if (subValue[i].value != '') {
                    resultData.push(subValue[i].value)
                }
            }
        }
        // 发送请求
        axios({
            method: 'POST',
            url: '/addCreditAll',
            data: {
                AFirstLevel: enterComposition.value,
                resultData: resultData
            }
        })
            .then((result) => {
                if (result.data.err != 0) {
                    swal('网络错误,请重试!')
                    return
                }
                swal('添加成功')
                bodyTop[0].style.display = 'none'
                // console.log(result.data)
                watchFather()
            })
            .catch((err) => {
                // console.log(err)
                swal('网络错误')
            })
    }
}

let cancelAdd = document.getElementById('cancelAdd')
let bodyTop = document.getElementsByClassName('bodyTop')
cancelAdd.onclick = function () {
    bodyTop[0].style.display = 'none'
}
let add = document.getElementById('add')
add.onclick = function () {
    let clearValue = document.getElementsByClassName('clearValue')
    for (let i = 0; i < clearValue.length; i++) {
        clearValue[i].value = ''
    }
    bodyTop[0].style.display = 'block'
}
// 修改函数
let cancelChange = document.getElementById('cancelChange')
cancelChange.onclick = function () {
    bodyTop[1].style.display = 'none'
}
let changeTwoDirEle = document.getElementById('changeTwoDir')
let changeTwoDirId = document.getElementById('changeTwoDirId')
let changeTwoDirFather = document.getElementById('changeTwoDirFather')
// 修改二级目录函数
function changeTwoDirFn(event) {
    bodyTop[1].style.display = 'block'
    // 父级的id
    axios({
        method: 'GET',
        url: '/creditTypeOperate/showCreditType',
    })
        .then((result) => {
            changeTwoDirFather.innerHTML = ''
            for (let i = 0; i < result.data.msg.length; i++) {
                changeTwoDirFather.add(new Option(result.data.msg[i].afirstLevel, result.data.msg[i].aid))
            }
            changeTwoDirFather.value = event.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.lastElementChild.innerHTML
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
    changeTwoDirEle.value = event.parentElement.firstElementChild.innerHTML
    changeTwoDirId.innerHTML = event.parentElement.lastElementChild.innerHTML
}

function changeOneDirFn(event) {
    bodyTop[1].style.display = 'block'
    // 父级的id
    axios({
        method: 'GET',
        url: '/creditTypeOperate/showCreditType',
    })
        .then((result) => {
            for (let i = 0; i < result.data.msg.length; i++) {
                changeTwoDirFather.add(new Option(result.data.msg[i].afirstLevel, result.data.msg[i].aid))
            }
            changeTwoDirFather.value = event.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.lastElementChild.innerHTML
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
    changeTwoDirEle.value = event.parentElement.firstElementChild.innerHTML
    changeTwoDirId.innerHTML = event.parentElement.lastElementChild.innerHTML
}

let sureChange = document.getElementById('sureChange')
changeTwoDirEle.onclick = function () {
    changeTwoDirEle.parentElement.lastElementChild.style.display = 'none'
}
sureChange.onclick = function () {
    // 判断是否为空
    if (changeTwoDirEle.value == '') {
        // changeTwoDirEle.parentElement.lastElementChild.style.display = 'block'
        swal('请输入修改内容')
        return
    }
    axios({
        method: 'POST',
        url: '/changeTwoDir',
        data: {
            b_id: Number(changeTwoDirId.innerHTML),
            b_Indicator_name: changeTwoDirEle.value,
            b_superior_id: Number(changeTwoDirFather.value),
            b_first_level: Number(changeTwoDirFather.value)
        }
    })
        .then((result) => {
            bodyTop[1].style.display = 'none'
            watchFather()
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}

// 修改学分构成
let CancelchangeComposition = document.getElementById('CancelchangeComposition')
let SurechangeComposition = document.getElementById('SurechangeComposition')
let CompositionName = document.getElementById('CompositionName')
let CompositionId = document.getElementById('CompositionId')
function CompositionChangeFn(event) {
    bodyTop[2].style.display = 'block'
    CompositionId.innerHTML = Number(event.parentElement.lastElementChild.innerHTML)
    CompositionName.value = event.parentElement.firstElementChild.innerHTML
}
CancelchangeComposition.onclick = function () {
    bodyTop[2].style.display = 'none'
}
CompositionName.onclick = function () {
    CompositionName.parentElement.lastElementChild.style.display = 'none'
}
SurechangeComposition.onclick = function () {
    if (CompositionName.value == '') {
        // CompositionName.parentElement.lastElementChild.style.display = 'block'
        swal('请输入修改内容')
        return
    }
    axios({
        method: 'POST',
        url: '/creditTypeOperate/updateCreditType',
        data: {
            AFirstLevel: CompositionName.value,
            AId: Number(CompositionId.innerHTML)
        }
    })
        .then((result) => {
            bodyTop[2].style.display = 'none'
            if (result.data.err != -1) {
                // 重新获取数据
                watchFather()
                swal('修改成功')
            } else {
                swal('修改失败请重试')
            }
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}
