const express = require('express');
const axios = require("axios");
const jwt = require("jsonwebtoken");
const router = express.Router();
axios.default.baseURL = 'http://110.40.205.103:8099/';
function ribbon(req,res,next){
    axios.default.headers = req.session.token;
    next();
}
router.get('/history',ribbon,(req,res)=>{
    // let {nodePage,pageSize} = req.query;
    axios({
        method:'get',
        url:'user/records',
        params:{
            nodePage:1,
            pageSize:10,
        },
    }).then((data)=>{
        console.log(data);
        // res.send(data);
    }).catch((err)=>{

    })
    res.render('history.html')
})
router.get('/adminUsers',ribbon,(req,res)=>{
    axios({
        method:'get',
        url:'admin/commonUserPage',
        params:{
            nodePage:1,
            nodeSize:10
        }
    }).then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })
    res.render('adminUsers.html');
})

router.get('/progress',ribbon,(req,res)=>{
    res.render('progress.html');
})
router.get('/particulars',(req,res)=>{
    res.render('particulars.html');
})
module.exports = router;