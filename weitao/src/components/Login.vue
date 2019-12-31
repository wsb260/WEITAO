<template>
    <div class="login_container">
        <div class="login_box">
            <!-- logo区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="login" class="logo">
            </div>
            <!-- 登陆表单区域 -->
            <el-form ref="form" v-model="loginForm" label-width="0px" class="login_form">
                <el-form-item>
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary">登录</el-button>
                    <el-button type="primary">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:'login',
    data(){
        return {
            loginForm:{
                username:'ml',
                password:'123'
            }
        }
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
