const express = require('express')
const router = express.Router()
const axios = require('axios')
// 请求页面
router.get('/superAdminAdd', (req, res) => {
    res.render('superAdminAddUser.html')
})

var provinces = ['江苏省','浙江省','安徽省']
var citys = []

// 请求三级联动的数据
provinces["江苏省"] = ["南京市", "无锡市", "苏州市"]
provinces["浙江省"] = ["杭州市", "宁波市"]
provinces["安徽省"] = ["合肥市", "马鞍山市"]

citys["南京市"] = ["玄武区", "雨花台区", "鼓楼区", "秦淮区", "六合区"]
citys["无锡市"] = ["滨湖区", "惠山区", "梁溪区"]
citys["苏州市"] = ["姑苏区", "吴江区"]
citys["杭州市"] = ["西湖区", "临安区", "上城区"]
citys["宁波市"] = ["江北区", "江东区"]
citys["合肥市"] = ["蜀山区", "瑶海区"]
citys["马鞍山市"] = ["花山区", "雨山区"]

router.get('/getthreeLevel', (req, res) => {
    // 渲染三级联动数据
    res.send({err:0,provinces:provinces,citys:citys})
})





module.exports = router