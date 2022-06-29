const express=require('express')
const router=express.Router()
const axios=require('axios')
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
module.exports = router