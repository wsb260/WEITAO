const express = require('express')
const router = express.Router()
const uuid = require('uuid').v4
const Right = require('../mongodb/model/rights')

// 获取权限列表
router.get('/getRights/:type',async (req,res,next)=>{
    let arr=[];
    let { type } = req.params
    if(type === 'list'){
        arr = await Right.find()
    }
    next()
    res.send({
        data:arr,
        meta:{
            msg:"获取权限列表成功",
            status:200
        }
    })
})

router.get('/getRights/:type',async (req,res,next)=>{
    let arr = []
    let { type } = req.params
    if(type === 'tree'){
        res.send('tree')
    }
})

// 添加权限列表
router.put('/setRights',(req,res)=>{
    let { authName, level, path } = req.body
    let obj = {
        authName,
        level,
        path
    }
    Right.insertMany(obj).then(data=>{
        console.log(data)
    }).catch(err=>{
        console.log(err)
    })
    res.send('set')
})
module.exports = router