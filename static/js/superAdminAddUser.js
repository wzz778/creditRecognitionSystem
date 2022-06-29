// 点击是否选择学生的信息
let studentInformation = document.getElementsByClassName('studentInformation')[0]
let choiceStuTea = document.getElementsByClassName('choiceStuTea')
let defaultYes = document.getElementById('defaultYes')
let defaultNo = document.getElementById('defaultNo')
choiceStuTea[0].onclick = function () {
    defaultYes.style.display = 'inline-block'
    defaultNo.style.display = 'none'
    studentInformation.style.display = 'block'
}
choiceStuTea[1].onclick = function () {
    defaultNo.style.display = 'inline-block'
    defaultYes.style.display = 'none'
    studentInformation.style.display = 'none'
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
// 限制账号,这里限制只能是数字
let accountTest = /^[0-9]*$/
save.onclick = function () {
    // 判断是否为空
    if (usName.value == '') {
        usName.parentElement.lastElementChild.style.display = 'block'
    } else if (account.value == '' || !accountTest.test(account.value)) {
        account.parentElement.lastElementChild.style.display = 'block'
    } else if (usGrade.value == '') {
        usGrade.parentElement.lastElementChild.style.display = 'block'
    } else if (usCollege.value == '') {
        usCollege.parentElement.lastElementChild.style.display = 'block'
    } else if (usSpecialized.value == '') {
        usSpecialized.parentElement.lastElementChild.style.display = 'block'
    } else if (usClass.value == '') {
        usClass.parentElement.lastElementChild.style.display = 'block'
    } else {
        // 发送数据
    }
}


// 渲染三级联动数据
// 1.创建三维数组
var provinces = [];
provinces["江苏省"] = ["南京市", "无锡市", "苏州市"]
provinces["浙江省"] = ["杭州市", "宁波市"]
provinces["安徽省"] = ["合肥市", "马鞍山市"]

var citys = []
citys["南京市"] = ["玄武区", "雨花台区", "鼓楼区", "秦淮区", "六合区"]
citys["无锡市"] = ["滨湖区", "惠山区", "梁溪区"]
citys["苏州市"] = ["姑苏区", "吴江区"]
citys["杭州市"] = ["西湖区", "临安区", "上城区"]
citys["宁波市"] = ["江北区", "江东区"]
citys["合肥市"] = ["蜀山区", "瑶海区"]
citys["马鞍山市"] = ["花山区", "雨山区"]

// axios.get('/getthreeLevel')
//     .then((result) => {
//         let xueyuan = result.data.provinces
//         for (province in xueyuan) {
//             usCollege.add(new Option(xueyuan[province], xueyuan[province]))//省份下拉菜单
//         }
//         usCollege.onchange = function () {//省份下拉菜单内容改变时 执行的命令
//             var selectvalue = usCollege.value;//获取省份下拉菜单的值
//             usSpecialized.innerHTML = '<option value="">请选择专业......</option>'
//             usClass.innerHTML = ' <option value="">请选择班级......</option>'
//             for (provincename in xueyuan) {//遍历省份的名称
//                 if (provincename == selectvalue) {
//                     for (cityname in xueyuan[provincename]) {//遍历城市名称
//                         usSpecialized.add(new Option(xueyuan[provincename][cityname], xueyuan[provincename][cityname]))
//                     }
//                 }
//             }
//         }
//         usSpecialized.onchange = function () {
//             usClass.innerHTML = ' <option value="">请选择班级......</option>'
//             var cityValue = usSpecialized.value
//             for (i in citys) {//i是area数组的索引值（城市名称）
//                 if (i == cityValue) {
//                     for (j in citys[i]) {
//                         usClass.add(new Option(citys[i][j], citys[i][j]));
//                     }
//                 }
//             }
//         }
//     })
//     .catch((err) => {
//         console.log(err)
//     })

for (province in provinces) {
    usCollege.add(new Option(province, province))//省份下拉菜单
}
usCollege.onchange = function () {//省份下拉菜单内容改变时 执行的命令
    var selectvalue = usCollege.value;//获取省份下拉菜单的值
    usSpecialized.innerHTML = '<option value="">请选择专业......</option>'
    usClass.innerHTML = ' <option value="">请选择班级......</option>'
    for (provincename in provinces) {//遍历省份的名称z
        if (provincename == selectvalue) {
            for (cityname in provinces[provincename]) {//遍历城市名称
                usSpecialized.add(new Option(provinces[provincename][cityname], provinces[provincename][cityname]))
            }
        }
    }
}
usSpecialized.onchange = function () {
    usClass.innerHTML = ' <option value="">请选择班级......</option>'
    var cityValue = usSpecialized.value
    for (i in citys) {//i是area数组的索引值（城市名称）
        if (i == cityValue) {
            for (j in citys[i]) {
                usClass.add(new Option(citys[i][j], citys[i][j]));
            }
        }
    }
}