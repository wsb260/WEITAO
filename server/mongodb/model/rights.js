const mongoose = require('mongoose')
const Schema = mongoose.Schema
const rightSchema = new Schema({
    authName:{type:String,required:true},// 权限说明
    level:{type:String,required:true},// 权限层级
    pid:{type:String},// 权限父ID
    path:{type:String} // 对应访问路径
})

let Right = mongoose.model('rights',rightSchema)

module.exports = Right