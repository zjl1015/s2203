<template>
  <div>
    <ul>
      <template v-for="item in state.userList" :key="item.id">
        <li v-if="item.username===state.username">
         {{ item.username }}
       </li>
       <li v-else>
        <a href="javascript:;" @click="selectUser(item)">{{ item.username }}</a>
       </li>
      </template>
    </ul>

    <div v-if="state.targetUser">
      <h3>{{ state.targetUser.username }}</h3>
      <input type="text" placeholder="请输入内容" v-model="state.msgText">
      <button @click="sendMsg">发送</button>
    </div>

    <div>
      <ul>
        <li v-for="(data,index) in messageList" :key="index">
          <p>{{ data.fromUsername }}:{{ data.dateTime }}</p>
          <p>消息：{{ data.msg }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { io} from 'socket.io-client'
import { useRouter } from 'vue-router';
import {reactive,computed} from 'vue'
const router = useRouter()
const state = reactive({
  username:router.currentRoute.value.query.username,
  userList:[],
  targetUser:null,
  msgText:'',
  messageBox:{}
})
const socket = io("http://localhost:3000",{
  query:{
    username: state.username
  }
})

socket.on('connect',()=>{
  console.log("Client connect...");
})

socket.on('disconnect',()=>{
  console.log("Client disconnect...");
})

// 监听自定义事件
socket.on('online',(data)=>{
  // console.log("data==>",data);
  state.userList = data.userList
})

socket.on('error',(err)=>{
  console.log(err);
})

const messageList = computed(()=>{
  return (state.messageBox[state.username] && state.targetUser)?
  state.messageBox[state.username].filter(item=>{
    return item.fromUsername === state.targetUser.username || item.toUsername === state.targetUser.username
  }):[]
})


const selectUser = (userInfo)=>{
  // console.log("userinfo=>",userInfo);
  state.targetUser = userInfo
}
const sendMsg = ()=>{
  if(!state.msgText.length) return
  /**
   * {
   *    zhangsan:[
   *      {
   *          fromUsername:xxxx
   *          toUsername:xxxx
   *          dateTime:xxxx
   *          msg:xxxx
   *      }
   *    ]
   * }
   */
  // !state.messageBox[state.username] && (state.messageBox[state.username] = [])
  // state.messageBox[state.username].push({
  //   fromUsername:state.username,
  //   toUsername:state.targetUser.username,
  //   msg:state.msgText,
  //   dateTime:new Date().getTime()
  // });

  appendMessage({
    fromUsername:state.username,
    toUsername:state.targetUser.username,
    msg:state.msgText,
    dateTime:new Date().getTime()
  })
  // 发射自定义事件 send
  socket.emit('send',{
    fromUsername:state.username,
    targetId:state.targetUser.id,
    msg:state.msgText
  })
  console.log(state.msgText);
  state.msgText = ''
}

socket.on('receive',(data)=>{
  // !state.messageBox[state.username] && (state.messageBox[state.username] = [])
  // state.messageBox[state.username].push(data);
  appendMessage(data)
})

const appendMessage = (data)=>{
 !state.messageBox[state.username] && (state.messageBox[state.username] = [])
  state.messageBox[state.username].push(data);
}

</script>
