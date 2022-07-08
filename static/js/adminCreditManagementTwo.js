let AddDirFatherName = document.getElementById('AddDirFatherName')
let AddDirFatherId = document.getElementById('AddDirFatherId')
function addDirFn(event) {
    bodyTop[3].style.display = 'block'
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
            resultData.push({ b_Indicator_level: 2, b_Indicator_name: AddDirValue[i].value, b_first_level: Number(AddDirFatherId.innerHTML), b_superior_id: Number(AddDirFatherId.innerHTML) })
        }
    }
    if (resultData.length == 0) {
        // 没有输入数据
        console.log('没有选择数据')
        return
    }
    console.log('传给后端的数据', resultData)
    axios({
        method: 'POST',
        url: '/IndicatorOperate/addIndicator',
        data: {
            arrSend: resultData
        }
    })
        .then((result) => {
            bodyTop[3].style.display='none'
            swal('添加成功')
            console.log(result.data)
        })
        .catch((err) => {
            console.log(err)
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
    let ele = event.parentElement.lastElementChild.firstElementChild
    selfId.innerHTML = ele.innerHTML
    reviseCreComposition.value = event.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.lastElementChild.lastElementChild.innerHTML
    getChild(Number(reviseCreComposition.value), false)
    reviseRecognize.value = ele.nextElementSibling.innerHTML
    reviseCreditNumber.value = Number(ele.nextElementSibling.nextElementSibling.innerHTML)
    let test=''
    if(ele.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML!='null'){
        test=ele.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML
    }
    reviseText.value=test
}

function IndicatorThree(event) {
    bodyTop[4].style.display = 'block'
    selfId.innerHTML = event.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML
    let text=''
    if(event.parentElement.firstElementChild.innerHTML!='null'){
        text=event.parentElement.firstElementChild.innerHTML
    }
    reviseText.value = text
    let ele = event.parentElement.parentElement.parentElement
    let secondId = ele.firstElementChild.lastElementChild.innerHTML
    let fatherId = ele.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.lastElementChild.innerHTML
    reviseCreComposition.value = fatherId
    console.log(secondId)
    getChild(Number(reviseCreComposition.value), secondId)
    reviseRecognize.value = event.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML
    reviseCreditNumber.value = event.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML
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
        console.log(err)
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
            console.log(result.data)
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
            console.log(err)
        })
}

reviseCreComposition.onclick = function () {
    getChild(Number(reviseCreComposition.value))
}

let sureRevise = document.getElementById('sureRevise')
let reg = /^[+]{0,1}[1-9]\d*$|^[+]{0,1}(0\.\d*[1-9])$|^[+]{0,1}([1-9]\d*\.\d*[1-9])$/
sureRevise.onclick = function () {
    // 判断值是否为空
    if (reviseRecognize.value == '') {
        reviseRecognize.parentElement.lastElementChild.style.display = 'block'
        return
    }
    if (reviseCreditNumber.value == '' || !reg.test(Number(reviseCreditNumber.value))) {
        reviseCreditNumber.parentElement.lastElementChild.style.display = 'block'
    }
    let sendArr = {}
    sendArr.b_Indicator_name = reviseRecognize.value
    sendArr.b_id = Number(selfId.innerHTML)
    sendArr.b_first_level = Number(reviseCreComposition.value)
    let secondId=''
    if(reviseChildDir.value==''){
        console.log('空')
        secondId=reviseCreComposition.value
    }else{
        secondId=reviseChildDir.value
    }
    console.log('二级目录的id',secondId)
    sendArr.b_superior_id = Number(secondId)
    sendArr.b_points_available = Number(reviseCreditNumber.value)
    sendArr.b_remark = reviseText.value
    console.log(sendArr)
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
            swal('修改成功')
            watchFather()
        })
        .catch((err)=>{
            swal('网络错误')
        })
}

function clearFn(event) {
    event.parentElement.lastElementChild.style.display = 'none'
}