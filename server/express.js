const express = require('express')
const db = require('./mongodb/connect')
const config = require('config-lite')(__dirname)
const routes = require('./routes/index')
const bodyparser = require('body-parser')
let app = express()
app.use(bodyparser())
// 配置跨域
app.all('*',(req,res,next)=>{
    const { origin,Origin,referer,Referer } = req.headers
    const allowOrigin = origin || Origin || referer || Referer || '*'
    res.header('Access-Control-Allow-Origin',allowOrigin)
    res.header('Access-Control-Allow-Headers',"Content-Type,Authorization,X-Requested-With")
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Credentials',true) // 可以带cookie
    res.header('X-Powered-By','Express')
    if(req.method == 'OPTIONS'){
        res.sendStatus(200)
    }else{
        next()
    }
})
app.get('/users/:userId/books/:bookId',(req,res)=>{
    console.log(req.params)
    res.send('hl molong')
})
// 路由配置
routes(app)
// 启动监听
app.listen(config.port,()=>{
    console.log(`成功监听端口:${config.port}`)
})