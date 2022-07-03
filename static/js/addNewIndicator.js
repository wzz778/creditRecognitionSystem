// 添加目录
function addSubdirectory(event) {
    event.parentElement.parentElement.innerHTML += `<div class="subdirectoryItem">
            学分构成子级目录:<input type="text" placeholder="请输入学分构成子级目录" />
            <!-- 添加子级目录 -->
            <button id="addSubdirectory" onclick="addSubdirectory(this)">添加</button>
            <button class="cancel" onclick="removeEle(this)">取消</button>
            <div class="addDirectoryChildItem">
                认证范围:<input type="text" placeholder="请输入认证范围" />
                学分:<input type="text" placeholder="请输入学分大小" />
                </select>
                <button class="addScopeCertification" onclick="addCertification(this)">添加</button>
            </div>
        </div>`
}
// 添加认证范围
function addCertification(event) {
    event.parentElement.innerHTML += `
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
    event.parentElement.parentElement.innerHTML += `
    <div class="CertificationItem">
            认证范围:<input type="text" placeholder="请输入认证范围" />
            学分:<input type="text" placeholder="请输入学分大小" />
            <button class="addScopeCertification" onclick="addNewIndicator(this)">添加</button>
            <button class="cancel" onclick="removeEle(this)">取消</button>
        </div>
    `
}

// 点击确定是否有子级目录
let choice = document.getElementsByClassName('choice')
let ChoiceSty = document.getElementsByClassName('ChoiceSty')
let subdirectory = document.getElementsByClassName('subdirectory')[0]
let noDirectory = document.getElementsByClassName('noDirectory')[0]
// 定义一个变量用于判断是否有子级目录
let yn = false//false标识没有子级目录
choice[0].onclick = function () {
    ChoiceSty[0].style.display = 'inline-block'
    ChoiceSty[1].style.display = 'none'
    yn = true
    subdirectory.style.display = 'block'
    noDirectory.style.display = 'none'
}
choice[1].onclick = function () {
    ChoiceSty[1].style.display = 'inline-block'
    ChoiceSty[0].style.display = 'none'
    yn = false
    subdirectory.style.display = 'none'
    noDirectory.style.display = 'block'
}
// 切换学分构成需要判断切换的是否有下一级
let addOriginal = document.getElementById('addOriginal')
let choiceComposition = document.getElementById('choiceComposition')
let enterComposition = document.getElementById('enterComposition')
let cancelOriginal = document.getElementById('cancelOriginal')
addOriginal.onclick = function () {
    enterComposition.style.display = 'none'
    choiceComposition.style.display = 'inline-block'
    // 将学分构成渲染上去并判断是否有下一级
    judge(false)
}
cancelOriginal.onclick = function () {
    enterComposition.style.display = 'inline-block'
    choiceComposition.style.display = 'none'
    judge(true)
}
// 用户选择是否有子级目录
let choiceHaveChild = document.getElementsByClassName('choiceHaveChild')[0]
// 添加到指定目录里边选择子级目录
let choiceHasChild = document.getElementsByClassName('choiceHasChild')[0]

// 传false显示子级目录传true可以继续添加子级目录
function judge(yn) {
    // 有下一级
    if (yn) {
        // 将选择是否有下一级隐藏
        choiceHaveChild.style.display = 'block'
        choiceHasChild.style.display = 'none'
    } else {
        // 将选择是否有下一级显现
        choiceHaveChild.style.display = 'none'
        choiceHasChild.style.display = 'block'
    }
}