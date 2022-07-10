const express = require('express')
const router = express.Router()
router.get('*', (req, res, next) => {
    res.render('err.html')
})
module.exports = router
