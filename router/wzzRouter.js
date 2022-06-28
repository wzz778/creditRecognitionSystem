const express=require('express')
const router=express.Router()
const axios=require('axios')
// 请求页面
router.get('/',(req,res)=>{
    res.render('index.html')
})
module.exports = router