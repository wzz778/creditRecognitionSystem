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
router.get('/layout',(req,res)=>{
    res.render('layout.html',{
        user:req.session.user
    })
})
//登录页面
router.get('/login',(req,res)=>{
    res.render('login.html')
})
//结束申请表
router.get('/EndApplication',(req,res)=>{
    res.render('EndApplication.html')
})
//上传附件
router.get('/UploadAttachment',(req,res)=>{
    res.render('UploadAttachment.html')
})
//添加用户
router.get('/superAdminAddUser',(req,res)=>{
    res.render('superAdminAddUser.html')
})
//制作pdf表格
router.get('/makepdf',(req,res)=>{
    res.render('makepdf.html')
})
//修改密码
router.get('/repassword',(req,res)=>{
    res.render('repassword.html')
})
//审核申请表
router.get('/examineApplication',(req,res)=>{
    let user = jwt.decode(req.session.token);
    if(user.power== '普通管理员'){
        res.render('examineApplication.html')
    }else{
            res.render('403.html');
    }
    // res.render('examineApplication.html')
})
//提交申请表
router.get('/submitApplication',(req,res)=>{
    axios.get('/creditTypeOperate/showCreditType',{
        // params:req.query,
        headers:{
            token: req.session.token,
        }
    }).then(response=>{
        req.session.credittype=response.data.data;
        console.log(req.session.user);
        res.render('submitApplication.html',{
            credittype: req.session.credittype,
            user:req.session.user
        })
    }).catch(function (error) {
        // res.send(error)
    });
})

axios.defaults.baseURL='http://110.40.205.103:8099/';

//登录
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
//获取个人信息
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
        console.log(req.session.user);
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
        req.session.destroy()
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
    //建立FormData()对象，注意：node中使用要先下载formdata中间件
    for (let a in req.files) {
        formdata.append('file', fs.createReadStream(req.files[a].path),req.files[a].originalFilename)//第二个参数试上传的文件名
    }
    //循环传递file文件对象，req.files[a].path是该文件的本地地址， 用fs.createReadStream(req.files[a].path)进行读取创作，req.files[a].originalFilename是文件本名，用来传出文件名称
    formdata.append('enclosure_name',req.body.enclosure_name)
    formdata.append('application_id',req.body.application_id)
    //req.body中传递非文件数据， req.files是文件数据
    axios({
        method: 'POST',
        url: 'http://110.40.205.103:8099/user/photo',
        data:formdata,
        // headers: formdata.getHeaders(),
        headers:{
            token:req.session.token,
            formdata:formdata.getHeaders(),//传递formdata数据
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
    if (!jwt.decode(req.session.token)) {
        res.send({ err: -1, msg: '用户身份非法' })
        return
    }
    if(req.query.mypassword==req.session.password){
        axios({
        headers: {
            token:req.session.token
        },
        method: 'put',
        url: '/user/password',
        params:{
            password:req.query.password,
            prePassword:req.query.prePassword,
            username:req.session.user.userName,
        }
        }).then(response=>{
            req.session=null;
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
    axios.get('/admin/application',{
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
router.put('/api/passpost', (req, res) => {
        axios({
        headers: {
            token:req.session.token
        },
        method: 'put',
        url: '/admin/auditingApplication',
        params:req.query
        }).then(response=>{
            res.send(response.data);
        }).catch(function (error) {
            console.log(error);
            res.send(error)
        });
})
// router.post('/api/deletepost',(req, res) => {
//     console.log(req.body);
//     // let allid=JSON.stringify(req.body);
//     // console.log(allid);
//     // let all=allid.replace(/{/g,"").replace(/}/g,"");
//     // console.log(all);
//     axios({
//     headers: {
//         token:req.session.token
//     },
//     method: 'delete',
//     url: '/admin/application',
//     params:{id:req.body.toString()}
//     }).then(response=>{
//         console.log(response);
//         res.send(response);
//     }).catch(function (error) {
//         console.log(error);
//         res.send(error)
//     });
// })
//获取全部的年级
router.get('/api/getgrade', (req, res) => {
    axios.get('/admin/showOrganization',{
        headers:{
            token:req.session.token
        }},
    ).then(response=>{
        res.send(response.data);
    }).catch(function (error) {
        res.send(error)
    });
})
//根据id查询下级
router.get('/api/getacademy', (req, res) => {
    axios.get('/admin/selectOrganization',{ 
        headers:{
            token:req.session.token
        },
        params:req.query,
    }).then(response=>{
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        res.send(error)
    });
})
//删除组织
router.post('/api/deleteorganization',(req, res) => {
    console.log(req.body);
    // let allid=JSON.stringify(req.body);
    // console.log(allid);
    // let all=allid.replace(/{/g,"").replace(/}/g,"");
    // console.log(all);
    axios({
    headers: {
        token:req.session.token
    },
    method: 'delete',
    url: '/admin/deleteOrganization',
    params:{ids:req.body.toString()}
    }).then(response=>{
        console.log(response.data);
        res.send(response);
    }).catch(function (error) {
        console.log(error);
        res.send(error)
    });
})
//修改组织
router.put('/api/uploador', (req, res) => {
    axios({
    headers: {
        token:req.session.token
    },
    method: 'put',
    url: '/admin/updateOrganization',
    params:req.query
    }).then(response=>{
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        console.log(error);
        res.send(error)
    });
})
//添加组织
router.post('/api/addorgin', (req, res) => {
    console.log(req.body);
    console.log(req.body.level);
    axios({
        url:'/admin/organization.add',
        method:'POST',
        params:req.body,    
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
module.exports = router