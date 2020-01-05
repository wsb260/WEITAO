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
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
                </el-col>            
            </el-row>
            <el-row>
                <el-table :data="userList" border stripe>
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
        <!-- 添加用户 -->
        <el-dialog
            title="提示"
            :visible.sync="addDialogVisible"
            width="30%"
            @close="addDialogClose"
           >
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'user',
    data(){
        return {
            userList:[],
            total:0,
            // 获取用户列表的参数对象
            queryInfo:{
                query:'',
                // 当前的页数
                pagenum:1,
                // 当前每页显示多少条数据
                pagesize:2
            },
            // 控制添加用户对话框的显示与隐藏
            addDialogVisible: false,
            // 添加用户的表单数据
            addForm:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            // 添加表单的验证规则对象
            addFormRules:{
                username:[
                    {
                        required:true,message:'请输入用户名',trigger:'blur'
                    },
                    {
                        min:3,max:10,message:'用户名的长度在3~10个字符之间',trigger:'blur'
                    }
                ],
                password:[
                    {
                        required:true,message:'请输入密码',trigger:'blur'
                    },
                    {
                        min:3,max:10,message:'密码的长度在3~10个字符之间',trigger:'blur'
                    }
                ],
                email:[
                    {
                        required:true,message:'请输入邮箱',trigger:'blur'
                    },
                    {
                        min:3,max:10,message:'邮箱的长度在3~10个字符之间',trigger:'blur'
                    }
                ],
                mobile:[
                    {
                        required:true,message:'请输入手机号',trigger:'blur'
                    },
                    {
                        min:3,max:10,message:'手机号的长度在3~10个字符之间',trigger:'blur'
                    }
                ]
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
        },
        // 监听添加用户对话框的关闭事件
        addDialogClose(){
            this.$refs.addFormRef.resetFields()
        },
        // 添加新用户
        addUser() {
            this.$refs.addFormRef.validate(validate => {
                if(!validate) return false
                this.$message({
                    message:'添加成功',
                    type:'success'
                })
                // 隐藏添加用户的对话框
                this.addDialogVisible = false
            })
        }
    }
}
</script>