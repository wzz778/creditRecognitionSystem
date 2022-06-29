const express = require('express');
const axios = require("axios");
const router = express.Router();

router.get('/history',(req,res)=>{
    axios.get('http://110.40.205.103:8099/user/records',{
        params:{
            page:'1',
        }
    })
        .then((data)=>{
            res.render('history.html',data);
        })
        .catch((err)=>{
            console.log('错误');
        })
})
router.get('/adminUsers',(req,res)=>{
    res.render('adminUsers.html');
})

router.get('/progress',(req,res)=>{
    res.render('progress.html');
})

module.exports = router;