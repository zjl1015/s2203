<template>
  <div>
    <input type="text" placeholder="请输入用户名" v-model="username">
    <button @click="doLogin">登录</button>
  </div>
</template>

<script setup>
 import { onMounted,ref } from 'vue';
import { useRouter } from 'vue-router';
 const router = useRouter()
 let username = ""
 function doLogin(){
  if(username.length<3){
    window.alert('用户名长度不能小于3')
    return
  }
  window.localStorage.setItem("username",username)
  router.push({path:'/'})
 }

 onMounted(()=>{
  let username = window.localStorage.getItem("username")
  if(username){
    router.push({path:'/'})
  }
 })


</script>
