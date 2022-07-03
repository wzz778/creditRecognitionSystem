const express = require('express')
const router = express.Router()
const qs = require('qs')
const axios = require('axios')
const jwt = require('jsonwebtoken')

// 请求页面
router.get('/superAdminAdd', (req, res) => {
    res.render('superAdminAddUser.html')
})
router.get('/adminHistory', (req, res) => {
    res.render('adminHistory.html')
})
router.get('/adminWatchApplication', (req, res) => {
    res.render('adminWatchApplication.html')
})
router.get('/adminManageUsers', (req, res) => {
    res.render('adminManageUsers.html')
})
router.get('/adminCreditManagement', (req, res) => {
    res.render('adminCreditManagement.html')
})
router.get('/addNewIndicator', (req, res) => {
    res.render('addNewIndicator.html')
})

axios.defaults.baseURL = 'http://110.40.205.103:8099'

// 解析kwt函数

router.post('/admin/records', (req, res) => {
    if (!jwt.decode(req.session.token)) {
        res.send({ err: -1, msg: '用户身份非法' })
        return
    }
    let { nodePage, pageSize } = req.body
    console.log('token', req.session.token)
    // 请求后端接口
    axios({
        method: 'GET',
        url: 'admin/records',
        params: {
            nodePage: nodePage,
            pageSize: pageSize,
        },
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            console.log('获取数据成功', result.data.data)
            let dataTime = result.data.data.allRecords[0].createTime.split(' ')
            console.log(dataTime[0])
            res.send('成功')
        })
        .catch((err) => {
            console.log('失败', err)
            res.send('失败')
        })

})
// 查看申请表
router.put('/admin/application', (req, res) => {
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
    obj.beginDate = '2022-06-17'
    obj = JSON.stringify(obj)
    console.log(obj)
    axios({
        method: 'PUT',
        url: 'admin/application',
        data: obj,
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            console.log(result.data)
            console.log('成功了')
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
            console.log('错误')
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
    let user = req.body.arrId
    axios({
        method: 'DELETE',
        url: '/admin/delete.doUserInfo',
        params: user,
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
            console.log(err)
            res.send({ err: -1, msg: '网络错误' })
        })
})

module.exports = router