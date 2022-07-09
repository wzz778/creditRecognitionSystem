const express=require('express')
const router=express.Router()
const axios=require('axios');
const jwt = require('jsonwebtoken');
const FormData=require('form-data');
const fs=require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var multiparty = require('multiparty');
const { log } = require('console');
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
router.get('/repassword',(req,res)=>{
    res.render('repassword.html')
})
router.get('/examineApplication',(req,res)=>{
    res.render('examineApplication.html')
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
axios.defaults.baseURL='http://110.40.205.103:8099/';
router.post('/api/login', (req, res) => {
    console.log(req.body);
    axios({
        url:'user/login',
        method:'post',
        params:req.body,
    }).then(response=>{
        req.session.token= response.data.data.token;
        req.session.password= req.body.password;
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
        req.session.user=user.data.data;
        res.send(req.session.user)
    }).catch(function (error) {
        console.log(error);
    });
})
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
router.get('/api/getcreditmessage', (req, res) => {
    axios.get('/creditTypeOperate/showCreditType',{
        headers:{
            token:req.session.token
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
    axios({
        url:'user/application',
        method:'post',
        data:req.body,
        headers:{
            token:req.session.token
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
router.get('/api/getpostmessage', (req, res) => {
    axios.get('/user/oneApplication/{id}',{
        params:req.query,
        headers:{
            token:req.session.token
        }},
    ).then(response=>{
        console.log("wwwwwwwwwwwwww");
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        console.log("wwwwwwwwwwwwww");
        res.send(error)
    });
})
router.post('/api/UploadAttachment', multipartMiddleware,(req, res) => {
    let formdata = new FormData()
    for (let a in req.files) {
        formdata.append('file', fs.createReadStream(req.files[a].path),req.files[a].originalFilename)//第二个参数试上传的文件名
    }
    formdata.append('enclosure_name',req.body.enclosure_name)
    formdata.append('application_id',req.body.application_id)
    axios({
        method: 'POST',
        url: 'http://110.40.205.103:8099/user/photo',
        data:formdata,
        // headers: formdata.getHeaders(),
        headers:{
            token:req.session.token,
            formdata:formdata.getHeaders(),
            maxBodyLength:1000000000
        }
    })
        .then((result) => {
            console.log(result.data)
            res.send({ err: 0, msg: result.data })
        })
        .catch((err) => {
            // console.log(err)
            res.send({ err: -1, msg: err})
        })
})  
router.put('/api/uppassword', (req, res) => {
    if(req.query.mypassword==req.session.password){
        axios({
        headers: {
            token:req.session.token
        },
        method: 'put',
        url: '/user/password',
        params:{
            password:req.query. password,
            prePassword:req.query.prePassword,
            username:req.query.username,
        }
        }).then(response=>{
            console.log(response.data);
            res.send(response.data);
        }).catch(function (error) {
            console.log(error);
            res.send(error)
        });
    }else{
        res.send('您的密码输入错误！');
    }
})
router.get('/api/allapplication', (req, res) => {
    axios.get('/user/application',{
        params:req.query,
        headers:{
            token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTczNDUzNDYsImV4cCI6MTY1NzM0ODk0NiwidXNlcm5hbWUiOiIxIiwicG93ZXIiOiLotoXnuqfnrqHnkIblkZgifQ.zIhoxipHH2ReQciofnQa1kjWzc-lIZdL9m5U4o7UCNI"
        }},
    ).then(response=>{
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        res.send(error)
    });
})
router.put('/api/passpost', (req, res) => {
        axios({
        headers: {
            token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTczNDUzNDYsImV4cCI6MTY1NzM0ODk0NiwidXNlcm5hbWUiOiIxIiwicG93ZXIiOiLotoXnuqfnrqHnkIblkZgifQ.zIhoxipHH2ReQciofnQa1kjWzc-lIZdL9m5U4o7UCNI"
        },
        method: 'put',
        url: '/admin/auditingApplication',
        params:req.query
        }).then(response=>{
            console.log(response.data);
            res.send(response.data);
        }).catch(function (error) {
            console.log(error);
            res.send(error)
        });
})
router.post('/api/deletepost',(req, res) => {
    console.log(req.body);
    // let allid=JSON.stringify(req.body);
    // console.log(allid);
    // let all=allid.replace(/{/g,"").replace(/}/g,"");
    // console.log(all);
    axios({
    headers: {
        token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTczNDUzNDYsImV4cCI6MTY1NzM0ODk0NiwidXNlcm5hbWUiOiIxIiwicG93ZXIiOiLotoXnuqfnrqHnkIblkZgifQ.zIhoxipHH2ReQciofnQa1kjWzc-lIZdL9m5U4o7UCNI"
    },
    method: 'delete',
    url: '/admin/application',
    params:{id:req.body.toString()}
    }).then(response=>{
        console.log(response);
        res.send(response);
    }).catch(function (error) {
        console.log(error);
        res.send(error)
    });
})
module.exports = router