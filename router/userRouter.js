const express = require('express');
const router = express.Router();

router.get('/history',(req,res)=>{
    res.render('history.html');
})


module.exports = router;