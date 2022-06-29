const express = require('express');
const router = express.Router();

router.get('/history',(req,res)=>{
    res.render('history.html');
})
router.get('/adminUsers',(req,res)=>{
    res.render('adminUsers.html');
})

router.get('/progress',(req,res)=>{
    res.render('progress.html');
})

module.exports = router;