// const { default: axios } = require("axios")

// let popUps = document.getElementsByClassName('popUps')
// let msgHint = document.getElementById('msgHint')

// 点击是否选择学生的信息
let studentInformation = document.getElementsByClassName('studentInformation')[0]
let choiceStuTea = document.getElementsByClassName('choiceStuTea')
let defaultYes = document.getElementById('defaultYes')
let defaultNo = document.getElementById('defaultNo')
// 定义一个变量用于判断是否选择填写学生信息,true是填写
let yn = true
// choiceStuTea[0].onclick = function () {
//     yn = true
//     defaultYes.style.display = 'inline-block'
//     defaultNo.style.display = 'none'
//     studentInformation.style.display = 'block'
// }
// choiceStuTea[1].onclick = function () {
//     defaultNo.style.display = 'inline-block'
//     yn = false
//     defaultYes.style.display = 'none'
//     studentInformation.style.display = 'none'
// }


// 点击保存
let usName = document.getElementById('usName')
let account = document.getElementById('account')
let usPermission = document.getElementById('usPermission')
let usGrade = document.getElementById('usGrade')
let usCollege = document.getElementById('usCollege')
let usSpecialized = document.getElementById('usSpecialized')
let usClass = document.getElementById('usClass')
let usSex = document.getElementById('usSex')
let Remarks = document.getElementById('Remarks')
let save = document.getElementById('save')
let cancel = document.getElementById('cancel')

let organization = document.getElementById('organization')
let positionAcademy = document.getElementById('positionAcademy')
let OrganizationInformation = document.getElementById('OrganizationInformation')
let addOrganization = document.getElementById('addOrganization')
let cancelAddOrganization = document.getElementById('cancelAddOrganization')
let authorizeAddUser = document.getElementById('authorizeAddUser')

// 限制账号,这里限制只能是数字
let accountTest = /^[0-9]*$/
save.onclick = function () {
    // console.log(yn)
    // 判断是否为空
    if (usName.value == '' || usName.value.replace(/(^\s*)|(\s*$)/g, "") == "") {
        // 没填写用户名
        // usName.parentElement.lastElementChild.style.display = 'block'
        swal('请输入用户名,不能为空格')
        return
    } else if (account.value == '' || !accountTest.test(account.value)) {
        // 没填写账号
        // account.parentElement.lastElementChild.style.display = 'block'
        swal('请输入正确的学号/教务账号')
        return
    } else if (usPermission.value == '') {
        // 没选择用户身份
        // usPermission.parentElement.lastElementChild.style.display = 'block'
        swal('请选择用户身份')
        return
    }
    if (yn) {
        // 看是否填写了年级，院系，专业等
        if (usSex.value == '') {
            swal('请选择性别')
            return
        }
        if (usGrade.value == '') {
            // usGrade.parentElement.lastElementChild.style.display = 'block'
            swal('请选择年级')
            return
        } else if (usCollege.value == '') {
            // usCollege.parentElement.lastElementChild.style.display = 'block'
            swal('请选择学院')
            return
        } else if (usSpecialized.value == '') {
            // usSpecialized.parentElement.lastElementChild.style.display = 'block'
            swal('请选择专业')
            return
        } else if (usClass.value == '') {
            // usClass.parentElement.lastElementChild.style.display = 'block'
            swal('请选择班级')
            return
        }
    }
    var indexGrade = usGrade.selectedIndex // 选中索引
    var textGrade = usGrade.options[indexGrade].text
    var indexusCollege = usCollege.selectedIndex; // 选中索引
    var textusCollege = usCollege.options[indexusCollege].text
    var indexusClass = usClass.selectedIndex; // 选中索引
    var textusClass = usClass.options[indexusClass].text;
    var indexusSpecialized = usSpecialized.selectedIndex; // 选中索引
    var textusSpecialized = usSpecialized.options[indexusSpecialized].text;
    let obj = {
        name: usName.value.replace(/\s+/g, ""),
        userName: account.value,
        power: usPermission.value,
    }
    if (yn) {
        obj.grade = textGrade
        obj.academy = textusCollege
        obj.major_class = textusClass
        obj.major = textusSpecialized
        obj.sex = usSex.value
    }
    if (OrganizationInformation.style.display == 'grid') {
        // 必须填组织信息
        if (organization.value == '') {
            swal('请输入组织信息')
            return
        } else {
            obj.organization = organization.value
            obj.superPower = authorizeAddUser.value
            // 待定
            obj.academy = positionAcademy.value
        }
    }
    // console.log(obj)
    // console.log(usName.value.replace(/\s+/g,""))
    // 发送数据
    axios({
        method: 'POST',
        url: '/admin/User',
        data: {
            obj: obj
        }
    })
        .then((result) => {
            // console.log(result.data)
            if (result.data.err == -1) {
                // 将错误信息显示出来
                swal(result.data.msg)
            } else {
                swal('添加成功')
                // 清空数据
                usCollege.innerHTML = ``
                usSpecialized.innerHTML = ''
                usClass.innerHTML = ''
                usCollege.add(new Option('请选择...', ''))
                usSpecialized.add(new Option('请选择...', ''))
                usClass.add(new Option('请选择...', ''))
                for (let i = 0; i < inputAll.length; i++) {
                    inputAll[i].value = ''
                }
                for (let i = 0; i < selectAll.length; i++) {
                    selectAll[i].value = ''
                }
            }
        })
        .catch((err) => {
            console.log(err)
            // 提示错误
            swal('网络错误')
        })
}
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
            console.log(err)
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
            // 将结果添加到ele上
            ele.innerHTML = ''
            ele.add(new Option('请选择...', ''))
            for (let i = 0; i < result.data.msg.length; i++) {
                ele.add(new Option(result.data.msg[i].name, result.data.msg[i].id))
            }
            ele.value = ''
        })
        .catch((err) => {
            console.log(err)
            swal('网络错误')
        })
}
usGrade.onchange = function () {
    usCollege.innerHTML = ''
    usCollege.add(new Option('请选择...', ''))
    usCollege.value = ''
    // 显示学院
    usSpecialized.innerHTML = ''
    usSpecialized.add(new Option('请选择...', ''))
    usSpecialized.value = ''
    usClass.innerHTML = ''
    usClass.add(new Option('请选择...', ''))
    usClass.value = ''
    if (usGrade.value == '') {
        return
    }
    GetOtherLevel(usCollege, usGrade.value)
}
usCollege.onchange = function () {
    // 显示专业
    usClass.innerHTML = ''
    usClass.add(new Option('请选择...', ''))
    usClass.value = ''
    usSpecialized.innerHTML = ''
    usSpecialized.add(new Option('请选择...', ''))
    usSpecialized.value = ''
    if (usCollege.value == '') {
        return
    }
    GetOtherLevel(usSpecialized, usCollege.value)
}
usSpecialized.onchange = function () {
    usClass.innerHTML = ''
    usClass.add(new Option('请选择...', ''))
    usClass.value = ''
    if (usSpecialized.value == '') {
        return
    }
    // 显示班级
    GetOtherLevel(usClass, usSpecialized.value)
}
cancel.onclick = function () {
    window.location.href = '/adminManageUsers'
}


// 封装一个函数用于判断是否有学生信息
function judgeStudentInfoShow(judegCondition) {
    // 如果是true表示用显示
    yn = judegCondition
    if (judegCondition) {
        // defaultYes.style.display = 'inline-block'
        // defaultNo.style.display = 'none'
        studentInformation.style.display = 'block'
        return
    }
    // defaultNo.style.display = 'inline-block'
    // defaultYes.style.display = 'none'
    studentInformation.style.display = 'none'
}

// 为用户权限选择框绑定函数用于判断是否显示学生信息
usPermission.onchange = function () {
    let usOnchageCondition = true
    if (this.value == '普通用户' || this.value == '') {
        usOnchageCondition = true
        OrganizationInformation.style.display = 'none'
    } else {
        usOnchageCondition = false
        OrganizationInformation.style.display = 'grid'
    }
    judgeStudentInfoShow(usOnchageCondition)
}


// 获取所有的组织信息
function getAllOrganize(ele) {
    ele.innerHTML = ''
    axios({
        method: 'POST',
        url: '/admin/showAdmin',
    })
        .then((result) => {
            // console.log(result.data)
            ele.add(new Option('请选择...', ''))
            for (let i = 0; i < result.data.msg.data.length; i++) {
                ele.add(new Option(result.data.msg.data[i].name, result.data.msg.data[i].name))
            }
            ele.value = ''
        })
        .catch((err) => {
            console.log(err)
        })
}
getAllOrganize(organization)

// 获取所有学院信息
function getAllCollage(ele) {
    ele.innerHTML = ''
    axios({
        method: 'POST',
        url: '/admin/selectCollege',
    })
        .then((result) => {
            // console.log(result.data.msg.data)
            ele.add(new Option('请选择...', ''))
            for(let i=0;i<result.data.msg.data.length;i++){
                ele.add(new Option(result.data.msg.data[i], result.data.msg.data[i]))
            }
            ele.value=''
        })
        .catch((err)=>{
            console.log(err)
        })
}
getAllCollage(positionAcademy)