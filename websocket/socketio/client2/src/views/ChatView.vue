<template>
  <div>
    <h3>用户列表</h3>
    <ul>
     <template  v-for="item in state.userList" :key="item.id">
      <li v-if="item.username===state.username">
        {{ item.username }}
      </li>
      <li v-else>
        <a href="javascript:;" @click="selectUser(item)">{{ item.username }}</a>
      </li>
     </template>
    </ul>
    <!-- 选中的单聊对象 -->
    <div v-if="state.targetUser">
      <h3>{{ state.targetUser.username }}</h3>
      <ul v-if="messageList">
        <li v-for="(item,index) in messageList" :key="index">
          <p>
            <span>{{ item.fromUsername }}  :  {{ new Date(item.dateTime) }}</span>
          </p>
          <p>消息:{{ item.msg }}</p>
        </li>
      </ul>
      <input type="text" placeholder="请输入消息" v-model="state.msg">
      <button @click="doSend">发送</button>
    </div>
  </div>
</template>
<script setup>
import io from "socket.io-client"
import { reactive ,computed} from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
const state = reactive({
  username:router.currentRoute.value.query.username,
  userList:[],
  targetUser:null, // 就是与当前用户单聊的目标用户
  msg:'', // 发送的消息
  messageBox:{} // key: username,value:[msg,msg,...]
})
// 创建 socket 实例
const socket = io("http://localhost:3000",{
  query:{
    username:state.username
  }
})
socket.on('connect',()=>{
  console.log("Client connect...");
})
socket.on('online',(data)=>{
  console.log("userList=>",data);
  state.userList = data.userList
})
socket.on('receive',(data)=>{
  console.log("msg===>",data);
  appendMsg(data)
})

const messageList = computed(()=>{
  const currentUserMsgList = state.messageBox[state.username]
  if(!currentUserMsgList || !state.targetUser.username) return
  return currentUserMsgList.filter(msg=>{
    // 单聊界面只显示我给目标用户发送的和目标用户给我发送的
    return msg.toUsername === state.targetUser.username || msg.fromUsername === state.targetUser.username
  })
})
// 点击单聊对象
const selectUser =(userInfo)=>{
  console.log("userinfo=>",userInfo);
  state.targetUser = userInfo
}

// 点击发送消息
const doSend = ()=>{
  console.log(state.msg);
  appendMsg({
    fromUsername:state.username,
    toUsername:state.targetUser.username,
    msg:state.msg,
    dateTime:new Date().getTime()
  })
  socket.emit('send',{
    fromUsername:state.username,
    targetId:state.targetUser.id,
    msg:state.msg,
    dateTime:new Date().getTime()
  })
  state.msg = ''
}

const appendMsg = (data)=>{
  !state.messageBox[state.username] && (state.messageBox[state.username]=[])
  state.messageBox[state.username].push(data)
}


</script>