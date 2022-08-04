let AddDirFatherName = document.getElementById('AddDirFatherName')
let AddDirFatherId = document.getElementById('AddDirFatherId')
let addCreditDefaul = document.getElementById('addCreditDefaul')
let addCreditDefaulFather = document.getElementById('addCreditDefaulFather')
function addDirFn(event) {
    bodyTop[3].style.display = 'block'
    addCreditDefaulFather.innerHTML = `
    <div class="dirItem">
                <div class="dirItemI" id="addCreditDefaul">
                    请输入子级目录:
                    <input type="text" placeholder="请输入子级目录" class="clearValue subValue AddDirValue" autocomplete="off">
                    <button class="addChildDri" onclick="addCertification(this)">添加</button>
                </div>
            </div>
    `
    AddDirFatherName.innerHTML = event.parentElement.firstElementChild.innerHTML
    AddDirFatherId.innerHTML = event.parentElement.lastElementChild.innerHTML
}
let CancelAddDir = document.getElementById('CancelAddDir')
CancelAddDir.onclick = function () {
    bodyTop[3].style.display = 'none'
}
let SureaddDir = document.getElementById('SureaddDir')
SureaddDir.onclick = function () {
    let AddDirValue = document.getElementsByClassName('AddDirValue')
    let resultData = []
    for (let i = 0; i < AddDirValue.length; i++) {
        if (AddDirValue[i].value != '') {
            resultData.push({ b_Indicator_level: 2, b_Indicator_name: AddDirValue[i].value.replace(/</g, '&lt;').replace(/>/g, '&gt;'), b_first_level: Number(AddDirFatherId.innerHTML), b_superior_id: Number(AddDirFatherId.innerHTML) })
        }
    }
    if (resultData.length == 0) {
        // 没有输入数据
        // console.log('没有选择数据')
        swal('请填写内容')
        return
    }
    // console.log('传给后端的数据', resultData)
    axios({
        method: 'POST',
        url: '/IndicatorOperate/addIndicator',
        data: {
            arrSend: resultData
        }
    })
        .then((result) => {
            bodyTop[3].style.display = 'none'
            swal('添加成功')
            // console.log(result.data)
            watchFather()
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}

let cancelRevise = document.getElementById('cancelRevise')
let reviseCreComposition = document.getElementById('reviseCreComposition')
let reviseChildDir = document.getElementById('reviseChildDir')
let reviseRecognize = document.getElementById('reviseRecognize')
let reviseCreditNumber = document.getElementById('reviseCreditNumber')
let reviseText = document.getElementById('reviseText')
let selfId = document.getElementById('selfId')
cancelRevise.onclick = function () {
    bodyTop[4].style.display = 'none'
}
// 修改学分指标函数(没有目录,二级)
function IndicatorTwo(event) {
    // 父级
    bodyTop[4].style.display = 'block'
    let ele = event.parentElement.parentElement.firstElementChild
    selfId.innerHTML = ele.lastElementChild.innerHTML
    reviseCreComposition.value = event.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.lastElementChild.innerHTML
    getChild(Number(reviseCreComposition.value), false)
    reviseRecognize.value = ele.nextElementSibling.nextElementSibling.firstElementChild.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    reviseCreditNumber.value = Number(ele.nextElementSibling.nextElementSibling.lastElementChild.innerHTML)
    let test = ''
    if (event.parentElement.firstElementChild.innerHTML != 'null') {
        test = event.parentElement.firstElementChild.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    }
    reviseText.value = test
}

function IndicatorThree(event) {
    bodyTop[4].style.display = 'block'
    selfId.innerHTML = event.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML
    let text = ''
    if (event.parentElement.firstElementChild.innerHTML != 'null') {
        text = event.parentElement.firstElementChild.innerHTML
    }
    reviseText.value = text
    let ele = event.parentElement.parentElement.parentElement
    let secondId = ele.parentElement.firstElementChild.firstElementChild.lastElementChild.innerHTML
    // console.log(ele.firstElementChild.firstElementChild.firstElementChild)
    let fatherId = ele.parentElement.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.innerHTML
    // console.log(fatherId)
    reviseCreComposition.value = fatherId
    // console.log(secondId)
    getChild(Number(reviseCreComposition.value), secondId)
    reviseRecognize.value = event.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.innerHTML
    reviseCreditNumber.value = event.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.innerHTML
}


axios({
    method: 'GET',
    url: '/creditTypeOperate/showCreditType',
})
    .then((result) => {
        for (let i = 0; i < result.data.msg.length; i++) {
            reviseCreComposition.add(new Option(result.data.msg[i].afirstLevel, result.data.msg[i].aid))
        }
    })
    .catch((err) => {
        // console.log(err)
        swal('网络错误')
    })

// 通过学分构成获取子级目录
function getChild(id, hasDir) {
    if (!id) {
        reviseChildDir.innerHTML = ''
        reviseChildDir.add(new Option('没有子级目录', ''))
        reviseChildDir.value = ''
        return
    }
    axios({
        method: 'POST',
        url: '/child',
        data: {
            id: id
        }
    })
        .then((result) => {
            // console.log(result.data)
            reviseChildDir.innerHTML = ''
            // console.log(result.data)
            if (result.data.msg == '下边没有指标了') {
                reviseChildDir.add(new Option('没有子级目录', ''))
                return
            }
            reviseChildDir.add(new Option('请选择子级目录...', ''))
            // 添加进自己目录里边
            let yn = false//默认没有目录
            for (let i = 0; i < result.data.msg.length; i++) {
                // 判断是不是目录
                if (!result.data.msg[i].b_points_available) {
                    yn = true
                    // 是目录
                    reviseChildDir.add(new Option(result.data.msg[i].b_Indicator_name, result.data.msg[i].b_id))
                }
            }
            // console.log(yn)
            if (!yn) {
                reviseChildDir.add(new Option('没有子级目录', ''))
                reviseChildDir.value = ''
                return
            }
            if (hasDir) {
                reviseChildDir.value = hasDir
            } else {
                reviseChildDir.value = ''
            }
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}

reviseCreComposition.onclick = function () {
    getChild(Number(reviseCreComposition.value))
}

let sureRevise = document.getElementById('sureRevise')
let reg = /^[+]{0,1}[1-9]\d*$|^[+]{0,1}(0\.\d*[1-9])$|^[+]{0,1}([1-9]\d*\.\d*[1-9])$/
sureRevise.onclick = function () {
    // 判断值是否为空
    if (reviseRecognize.value == '' || reviseRecognize.value.replace(/(^\s*)|(\s*$)/g, "") == "") {
        // reviseRecognize.parentElement.lastElementChild.style.display = 'block'
        swal('请输入修改内容,不能为空格')
        return
    }
    if (/^[0-9]*$/.test(reviseRecognize.value)) {
        swal('指标名不能为纯数字')
        return
    }
    if (reviseCreditNumber.value == '' || !reg.test(Number(reviseCreditNumber.value))) {
        // reviseCreditNumber.parentElement.lastElementChild.style.display = 'block'
        swal('请输入合法数字')
        return
    }
    let sendArr = {}
    sendArr.b_Indicator_name = reviseRecognize.value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    sendArr.b_id = Number(selfId.innerHTML)
    sendArr.b_first_level = Number(reviseCreComposition.value)
    let secondId = ''
    if (reviseChildDir.value == '') {
        // console.log('空')
        secondId = reviseCreComposition.value
        sendArr.b_Indicator_level = 2
    } else {
        secondId = reviseChildDir.value
        sendArr.b_Indicator_level = 3
    }
    // console.log('二级目录的id', secondId)
    sendArr.b_superior_id = Number(secondId)
    sendArr.b_points_available = Number(reviseCreditNumber.value)
    if (reviseText.value.replace(/(^\s*)|(\s*$)/g, "") != "") {
        sendArr.b_remark = reviseText.value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    } else {
        sendArr.b_remark = '无'
    }
    // console.log('传的数据',sendArr)
    axios({
        method: 'POST',
        url: '/changeIndicator',
        data: {
            sendArr: sendArr
        }
    })
        .then((result) => {
            console.log(result.data)
            bodyTop[4].style.display = 'none'
            if (result.data.err == -1) {
                swal('数据重复或错误,操作失败')
                return
            }
            swal('修改成功')
            watchFather()
        })
        .catch((err) => {
            swal('网络错误')
        })
}

function clearFn(event) {
    event.parentElement.lastElementChild.style.display = 'none'
}

function IndicatorCheckBoxFatherFn(event) {
    // 判断是否选中
    let IndicatorCheckBoxSon = document.getElementsByClassName('IndicatorCheckBoxSon')
    if (event.checked) {
        // 将所有的都选中
        for (let i = 0; i < IndicatorCheckBoxSon.length; i++) {
            IndicatorCheckBoxSon[i].checked = 'true'
        }
    } else {
        for (let i = 0; i < IndicatorCheckBoxSon.length; i++) {
            IndicatorCheckBoxSon[i].checked = ''
        }
    }
}
let IndicatorCheckBoxFather = document.getElementsByClassName('IndicatorCheckBoxFather')[0]
function IndicatorCheckBoxSonFn(event) {
    let IndicatorCheckBoxSon = document.getElementsByClassName('IndicatorCheckBoxSon')
    let yn = true
    for (let i = 0; i < IndicatorCheckBoxSon.length; i++) {
        if (!IndicatorCheckBoxSon[i].checked) {
            yn = false
            break
        }
    }
    if (yn) {
        IndicatorCheckBoxFather.checked = 'true'
    } else {
        IndicatorCheckBoxFather.checked = ''
    }
}

let sureSearch = document.getElementById('sureSearch')
let CreditNumberMin = document.getElementById('CreditNumberMin')
let CreditNumberMax = document.getElementById('CreditNumberMax')
let searchIterator = document.getElementById('searchIterator')

let adminCreditManagementContent = document.getElementsByClassName('adminCreditManagementContent')
let Indicator = document.getElementsByClassName('Indicator')
let IndicatorSum = document.getElementById('IndicatorSum')
let IndicatorCnotent = document.getElementsByClassName('IndicatorCnotent')
sureSearch.onclick = function () {
    // 判断是否为空
    if (searchIterator.value == '' && CreditNumberMin.value == '' && CreditNumberMax.value == '') {
        swal('请输入要搜索内容')
        return
    }
    // 判断搜索的数字是否合法
    if (CreditNumberMin.value != '') {
        if (!/^[1-9][0-9]*([\.][0-9]{1,2})?$/.test(Number(CreditNumberMin.value))) {
            swal('请输入合法数字')
            return
        }
    }
    if (CreditNumberMax.value != '') {
        if (!/^[1-9][0-9]*([\.][0-9]{1,2})?$/.test(Number(CreditNumberMax.value))) {
            swal('请输入合法数字')
            return
        }
    }
    if (CreditNumberMax.value != '' && CreditNumberMin.value == '') {
        swal('请输入最小分数')
        return
    }
    if (CreditNumberMax.value == '' && CreditNumberMin.value != '') {
        swal('请输入最大分数')
        return
    }
    if (Number(CreditNumberMax.value) < Number(CreditNumberMin.value)) {
        swal('数据非法')
        return
    }
    // 请求数据
    let obj = {}
    obj.indicator = searchIterator.value
    obj.score_max = CreditNumberMax.value
    obj.score_min = CreditNumberMin.value
    axios({
        method: 'POST',
        url: '/IndicatorOperate/searshIndicator',
        data: obj
    })
        .then((result) => {
            console.log(result.data)
            if (result.data.msg.length == 0) {
                swal('没有该内容')
                return
            }
            // 将选择框全部清空
            let commonDel = document.getElementsByClassName('commonDel')
            for (let i = 0; i < commonDel.length; i++) {
                commonDel[i].checked = ''
            }
            adminCreditManagementContent[0].style.display = 'none'
            Indicator[0].style.display = 'block'
            IndicatorSum.innerHTML = `共${result.data.msg.length}条`
            IndicatorCnotent[0].innerHTML = ''
            for (let i = 0; i < result.data.msg.length; i++) {
                IndicatorCnotent[0].innerHTML += `
        <ul>
            <li>
                <!-- 点击搜索时要把之前选中的清空 -->
                <input type="checkbox" class="IndicatorCheckBoxSon commonDel" onclick="IndicatorCheckBoxSonFn(this)">
                <!-- 存放id -->
                <div style="display: none;">${result.data.msg[i].classfiy.b_id}</div>
            </li>
            <li>${result.data.msg[i].classfiy.b_Indicator_name}</li>
            <li>${result.data.msg[i].classfiy.b_points_available}</li>
            <li>
                <!-- 存放备注 -->
                <div style="display: none;">${result.data.msg[i].classfiy.b_remark}</div>
                <button onclick="delFnOne(this)">删除</button>
                <button onclick='IndicatorRevise(this)'>修改</button>
                <button onclick="watchRemark(this)">查看备注</button>
                <div style="display: none;">
                    <div style="display: none;">${result.data.msg[i].classfiy.b_first_level}</div>
                    <div style="display: none;">${result.data.msg[i].classfiy.b_superior_id}</div>
                </div>
            </li>
        </ul>
                `
            }

        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}

let resetSearch = document.getElementById('resetSearch')
resetSearch.onclick = function () {
    // 重置
    let commonDel = document.getElementsByClassName('commonDel')
    for (let i = 0; i < commonDel.length; i++) {
        commonDel[i].checked = ''
    }
    adminCreditManagementContent[0].style.display = 'block'
    Indicator[0].style.display = 'none'
    CreditNumberMin.value = ''
    CreditNumberMax.value = ''
    searchIterator.value = ''
    swal('已重置')
}

function IndicatorRevise(event) {
    bodyTop[4].style.display = 'block'
    let ele = event.parentElement.parentElement.firstElementChild
    selfId.innerHTML = ele.lastElementChild.innerHTML
    reviseCreComposition.value = event.parentElement.lastElementChild.firstElementChild.innerHTML
    let second = false
    if (event.parentElement.lastElementChild.firstElementChild.innerHTML != event.parentElement.lastElementChild.lastElementChild.innerHTML) {
        second = event.parentElement.lastElementChild.lastElementChild.innerHTML
    }
    getChild(Number(reviseCreComposition.value), second)
    reviseChildDir.value = second
    reviseRecognize.value = ele.nextElementSibling.innerHTML
    reviseCreditNumber.value = Number(ele.nextElementSibling.nextElementSibling.innerHTML)
    let test = ''
    if (event.parentElement.firstElementChild.innerHTML != 'null') {
        test = event.parentElement.firstElementChild.innerHTML
    }
    reviseText.value = test
}