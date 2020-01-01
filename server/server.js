const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = new Router()

app.use(cors())
app.use(bodyParser())

router.get('/login',(ctx,next)=>{
  ctx.body = true
})

router.post('/login',(ctx,next)=>{
  let obj = {
    data:{
      id:500,
      rid:0,
      username:"admin",
      mobile:"123",
      email:"123@qq.com",
      token:"molong_bear@2"
    },
    meta:{
      msg:"登录成功",
      status:200
    }
  }
  ctx.body = obj
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000,()=>{
  console.log('success')
})
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'molong123',
//   database : 'mysql'
// });
 
// connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });