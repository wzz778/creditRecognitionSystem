const express = require('express')
const router = express.Router()
const qs = require('qs')
const axios = require('axios')
const jwt = require('jsonwebtoken')

// 请求页面
// 添加用户 !
router.get('/superAdminAdd', (req, res) => {
    res.render('superAdminAddUser.html')
})
// 提交历史记录 !(删除功能和获取信息函数中的循环从1开始的GetAllInfo(page, perpage, obj))
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
// 学分构成管理 !(没有数据新增和修改没有写，以及分类查询)
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
    console.log(obj)
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
            console.log(result.data)
            res.send({ err: 0, msg: result.data.data.allRecords,allPage:(result.data.data.allPages-1),msg1:result.data.data.pageInfo})
        })
        .catch((err) => {
            console.log('失败', err)
            res.send({ err: -1, msg: '网络错误' })
        })

})
// 查看申请表
router.post('/admin/application', (req, res) => {
    // console.log(req.body)
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
            res.send({ err: 0, msg: result.data.data.allRecords, AllPages: result.data.data.allPage })
        })
        .catch((err) => {
            console.log(err)
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
            console.log(result.data)
            if (result.data.msg == 'OK') {
                res.send({ err: 0, msg: result.data })
            } else {
                // 没请求成功
                res.send({ err: -1, msg: result.data.msg })
            }
        })
        .catch((err) => {
            console.log(err)
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
            console.log(result.data.data)
            res.send(result.data)
        })
        .catch((err) => {
            console.log(err)
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
            console.log(err)
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
    console.log(idArray)
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
        console.log(result.data)
        if (result.data.msg == 'OK') {
            res.send({ err: 0, msg: '删除成功' })
        } else {
            res.send({ err: -1, msg: '删除失败请重试' })
        }
    })
        .catch((err) => {
            console.log(err)
            res.send({ err: -1, msg: '网络错误' })
        })
})
// 批量删除用户
router.post('/delAllUser', (req, res) => {
    if (!jwt.decode(req.session.token)) {
        res.send({ err: -1, msg: '用户身份非法' })
        return
    }
    console.log('我自己的')
    // console.log(req.body)
    let user = req.body.arrId
    // console.log(user)
    let urlStr = `http://110.40.205.103:8099/admin/delete.doUserInfo?`
    for (let i = 0; i < user.length; i++) {
        urlStr += `&user=${user[i]}`
    }
    console.log(urlStr)
    axios.delete(urlStr, {
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            console.log(result.data)
            if (result.data.msg == 'OK') {
                res.send({ err: 0, msg: '删除成功' })
            } else {
                res.send({ err: -1, msg: '删除失败请重试' })
            }
        })
        .catch((err) => {
            console.log(err.response)
            res.send({ err: -1, msg: '网络错误' })
        })
})

// 获取学分构成数据
router.get('/getCreditsComposition', (req, res) => {
    axios({
        method: 'GET',
        url: '/creditTypeOperate/showCreditType',
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            // console.log(result.data)
            if (result.data.msg == 'OK') {
                res.send({ err: 0, msg: result.data.data })
            } else {
                // 没请求成功
                res.send({ err: -1, msg: result.data.msg })
            }
        })
        .catch((err) => {
            console.log(err)
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
            console.log(result.data)
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

// 封装的循环发送数据的函数
function fn(id, req, sendResult) {
    return new Promise((resolve, resject) => {
        axios({
            method: 'GET',
            url: '/IndicatorOperate/showIndicator',
            params: {
                id: id,
                level: 3
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
            level: 2
        },
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            let sendResult = result.data.data
            console.log(sendResult)
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
                    console.log(result)
                    res.send({ err: 0, msg: sendResult })
                })
                .catch((err) => {
                    throw new Promise(err)
                })
        })
        .catch((err) => {
            console.log(err)
            res.send({ err: -1, msg: '网络错误' })
        })
})


module.exports = router