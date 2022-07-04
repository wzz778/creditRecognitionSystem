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
router.get('/EndApplication',(req,res)=>{
    res.render('EndApplication.html')
})
router.get('/UploadAttachment',(req,res)=>{
    res.render('UploadAttachment.html')
})
router.get('/makepdf',(req,res)=>{
    res.render('makepdf.html')
})
router.get('/submitApplication',(req,res)=>{
    axios.get('/creditTypeOperate/showCreditType',{
        // params:req.query,
        headers:{
            token: req.session.token
        }},
    ).then(response=>{
        req.session.credittype=response.data.data;
        // console.log(req.session.user);
        res.render('submitApplication.html',{
            credittype: req.session.credittype,
            // user:req.session.user
        })
    }).catch(function (error) {
        // res.send(error)
    });
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
        console.log(req.session.token);
        res.send(response.data);
        // return jwt.decode(req.session.token).username;
    }).catch(function (error) {
        res.send(error)
    });
})
router.get('/api/getmymessage', (req, res) => {
    axios({
        url:'user/userInfo',
        method:'get',
        params:{username:jwt.decode(req.session.token).username},
        headers:{
            token:req.session.token
        }
    }).then(user=>{
        console.log('----------------');
        req.session.user=user.data.data;
        console.log(req.session.user);
        console.log('----------------');
        res.send(req.session.user)
    }).catch(function (error) {
        console.log(error);
    });
})
// axios({
//     url:'user/userInfo',
//     method:'get',
//     params:{username:jwt.decode(req.session.token).username},
//     headers:{
//         token:req.session.token
//     }
// }).then(user=>{
//     req.session.user=user.data.data;
//     console.log(req.session.user);
// }).catch(function (error) {
//     console.log(error);
// });
router.get('/api/outlogin', (req, res) => {
    axios.get('user/logout',{
        params:req.query,
        headers:{
            token:req.session.token
        }},
    ).then(response=>{
        req.session=null;
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        console.log(error);
        res.send(error)
    });
})
router.get('/api/getpostmessage', (req, res) => {
    axios.get('/creditTypeOperate/showCreditType',{
        // params:req.query,
        headers:{
            token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTY2NzMyMjUsImV4cCI6MTY1Njc1OTYyNSwidXNlcm5hbWUiOiJzZyJ9.Og2YS-khn_tW3uGo0kv4zEcdcVyFzVb1Vss3j-N9IZw"
        }},
    ).then(response=>{
        console.log(response.data.data);
        req.session.credittype=response.data.data;
        res.send(response.data);
    }).catch(function (error) {
        res.send(error)
    });
})
router.post('/api/getpost', (req, res) => {
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    axios({
        url:'user/application',
        method:'post',
        data:req.body,
        headers:{
            token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTY3NTIyMTIsImV4cCI6MTY1Njc1NTgxMiwidXNlcm5hbWUiOiJzZyIsInBvd2VyIjoi5pmu6YCa55So5oi3In0.xDTFxQY0jS9Fo5P4lri1RTB0Lit0Fj1q0Xy92p6Rdeo"
        },
    }).then(response=>{
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        console.log(error);
        res.send(error)
    });
})
router.get('/api/getcreditson', (req, res) => {
    axios.get('/IndicatorOperate/searshIndicator',{
        params:req.query,
        headers:{
            token:req.session.token
        }},
    ).then(response=>{
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        res.send(error)
    });
})
router.get('/api/getsonson', (req, res) => {
    axios.get('/IndicatorOperate/showIndicator',{
        params:req.query,
        headers:{
            token:req.session.token
        }},
    ).then(response=>{
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        res.send(error)
    });
})
module.exports = router