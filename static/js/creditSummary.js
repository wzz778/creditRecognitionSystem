let content = document.getElementById('content')

// 获取一级数据
axios({
    method: 'GET',
    url: '/getCreditsComposition',
})
    .then((result) => {
        // console.log(result.data)
        let resultStr = ''
        for (let i = 0; i < result.data.msg.length; i++) {
            let yn = 0
            // 存储一级目录数据
            let str1 = ''
            // 存放二级目录数据
            let str2 = ''
            // 存放三级指标数据
            let str3 = ''

            str1 = `<div class="creditLeft">${result.data.msg[i].afirstLevel}</div>`
            // 请求下一级数据
            getAllDir(result.data.msg[i].aid)
                .then((result) => {
                    // console.log(result)
                    for (let j = 0; j < result.msg.length; j++) {
                        // 判断是否有二级目录
                        if (result.msg[j].child == "下边没有指标了" && result.msg[j].b_points_available != 0) {
                            console.log(result.msg[j])
                            yn = 1
                            // 不是目录是指标
                            str3 += `
                        <ul>
                            <li>${result.msg[j].b_Indicator_name}</li>
                            <li>${result.msg[j].b_points_available}</li>
                            <li>${result.msg[j].b_remark}</li>
                        </ul>
                        `
                        } else if (result.msg[j].child == '下边没有指标了' && result.msg[j].b_points_available == 0) {
                            // console.log(result.msg[j])
                            // 是目录但是目录下没有指标
                            yn=2
                            resultStr += `
                            <div class="creditItemDir">
                                <!-- 三级目录 -->
                                ${str1}
                                <!-- 右边 -->
                                <div class="">
                                    <div class="creditRightDir">
                                        <span class="dirSty">${result.msg[j].b_Indicator_name}</span>
                                        <div class="DriContent">
                                            <ul>
                                                <li>该目录没有指标</li>
                                                <li>该目录没有指标</li>
                                                <li>该目录没有指标</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                        } else if (result.msg == "没有指标信息") {
                            // 没有指标信息
                            // console.log(1)
                            yn = 4
                            str3 = `
                        <ul>
                            <li>没有指标信息</li>
                            <li>没有指标信息</li>
                            <li>没有指标信息</li>
                        </ul>
                        `
                        } else {
                            yn = 3
                            // 是目录且有指标
                            // str2 += ` <span class="dirSty">${result.msg[j].b_Indicator_name}</span>`
                            // 循环遍历三级目录
                            // console.log(result.msg[j].child)
                            for (let v = 0; v < result.msg[j].child.length; v++) {
                                str3 += `
                                <ul>
                                    <li>${result.msg[j].child[v].b_Indicator_name}</li>
                                    <li>${result.msg[j].child[v].b_points_available}</li>
                                    <li>${result.msg[j].child[v].b_remark}</li>
                                </ul>
                            `
                            }
                            resultStr += `
                            <div class="creditItemDir">
                        <!-- 三级目录 -->
                        ${str1}
                        <!-- 右边 -->
                        <div class="">
                            <div class="creditRightDir">
                                 <span class="dirSty">${result.msg[j].b_Indicator_name}</span>
                                <div class="DriContent">
                                   ${str3}
                                </div>
                            </div>
                        </div>
                    </div>
                        `
                        str3=''
                        }
                    }
                    if (yn == 1) {
                        // 二级直接是指标
                        resultStr += `
                    <div class="creditItem">
                        ${str1}
                    <!-- 右边 -->
                    <div class="creditRight">
                        ${str3}
                    </div>
                </div>
                    `
                    // console.log('结果',str3)
                    }
                    if (yn == 2) {
                        console.log(11);
                    }
                    if (yn == 3) {
                        resultStr += `
                        <div class="creditItemDir">
                    <!-- 三级目录 -->
                    ${str1}
                    <!-- 右边 -->
                    <div class="">
                        <div class="creditRightDir">
                            ${str2}
                            <div class="DriContent">
                               ${str3}
                            </div>
                        </div>
                    </div>
                </div>
                    `
                    }
                    if (yn == 4) {
                        resultStr += `
                    <div class="creditItem">
                            ${str1}
                        <!-- 右边 -->
                        <div class="creditRight">
                            ${str3}
                        </div>
                    </div>
                        `
                    }
                })
        }
        setTimeout(() => {
            // console.log(resultStr)
            content.innerHTML = resultStr
        }, 1000)
    })
    .catch((err) => {
        console.log(err)
    })

// 包装的请求二级目录函数
function getAllDir(id) {
    return new Promise((resolve, resject) => {
        axios({
            method: 'POST',
            url: '/IndicatorOperate/showIndicator',
            data: {
                id: id
            }
        })
            .then((result) => {
                // console.log(result.data)
                resolve(result.data)
            })
            .catch((err) => {
                resject(err)
            })
    })
}

// 请求所有数据看那些是既有二级的指标又有三级的指标
