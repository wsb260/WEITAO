<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>            
            </el-row>
            <el-row>
                <el-table :data="userList" border stripe='true'>
                    <el-table-column type="index" label="#" align="center"></el-table-column>
                    <el-table-column label="姓名" prop="username" align="center"></el-table-column>
                    <el-table-column label="角色" prop="role_name" align="center"></el-table-column>
                    <el-table-column label="电话" prop="mobile" align="center"></el-table-column>
                    <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
                    <el-table-column label="状态" prop="ms_state" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.ms_state"
                                active-color="#13ce66"
                                >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="180px">
                        <template slot-scope="scope">
                            <!-- 修改 -->
                            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                            <!-- 删除 -->
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                            <!-- 分配角色 -->
                            <el-tooltip effect="dark" content="分配角色" placement="top">
                                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </el-row>
        </el-card>
    </div>
</template>
<script>
export default {
    name:'user',
    data(){
        return {
            userList:[],
            total:'',
            // 获取用户列表的参数对象
            queryInfo:{
                query:'',
                // 当前的页数
                pagenum:1,
                // 当前每页显示多少条数据
                pagesize:2
            }
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        async getUserList() {
            const { data:res } = await this.$axios.get('getUserList')
            if(res.meta.status !== 200) {
                return this.$message.error('获取用户列表失败！')
            }
            this.userList = res.data.users
            this.total = res.data.total
        },
        // 每页条数改变
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getUserList()
        },
        // 当前页改变
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage
            this.getUserList()
        }
    }
}
</script>