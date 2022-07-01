const express=require('express')
const router=express.Router()
const axios=require('axios');
const jwt = require('jsonwebtoken');
// var tokens;
// var decoded = jwt.decode(token);
// console.log(decoded);
// { name: 'Tom', age: 23, iat: 1584088910, exp: 1584096110 }

// 请求页面
router.get('/',(req,res)=>{
    res.render('index.html')
})
router.get('/login',(req,res)=>{
    res.render('login.html')
})
router.get('/login',(req,res)=>{
    res.render('login.html')
})
router.get('/submitApplication',(req,res)=>{
    res.render('submitApplication.html')
})
// let token = jwt.sign(data, 'sercret');
// console.log(token);
axios.defaults.baseURL='http://110.40.205.103:8099/';
router.post('/api/login', (req, res) => {
    axios({
        url:'user/login',
        method:'post',
        params:req.body,
    }).then(response=>{
        req.session.token= response.data.data.token;
        console.log(response.data);
        console.log('登录接口的session',req.session);
        res.send(response.data);
    }).catch(function (error) {
        res.send(error)
    });
    // console.log(req.session);
})
router.get('/api/outlogin', (req, res) => {
    axios.get('user/logout',{
        params:req.query,
        headers:{
            token:req.session.token
        }},
    ).then(response=>{
        console.log(response);
        res.send(response.data);
    }).catch(function (error) {
        res.send(error)
    });
})
router.get('/api/lookalldicator', (req, res) => {
    if (!jwt.decode(req.session.token)) {
        res.send({ err: -1, msg: '用户身份非法' })
        return
    }
    axios({
        method: 'GET',
        url: 'IndicatorOperate/showAllIndicator',
        // params: {
        //     nodePage: nodePage,
        //     pageSize: pageSize,
        // },
        headers: {
            token: req.session.token
        }
    }).then((result) => {
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
router.get('/api/a',(req,res)=>{
    console.log(req.session);
    res.send(req.session.token);
    // console.log('session值',req.session)
    // console.log(req.session.token)
    // res.send({'token':req.session.token})
})

module.exports = router