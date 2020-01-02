<template>
    <div>
        <el-button type="info" @click="logout">退出</el-button>
    </div>
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

<style lang="sass">
    
</style>