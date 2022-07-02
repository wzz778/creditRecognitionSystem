const express = require('express');
const axios = require("axios");
const jwt = require("jsonwebtoken");
const router = express.Router();
axios.default.baseURL = 'http://110.40.205.103:8099/';
router.get('/history',(req,res)=>{
    console.log(req.session.token);
    // let {nodePage,pageSize} = req.query;
    res.render('history.html')
})
router.get('/adminUsers',(req,res)=>{

    res.render('adminUsers.html');
})

router.get('/progress',(req,res)=>{
    res.render('progress.html');
})
router.get('/particulars',(req,res)=>{
    res.render('particulars.html');
})


router.get('/users/records',(req,res)=>{
    // let {nodePage,pageSize} = req.body;
    axios({
        method:'get',
        url:'/user/records',
        params:req.body,
        headers:req.session.token,
    }).then((date)=>{
        res.send(date);
    }).catch((err)=>{
        res.send(err);
    })
})

router.get('/user/application',(req,res)=>{
    axios({
        method:'get',
        url:'/user/application',
        params:req.body,
        headers:req.session.token,
    }).then((date)=>{
        res.send(date);
    }).catch((err)=>{
        res.send(err);
    })
})

router.get('/admin/commonUserPage',(req,res)=>{
    axios({
        method:'get',
        url:'/user/commonUserPage',
        params:req.body,
        headers:req.session.token,
    }).then((date)=>{
        res.send(date);
    }).catch((err)=>{
        res.send(err);
    })
})


router.get('/admin/oneApplication',(req,res)=>{
    axios({
        method:'get',
        url:'/user/oneApplication',
        params:req.body,
        headers:req.session.token,
    }).then((date)=>{
        res.send(date);
    }).catch((err)=>{
        res.send(err);
    })
})

module.exports = router;