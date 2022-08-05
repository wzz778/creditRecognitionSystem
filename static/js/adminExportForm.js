let adminExportFormCredit = document.getElementsByClassName('adminExportFormCredit')
let CreditsComposition = document.getElementById('CreditsComposition')
axios({
    method: 'GET',
    url: '/creditTypeOperate/showCreditType',
})
    .then((result) => {
        // console.log(result.data)
        CreditsComposition.innerHTML = ''
        for (let i = 0; i < result.data.msg.length; i++) {
            // CreditsComposition.add(new Option(result.data.msg[i].afirstLevel, result.data.msg[i].))
            CreditsComposition.add(new Option(result.data.msg[i].afirstLevel, result.data.msg[i].afirstLevel))
        }
        CreditsComposition.add(new Option('请选择...', ''))
        CreditsComposition.value = ''
    })
    .catch((err) => {
        // console.log(err)
    })

//声明一个变量用于记录返回的学分构成的结果
// 请求学分构成
let obj = {}
let addResult = document.getElementById('addResult')
let resultStr = `<td style="width: 30px; height: 38px;">序号</td>
<td class="dieWidthTwo">姓名</td>
<td class="dieWidth">学号</td>
<td class="dieWidthTwo">年级</td>
<td class="dieWidth">所在学院</td>
<td class="dieWidthTwo">所在班级</td>
</td>`
axios({
    method: 'GET',
    url: '/creditTypeOperate/showCreditType',
})
    .then((result) => {
        // console.log(result.data)
        obj = result.data.msg
        let str = ''
        for (let i = 0; i < result.data.msg.length; i++) {
            str += `<td class="dieWidth" style="height: 38px;">${result.data.msg[i].afirstLevel}</td>`
        }
        resultStr += str
        resultStr += `
        <td class="dieWidth">申请学分合计</td>
                    <td class="dieWidth">所在学院审核结果</td>
                    <td class="dieWidth">教务处认定结果</td>
                    <td class="dieWidthTwo">备注</td>
        `
        addResult.innerHTML = resultStr
        fn(obj)
    })
    .catch((err) => {
        console.log(err)
    })
// 获取申请表数据
let adminExportFormBottom = document.getElementsByClassName('adminExportFormBottom')
let usGrade = document.getElementById('usGrade')
let academy = document.getElementById('academy')
let usClass = document.getElementById('usClass')
let searchValue=document.getElementsByClassName('searchValue')
function fn(obj) {
    let sendResult = {}
    if (CreditsComposition.value != '') {
        sendResult.a_first_level = CreditsComposition.value
    }
    if (academy.value != '') {
        sendResult.academy = academy.value
    }
    if (usGrade.value != '') {
        var index = usGrade.selectedIndex; // 选中索引
        var text = usGrade.options[index].text;
        sendResult.grade = text
    }
    if (usClass.value != '') {
        sendResult.major_class = usClass.value
    }
    sendResult.flag = true
    // console.log(sendResult)
    axios({
        method: 'POST',
        url: '/showExcel',
        data: {
            sendResult: sendResult
        }
    })
        .then((result) => {
            // console.log(result.data)
            if (result.data.msg.data.length == 0) {
                swal('没有数据')
                return
            }
            // 渲染数据
            adminExportFormBottom[0].innerHTML = ''
            for (let i = 0; i < result.data.msg.data.length; i++) {
                let grade = result.data.msg.data[i].grade.split('-')[0]
                let str = ``
                for (let j = 0; j < obj.length; j++) {
                    let points = ''
                    if (result.data.msg.data[i].credit[obj[j].afirstLevel] != 0) {
                        points = result.data.msg.data[i].credit[obj[j].afirstLevel]
                    }
                    str += `<td class="dieWidth">${points}</td>`
                }
                let sumPoints=0
                if(result.data.msg.data[i].total_application!=null){
                    sumPoints=result.data.msg.data[i].total_application
                }
                adminExportFormBottom[0].innerHTML +=
                    `
                <table>
                    <tbody>
                        <td style="width: 30px;" data-tableexport-xlsxformatid="1">${i + 1}</td>
                        <td  class="dieWidthTwo" data-tableexport-xlsxformatid="1">${result.data.msg.data[i].name}</td>
                        <td class="dieWidth" data-tableexport-xlsxformatid="1">${result.data.msg.data[i].studentId}</td>
                        <td class="dieWidthTwo" data-tableexport-xlsxformatid="1">${grade}</td>
                        <td class="dieWidth">${result.data.msg.data[i].academic}</td>
                        <td class="dieWidthTwo">${result.data.msg.data[i].major_class}</td>
                        <!-- 存放学分类型的盒子 -->
                        <div class="adminExportFormCredit">
                            ${str}
                        </div>
                        <td class="dieWidth">${sumPoints}</td>
                        <td class="dieWidth">${result.data.msg.data[i].result_score}</td>
                        <td class="dieWidth"></td>
                        <td class="dieWidthTwo"></td>
                    </tbody>
                </tbody>
                `
            }
            // swal('查询成功')
        })
        .catch((err) => {
            console.log(err)
        })
}

let reserve = document.getElementById('reserve')
reserve.onclick = function () {
    // 将值清空
    CreditsComposition.value = ''
    academy.value = ''
    usGrade.value = ''
    usClass.value = ''
    fn(obj)
    swal('已重置')
}
let search = document.getElementById('search')
search.onclick = function () {
    let yn=false
    for(let i=0;i<searchValue.length;i++){
        if(searchValue[i].value!=''){
            yn=true
        }
    }
    if(!yn){
        swal('请选择要查询的内容')
        return
    }
    fn(obj)
    swal('查询成功')
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
            console.log(err)
            swal('网络错误')
        })
}

$("#download").click(function () {
    $("#export").tableExport({
        type: "xlsx",
        escape: "true",
        // Excel文件的名称
        fileName: "表格-创新创业学分表.xls",
    })
})