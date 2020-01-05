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
// 登录接口
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
// 获取导航数据接口
router.get('/getMenus',(ctx)=>{
  ctx.body = {
    "data":[{
      "id":100,
      "authName":"用户管理",
      "path":null,
      "children":[
        {
          "id":101,
          "authName":"用户列表",
          "path":"/user",
          "children":[]
        }
      ]
    },
    {
      "id":200,
      "authName":"权限管理",
      "path":null,
      "children":[
        {
          "id":201,
          "authName":"角色列表",
          "path":"/roles",
          "children":[]
        },
        {
          "id":202,
          "authName":"权限列表",
          "path":"/permissions",
          "children":[]
        }
      ]
    },
    {
      "id":300,
      "authName":"商品管理",
      "path":null,
      "children":[
        {
          "id":301,
          "authName":"商品列表",
          "path":'/list-goods',
          "children":[]
        },
        {
          "id":302,
          "authName":"分类参数",
          "path":"/goods",
          "children":[]
        },
        {
          "id":304,
          "authName":"商品分类",
          "path":null,
          "children":[]
        }
      ]
    },
    {
      "id":400,
      "authName":"订单管理",
      "path":null,
      "children":[
        {
          "id":401,
          "authName":"商品列表",
          "path":null,
          "children":[]
        }
      ]
    },
    {
      "id":500,
      "authName":"数据统计",
      "path":null,
      "children":[
        {
          "id":501,
          "authName":"商品列表",
          "path":null,
          "children":[]
        }
      ]
    }],
    "meta":{
      "msg":"获取菜单列表成功",
      "status":200
    }
  }
})
// 获取用户列表接口
router.get('/getUserList',(ctx)=>{
  let obj = {
    data:{
      pagenum:1,
      total:4,
      users:[{
        "id":500,
        "role_name":"超级管理员",
        "username":"admin",
        "create_time":new Date(),
        "mobile":"14423457681",
        "email" : "admin@123.com",
        "ms_state" : true // 当前用户状态
      },
      {
        "id":501,
        "role_name":"普通角色1",
        "username":"Frnk",
        "create_time":new Date(),
        "mobile":"15677623321",
        "email" :"test@qq.com",
        "ms_state":false
      },
      {
        "id":502,
        "role_name":"普通角色2",
        "username":"DR",
        "create_time":new Date(),
        "mobile":"15677555321",
        "email" :"test@qq.com",
        "ms_state":false
      },
      {
        "id":503,
        "role_name":"普通角色3",
        "username":"ERR",
        "create_time":new Date(),
        "mobile":"15623423111",
        "email" :"test@qq.com",
        "ms_state":true
      }]
    },
    meta:{
      status:200,
      msg:"获取管理员列表成功"
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