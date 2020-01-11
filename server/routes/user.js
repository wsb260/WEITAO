const express = require('express')
const router = express.Router()
const User = require('../mongodb/model/user')

router.get('/getUser',(req,res,next)=>{
    res.send('true')
})

module.exports = router