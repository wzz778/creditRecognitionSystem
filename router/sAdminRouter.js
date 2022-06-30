const express = require('express')
const router = express.Router()
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
axios.defaults.baseURL = 'http://110.40.205.103:8099'

// 解析kwt函数

router.post('/admin/records', (req, res) => {
    if (!jwt.decode('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTY1NDcyNDksImV4cCI6MTY1NjYzMzY0OSwidXNlcm5hbWUiOiJzZyJ9.')) {
        res.send({ err: -1, msg: '用户身份非法' })
        return
    }
    let { nodePage, pageSize } = req.body
    // 请求后端接口
   axios({
    method:'GET',
    url:'admin/records',
    params:{
        nodePage:nodePage,
        pageSize:pageSize,
    },
    headers:{
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTY1NDcyNDksImV4cCI6MTY1NjYzMzY0OSwidXNlcm5hbWUiOiJzZyJ9.YhQ-fBUy9oDOGIJhKgYffoPzYbjNZCwV2k6x2tGlPA8'
    }
   })
   .then((result)=>{
    console.log('获取数据成功',result.data.data)
    let dataTime=result.data.data.allRecords[0].createTime.split(' ')
    console.log(dataTime[0])
    res.send('成功')
   })
   .catch((err)=>{
    console.log('失败',err)
    res.send('失败')
   })

})



module.exports = router