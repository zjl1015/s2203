
<template>
<div>
  <ul v-if="msgList.length>0">
    <li v-for="item in msgList" :key="item.date">
    <p>
      <span style="color:red;font-size: 20px;">{{ item.user }}:</span>
      <span style="text-indent: 2em;">{{ new Date(item.date) }}</span>
    </p>
    <p>消息：{{item.message}}</p>
    </li>
  </ul>
  <input type="text" v-model="msg" placeholder="请输入消息">
  <button @click="doSend">发送</button>
</div>
</template>
<script setup>
import { onMounted ,reactive,ref} from 'vue';
import { useRouter } from 'vue-router';
import {useWebsocket} from '@/hooks/index.js'
const router = useRouter()

const ws = useWebsocket(handleMessage)
let username = ""
const msg = ref('')
const msgList = reactive([])
 onMounted(()=>{
  username = window.localStorage.getItem("username")
  if(!username){
    router.push({path:'/login'})
    return
  }
 })
 function doSend(){
  if(!msg.value.length>0) return
  ws.send(JSON.stringify({
    user:username,
    message:msg.value,
    date:new Date().getTime()
  }))

  msg.value = ""
 }
 function handleMessage(e){
  console.log("e==>",e);
  msgList.push(JSON.parse(e.data))
 }

</script>
