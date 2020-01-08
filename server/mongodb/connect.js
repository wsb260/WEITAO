const mongoose = require('mongoose')
const chalk = require('chalk')
const config = require('config-lite')(__dirname) // 读取config配置

mongoose.connect(config.url,{useMongoClient:true})

const db = mongoose.connection

db.once('open',()=>{
    console.log(chalk.green('链接数据库成功'))
})

db.on('error',(error)=>{
    console.error(chalk.red('Error in MongoDb connection: '+error))
    mongoose.disconnect()
})

db.on('close',()=>{
    console.log(chalk.red('数据库断开链接,重新链接数据库'))
    mongoose.connect(config.url,{server:{auto_reconnect:true}})
})

// export default db