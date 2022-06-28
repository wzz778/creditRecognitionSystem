const express=require('express')
const router=express.Router()
const axios=require('axios')
// 请求页面
router.get('/superAdminAdd',(req,res)=>{
    res.render('superAdminAddUser.html')
})



module.exports = router