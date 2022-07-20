const express = require('express');
const axios = require("axios");
const jwt = require("jsonwebtoken");
const {response} = require("express");
const router = express.Router();
axios.default.baseURL = 'http://110.40.205.103:8099/';
router.get('*',(req,res,next)=>{
    let user = jwt.decode(req.session.token);
    if(user != '普通用户'){
        return next();
    }else{
            res.render('403.html');
    }
})

//查看历史记录的页面
router.get('/history',(req,res)=>{
    res.render('history.html')
})

//管理员管理用户的页面
router.get('/adminUsers',(req,res)=>{
    res.render('adminUsers.html',);
})

// 历史记录的详情页面
router.get('/particulars',(req,res)=>{
    res.render('particulars.html');
})

//404页面
router.get('/404',(req,res)=>{
    res.render('404.html');
})

//403页面
router.get('/403',(req,res)=>{
    res.render('403.html');
})



//用户查看历史记录
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



// 上传申请表
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


//普通用户分页
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

//获取单个申请表
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

//重置密码  密码是111111
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

// 添加用户
router.post('/admin/Users', (req,res) => {
    let { name, userName, power, sex, grade, academy, major_class, organization, position } = req.body
    if (!organization) {
        organization = '无'
    }
    if (!position) {
        position = '无'
    }
    // 传数据
    axios({
        method: 'POST',
        url: '/admin/User',
        params: {
            name: name,
            userName: userName,
            power: power,
            sex: sex,
            grade: grade,
            academy: academy,
            major_class: major_class,
            organization: organization,
            position: position
        },
        headers: {
            token: req.session.token
        }
    })
        .then((result) => {
            if (result.data.msg == 'OK') {
                res.send({ err: 0, msg: result.data })
            } else {
                // 没请求成功
                res.send({ err: -1, msg: result.data.msg })
            }
        })
        .catch((err) => {
            res.send({ err: -1, msg: '错误' })
        })
})




//修改用户信息
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


//删除用户
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


//添加用户
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


//根据条件检索用户信息
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

//取出附件
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


//查询组织信息
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


//显示一级组织信息
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

//显示所有学分类型
router.get('/creditTypeOperates/showCreditType',(req,res)=>{
    axios({
        method:'get',
        url:'/creditTypeOperate/showCreditType',
        headers:{
            token:req.session.token
        }
    }).then((data)=>{
        res.send(data.data);
    }).catch((err)=>{
        res.send(err);
    })
})

// 判断管理员是否被授权
router.get('/judgeUser',(req,res)=>{
    let superPower = req.session.user.superPower;
    if(superPower == '是'){
        res.send({err:0,msg:'被授权'});
    }else{
        res.send({err:-1,msg:'没有权限'});
    }
})

//显示所有指标
router.get('/IndicatorOperates/showAllIndicator',(req,res)=>{
    axios({
        method:'get',
        url:'/IndicatorOperate/showAllIndicator',
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