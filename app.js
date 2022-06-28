const express = require('express');
const session = require('express-session');
const url = require('url');
const axios = require('axios');
const cors = require('cors');
const cookieParse = require('cookie-parser');
const template = require('art-template');
const expressTemplate = require('express-art-template');
const path = require('path');
const userRouter = require('./routers/userRouter');
// const proxy = require('http-proxy-middleware');
const app = express();
// const Proxy = proxy('/anticipation_Novel',{target:'http://152.136.99.236:8080',changeOrigin:true});

function show(req,res,next){
    var url_path = url.parse(req.url);
    var pathName= url_path.pathname;
    console.log(url_path,pathName);
    next();
}

app.engine('html',require('express-art-template'));
// app.use('/anticipation_Novel',Proxy);
app.use(session({
    secret:'aghoagfjajdfa',
    cookie:{maxAge: 60 * 1000 * 24},
    resave:true, //即使session没有被修改，也保存session值，默认为true
    saveUninitialized:false, // 无论有没有session cookie，没有请求都设置个session cookie 默认给个标识connect.sid
}))
app.use(cors());
app.use('/user',userRouter);





app.listen(8080,()=>{
    console.log('server running at http://127.0.0.1:8080');
})