
// 添加认证范围
// function addCertification(event) {
//     event.parentElement.parentElement.innerHTML += `
//     <div class="addDirectoryChildItem addDirectoryChildChange">
//         认证范围:<input type="text" placeholder="请输入认证范围" />
//         学分:<input type="text" placeholder="请输入学分大小" />
//         </select>
//         <button class="addScopeCertification" onclick="addCertification(this)">添加</button>
//         <!-- 第一个不能取消 -->
//         <button class="cancel" onclick="removeEle(this)">取消</button>
//     </div>
//     `
// }
// 取消添加
function removeEle(event) {
    // 移除元素
    event.parentElement.remove()
}

// 没有子级目录的添加
function addNewIndicator(event) {
    let div = document.createElement('div')
    div.innerHTML = `
    <div class="CertificationItem">
            认证范围:<input type="text" placeholder="请输入认证范围" class='b_Indicator_name' />
            学分:<input type="text" placeholder="请输入学分大小" class='b_points_available' />
            <button class="addScopeCertification" onclick="addNewIndicator(this)">添加</button>
            <button class="cancel" onclick="removeEle(this)">取消</button>
            <div class='rules'>
                算分规则(选择后可在备注查看):
                <select class="creditRules" onchange="changeRules(this)">
                    <option value="">请选择...</option>
                    <option value="0">不是团队项目</option>
                    <option value="1">规则1</option>
                    <option value="2">规则2</option>
                    <option value="3">规则3</option>
                    <option value="4">规则4</option>
                    <option value="5">规则5</option>
                    <option value="6">规则6</option>
                </select>
            </div>
            <div class="remarksText">备注:
                <div class="remarksBottom">
                    <textarea class="b_remark"></textarea>
                </div>
            </div>
    </div>
    `
    event.parentElement.parentElement.append(div)
}
// 将学分构成数据请求过来
let CreditsComposition = document.getElementById('CreditsComposition')
// 渲染学分构成
axios({
    method: 'GET',
    url: '/creditTypeOperate/showCreditType',
})
    .then((result) => {
        CreditsComposition.add(new Option('请选择学分构成...', ''))
        for (let i = 0; i < result.data.msg.length; i++) {
            CreditsComposition.add(new Option(result.data.msg[i].afirstLevel, result.data.msg[i].aid))
        }
        // 添加或者修改,如果本地没有保存就是添加
        CreditsComposition.value = sessionStorage.getItem('skipAddAid') || ''
        getChild(CreditsComposition.value)
    })
    .catch((err) => {
        // console.log(err)
        swal('网络错误')
    })

CreditsComposition.onclick = function () {
    // 点击去查询子级目录如果没有显示没有子级目录
    getChild(CreditsComposition.value)
}
let childDir = document.getElementById('childDir')
// 渲染子目录数据
function getChild(id) {
    if (!id) {
        childDir.innerHTML = ''
        childDir.add(new Option('没有子级目录', ''))
        childDir.value = ''
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
            childDir.innerHTML = ''
            // console.log(result.data)
            if (result.data.msg == '下边没有指标了') {
                childDir.add(new Option('没有子级目录', ''))
                return
            }
            childDir.add(new Option('请选择子级目录...', ''))
            // 添加进自己目录里边
            let yn = false//默认没有目录
            for (let i = 0; i < result.data.msg.length; i++) {
                // 判断是不是目录
                if (!result.data.msg[i].b_points_available) {
                    yn = true
                    // 是目录
                    childDir.add(new Option(result.data.msg[i].b_Indicator_name, result.data.msg[i].b_id))
                }
            }
            // console.log(yn)
            if (!yn) {
                childDir.add(new Option('没有子级目录', ''))
            }
            childDir.value = ''
        })
        .catch((err) => {
            // console.log(err)
            swal('网络错误')
        })
}

// 添加指标
let sureAdd = document.getElementById('sureAdd')
let noDirectory = document.getElementsByClassName('noDirectory')
let reg = /^[+]{0,1}[1-9]\d*$|^[+]{0,1}(0\.\d*[1-9])$|^[+]{0,1}([1-9]\d*\.\d*[1-9])$/
sureAdd.onclick = function () {
    // 判断值是否为空
    if (CreditsComposition.value == '') {
        // 没有选择
        swal('请选择学分构成')
        return
    }
    let b_Indicator_name = document.getElementsByClassName('b_Indicator_name')
    let b_points_available = document.getElementsByClassName('b_points_available')
    let b_remark = document.getElementsByClassName('b_remark')
    let creditRules = document.getElementsByClassName('creditRules')
    let arrSend = []
    for (let i = 0; i < b_Indicator_name.length; i++) {
        // 判断是否全部为空
        if (b_Indicator_name[i].value != '' && b_points_available[i].value != '') {
            if (!reg.test(b_points_available[i].value)) {
                swal('请输入正确学分')
                return
            }
            if (/^[0-9]*$/.test(b_Indicator_name[i].value)) {
                swal('认证范围不能为纯数字')
                return
            }
            // 学分名和备注不能是纯空值
            if (b_Indicator_name[i].value.replace(/(^\s*)|(\s*$)/g, "") == "") {
                swal('指标名不能是空格')
                return
            }
            if (creditRules[i].value == '') {
                swal('请选择算分规则')
                return
            }
            if(creditRules[i].value==2&&Number(b_points_available[i].value)<=1){
                swal('该规则除主持人外，其他成员减一分，您输入的分数会造成申请学分为负数(请输入大于1的分数)')
                return
            }
            let name = b_Indicator_name[i].value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\s+/g, "")
            let remark=b_remark[i].value.replace(/</g,'&lt;').replace(/>/g,'&gt;')
            arrSend.push({ b_Indicator_name: name, b_points_available: Number(b_points_available[i].value), b_remark: remark, rule: creditRules[i].value })
        }
    }
    // console.log(arrSend)
    if (arrSend.length == 0) {
        // 没有传入数据
        swal('请输入要添加的数据')
        // console.log('没有传入数据')
        return
    }
    // 为其添加父类id
    if (childDir.value == '') {
        // 没有二级目录直接添加
        for (let i = 0; i < arrSend.length; i++) {
            arrSend[i].b_superior_id = Number(CreditsComposition.value)
            arrSend[i].b_first_level = Number(CreditsComposition.value)
            arrSend[i].b_Indicator_level = 2
        }
    } else {
        // 三级
        for (let i = 0; i < arrSend.length; i++) {
            arrSend[i].b_superior_id = Number(childDir.value)
            arrSend[i].b_first_level = Number(CreditsComposition.value)
            arrSend[i].b_Indicator_level = 3
        }
    }
    // console.log('传给后端的数据', arrSend)
    axios({
        method: 'POST',
        url: '/IndicatorOperate/addIndicator',
        data: {
            arrSend: arrSend
        }
    })
        .then((result) => {
            // console.log(result.data)
            if (result.data.err == 0) {
                swal('添加成功')
                // 将值清空
                CreditsComposition.value = ''
                childDir.value = ''
                noDirectory[0].innerHTML = `
                <div class="CertificationItem">
                        认证范围:<input type="text" placeholder="请输入认证范围" class='b_Indicator_name' />
                        学分:<input type="text" placeholder="请输入学分大小" class='b_points_available' />
                        <button class="addScopeCertification" onclick="addNewIndicator(this)">添加</button>
                        <div class='rules'>
                            算分规则(选择后可在备注查看):
                            <select class="creditRules" onchange="changeRules(this)">
                                <option value="">请选择...</option>
                                <option value="0">不是团队项目</option>
                                <option value="1">规则1</option>
                                <option value="2">规则2</option>
                                <option value="3">规则3</option>
                                <option value="4">规则4</option>
                                <option value="5">规则5</option>
                                <option value="6">规则6</option>
                            </select>
                        </div>
                        <div class="remarksText">备注:
                            <div class="remarksBottom">
                                <textarea class="b_remark"></textarea>
                            </div>
                        </div>
                </div>
                `
            } else {
                if (result.data.msg.msg) {
                    swal(result.data.msg.msg)
                    return
                }
                swal('添加失败，请重试')
            }
        })
        .catch((err) => {
            changeUserInfoFn(this)
            swal('网络错误')
            // console.log(err)
        })
}

let sureCancel = document.getElementById('sureCancel')
sureCancel.onclick = function () {
    window.location.href = 'adminCreditManagement'
}

function changeRules(event) {
    if (event.value == '') {
        event.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.value = ''
        return
    }
    if (event.value == 0) {
        // console.log(123)
        event.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.removeAttribute('readOnly')
        event.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.value = ''
        return
    }
    event.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.setAttribute('readOnly', 'true')
    event.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.value = remaarkArr[event.value]
}
let close=document.getElementById('close')
let flexedRule=document.getElementsByClassName('flexedRule')[0]
let watchRules=document.getElementById('watchRules')
close.onclick=function(){
    flexedRule.style.display='none'
    watchRules.style.display='inline'
}
watchRules.onclick=function(){
    flexedRule.style.display='block'
    watchRules.style.display='none'
}