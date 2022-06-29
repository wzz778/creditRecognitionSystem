//引入第三方插件
const express = require('express')
const app = express()
const body_parse = require('body-parser')
const path = require('path')
const cookieParse = require('cookie-parser')
const session = require('express-session')
const axios = require('axios')


// 配置
app.engine('html', require('express-art-template'))
app.use(body_parse.urlencoded({ extended: false }))
app.use(body_parse.json())
app.use(session({
    secret: 'hubwizApp',
    cookie: { maxAge: 60 * 1000 * 30 * 24 },
    resave: true,
    saveUninitialized: false,
  }))
app.use('/public', express.static(path.join(__dirname, './static')))
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules/')));
// 引入路由
const sAdminRouter=require('./router/sAdminRouter')
const wzzRouter=require('./router/wzzRouter')
const userRouter = require('./router/userRouter')
// 配置路由
app.use(sAdminRouter)
app.use(wzzRouter)
app.use(userRouter);
// 启动服务器
app.listen(8080,()=>{
    console.log('服务器已启动,端口号:8080')
})

