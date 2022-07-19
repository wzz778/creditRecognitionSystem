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
choiceStuTea[0].onclick = function () {
    defaultYes.style.display = 'inline-block'
    yn = true
    defaultNo.style.display = 'none'
    studentInformation.style.display = 'block'
}
choiceStuTea[1].onclick = function () {
    defaultNo.style.display = 'inline-block'
    yn = false
    defaultYes.style.display = 'none'
    studentInformation.style.display = 'none'
}
// 点击input框或者选择框把提示文字隐藏
let inputAll = document.getElementsByTagName('input')
for (let i = 0; i < inputAll.length; i++) {
    inputAll[i].onclick = function () {
        inputAll[i].parentElement.lastElementChild.style.display = 'none'
    }
}
let selectAll = document.getElementsByTagName('select')
for (let i = 0; i < selectAll.length; i++) {
    selectAll[i].onclick = function () {
        selectAll[i].parentElement.lastElementChild.style.display = 'none'
    }
}



// 点击保存
let usName = document.getElementById('usName')
let account = document.getElementById('account')
let usPermission = document.getElementById('usPermission')
let usGrade = document.getElementById('usGrade')
let usCollege = document.getElementById('usCollege')
let usSpecialized = document.getElementById('usSpecialized')
let usClass = document.getElementById('usClass')
let Remarks = document.getElementById('Remarks')
let save = document.getElementById('save')
let cancel = document.getElementById('cancel')
let sex = document.getElementById('sex')

let organization = document.getElementById('organization')
let position = document.getElementById('position')
let OrganizationInformation = document.getElementById('OrganizationInformation')
let addOrganization = document.getElementById('addOrganization')
let cancelAddOrganization = document.getElementById('cancelAddOrganization')
addOrganization.onclick = function () {
    // console.log(1234)
    OrganizationInformation.style.display = 'grid'
    usPermission.value = '普通管理员'
}
cancelAddOrganization.onclick = function () {
    OrganizationInformation.style.display = 'none'
    usPermission.value = ''
}

// 限制账号,这里限制只能是数字
let accountTest = /^[0-9]*$/
save.onclick = function () {
    // console.log(yn)
    // 判断是否为空
    if (usName.value == '') {
        // 没填写用户名
        // usName.parentElement.lastElementChild.style.display = 'block'
        swal('请输入用户名')
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
    } else if (sex.value == '') {
        // sex.parentElement.lastElementChild.style.display = 'block'
        swal('请选择性别')
        return
    }
    if (yn) {
        // 看是否填写了年级，院系，专业等
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
    let obj = {
        name: usName.value,
        userName: account.value,
        power: usPermission.value,
        sex: sex.value
    }
    if (yn) {
        obj.grade = textGrade
        obj.academy = textusCollege
        obj.major_class = textusClass
    }
    if (OrganizationInformation.style.display == 'grid') {
        // 必须填组织信息
        if (organization.value == '' || position.value == '') {
            swal('请输入组织信息')
            return
        } else {
            obj.organization = organization.value
            obj.position = position.value
            obj.power = '普通管理员'
        }
    }
    // console.log(obj)
    // 发送数据
    axios({
        method: 'POST',
        url: '/admin/User',
        data: obj
    })
        .then((result) => {
            // console.log(result.data)
            if (result.data.err == -1) {
                // 将错误信息显示出来
                swal(result.data.msg)
                // msgHint.innerHTML=result.data.msg
                // popUps[2].style.display='block'
                // setTimeout(()=>{
                //     popUps[2].style.display='none'
                // },2000)
            } else {
                // popUps[0].style.display='block'
                // setTimeout(()=>{
                //     popUps[0].style.display='none'
                // },2000)
                swal('添加成功')
                // 清空数据
                for (let i = 0; i < inputAll.length; i++) {
                    inputAll[i].value = ''
                }
                for (let i = 0; i < selectAll.length; i++) {
                    selectAll[i].value = ''
                }
            }
        })
        .catch((err) => {
            // console.log(err)
            // 提示错误
            // popUps[1].style.display = 'block'
            // setTimeout(() => {
            //     popUps[1].style.display = 'none'
            // }, 2000)
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
    // 显示学院
    if (usGrade.value == '') {
        return
    }
    GetOtherLevel(usCollege, usGrade.value)
}
usCollege.onchange = function () {
    // 显示专业
    if (usCollege.value == '') {
        return
    }
    GetOtherLevel(usSpecialized, usCollege.value)
}
usSpecialized.onchange = function () {
    if (usSpecialized.value == '') {
        return
    }
    // 显示班级
    GetOtherLevel(usClass, usSpecialized.value)
}

// 渲染三级联动数据
// 1.创建三维数组
// var provinces = [];
// provinces["江苏省"] = ["南京市", "无锡市", "苏州市"]
// provinces["浙江省"] = ["杭州市", "宁波市"]
// provinces["安徽省"] = ["合肥市", "马鞍山市"]
// var citys = []
// citys["南京市"] = ["玄武区", "雨花台区", "鼓楼区", "秦淮区", "六合区"]
// citys["无锡市"] = ["滨湖区", "惠山区", "梁溪区"]
// citys["苏州市"] = ["姑苏区", "吴江区"]
// citys["杭州市"] = ["西湖区", "临安区", "上城区"]
// citys["宁波市"] = ["江北区", "江东区"]
// citys["合肥市"] = ["蜀山区", "瑶海区"]
// citys["马鞍山市"] = ["花山区", "雨山区"]
// for (province in provinces) {
//     usCollege.add(new Option(province, province))//省份下拉菜单
// }
// usCollege.onchange = function () {//省份下拉菜单内容改变时 执行的命令
//     var selectvalue = usCollege.value;//获取省份下拉菜单的值
//     usSpecialized.innerHTML = '<option value="">请选择专业......</option>'
//     usClass.innerHTML = ' <option value="">请选择班级......</option>'
//     for (provincename in provinces) {//遍历省份的名称z
//         if (provincename == selectvalue) {
//             for (cityname in provinces[provincename]) {//遍历城市名称
//                 usSpecialized.add(new Option(provinces[provincename][cityname], provinces[provincename][cityname]))
//             }
//         }
//     }
// }
// usSpecialized.onchange = function () {
//     usClass.innerHTML = ' <option value="">请选择班级......</option>'
//     var cityValue = usSpecialized.value
//     for (i in citys) {//i是area数组的索引值（城市名称）
//         if (i == cityValue) {
//             for (j in citys[i]) {
//                 usClass.add(new Option(citys[i][j], citys[i][j]));
//             }
//         }
//     }
// }
cancel.onclick=function(){
    window.location.href='/adminManageUsers'
}