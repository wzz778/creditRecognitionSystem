
// 提示弹窗
let popUps = document.getElementsByClassName('popUps')
let expandItem = document.getElementsByClassName('expandItem')
function watchChild(event){
    // 判断内容盒子是否显现
    if (event.parentElement.parentElement.parentElement.lastElementChild.style.display == 'none') {
        event.parentElement.parentElement.parentElement.lastElementChild.style.display = ''
        event.firstElementChild.style.display = 'none'
    } else {
        event.parentElement.parentElement.parentElement.lastElementChild.style.display = 'none'
        event.firstElementChild.style.display = ''
    }
    // 请求下一级函数
    let ele=event.parentElement.parentElement.parentElement.lastElementChild.lastElementChild//获取存放的位置
    axios({
        method:'POST',
        url:'/IndicatorOperate/showIndicator',
        data:{
            id:event.parentElement.lastElementChild.innerHTML
        }
    })
    .then((result)=>{
        console.log(result.data)
        ele.innerHTML=''
        for(let i=0;i<result.data.msg.length;i++){
            // 判断是否是目录
            if(result.data.msg[i].child=='下边没有指标了'){
                // 不是目录
                ele.innerHTML+=`
                    <ul>
                        <li>
                            <input type="checkbox" class="childDel commonDel" onclick="judgeChild(this)">
                        </li>
                        <li>${result.data.msg[i].b_Indicator_name}</li>
                        <li>${result.data.msg[i].b_points_available}</li>
                        <li>
                            <button onclick="delFnOne(this)">删除</button>
                            //这里需要存放它的二级爸爸贡修改和新增使用
                            <button>修改</button>
                            <button>新增</button>
                            <div style='display:none;'>无二级目录</div>
                        </li>
                    </ul>
                `
            }else{
                // 有子级目录
                ele.innerHTML+=`
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
    })
    .catch((err)=>{
        console.log(err)
    })
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

let item=document.getElementById('item')
// 获取学分构成数据
axios({
    method:'GET',
    url:'/getCreditsComposition',
})
.then((result)=>{
    console.log(result.data)
    item.innerHTML=''
    for(let i=0;i<result.data.msg.length;i++){
        item.innerHTML+=`
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
                <li>${i+1}</li>
                <li>
                    <button>查看</button>
                </li>
                <li>
                    <button>编辑</button>
                    <button>新增</button>
                    <button onclick="delFnOne(this)">删除</button>
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
.catch((err)=>{
    console.log(err)
})

