<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/header.jpg" alt="header">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">Aside</el-aside>
            <!-- 右侧内容主体 -->
            <el-main>main</el-main>
        </el-container>        
    </el-container>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    name:'home',
    methods:{
        logout(){
            Cookies.remove('token')
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less">
.home-container{
    width:100%;
    height:100%;
}
.el-header{
    background: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#fff;
    font-size:20px;
    padding-left:0;
    > div {
        display: flex;
        align-items: center;
        > img{
            width:200px;
            height: 60px;
            margin-right:20px;
        }
    }
}
.el-aside{
    background: #333744
}
.el-main{
    background: #EAEDF1
}
</style>