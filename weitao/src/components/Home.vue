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
            <el-aside :width="isCollapse?'64px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :unique-opened="true"
                    :collapse="isCollapse"
                    :collapse-transition="false">
                    <!-- 一级菜单 -->
                    <el-submenu :index="String(item.id)" v-for="item in menuList" :key="item.id">
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="icons[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="String(subItem.id)" v-for="subItem in item.children" :key="subItem.id">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体 -->
            <el-main>main</el-main>
        </el-container>        
    </el-container>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    name:'home',
    data(){
        return {
            // 左侧菜单数据
            menuList:[],
            // 导航图标
            icons:{
                '100':'el-icon-user-solid',
                '200':'el-icon-s-cooperation',
                '300':'el-icon-s-goods',
                '400':'el-icon-s-order',
                '500':'el-icon-s-data'
            },
            // 导航伸缩
            isCollapse:true
        }
    },
    created(){
        this.getMenuList()
    },
    methods:{
        // 退出登录
        logout(){
            Cookies.remove('token')
            this.$router.push('/login')
        },
        // 获取所有的菜单
        async getMenuList(){
           let { data:res } = await this.$axios.get('getMenus')
           if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
           this.menuList = res.data
        },
        // 点击按钮切换菜单折叠
        toggleCollapse(){
            this.isCollapse = !this.isCollapse
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
    background: #333744;
    .el-menu{
        border:none;
    }
}
.el-main{
    background: #EAEDF1
}

.toggle-button{
    background: #4a5064;
    font-size:10px;
    line-height:24px;
    color:#fff;
    text-align:center;
    cursor: pointer;
    letter-spacing: 2px;
}
</style>