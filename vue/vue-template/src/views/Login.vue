<template>
  <div>
    <h1>这个是登录页面</h1>
    <el-button type="primary" size="mini" @click="doLogin">登录</el-button>
    
  </div>
</template>

<script>
export default {
  methods:{
    doLogin(){
      // 登录操作省略，直接调转页面
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>