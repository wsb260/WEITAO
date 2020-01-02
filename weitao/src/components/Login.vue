<template>
    <div class="login_container">
        <div class="login_box">
            <!-- logo区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="login" class="logo">
            </div>
            <!-- 登陆表单区域 -->
            <el-form ref="form" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user" ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login" >登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
    name:'login',
    data(){
        return {
            loginForm:{
                username:'',
                password:''
            },
            loginFormRules:{ // 表单验证规则对象
                username:[
                    {required:true,message:"请输入登录名称",trigger:"blur"},
                    {min:3,max:5,message:"长度在3到10个字符之间",trigger:"blur"}
                ],
                password:[
                    {required:true,message:"请输入登录密码",trigger:"blur"},
                    {min:6,max:15,message:"长度在6到15个字符之间",trigger:"blur"}
                ]
            }
        }
    },
    methods:{
        resetLoginForm() { // 表单重置
            this.$refs.form.resetFields()
        },
        login() { // 登录验证
            this.$refs.form.validate(async (valid)=>{
                if(!valid) return;
                let { data:res } = await this.requestLogin()
                if(res.meta.status === 200){
                    // 提示
                    this.$message.success("登录成功")
                    // 记录token
                    Cookies.set("token",res.data.token)
                    // 跳转到主页this.$router.push()
                    this.$router.push('/home')
                }else{
                    this.$message.error("登录失败")
                }
            })
        },
        requestLogin() { // 登录验证接口
            return new Promise((resolve,reject)=>{
                this.$axios.post('/login',this.loginForm).then(res=>{
                    resolve(res)
                }).catch(error=>{
                    reject(error)
                })
            })
        }
    },
    mounted(){
    }
}
</script>

<style lang="less" scoped>
.login_container{
    height:100%;
    background-color:#2b4b6b;
    .login_box{
        width:450px;
        height:300px;
        background: #fff;
        border-radius: 4px;
        position: absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        .avatar_box{
            height:130px;
            width:130px;
            border: 2px solid #eee;
            border-radius: 50%;
            padding:10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left:50%;
            transform: translate(-50%,-50%);
            background: #fff;
            .logo{
                width:100%;
                height:100%;
                border-radius: 50%;
                background:#eee;
            }
         
        }
    }
}
.login_form{
    position: absolute;
    bottom:0;
    width:100%;
    padding:0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
</style>
