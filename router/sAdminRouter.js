const express = require('express')
const router = express.Router()
const qs = require('qs')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const multipart = require('connect-multiparty')
const FormData = require('form-data')
const fs = require('fs')
const { log } = require('console')
const { send } = require('process')
const { url } = require('inspector')
var mult = multipart()

// 请求页面
// 添加用户 !
router.get('/superAdminAdd', (req, res) => {
    res.render('superAdminAddUser.html')
})
// 提交历史记录 !(删除功能)
router.get('/adminHistory', (req, res) => {
    res.render('adminHistory.html')
})
// 查看申请表 ! 
/* 
    超级管理员查看的申请表是通过普通管理员的审核的申请表而这个返回的信息是所有的(包含通过不通过)
    导出学长发到那个图片样式的还没有接口(点击这个页面中的导出跳转至学长发的图片那个完整的页面)
*/
router.get('/adminWatchApplication', (req, res) => {
    res.render('adminWatchApplication.html')
})
// 管理用户 !
router.get('/adminManageUsers', (req, res) => {
    res.render('adminManageUsers.html')
})
// 学分构成管理 !(分类查询)
router.get('/adminCreditManagement', (req, res) => {
    res.render('adminCreditManagement.html')
})
// 添加学分构成
router.get('/addNewIndicator', (req, res) => {
    res.render('addNewIndicator.html')
})
axios.defaults.baseURL = 'http://110.40.205.103:8099'

// 解析kwt函数
// 查看历史记录
router.post('/admin/records', (req, res) => {
    if (!jwt.decode(req.session.token)) {
        res.send({ err: -1, msg: '用户身份非法' })
        return
    }
    let { nodePage, pageSize, beginDate, endDate, approval_status } = req.body
    let obj = {}
    obj.nodePage = nodePage
    obj.pageSize = pageSize
    if (beginDate) {
        obj.beginDate = beginDate
    }
    if (endDate) {
        obj.endDate = endDate
    }
    if (approval_status) {
        obj.approval_status = approval_status
    }
    // 请求后端接口
    axios({
        method: 'GET',
        url: '/admin/records',
        params: obj,
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            // console.log(result.data)
            res.send({ err: 0, msg: result.data.data.pageInfo, allPage: result.data.data.allPages,allRecords:result.data.data.allRecords})
        })
        .catch((err) => {
            res.send({ err: -1, msg: '网络错误' })
        })

})
// 查看申请表
router.post('/admin/application', (req, res) => {
    if (!jwt.decode(req.session.token)) {
        res.send({ err: -1, msg: '用户身份非法' })
        return
    }
    // 页数，每页几条，院系，审核状态，指标名，指标分数，开始时间,结束时间，专业
    let { nodePage, pageSize, academy, approval_status, b_Indicator_name, b_points_available, beginDate, endDate, major_class } = req.body
    // 判断是否传值
    let obj = {}
    obj.pageSize = pageSize
    obj.nodePage = nodePage
    if (academy) {
        obj.academy = academy
    }
    if (approval_status) {
        obj.approval_status = approval_status
    }
    if (b_Indicator_name) {
        obj.b_Indicator_name = b_Indicator_name
    }
    if (b_points_available) {
        obj.b_points_available = b_points_available
    }
    if (beginDate) {
        obj.beginDate = beginDate
    }
    if (endDate) {
        obj.endDate = endDate
    }
    if (major_class) {
        obj.major_class = major_class
    }
    axios({
        method: 'GET',
        url: '/admin/application',
        params: obj,
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            console.log(result.data)
            res.send({ err: 0, msg: result.data.data.pageInfo, AllPages: result.data.data.allPage })
        })
        .catch((err) => {
            res.send({ err: -1, msg: '错误' })
        })
})
// 添加用户
router.post('/admin/User', (req, res) => {
    // 判断是否合法
    if (!jwt.decode(req.session.token)) {
        res.send({ err: -1, msg: '用户身份非法' })
        return
    }
    let { name, userName, power, sex, grade, academy, major_class } = req.body
    // 传数据
    axios({
        method: 'POST',
        url: '/admin/User',
        params: {
            name: name,
            userName: userName,
            power: power,
            sex: sex,
            grade: grade,
            academy: academy,
            major_class: major_class
        },
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            if (result.data.msg == 'OK') {
                res.send({ err: 0, msg: result.data })
            } else {
                // 没请求成功
                res.send({ err: -1, msg: result.data.msg })
            }
        })
        .catch((err) => {
            res.send({ err: -1, msg: '错误' })
        })
})
// 查询所有学分构成
router.get('/creditTypeOperate/showCreditType', (req, res) => {
    if (!jwt.decode(req.session.token)) {
        res.send({ err: -1, msg: '用户身份非法' })
        return
    }
    axios({
        method: 'GET',
        url: '/creditTypeOperate/showCreditType',
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            res.send({ err: 0, msg: result.data.data })
        })
        .catch((err) => {
            res.send('错误')
        })
})

// 用户管理
router.post('/admin/getUserByClass', (req, res) => {
    // if (!jwt.decode(req.session.token)) {
    //     res.send({ err: -1, msg: '用户身份非法' })
    //     return
    // }
    let { beginIndex, size, academy, name, major_class, sex, power, userName } = req.body
    let obj = {}
    obj.beginIndex = beginIndex
    obj.size = size
    if (academy) {
        obj.academy = academy
    }
    if (name) {
        obj.name = name
    }
    if (major_class) {
        obj.major_class = major_class
    }
    if (sex) {
        obj.sex = sex
    }
    if (power) {
        obj.power = power
    }
    if (userName) {
        obj.userName = userName
    }
    axios({
        method: 'GET',
        url: '/admin/getUserByClass',
        params: obj,
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            if (result.data.msg == 'OK') {
                res.send({ err: 0, msg: result.data.data.records, total: result.data.data.total, page: result.data.data.pages })
            } else {
                res.send({ err: -1, msg: result.data.msg })
            }
        })
        .catch((err) => {
            res.send({ err: -1, msg: '网络错误' })
        })
})
// 删除用户
router.post('/admin/delete.doUserInfo', (req, res) => {
    if (!jwt.decode(req.session.token)) {
        res.send({ err: -1, msg: '用户身份非法' })
        return
    }
    let idArray = req.body.idArray
    axios({
        method: 'DELETE',
        url: '/admin/delete.doUserInfo',
        params: {
            user: idArray
        },
        headers: {
            token: req.session.token
        }
    }).then((result) => {
        if (result.data.msg == 'OK') {
            res.send({ err: 0, msg: '删除成功' })
        } else {
            res.send({ err: -1, msg: '删除失败请重试' })
        }
    })
        .catch((err) => {
            res.send({ err: -1, msg: '网络错误' })
        })
})
// 批量删除用户
router.post('/delAllUser', (req, res) => {
    if (!jwt.decode(req.session.token)) {
        res.send({ err: -1, msg: '用户身份非法' })
        return
    }
    let user = req.body.arrId
    let urlStr = `http://110.40.205.103:8099/admin/delete.doUserInfo?user=${user[0]}`
    for (let i = 1; i < user.length; i++) {
        urlStr += `&user=${user[i]}`
    }
    axios.delete(urlStr, {
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            if (result.data.msg == 'OK') {
                res.send({ err: 0, msg: '删除成功' })
            } else {
                res.send({ err: -1, msg: '删除失败请重试' })
            }
        })
        .catch((err) => {
            res.send({ err: -1, msg: '网络错误' })
        })
})

// 获取学分构成的指标
router.get('/IndicatorOperate/showAllIndicator', (req, res) => {
    // 请求所有指标
    if (!jwt.decode(req.session.token)) {
        res.send({ err: -1, msg: '用户身份非法' })
        return
    }
    axios({
        method: 'GET',
        url: '/IndicatorOperate/showAllIndicator',
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            if (result.data.msg == 'OK') {
                res.send({ err: 0, msg: result.data.data })
            } else {
                res.send({ err: -1, msg: '删除失败请重试' })
            }
        })
        .catch((err) => {
            res.send({ err: -1, msg: '网络错误' })
        })
})

router.get('/getCreditsComposition', (req, res) => {
    axios({
        method: 'GET',
        url: '/creditTypeOperate/showCreditType',
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            if (result.data.msg == 'OK') {
                res.send({ err: 0, msg: result.data.data })
            } else {
                // 没请求成功
                res.send({ err: -1, msg: result.data.msg })
            }
        })
        .catch((err) => {
            res.send({ err: -1, msg: '网络错误' })
        })
})

// 封装的循环发送数据的函数
function fn(id, req, sendResult) {
    return new Promise((resolve, resject) => {
        axios({
            method: 'GET',
            url: '/IndicatorOperate/showIndicator',
            params: {
                id: sendResult.b_id,
                level: 2
            },
            headers: {
                token: req.session.token
            }
        })
            .then((result) => {
                sendResult.child = result.data.data
                resolve(sendResult)
            })
            .catch((err) => {
                resject('错误')
            })
    })
}

// 封装获取元素的函数
function getInfo(sendResult, req) {
    return new Promise((resolve, resject) => {
        for (let i = 0; i < sendResult.length; i++) {
            fn(sendResult[i].b_id, req)
                .then((result) => {
                    // 接收数据
                    if (result != '下边没有指标了') {
                        sendResult[i].child = result
                    } else {
                        sendResult[i].child = 'no'
                    }
                })
                .catch((err) => {
                    resject('错误')
                })
        }
        resolve(sendResult)
    })
}

// 通过学分构成获得其子级目录及学分构成
router.post('/IndicatorOperate/showIndicator', (req, res) => {
    let { id } = req.body
    axios({
        method: 'GET',
        url: '/IndicatorOperate/showIndicator',
        params: {
            id: id,
            level: 1
        },
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            let sendResult = result.data.data
            if (sendResult == '下边没有指标了') {
                res.send({ err: 0, msg: '没有指标信息' })
                return
            }
            // 去遍历每一个元素是否有下一级
            let sendArr = []
            for (let i = 0; i < sendResult.length; i++) {
                sendArr[i] = fn(id, req, sendResult[i])
            }
            Promise.all(sendArr)
                .then((result) => {
                    res.send({ err: 0, msg: sendResult })
                })
                .catch((err) => {
                    throw new Promise(err)
                })
        })
        .catch((err) => {
            res.send({ err: -1, msg: '网络错误' })
        })
})

// 获取学分构成的子级目录
router.post('/child', (req, res) => {
    let { id } = req.body
    axios({
        method: 'GET',
        url: '/IndicatorOperate/showIndicator',
        params: {
            id: id,
            level: 1
        },
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            if (result.data.msg == 'OK') {
                // 判断是否有子级目录
                res.send({ err: 0, msg: result.data.data })
            }
        })
        .catch((err) => {
            res.send({ err: -1, msg: '网络错误' })
        })
})
// 封装的添加二级目录的信息
function addSecondDir(req, b_first_level, resultData) {
    return new Promise((resolve, resject) => {
        let sendArr = []
        for (let i = 0; i < resultData.length; i++) {
            sendArr.push({ b_Indicator_level: 2, b_Indicator_name: resultData[i], b_superior_id: b_first_level, b_first_level: b_first_level })
        }
        axios({
            method: 'POST',
            url: '/IndicatorOperate/addIndicator',
            data: sendArr,
            headers: {
                token: req.session.token,
                'Content-Type': 'application/json'
            }
        })
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                resject(err)
            })
    })
}

// 添加学分构成及其子目录
router.post('/addCreditAll', (req, res) => {
    // 添加身份判断
    let { AFirstLevel, resultData } = req.body
    // 添加学分构成
    axios({
        method: 'POST',
        url: '/creditTypeOperate/addCreditType',
        params: {
            AFirstLevel: AFirstLevel
        },
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            return addSecondDir(req, result.data.data, resultData)
        })
        .then((result)=>{
            res.send({err:0,msg:result.data})
        })
        .catch((err) => {
            res.send({ err: -1, msg: '网络错误' })
        })
})

// 添加认定范围
router.post('/IndicatorOperate/addIndicator', (req, res) => {
    let { arrSend } = req.body
    axios({
        method: 'POST',
        url: '/IndicatorOperate/addIndicator',
        data: arrSend,
        headers: {
            token: req.session.token,
            'Content-Type': 'application/json'
        }
    })
        .then((result) => {
            res.send({ err: 0, msg: result.data })
        })
        .catch((err) => {
            res.send({ err: -1, msg: '网络错误' })
        })

})

// 多文件上传(node接口)
router.post('/fileUplo', mult, (req, res) => {
    let formdata = new FormData()
    for (let a in req.files) {
        formdata.append('file', fs.createReadStream(req.files[a].path), req.files[a].originalFilename)//第二个参数试上传的文件名
    }
    formdata.append('enclosure_name', '测试')
    formdata.append(' application_id', 15)
    // formdata.append('addres')
    let { data } = req.body;
    axios({
        method: 'POST',
        url: 'http://110.40.205.103:8099/user/photo',
        data: formdata,
        // headers: formdata.getHeaders(),
        headers: {
            token: req.session.token,
            formdata: formdata.getHeaders(),
            maxBodyLength: 1000000000
        }
    })
        .then((result) => {
            res.send({ err: 0, msg: result.data })
        })
        .catch((err) => {
            res.send({ err: -1, msg: err })
        })
})

// 删除指标(多个)
router.post('/IndicatorOperate/deleteIndicator', (req, res) => {
    let { arrId } = req.body
    let urlStr = `http://110.40.205.103:8099/IndicatorOperate/deleteIndicator?ids=${arrId[0]}`
    for (let i = 1; i < arrId.length; i++) {
        urlStr += `&ids=${arrId[i]}`
    }
    axios.delete(urlStr, {
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            if (result.data.msg == 'OK') {
                res.send({ err: 0, msg: result.data.data })
            } else {
                // 没请求成功
                res.send({ err: -1, msg: result.data.msg })
            }
        })
        .catch((err) => {
            res.send({ err: -1, msg: err })
        })
})

// 删除学分构成
router.post('/creditTypeOperate/deleteCreditType', (req, res) => {
    let { ids } = req.body
    let urlStr = `http://110.40.205.103:8099/creditTypeOperate/deleteCreditType?ids=${ids}`
    axios({
        method: 'DELETE',
        url: urlStr,
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            if (result.data.msg == 'OK') {
                res.send({ err: 0, msg: result.data.data })
            } else {
                // 没请求成功
                res.send({ err: -1, msg: result.data.msg })
            }
        })
        .catch((err) => {
            res.send({ err: -1, msg: err })
        })
})

// 修改二级目录
router.post('/changeTwoDir',(req,res)=>{
    let {b_id,b_Indicator_name,b_superior_id,b_first_level}=req.body
    axios({
        method:'PUT',
        url:'/IndicatorOperate/updateIndicator',
        params:{
            b_id:b_id,
            b_Indicator_name:b_Indicator_name,
            b_superior_id:b_superior_id,
            b_first_level:b_first_level,
            id:0
        },
        headers:{
            token:req.session.token
        }
    })
    .then((result)=>{
        res.send({err:0,msg:result.data})
    })
    .catch((err)=>{
        res.send({err:-1,msg:err})
    })
})

// 修改学分构成
router.post('/creditTypeOperate/updateCreditType',(req,res)=>{
    axios({
        method:'PUT',
        url:'/creditTypeOperate/updateCreditType',
        params:req.body,
        headers:{
            token:req.session.token
        }
    })
    .then((result)=>{
        if(result.data.msg=='OK'){
            res.send({err:0,msg:result.data})
        }else{
            res.send({err:-1,msg:result.data})
        }
    })
    .catch((err)=>{
        res.send({err:-1,msg:err})
    })
})

// 修改指标信息
router.post('/changeIndicator',(req,res)=>{
    let {sendArr}=req.body
    axios({
        method:'PUT',
        url:'/IndicatorOperate/updateIndicator',
        params:sendArr,
        headers:{
            token:req.session.token
        }
    })
    .then((result)=>{
        res.send({err:0,msg:result.data})
    })
    .catch((err)=>{
        res.send({err:-1,msg:err})
    })
})

// 修改用户信息
router.post('/admin/update.do.userInfo',(req,res)=>{
    let {obj}=req.body
    axios({
        method:'PUT',
        url:'/admin/update.do.userInfo',
        params:obj,
        headers:{
            token:req.session.token
        }
    })
    .then((result)=>{
        console.log('修改用户信息',result.data)
        if(result.data.msg=='OK'){
            res.send({err:0,msg:result.data})
        }else{
            res.send({err:-1,msg:result.data})
        }
    })
    .catch((err)=>{
        res.send({err:-1,msg:err})
    })
})
// 重置密码
router.post('/admin/resetUserPass',(req,res)=>{
    let {id}=req.body
    axios({
        method:'PUT',
        url:'/admin/resetUserPass',
        params:{
            id:id
        },
        headers:{
            token:req.session.token
        }
    })
    .then((result)=>{
        if(result.data.msg=='OK'){
            res.send({err:0,msg:result.data})
        }else{
            res,send({err:-1,msg:result.data})
        }
    })
    .catch((err)=>{
        res.send({err:-1,msg:err})
    })
})

// 封装的删除2历史记录函数
function delRecord(req,id){
    return new Promise((resolve,resject)=>{
        axios({
            method:'DELETE',
            url:'/admin/records',
            params:{
                id:id
            },
            headers:{
                token:req.session.token
            }
        })
        .then((result)=>{
            console.log('封装的删除函数里边的结果',result.data)
            if(result.data.msg=='OK'){
                resolve(result.data)
            }else{
                throw new Error(result.data)
            }
        })
        .catch((err)=>{
            resject(err)
        })
    })
}

// 删除历史记录
router.post('/del/admin/records',(req,res)=>{
    console.log(123)
    let {idArr}=req.body
    console.log('传的数据',req.body)
    let sendArr=[]
    for(let i=0;i<idArr.length;i++){
        sendArr.push(delRecord(req,idArr[i]))
    }
    Promise.all(sendArr)
    .then((result)=>{
        console.log('删除接口的数据',result)
        res.send({err:0,msg:result})
    })
    .catch((err)=>{
        console.log(err)
        res.send({err:-1,msg:err})
    })
})

module.exports = router