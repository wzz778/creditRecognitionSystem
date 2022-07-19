// const bodyParser = require("body-parser")

// let popUps = document.getElementsByClassName('popUps')

// 分页
let allNumber = document.getElementById('allNumber')//总条数
let selectPerpage = document.getElementById('selectPerpage')//选择每页条数
let allPages = document.getElementById('allPages')//总页数
let lastPage = document.getElementById('lastPage')//上一页
let nowPage = document.getElementById('nowPage')//显示当前页数
let jumpPage = document.getElementById('jumpPage')//输入跳转页数
let jump = document.getElementById('jump')//跳转
let nextPage = document.getElementById('nextPage')//下一页
let WatchApplicationContentContent = document.getElementsByClassName('WatchApplicationContentContent')[0]
let WatchApplicationNo = document.getElementsByClassName('WatchApplicationNo')[0]
let all_Page = 1//总条数
let per_Page = 10//每页几条
let now_page = 1//当前请求页数

// 查询条件
let CreditsComposition = document.getElementById('CreditsComposition')//学分构成
let credit = document.getElementById('credit')//学分
let academy = document.getElementById('academy')//院系
let ScopeRecognition = document.getElementById('ScopeRecognition')
let usClass = document.getElementById('usClass')//班级
let startDate = document.getElementById('startDate')//开始时间
let endDate = document.getElementById('endDate')//结束时间
// 限制条件函数
function limitationFactor() {
    let obj = {}
    var indexacademy = academy.selectedIndex; // 选中索引
    var textacademy = academy.options[indexacademy].text
    if (textacademy == '请选择...') {
        textacademy = ''
    }
    obj.academy = textacademy
    obj.approval_status = 1
    obj.b_Indicator_name = ScopeRecognition.value
    if (credit.value != '' && !/(^[1-9]\d*$)/.test(Number(credit.value))) {
        swal('请输入正确分数')
        return
    }
    obj.b_points_available = credit.value
    obj.beginDate = startDate.value
    obj.endDate = endDate.value
    var indexusClass = usClass.selectedIndex; // 选中索引
    var textusClass = usClass.options[indexusClass].text
    if (textusClass == '请选择...') {
        textusClass = ''
    }
    obj.major_class = textusClass
    // console.log(obj)
    return obj
}
// 请求函数
function GetAllInfo(page, perpage, obj) {
    obj.nodePage = page
    obj.pageSize = perpage
    // 发送请求
    axios({
        method: 'POST',
        url: '/admin/application',
        data: obj
    })
        .then((result) => {
            // console.log(result.data)
            // 将数据渲染
            WatchApplicationContentContent.innerHTML = ''
            // 判断是否有值
            WatchApplicationContentContent.style.display = 'block'
            WatchApplicationNo.style.display = 'none'
            allNumber.innerHTML = `共${result.data.AllPages}页`
            all_Page = result.data.AllPages
            if (result.data.msg.length == 0) {
                WatchApplicationContentContent.style.display = 'none'
                WatchApplicationNo.style.display = 'block'
                return
            }
            for (let i = 0; i < result.data.msg.length; i++) {
                WatchApplicationContentContent.innerHTML += `
                <ul>
                    <li>${result.data.msg[i].user.name}</li>
                    <li>${result.data.msg[i].user.userName}</li>
                    <li>${result.data.msg[i].user.sex}</li>
                    <li>${result.data.msg[i].user.grade}</li>
                    <li>${result.data.msg[i].user.academy}</li>
                    <li>${result.data.msg[i].user.major_class}</li>
                    <li>${result.data.msg[i].creditType.afirstLevel}</li>
                    <li>${result.data.msg[i].classify.b_points_available}</li>
                    <li>
                        <button class="watchDetails" onclick="downLoad(this)">下载</button>
                        <button class="watchDetails" onclick="watchInfo(this)">查看</button>
                        <div style="display: none;">${result.data.msg[i].id}</div>
                    </li>
                </ul>
                `
            }
            // popUps[0].style.display = 'block'
            // setTimeout(() => {
            //     popUps[0].style.display = 'none'
            // }, 2000)
            swal('查询成功')
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
            swal('超过最大页数')
        } else {
            now_page = jumpPage.value
            nowPage.innerHTML = now_page
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
        swal('请输入正确页数')
    }
}

// 查询函数
let sureSearch = document.getElementById('sureSearch')
sureSearch.onclick = function () {
    now_page = 1
    nowPage.innerHTML = now_page
    GetAllInfo(now_page, per_Page, limitationFactor())
}
let reset = document.getElementById('reset')
let allSelect = document.getElementsByTagName('select')
let allInput = document.getElementsByTagName('input')

reset.onclick = function () {
    // 将值全部清空
    for (let i = 0; i < allInput.length; i++) {
        allInput[i].value = ''
    }
    for (let i = 0; i < allSelect.length; i++) {
        allSelect[i].value = ''
    }
    academy.innerHTML=''
    academy.add(new Option('请选择...',''))
    academy.value=''
    specialized.innerHTML=''
    specialized.add(new Option('请选择...',''))
    specialized.value=''
    usClass.innerHTML=''
    usClass.add(new Option('请选择...',''))
    usClass.value=''
    selectPerpage.value = 10
    now_page = 1
    nowPage.innerHTML = now_page
    GetAllInfo(now_page, per_Page, limitationFactor())
}
selectPerpage.onchange = function () {
    per_Page = selectPerpage.value
    GetAllInfo(now_page, per_Page, limitationFactor())
}

axios({
    method: 'GET',
    url: '/creditTypeOperate/showCreditType',
})
    .then((result) => {
        // console.log(result.data)
        CreditsComposition.innerHTML = ''
        for (let i = 0; i < result.data.msg.length; i++) {
            // CreditsComposition.add(new Option(result.data.msg[i].afirstLevel, result.data.msg[i].))
            CreditsComposition.add(new Option(result.data.msg[i].afirstLevel, result.data.msg[i].aid))
        }
        CreditsComposition.add(new Option('请选择...', ''))
        CreditsComposition.value = ''
    })
    .catch((err) => {
        // console.log(err)
        swal('网络错误')
    })
let CreditsSecondDir = document.getElementById('CreditsSecondDir')
CreditsComposition.onchange = function () {
    if (CreditsComposition.value == '') {
        return
    }
    axios({
        method: 'POST',
        url: '/child',
        data: {
            id: Number(CreditsComposition.value)
        }
    })
        .then((result) => {
            // console.log(result.data)
            CreditsSecondDir.innerHTML = ''
            ScopeRecognition.innerHTML = ''
            CreditsSecondDir.add(new Option('请选择...', ''))
            ScopeRecognition.add(new Option('请选择...', ''))
            if (result.data.msg == "下边没有指标了") {
                CreditsSecondDir.value = ''
                ScopeRecognition.value = ''
                return
            }
            for (let i = 0; i < result.data.msg.length; i++) {
                if (!result.data.msg[i].b_points_available) {
                    // 是目录
                    CreditsSecondDir.add(new Option(result.data.msg[i].b_Indicator_name, result.data.msg[i].b_id))
                } else {
                    ScopeRecognition.add(new Option(result.data.msg[i].b_Indicator_name, result.data.msg[i].b_Indicator_name))
                }
            }
            CreditsSecondDir.value = ''
            ScopeRecognition.value = ''
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}

CreditsSecondDir.onchange = function () {
    if (CreditsSecondDir.value == '') {
        return
    }
    axios({
        method: 'POST',
        url: '/Third',
        data: {
            id: Number(CreditsSecondDir.value)
        }
    })
        .then((result) => {
            // console.log(result.data)
            ScopeRecognition.innerHTML = ''
            ScopeRecognition.add(new Option('请选择...', ''))
            for (let i = 0; i < result.data.msg.length; i++) {
                ScopeRecognition.add(new Option(result.data.msg[i].b_Indicator_name, result.data.msg[i].b_Indicator_name))
            }
            ScopeRecognition.value = ''
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}

let exportForm = document.getElementById('exportForm')
exportForm.onclick = function () {
    window.open('/adminExportForm')
}

let usGrade = document.getElementById('usGrade')

// 获取一级的目录,传入要显示年级的元素
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
// 需要添加的元素，上一级的id，级别
function GetOtherLevel(ele, id) {
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
usGrade.onchange = function () {
    if (usGrade.value == '') {
        return
    }
    // 显示学院
    GetOtherLevel(academy, usGrade.value)
}
academy.onchange = function () {
    if(academy.value==''){
        return
    }
    // 显示专业
    GetOtherLevel(specialized, academy.value)
}
specialized.onchange = function () {
    if(specialized.value==''){
        return
    }
    // 显示班级
    GetOtherLevel(usClass, specialized.value)
}

function downLoad(event){
    // academy.parentElement.lastElementChild.innerHTML
    // console.log(event.parentElement.lastElementChild.innerHTML)
    sessionStorage.setItem('Applicationid', event.parentElement.lastElementChild.innerHTML)
    window.open('/makepdf')
}
// 查看详情
function watchInfo(event){
    window.location.href = 'particulars?id=' + event.parentElement.lastElementChild.innerHTML
}