// 提示弹窗
let popUps = document.getElementsByClassName('popUps')
let expandItem = document.getElementsByClassName('expandItem')
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
            console.log(result.data)
            ele.innerHTML = ''
            if (result.data.msg == '没有指标信息') {
                // 没有指标信息
                ele.innerHTML = `
            <div id="adminHistoryContentNo" style='min-height: 100px;
            line-height: 100px;
            text-align: center;
            color: red;
            font-size: 20px'>
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
                            <button onclick="delFnOne(this)">删除</button>
                            <button onclick='changeTwoDir(this)'>修改</button>
                            <button>查看备注</button>
                            <div style='display:none;'>无二级目录</div>
                        </li>
                    </ul>
                `
                } else {
                    // 有子级目录判断下面有没有值
                    if (result.data.msg[i].child == '下边没有指标了') {
                        // 这里是目录但是没有指标
                        ele.innerHTML += `
                <div class="SecondDir clearFloat">
                        <span>子级目录:</span>
                        <button class="floatRight">删除此子级目录</button>
                    </div>
                    <div id="adminHistoryContentNo" style='min-height: 100px;
            line-height: 100px;
            text-align: center;
            color: red;
            font-size: 20px'>
                对不起没有没有子级指标
            </div>
                `
                    }else{
                        // 遍历
                        ele.innerHTML += `
                    <div class="SecondDir clearFloat">
                        <span>子级目录:</span>
                        <button class="floatRight">删除此子级目录</button>
                    </div>
                    <ul>
                        <li>
                            <input type="checkbox" class="childDel commonDel" onclick="judgeChild(this)">
                        </li>
                        <li>国际竞赛一等奖(最高奖)</li>
                        <li>6.0</li>
                        <li>
                            <button onclick="delFnOne(this)">删除</button>
                            <button>修改</button>
                            <button>新增</button>
                            <div style='display:none;'>二级目录名</div>
                        </li>
                    </ul>
                `
                    }

                }
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

// 二级修改(没有子级目录)
function changeTwoDir(event) {
    console.log(event.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.lastElementChild.innerHTML)
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
                        console.log(result.data)
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
            console.log(event.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML)
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
                    console.log(result.data)
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
                    console.log(result.data)
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

let item = document.getElementById('item')
// 获取学分构成数据
function watchFather() {
    axios({
        method: 'GET',
        url: '/getCreditsComposition',
    })
        .then((result) => {
            console.log(result.data)
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
                        <button>编辑</button>
                    </li>
                    <li>
                        <button onclick='skipAdd(this)'>添加</button>
                        <button onclick="delFnFather(this)">删除</button>
                        <div style="display: none;">${result.data.msg[i].aid}</div>
                    </li>
                </ul>
                <div class="ChildDetails" style="display: none;">
                    <div class="ChildDetailsTop ChildDetailsItem">
                        <ul>
                            <li>
                                <input type="checkbox" class="childDelAll commonDel" onclick="allChildInputFather(this)">
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
        })
        .catch((err) => {
            console.log(err)
        })
}
watchFather()

function skipAdd(event) {
    // 将id保存到本地
    sessionStorage.setItem('skipAddAid', event.parentElement.lastElementChild.innerHTML)
    window.location.href = 'http://127.0.0.1:8080/addNewIndicator'
}


function addCertification(event) {
    let div=document.createElement('div')
    div.innerHTML=`
        <div class="dirItemI">
            请输入子级目录:
            <input type="text" placeholder="请输入子级目录"  class="clearValue subValue">
            <button  class="addChildDri" onclick="addCertification(this)">添加</button>
            <!-- 第一个不能取消 -->
            <button class="cancel" onclick="removeEle(this)">取消</button>
        </div>
    `
    event.parentElement.parentElement.append(div)
    // event.parentElement.parentElement.innerHTML += `
    //     <div class="dirItemI">
    //         请输入子级目录:
    //         <input type="text" placeholder="请输入子级目录"  class="clearValue subValue">
    //         <button  class="addChildDri" onclick="addCertification(this)">添加</button>
    //         <!-- 第一个不能取消 -->
    //         <button class="cancel" onclick="removeEle(this)">取消</button>
    //     </div>
    // `
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
        enterComposition.parentElement.lastElementChild.style.display = 'block'
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
        console.log(resultData)
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
                console.log(result.data)
            })
            .catch((err) => {
                console.log(err)
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

