<template>
  <div class="about">
    <input v-model="username" type="text" placeholder="用户名" />
    <button @click="login">进入聊天室</button>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        username:''
      }
    },
    methods:{
      login(){
         if(this.username.trim().length < 3){
            window.alert("用户名长度不能小于3")
            return
         }
         localStorage.setItem("username",this.username)
         this.$router.push("/")
      }
    }
  }
</script>
