const express=require('express')
const router=express.Router()
const axios=require('axios');
const jwt = require('jsonwebtoken');

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
    // res.send(JSON.stringify(req.body))
    axios.post( 'user/login',req.body,
    ).then(response=>{
        req.session.token= response.data.data.token;
        console.log(jwt.decode(req.session.token));
        console.log(req.session.token);
        res.send(response.data);
    }).catch(function (error) {
        res.send(error)
    });
})
router.get('/api/logins', (req, res) => {
    console.log(req.session.token);
})
module.exports = router