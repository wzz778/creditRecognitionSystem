//引入第三方插件
const express = require('express')
const app = express()
const body_parse = require('body-parser')
const path = require('path')
const cookieParse = require('cookie-parser')
const session = require('express-session')
const axios = require('axios')
const jwt = require('jsonwebtoken');
//安装cors中间件
const cors=require('cors')
 
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
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')));
app.use(cors())
app.set("views", "views");
// 引入路由
const sAdminRouter = require('./router/sAdminRouter')
const wzzRouter = require('./router/wzzRouter')
const userRouter = require('./router/userRouter')
const errRouter = require('./router/errorRouter')

// 拦截器
app.get('*', (req, res, next) => {
  if (jwt.decode(req.session.token)) {
    return next()
  }
  res.render('login.html')
})

// 配置路由
app.use(wzzRouter)
app.use(userRouter);
app.use(sAdminRouter)
app.use(errRouter)
// 启动服务器
app.listen(8080, () => {
  console.log('服务器已启动,端口号:8080')
})

