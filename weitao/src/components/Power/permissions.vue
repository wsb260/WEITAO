<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-table :data="rightList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="权限名称" prop="authName"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    name:'permissions',
    data(){
        return {
            rightList:[]
        }
    },
    created(){
        this.getRightsList()
    },
    methods:{
        async getRightsList(){
            const { data:res } = await this.$axios.get('http://localhost:4000/getRights/list')
            if(res.meta.status !== 200){
                return this.$message.err('获取权限列表失败')
            }
            this.rightList = res.data
        }
    }
}
</script>
<style lang="less" scoped>
    
</style>