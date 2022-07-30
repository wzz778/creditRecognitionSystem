// let popUps = document.getElementsByClassName('popUps')
// 提示弹窗
let expandItem = document.getElementsByClassName('expandItem')

// 获取学分构成数据
let Table = document.getElementsByClassName('Table')
function watchFather() {
    axios({
        method: 'GET',
        url: '/getCreditsComposition',
    })
        .then((result) => {
            // console.log(result.data)
            // 遍历一级目录
            let str = ''
            for (let i = 0; i < result.data.msg.length; i++) {
                str += `
        <div class="TableItem">
            <div class="">
                <span class="expandItem" onclick='watchChild(this)'>
                    <span class="remove"></span>
                    <span onclick="" class=""></span>
                    <div class="" style="display: none;">${result.data.msg[i].aid}</div>
                </span>
                <span>
                    <div class="" style="display: none;">${result.data.msg[i].aid}</div>
                    <input type="checkbox" onclick='allChildInputFather(this)'>
                </span>
                <span>${result.data.msg[i].afirstLevel}</span>
                <!-- 存放操作的盒子 -->
                <span>
                    <div class="" style="display: none;">${result.data.msg[i].afirstLevel}</div>
                    <button onclick='addDirFn(this)'>
                        <i class="layui-icon">&#xe654;</i>
                    </button>
                    <button onclick='CompositionChangeFn(this)'>
                        <i class="layui-icon">&#xe642;</i>
                    </button>
                    <button onclick='delFnFather(this)'>
                        <i class="layui-icon">&#xe640;</i>
                    </button>
                    <div class="" style="display: none;">${result.data.msg[i].aid}</div>
                </span>
            </div>
            <div></div>
        </div>
                `
            }
            Table[0].innerHTML = str
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}
watchFather()
// 查看子级
function watchChild(event) {
    event.nextElementSibling.lastElementChild.checked = ''
    // 请求数据
    axios({
        method: 'POST',
        url: '/IndicatorOperate/showIndicator',
        data: {
            id: event.lastElementChild.innerHTML
        }
    })
        .then((result) => {
            // console.log(result.data)
            let str = ``
            let str1 = ``
            if (result.data.msg == '没有指标信息') {
                swal('没有指标信息')
                return
            }
            for (let i = 0; i < result.data.msg.length; i++) {
                if (result.data.msg[i].child == `下边没有指标了` && result.data.msg[i].b_points_available != 0) {
                    // 是指标而不是目录
                    str += `
            <div class="CreditIndicator">
                <span>
                    <div class="" style="display: none;">${result.data.msg[i].b_id}</div>
                    <input type="checkbox" onclick='judgeChild(this)' class='commonDel'>
                    <div class="" style="display: none;">${result.data.msg[i].b_id}</div>
                </span>
                <span>指标名:${result.data.msg[i].b_Indicator_name};&nbsp;&nbsp;分数:${result.data.msg[i].b_points_available}</span>
                <div class="" style="display: none;">
                    <span>${result.data.msg[i].b_Indicator_name}</span>
                    <span>${result.data.msg[i].b_points_available}</span>
                </div>
                <span>
                    <div class="" style="display: none;">${result.data.msg[i].b_remark}</div>
                    <button onclick='IndicatorTwo(this)'>
                        <i class="layui-icon">&#xe642;</i>
                    </button>
                    <button onclick='delFnOne(this)'>
                        <i class="layui-icon">&#xe640;</i>
                    </button>
                    <button onclick='watchRemark(this)'>
                        <i class="layui-icon">&#xe60b;</i>
                    </button>
                </span>
            </div>
                    `
                } else {
                    // 判断目录有没有子级指标
                    let strDir = ``
                    if (result.data.msg[i].child != '下边没有指标了') {
                        // 目录里边有指标
                        for (let j = 0; j < result.data.msg[i].child.length; j++) {
                            strDir += `
                            <!-- 存放指标 -->
                    <div class="CreditIndicator">
                        <span>
                            <div class="" style="display: none;">${result.data.msg[i].child[j].b_id}</div>
                            <input type="checkbox" onclick='judgeChildDir(this)' class='commonDel'>
                            <div class="" style="display: none;">${result.data.msg[i].child[j].b_id}</div>
                        </span>
                        <span>指标名:${result.data.msg[i].child[j].b_Indicator_name};&nbsp;&nbsp;分数:${result.data.msg[i].child[j].b_points_available}</span>
                        <div class="" style="display: none;">
                            <span>${result.data.msg[i].child[j].b_Indicator_name}</span>
                            <span>${result.data.msg[i].child[j].b_points_available}</span>
                        </div>
                        <span>
                            <div class="" style="display: none;">${result.data.msg[i].child[j].b_remark}</div>
                            <button onclick='IndicatorThree(this)'>
                                <i class="layui-icon">&#xe642;</i>
                            </button>
                            <button onclick='delFnOne(this)'>
                                <i class="layui-icon">&#xe640;</i>
                            </button>
                            <button onclick='watchRemark(this)'>
                                <i class="layui-icon">&#xe60b;</i>
                            </button>
                        </span>
                    </div>
                            `
                        }
                    }
                    // 是目录
                    if (!strDir) {
                        str1 += `
            <div class="CreditDir">
                <div class="">
                    <span class="expandItem" onclick='watchChildDir(this)'>
                        <span class="remove"></span>
                        <span onclick="" class=""></span>
                        <div class="" style="display: none;">${result.data.msg[i].b_id}</div>
                    </span>
                    <span>
                        <div class="" style="display: none;">${result.data.msg[i].b_id}</div>
                        <input type="checkbox" onclick='allChildInputFatherDir(this)' class='commonDel'>
                    </span>
                    <span>${result.data.msg[i].b_Indicator_name}</span>
                    <span>
                        <div class="" style="display: none;">${result.data.msg[i].b_id}</div>
                        <div class="" style="display: none;">${result.data.msg[i].b_Indicator_name}</div>
                        <button onclick='skipAdd(this)'>
                            <i class="layui-icon">&#xe654;</i>
                        </button>
                        <button onclick='changeTwoDirFn(this)'>
                            <i class="layui-icon">&#xe642;</i>
                        </button>
                        <button onclick='delFnOne(this)'>
                            <i class="layui-icon">&#xe640;</i>
                        </button>
                        <div class="" style="display: none;">${result.data.msg[i].b_superior_id}</div>
                    </span>
                </div>
            </div>
        </div>
                    `
                    } else {
                        str1 += `
            <div class="CreditDir">
                <div class="">
                    <span class="expandItem" onclick='watchChildDir(this)'>
                        <span class="remove"></span>
                        <span onclick="" class=""></span>
                        <div class="" style="display: none;">${result.data.msg[i].b_id}</div>
                    </span>
                    <span>
                        <div class="" style="display: none;">${result.data.msg[i].b_id}</div>
                        <input type="checkbox" onclick='allChildInputFatherDir(this)' class='commonDel'>
                    </span>
                    <span>${result.data.msg[i].b_Indicator_name}</span>
                    <span>
                        <div class="" style="display: none;">${result.data.msg[i].b_id}</div>
                        <div class="" style="display: none;">${result.data.msg[i].b_Indicator_name}</div>
                        <button onclick='skipAdd(this)'>
                            <i class="layui-icon">&#xe654;</i>
                        </button>
                        <button onclick='changeTwoDirFn(this)'>
                            <i class="layui-icon">&#xe642;</i>
                        </button>
                        <button onclick='delFnOne(this)'>
                            <i class="layui-icon">&#xe640;</i>
                        </button>
                        <div class="" style="display: none;">${result.data.msg[i].b_superior_id}</div>
                    </span>
                </div>
                <div style='display:none;'>
                ${strDir}
                </div>
            </div>
        </div>
                    `
                    }
                }

            }
            str += str1
            event.parentElement.parentElement.lastElementChild.innerHTML = str
            // 判断内容盒子是否显现
            if (event.firstElementChild.style.display == 'none') {
                event.parentElement.nextElementSibling.style.display = 'none'
                event.firstElementChild.style.display = ''
            } else {
                event.parentElement.nextElementSibling.style.display = ''
                event.firstElementChild.style.display = 'none'
            }
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误，请重试')
        })

}
// 三级目录将盒子显现，通过二级目录去请求
function watchChildDir(event) {
    // console.log(event.parentElement.nextElementSibling.innerHTML)
    if (!event.parentElement.nextElementSibling) {
        swal('没有子级指标')
        return
    }
    // 判断内容盒子是否显现
    if (event.firstElementChild.style.display == 'none') {
        event.parentElement.nextElementSibling.style.display = 'none'
        event.firstElementChild.style.display = ''
    } else {
        event.parentElement.nextElementSibling.style.display = ''
        event.firstElementChild.style.display = 'none'
    }
}
// 查看备注
function watchRemark(event) {
    // 奖备注显示在弹窗中
    let str = '没有备注信息'
    if (event.parentElement.firstElementChild.innerHTML != 'null' && event.parentElement.firstElementChild.innerHTML != '') {
        str = event.parentElement.firstElementChild.innerHTML
    }
    swal(str)
}

// 父级选择框
function allChildInputFather(event) {
    let allInput = event.parentElement.parentElement.parentElement.getElementsByTagName('input')
    if (event.checked) {
        for (let i = 0; i < allInput.length; i++) {
            allInput[i].checked = 'true'
        }
    } else {
        for (let i = 0; i < allInput.length; i++) {
            allInput[i].checked = ''
        }
    }
}

// 二级目录
function allChildInputFatherDir(event) {
    let allInput = event.parentElement.parentElement.parentElement.getElementsByTagName('input')
    if (event.checked) {
        for (let i = 0; i < allInput.length; i++) {
            allInput[i].checked = 'true'
        }
        // 判断是否需要将顶级的选择
        let dirAllInput = event.parentElement.parentElement.parentElement.parentElement.getElementsByTagName('input')
        let yn = true
        for (let j = 0; j < dirAllInput.length; j++) {
            if (!dirAllInput[j].checked) {
                yn = false
                break
            }
        }
        if (yn) {
            event.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.checked = 'true'
        }
        else {
            event.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.checked = ''
        }
    } else {
        for (let i = 0; i < allInput.length; i++) {
            allInput[i].checked = ''
        }
        event.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.checked = ''
    }
}
// 判断子级选择框是否完全选中二级
function judgeChild(event) {
    // 判断是否都选中
    let yn = true
    let childInputAll = event.parentElement.parentElement.parentElement.getElementsByTagName('input')
    // console.log(childInputAll)
    for (let i = 0; i < childInputAll.length; i++) {
        if (!childInputAll[i].checked) {
            yn = false
            break
        }
    }
    if (yn) {
        // 全部都选中了
        event.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.checked = 'true'
    } else {
        event.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.checked = ''
    }
}
function judgeChildDir(event) {
    // 判断是否都选中
    let yn = true
    let childInputAll = event.parentElement.parentElement.parentElement.getElementsByTagName('input')
    // console.log(childInputAll)
    for (let i = 0; i < childInputAll.length; i++) {
        if (!childInputAll[i].checked) {
            yn = false
            break
        }
    }
    let ele = event.parentElement.parentElement.parentElement.parentElement
    if (yn) {
        // 全部都选中了
        ele.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.checked = 'true'
        // 将最顶级的也选中
        ele.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.checked = 'true'
    } else {
        ele.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.checked = ''
        ele.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.checked = ''
    }

}
// 删除的选中函数
function delFnAll() {
    let commonDel = document.getElementsByClassName('commonDel')
    let yn = false
    let arrId = []
    for (let i = 0; i < commonDel.length; i++) {
        if (commonDel[i].checked) {
            arrId.push(Number(commonDel[i].parentElement.firstElementChild.innerHTML))
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
            // console.log(arrId)
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
    window.location.href = 'addNewIndicator'
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
            changeTwoDirFather.value = event.parentElement.lastElementChild.innerHTML
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
    changeTwoDirEle.value = event.parentElement.firstElementChild.nextElementSibling.innerHTML
    changeTwoDirId.innerHTML = event.parentElement.firstElementChild.innerHTML
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
            swal('修改成功')
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

let allSum = document.getElementById('allSum')
allSum.onclick = function () {
    window.open('creditSummary')
}
let jumpUrl=document.getElementById('jumpUrl')
jumpUrl.onclick=function(){
    window.location.href='addNewIndicator'
}