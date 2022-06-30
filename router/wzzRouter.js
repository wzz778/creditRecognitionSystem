const express=require('express')
const router=express.Router()
const axios=require('axios');
const jwt = require('jsonwebtoken');
var token;
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
    console.log(req.body);
    axios({
        url:'user/login',
        method:'post',
        params:req.body,
    }).then(response=>{
        req.session.token= response.data.data.token;
        console.log(jwt.decode(req.session.token));
        console.log(req.session.token);
        token=response.data.data.token;
        res.send(response.data);
    }).catch(function (error) {
        res.send(error)
    });
})
// axios({
//     url:'user/login',
//     method:'post',
//     params:{
//         password:'1234',
//         userName:'sg'
//     },
// }).then(response=>{
//     req.session.token= response.data.data.token;
//     console.log(jwt.decode(req.session.token));
//     console.log(req.session.token);
    
//     token=response.data.data.token;
// }).catch(function (error) {
// });
router.get('/api/outlogin', (req, res) => {
    axios.get('user/logout',{
        headers:{
            token:req.session.token
        }
    },
    ).then(response=>{
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        res.send(error)
    });
})
router.get('/api/123', (req, res) => {
    console.log(token);
    axios({
        url:'IndicatorOperate/showAllIndicator',
        method:'get',
        // params:{
        //     password:'1234',
        //     userName:'sg'
        // },
        headers:{
            token:token
        }
    }).then(response=>{
        // req.session.token= response.data.data.token;
        // console.log(jwt.decode(req.session.token));
        // console.log(req.session.token);
        console.log("response.data");
        res.send(response.data);
        console.log(response.data);
    }).catch(function (error) {
        console.log("err");
        res.send(error)
    });
})
module.exports = router