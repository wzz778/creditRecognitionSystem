var express=require('express');
var app=express();
var session=require('express-session');
var path=require('path');
var cors=require('cors');
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.engine('html',require('express-art-template'));
app.use('/public/',express.static(path.join(__dirname,'./static/')));
app.use('/static/',express.static(path.join(__dirname,'./static/')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')));
app.engine('html',require('express-art-template'));
app.set('views',path.join(__dirname,'./views/'))
app.listen(80,()=>{
    console.log("http://127.0.0.1");
})
app.get('/', function (req, res) {
    res.render('index.html')
})