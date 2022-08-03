let content = document.getElementById('content')

let appendStr = ''
let hasStr = ''
// 判断是否是二级目录和三级目录都存在
let has = 0
let middle = document.getElementsByClassName('middle')
let loading = document.getElementById('loading')
middle[0].style.display = 'none'
loading.style.display = 'block'

axios({
    method: 'POST',
    url: '/getCreditsComposition',
})
    .then((result) => {
        // console.log(result.data)
        let resultStr = ''
        for (let i = 0; i < result.data.msg.length; i++) {
            if (has == 3) {
                if (result.data.msg[i] == hasStr) {
                    continue
                }
            }
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
                        // str3=''
                        yn = 0
                        // 判断是否有二级目录
                        if (result.msg[j].child == "下边没有指标了" && result.msg[j].b_points_available != 0) {
                            // console.log('结果',result.msg[j])
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
                            // yn = 2
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
                            // str3=''
                            // console.log('第一个str3',str3,yn)
                            if (str3) {
                                yn = 1
                            }
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
                            if (str3) {
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
                            // console.log('结果2',str2)
                            str3 = ''
                            // yn = 3
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
                            // console.log('结果',str3)
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
                            str3 = ''
                        }
                    }
                    // console.log(str3)
                    if (yn == 1) {
                        // console.log(str2)
                        // console.log(str3)
                        // 二级直接是指标
                        if (!str2) {
                            resultStr += `
                        <div class="creditItem">
                            ${str1}
                        <!-- 右边 -->
                        <div class="creditRight">
                            ${str3}
                        </div>
                    </div>
                    `
                            // str3 = ''
                        }
                        // console.log('结果',str3)
                        str3 = ''
                    }
                    //     if (yn == 3) {
                    //         // console.log('结果', str2)
                    //         if (str2) {
                    //             resultStr += `
                    //         <div class="creditItemDir">
                    //     <!-- 三级目录 -->
                    //     ${str1}
                    //     <!-- 右边 -->
                    //     <div class="">
                    //         <div class="creditRightDir">
                    //             ${str2}
                    //             <div class="DriContent">
                    //                ${str3}
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                    //     `
                    //         }
                    //         str3 = ''
                    //     }
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
                        str3 = ''
                    }
                })
        }
        // console.log(resultStr)
        setTimeout(() => {
            content.innerHTML = resultStr
            middle[0].style.display = 'block'
            loading.style.display = 'none'
        }, 1500)
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
function makepdf() {
    let com = confirm('您确定下载该psf表格?');
    if (com) {
        html2canvas(
            document.getElementById("schoolform"),
            {
                dpi: 172,//导出pdf清晰度
                onrendered: function (canvas) {
                    var contentWidth = canvas.width;
                    var contentHeight = canvas.height;

                    //一页pdf显示html页面生成的canvas高度;
                    var pageHeight = contentWidth / 592.28 * 841.89;
                    //未生成pdf的html页面高度
                    var leftHeight = contentHeight;
                    //pdf页面偏移
                    var position = 0;
                    //html页面生成的canvas在pdf中图片的宽高（a4纸的尺寸[595.28,841.89]）
                    var imgWidth = 595.28;
                    var imgHeight = 592.28 / contentWidth * contentHeight;

                    var pageData = canvas.toDataURL('image/jpeg', 1.0);
                    var pdf = new jsPDF('', 'pt', 'a4');

                    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                    //当内容未超过pdf一页显示的范围，无需分页
                    if (leftHeight < pageHeight) {
                        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                    } else {
                        while (leftHeight > 0) {
                            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                            leftHeight -= pageHeight;
                            position -= 841.89;
                            //避免添加空白页
                            if (leftHeight > 0) {
                                pdf.addPage();
                            }
                        }
                    }
                    pdf.save(`学分汇总表.pdf`);
                },
                //背景设为白色（默认为黑色）
                background: "#fff"
            })
    }
}