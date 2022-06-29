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
const data =     
{
        userName:'sg',
        password:'1234'
};
// let token = jwt.sign(data, 'sercret');
// console.log(token);
axios.defaults.baseURL='http://110.40.205.103:8099/';
router.get('/api/1', (req, res) => {
    console.log(req.query);
    // res.send(JSON.stringify(req.body))
    axios.post( 'user/login',req.query,
    ).then(response=>{
        console.log(response.data.data.token);
        res.send(response.data.data.token);
    }).catch(function (error) {
        console.log(error);
        res.send(error)
    });
})
module.exports = router