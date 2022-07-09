let adminExportFormCredit = document.getElementsByClassName('adminExportFormCredit')
//声明一个变量用于记录返回的学分构成的结果
// 请求学分构成
axios({
    method: 'GET',
    url: '/creditTypeOperate/showCreditType',
})
    .then((result) => {
        // console.log(result.data)
        adminExportFormCredit[0].innerHTML = ''
        let obj = result.data.msg
        for (let i = 0; i < result.data.msg.length; i++) {
            adminExportFormCredit[0].innerHTML += `
                <li class="dieWidth">${result.data.msg[i].afirstLevel}</li>
            `
        }
        fn(obj)
    })
    .catch((err) => {
        console.log(err)
    })
// 获取申请表数据
let adminExportFormBottom = document.getElementsByClassName('adminExportFormBottom')
function fn(obj) {
    axios({
        method: 'GET',
        url: '/show_excel',
    })
        .then((result) => {
            console.log(result.data)
            // 渲染数据
            adminExportFormBottom[0].innerHTML = ''
            for (let i = 0; i < result.data.msg.data.length; i++) {
                let grade = result.data.msg.data[i].grade.split('-')[0]
                // console.log(grade)
                // console.log(result.data.msg.data[i].credit)
                // console.log(obj)
                let str = ``
                for (let j = 0; j <obj.length; j++) {
                    let points = ''
                    if (result.data.msg.data[i].credit[obj[j].afirstLevel] != null) {
                        points = result.data.msg.data[i].credit[obj[j].afirstLevel]
                    }
                    str += `<li class="dieWidth">${points}</li>`
                }
                // console.log(str)
                adminExportFormBottom[0].innerHTML+=
                `
                <ul>
                    <li style="width: 30px;">${i+1}</li>
                    <li  class="dieWidthTwo">${result.data.msg.data[i].name}</li>
                    <li class="dieWidth">${result.data.msg.data[i].studentId}</li>
                    <li class="dieWidthTwo">${grade}</li>
                    <li class="dieWidth">${result.data.msg.data[i].academic}</li>
                    <li class="dieWidthTwo">${result.data.msg.data[i].major_class}</li>
                    <!-- 存放学分类型的盒子 -->
                    <div class="adminExportFormCredit">
                        ${str}
                    </div>
                    <li class="dieWidth">${result.data.msg.data[i].total_application}</li>
                    <li class="dieWidth">${result.data.msg.data[i].result_score}</li>
                    <li class="dieWidth"></li>
                    <li class="dieWidthTwo"></li>
                </ul>
                `

            }
        })
        .catch((err) => {
            console.log(err)
        })
}