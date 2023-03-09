<template>
  <div>
    <ul v-if="msgList.length">
      <li v-for="item in msgList" :key="item.date">
        <p>
          <span>{{ item.username }}</span>
          <span>{{ new Date(item.date )}}</span>
        </p>
        <p>消息：{{ item.message }}</p>
      </li>
    </ul>
    <input v-model="msg" type="text" placeholder="请输入消息">
    <button @click="sendMsg">发送</button>
  </div>
</template>

<script>
const ws = new WebSocket("ws://localhost:3000")

export default {
  name: 'Home',
  data(){
    return {
      msg:'',
      username:'',
      msgList:[]
    }
  },
  mounted(){
    this.username = localStorage.getItem("username")
    if(!this.username){
      this.$router.push({path:'/login'})
      return
    }
    this.bindEvent()
  },
  methods:{
    sendMsg(){
      ws.send(JSON.stringify({
        message:this.msg,
        date:new Date().getTime(),
        username:this.username
      }))
      this.msg = ""
    },
    bindEvent(){
      ws.addEventListener('open',this.handleOpen.bind(this),false)
      ws.addEventListener('close',this.handleClose.bind(this),false)
      ws.addEventListener('error',this.handleError.bind(this),false)
      ws.addEventListener('message',this.handleMessage.bind(this),false)
    },
    handleOpen(e){
      console.log("Ws open,",e);
    },
    
    handleClose(e){
      console.log("Ws close,",e);
    },
    handleError(e){
      console.log("Ws Error,",e);
    },
    handleMessage(e){
      // console.log("Ws Message,",e);
      const msg = JSON.parse(e.data)
      this.msgList.push(msg)
    },

  }
 
}
</script>
