// 添加认证范围
function addCertification(event) {
    event.parentElement.parentElement.innerHTML += `
    <div class="addDirectoryChildItem addDirectoryChildChange">
        认证范围:<input type="text" placeholder="请输入认证范围" />
        学分:<input type="text" placeholder="请输入学分大小" />
        </select>
        <button class="addScopeCertification" onclick="addCertification(this)">添加</button>
        <!-- 第一个不能取消 -->
        <button class="cancel" onclick="removeEle(this)">取消</button>
    </div>
    `
}
// 取消添加
function removeEle(event) {
    // 移除元素
    event.parentElement.remove()
}

// 没有子级目录的添加
function addNewIndicator(event) {
    let div=document.createElement('div')
    div.innerHTML=`
    <div class="CertificationItem">
            认证范围:<input type="text" placeholder="请输入认证范围" class='b_Indicator_name' />
            学分:<input type="text" placeholder="请输入学分大小" class='b_points_available' />
            <button class="addScopeCertification" onclick="addNewIndicator(this)">添加</button>
            <button class="cancel" onclick="removeEle(this)">取消</button>
            <div class="remarksText">备注:
                <div class="remarksBottom">
                    <textarea class="b_remark"></textarea>
                </div>
            </div>
    </div>
    `
    event.parentElement.parentElement.append(div)
    // event.parentElement.parentElement.innerHTML += `
    // <div class="CertificationItem">
    //         认证范围:<input type="text" placeholder="请输入认证范围" class='b_Indicator_name' />
    //         学分:<input type="text" placeholder="请输入学分大小" class='b_points_available' />
    //         <button class="addScopeCertification" onclick="addNewIndicator(this)">添加</button>
    //         <button class="cancel" onclick="removeEle(this)">取消</button>
    //         <div class="remarksText">备注:
    //             <div class="remarksBottom">
    //                 <textarea class="b_remark"></textarea>
    //             </div>
    //         </div>
    // </div>
    // `
}
// 将学分构成数据请求过来
let CreditsComposition = document.getElementById('CreditsComposition')
axios({
    method: 'GET',
    url: '/creditTypeOperate/showCreditType',
})
    .then((result) => {
        for (let i = 0; i < result.data.msg.length; i++) {
            CreditsComposition.add(new Option(result.data.msg[i].afirstLevel, result.data.msg[i].aid))
        }
        CreditsComposition.value = sessionStorage.getItem('skipAddAid') || result.data.msg[0].aid
    })
    .catch((err) => {
        console.log(err)
    })

CreditsComposition.onclick = function () {
    // 点击去查询子级目录如果没有显示没有子级目录
    getChild(CreditsComposition.value)
}
let childDir = document.getElementById('childDir')
function getChild(id) {
    if (!id) {
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
            // 添加进自己目录里边
        })
        .catch((err) => {
            console.log(err)
        })
}

// 添加指标
let sureAdd = document.getElementById('sureAdd')
sureAdd.onclick = function () {
    // 判断值是否为空
    if (CreditsComposition.value == '') {
        // 没有选择
        console.log('没有选择学分构成')
        return
    }
    let b_Indicator_name = document.getElementsByClassName('b_Indicator_name')
    let b_points_available = document.getElementsByClassName('b_points_available')
    let b_remark = document.getElementsByClassName('b_remark')
    let arrSend = []
    for (let i = 0; i < b_Indicator_name.length; i++) {
        // 判断是否全部为空
        if (b_Indicator_name[i].value != '' && b_points_available[i].value != '') {
            if (b_remark[i].value == '') {
                arrSend.push({ b_Indicator_name: b_Indicator_name[i].value, b_points_available: Number(b_points_available[i].value) })
            } else {
                arrSend.push({ b_Indicator_name: b_Indicator_name[i].value, b_points_available: Number(b_points_available[i].value), b_remark: b_remark[i].value })
            }
        }
    }
    if (arrSend.length == 0) {
        // 没有传入数据
        console.log('没有传入数据')
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
    console.log('传给后端的数据', arrSend)
    axios({
        method: 'POST',
        url: '/IndicatorOperate/addIndicator',
        data: {
            arrSend: arrSend
        }
    })
        .then((result) => {
            console.log(result.data)
        })
        .catch((err) => {
            console.log(err)
        })

}
