const express = require('express');
const axios = require("axios");
const jwt = require("jsonwebtoken");
const {response} = require("express");
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
router.get('/404',(req,res)=>{
    res.render('404.html');
})
router.get('/403',(req,res)=>{
    res.render('403.html');
})


router.get('/users/records',(req,res)=>{
    // let {nodePage,pageSize} = req.body;
    axios({
        method:'get',
        url:'/user/records',
        params:req.query,
        headers:{
            token:req.session.token
        },
    }).then((date)=>{
        res.send(date.data);
    }).catch((err)=>{
        res.send(err);
    })
})

router.get('/user/application',(req,res)=>{
    axios({
        method:'get',
        url:'/user/application',
        params:req.query,
        headers:{
            token:req.session.token
        },
    }).then((date)=>{
        res.send(date.data);
    }).catch((err)=>{
        res.send(err);
    })
})

router.get('/admin/commonUserPage',(req,res)=>{
    axios({
        method:'get',
        url:'/admin/commonUserPage',
        params:req.query,
        headers:{
            token:req.session.token,
        },
    }).then((date)=>{
        console.log(date.data);
        res.send(date.data);
    }).catch((err)=>{
        res.send(err);
    })

})


router.get('/admin/oneApplication',(req,res)=>{
    axios({
        method:'get',
        url:'/user/oneApplication/{id}',
        params:req.query,
        headers:{
            token:req.session.token
        },
    }).then((date)=>{
        res.send(date.data);
    }).catch((err)=>{
        res.send(err);
    })
})

router.put('/admin/resetUserPass',(req,res)=>{
    axios({
        method:'put',
        url:'/admin/resetUserPass',
        params:req.query, //id
        headers:{
            token:req.session.token
        },
    }).then((date)=>{
        res.send(date.data);
    }).catch((err)=>{
        res.send(err);
    })
})

router.put('/admin/update.do.userInfo',(req,res)=>{
    axios({
        method:'put',
        url:'/admin/update.do.userInfo',
        params:req.query,
        headers:{
            token:req.session.token
        },
    }).then((date)=>{
        res.send(date.data);
    }).catch((err)=>{
        res.send(err);
    })
})

router.delete('/admin/delete.doUserInfo',(req,res)=>{
    axios({
        method:'delete',
        url:'/admin/delete.doUserInfo',
        params:req.query,
        headers:{
            token:req.session.token
        },
    }).then((date)=>{
        res.send(date.data);
    }).catch((err)=>{
        res.send(err);
    })
})

router.post('/admin/addUsers',(req,res)=>{
    axios({
        method:'post',
        url:'/admin/addUsers',
        data:req.body,
        headers:{
            token:req.session.token,
        }
    }).then((date)=>{
        res.send(date.data);
    }).catch((err)=>{
        res.send(err);
    })
})

router.get('/admin/getUserByClass',(req,res)=>{
    axios({
        method:'get',
        url:'/admin/getUserByClass',
        params:req.query,
        headers:{
            token:req.session.token
        }
    }).then((date)=>{
        res.send(date.data);
    }).catch((err)=>{
        res.send(err);
    })
})

router.get('/user/getEnclosure',(req,res)=>{
    axios({
        method:'get',
        url:'/user/getEnclosure',
        params:req.query,
        headers:{
            token:req.session.token
        }
    }).then((data)=>{
        res.send(data.data);
    }).catch((err)=>{
        res.send(err);
    })
})

router.get('/admins/selectOrganization',(req,res)=>{
    axios({
        method:'get',
        url:'/admin/selectOrganization',
        params:req.query,
        headers:{
            token:req.session.token
        }
    }).then((data)=>{
        res.send(data.data);
    }).catch((err)=>{
        res.send(err);
    })
})

router.get('/admins/showOrganization',(req,res)=>{
    axios({
        method:'get',
        url:'/admin/showOrganization',
        params:req.query,
        headers:{
            token:req.session.token
        }
    }).then((data)=>{
        res.send(data.data);
    }).catch((err)=>{
        res.send(err);
    })
})



module.exports = router;